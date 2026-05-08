import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client';

type Args = {
  name?: string;
  email?: string;
  password?: string;
};

const ARG_PREFIX = '--';

const parseArgs = (argv: string[]): Args => {
  const args: Args = {};

  for (const raw of argv) {
    if (!raw.startsWith(ARG_PREFIX)) {
      continue;
    }

    const [key, value] = raw.slice(ARG_PREFIX.length).split('=');

    if (!value) {
      continue;
    }

    if (key === 'name') {
      args.name = value;
    }

    if (key === 'email') {
      args.email = value;
    }

    if (key === 'password') {
      args.password = value;
    }
  }

  return args;
};

const usage = () => {
  console.log(
    'Usage: npm run create-admin -- --name=NAME --email=EMAIL --password=PASSWORD',
  );
  console.log(
    'Optional: set ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD env vars instead of flags.',
  );
};

const main = async () => {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }

  const args = parseArgs(process.argv.slice(2));
  const name = args.name ?? process.env.ADMIN_NAME;
  const email = args.email ?? process.env.ADMIN_EMAIL;
  const password = args.password ?? process.env.ADMIN_PASSWORD;

  if (!email) {
    usage();
    throw new Error('Admin email is required');
  }

  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      const updates: { name?: string; password?: string; role?: 'admin' } = {
        role: 'admin',
      };

      if (name) {
        updates.name = name;
      }

      if (password) {
        updates.password = await bcrypt.hash(password, 10);
      }

      const updatedUser = await prisma.user.update({
        where: { email },
        data: updates,
      });

      console.log('Admin user updated:', {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
      });

      return;
    }

    if (!name || !password) {
      usage();
      throw new Error('Admin name and password are required for new users');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'admin',
      },
    });

    console.log('Admin user created:', {
      id: createdUser.id,
      email: createdUser.email,
      role: createdUser.role,
    });
  } finally {
    await prisma.$disconnect();
  }
};

main().catch((error) => {
  console.error('Failed to create admin user:', error.message);
  process.exitCode = 1;
});
