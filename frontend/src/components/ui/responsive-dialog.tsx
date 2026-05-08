"use client";

import * as React from "react";

import { useMobile } from "@/hooks/use-mobile";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "./drawer";

type ResponsiveDialogContextValue = {
    isMobile: boolean;
};

const ResponsiveDialogContext = React.createContext<
    ResponsiveDialogContextValue | undefined
>(undefined);

function useResponsiveDialogContext() {
    const context = React.useContext(ResponsiveDialogContext);
    if (!context) {
        throw new Error(
            "ResponsiveDialog components must be used within ResponsiveDialog",
        );
    }
    return context;
}

export interface ResponsiveDialogProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
}

export function ResponsiveDialog({
    open,
    defaultOpen,
    onOpenChange,
    children,
}: ResponsiveDialogProps) {
    const isMobile = useMobile();
    const Root = isMobile ? Drawer : Dialog;

    return (
        <ResponsiveDialogContext.Provider value={{ isMobile }}>
            <Root
                open={open}
                defaultOpen={defaultOpen}
                onOpenChange={onOpenChange}
            >
                {children}
            </Root>
        </ResponsiveDialogContext.Provider>
    );
}

export function ResponsiveDialogTrigger({
    ...props
}: React.ComponentProps<typeof DialogTrigger>) {
    const { isMobile } = useResponsiveDialogContext();
    const Trigger = isMobile ? DrawerTrigger : DialogTrigger;
    return <Trigger {...props} />;
}

export function ResponsiveDialogClose({
    ...props
}: React.ComponentProps<typeof DialogClose>) {
    const { isMobile } = useResponsiveDialogContext();
    const Close = isMobile ? DrawerClose : DialogClose;
    return <Close {...props} />;
}

export function ResponsiveDialogContent({
    ...props
}: React.ComponentProps<typeof DialogContent>) {
    const { isMobile } = useResponsiveDialogContext();
    const Content = isMobile ? DrawerContent : DialogContent;
    return <Content {...props} />;
}

export function ResponsiveDialogHeader({
    ...props
}: React.ComponentProps<typeof DialogHeader>) {
    const { isMobile } = useResponsiveDialogContext();
    const Header = isMobile ? DrawerHeader : DialogHeader;
    return <Header {...props} />;
}

export function ResponsiveDialogFooter({
    ...props
}: React.ComponentProps<typeof DialogFooter>) {
    const { isMobile } = useResponsiveDialogContext();
    const Footer = isMobile ? DrawerFooter : DialogFooter;
    return <Footer {...props} />;
}

export function ResponsiveDialogTitle({
    ...props
}: React.ComponentProps<typeof DialogTitle>) {
    const { isMobile } = useResponsiveDialogContext();
    const Title = isMobile ? DrawerTitle : DialogTitle;
    return <Title {...props} />;
}

export function ResponsiveDialogDescription({
    ...props
}: React.ComponentProps<typeof DialogDescription>) {
    const { isMobile } = useResponsiveDialogContext();
    const Description = isMobile ? DrawerDescription : DialogDescription;
    return <Description {...props} />;
}
