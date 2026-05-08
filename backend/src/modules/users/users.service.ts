import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import type { Roles } from '../../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  private readonly safeUserSelect = {
    id: true,
    name: true,
    email: true,
    role: true,
  };

  async findAll() {
    return this.prisma.user.findMany({ select: this.safeUserSelect });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: this.safeUserSelect,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(dto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: dto.role ?? 'user',
      },
      select: this.safeUserSelect,
    });
  }

  async update(id: string, dto: UpdateUserDto) {
    const existingUser = await this.findOne(id);

    if (dto.email && dto.email !== existingUser.email) {
      const emailUsed = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (emailUsed) {
        throw new ConflictException('User with this email already exists');
      }
    }

    const data: {
      name?: string;
      email?: string;
      password?: string;
      role?: Roles;
    } = {};

    if (dto.name !== undefined) {
      data.name = dto.name;
    }

    if (dto.email !== undefined) {
      data.email = dto.email;
    }

    if (dto.password !== undefined) {
      data.password = await bcrypt.hash(dto.password, 10);
    }

    if (dto.role !== undefined) {
      data.role = dto.role;
    }

    return this.prisma.user.update({
      where: { id },
      data,
      select: this.safeUserSelect,
    });
  }

  async remove(id: string) {
    const existingUser = await this.findOne(id);
    return this.prisma.user.delete({
      where: { id },
      select: this.safeUserSelect,
    });
  }
}
