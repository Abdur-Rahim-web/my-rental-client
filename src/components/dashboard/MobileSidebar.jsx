"use client";
import { useState } from "react";
import { Button } from "@heroui/react";
import { LayoutSideContentLeft } from "@gravity-ui/icons"; 
import Link from "next/link";

export function MobileSidebar({ navContent }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden w-full">
      
      <Button 
        variant="flat" 
        onPress={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center"
      >
        <LayoutSideContentLeft className="size-5" />
      </Button>

      
      {isOpen && (
        <nav className="flex flex-col gap-1 mt-2 p-2 bg-white border border-default rounded-xl shadow-lg animate-in fade-in slide-in-from-top-2">
          {navContent.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)} 
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground hover:bg-default transition-colors"
            >
              <item.icon className="size-5 text-muted" />
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}