"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { usePathname } from "next/navigation";
import { House, Layers, CircleArrowRight, PersonPlus, LayoutHeader, Bars, Xmark } from "@gravity-ui/icons";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();


    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Base navigation links for all users
    const navLinks = [
        { name: "Home", href: "/", icon: <House className="w-4 h-4" /> },
        { name: "All Properties", href: "/properties", icon: <Layers className="w-4 h-4" /> },
    ];

    // Conditional link: If user is logged in, show Dashboard
    if (isLoggedIn) {
        navLinks.push({ name: "Dashboard", href: "/dashboard", icon: <LayoutHeader className="w-4 h-4" /> });
    }

    const isActive = (path) => pathname === path;

    // Temporary function to handle logout toggle for testing
    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsMenuOpen(false);
    };

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-default-200 bg-background/70 backdrop-blur-lg">
            <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                {/* Left Section: Mobile Menu Button & Logo/Brand */}
                <div className="flex items-center gap-3">
                    <button
                        className="block p-1 text-default-600 hover:text-blue-600 sm:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? <Xmark className="w-6 h-6" /> : <Bars className="w-6 h-6" />}
                    </button>

                    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground">
                        <div className="bg-blue-600 text-white p-2 rounded-lg flex items-center justify-center shadow-md">
                            <House className="w-5 h-5" />
                        </div>
                        <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-extrabold">
                            StayEase
                        </span>
                    </Link>
                </div>

                {/* Center Section: Desktop Links (Includes Dashboard conditionally) */}
                <ul className="hidden items-center gap-6 sm:flex">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-blue-600 ${isActive(link.href) ? "text-blue-600 font-semibold" : "text-default-600"
                                    }`}
                            >
                                {link.icon}
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right Section: Conditional Auth Buttons */}
                <div className="flex items-center gap-3">
                    {!isLoggedIn ? (
                        <>
                            <Link
                                href="/login"
                                className="flex w-full items-center gap-3 py-2 px-3 rounded-lg text-base text-default-700 hover:bg-default-50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <CircleArrowRight className="w-4 h-4" />
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="flex w-full items-center gap-3 py-2 px-3 rounded-lg text-base text-blue-600 bg-blue-50 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <PersonPlus className="w-4 h-4" />
                                Register
                            </Link>
                        </>
                    ) : (
                        <Button
                            onClick={handleLogout}
                            color="danger"
                            variant="flat"
                            className="font-medium"
                            startContent={<CircleArrowRight className="w-4 h-4" />}
                        >
                            Logout
                        </Button>
                    )}
                </div>
            </header>

            {/* Mobile Responsive Menu Drawer */}
            {isMenuOpen && (
                <div className="absolute top-16 left-0 z-50 w-full border-b border-default-200 bg-background/95 backdrop-blur-lg p-6 shadow-xl transition-all sm:hidden">
                    <ul className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`flex w-full items-center gap-3 py-2 px-3 rounded-lg text-base transition-colors ${isActive(link.href)
                                        ? "bg-blue-50 text-blue-600 font-semibold"
                                        : "text-default-700 hover:bg-default-50"
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.icon}
                                    {link.name}
                                </Link>
                            </li>
                        ))}

                        <hr className="my-2 border-default-100" />

                        {/* Mobile Auth Conditional Buttons */}
                        {!isLoggedIn ? (
                            <>
                                <li>
                                    <Link
                                        href="/login"
                                        className="flex w-full items-center gap-3 py-2 px-3 rounded-lg text-base text-default-700 hover:bg-default-50"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <CircleArrowRight className="w-4 h-4" />
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/register"
                                        className="flex w-full items-center gap-3 py-2 px-3 rounded-lg text-base text-blue-600 bg-blue-50 font-medium"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <PersonPlus className="w-4 h-4" />
                                        Register
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 py-2 px-3 rounded-lg text-base text-danger-600 bg-danger-50 hover:bg-danger-100 font-medium text-left"
                                >
                                    <CircleArrowRight className="w-4 h-4" />
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
}