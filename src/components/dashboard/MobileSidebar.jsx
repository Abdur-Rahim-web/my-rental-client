"use client";

import { useState, useCallback } from "react";
import { Drawer, Button } from "@heroui/react";
import { LayoutSideContentLeft } from "@gravity-ui/icons";

// কাস্টম হুক: এক্সটার্নাল প্যাকেজের ঝামেলা এড়াতে এটি ব্যবহার করছি
function useDisclosure(initialState = false) {
    const [isOpen, setIsOpen] = useState(initialState);
    const onOpen = useCallback(() => setIsOpen(true), []);
    const onClose = useCallback(() => setIsOpen(false), []);
    const onOpenChange = useCallback(() => setIsOpen((prev) => !prev), []);

    return { isOpen, onOpen, onClose, onOpenChange };
}

export function MobileSidebar({ navContent }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div className="lg:hidden">
            <Button onPress={onOpen} variant="secondary" className="w-full justify-start">
                <LayoutSideContentLeft className="size-5" />
                Sidebar
            </Button>
            
            <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="left">
                <Drawer.Content>
                    <Drawer.Header>
                        <Drawer.Heading>Navigation</Drawer.Heading>
                    </Drawer.Header>
                    <Drawer.Body>
                        {navContent}
                    </Drawer.Body>
                </Drawer.Content>
            </Drawer>
        </div>
    );
}