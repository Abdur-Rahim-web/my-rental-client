"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { House, Layers, LayoutHeader } from "@gravity-ui/icons";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    // Real authentication state from auth-client
    const { data: session, isPending } = useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        await signOut();
    };

    // Base navigation links
    const navLinks = [
        {
            label: "Home",
            href: "/",
            icon: <House className="w-4 h-4" />
        },
        {
            label: "All Properties",
            href: "/properties",
            icon: <Layers className="w-4 h-4" />
        },
    ];

    const isActive = (path) => pathname === path;

    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0B0F]/80 backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* LOGO & BRAND */}
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg text-white">
                        <House className="w-5 h-5" />
                    </div>

                    <div className="hidden leading-none sm:block">
                        <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 tracking-wide">
                            Nestora
                        </h1>
                    </div>
                </Link>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-4">

                    {/* Desktop Menu */}
                    <div className="hidden items-center gap-6 md:flex">

                        {/* Nav Links */}
                        <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition hover:bg-white/10 hover:text-white ${isActive(link.href) ? "text-blue-400 bg-white/10" : "text-gray-300"
                                            }`}
                                    >
                                        {link.icon}
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Vertical Divider */}
                        <div className="h-6 w-px bg-white/20" />

                        {/* Auth Links */}
                        <div className="flex items-center gap-4">
                            {user ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        className={`flex items-center gap-1.5 text-sm font-medium transition hover:text-blue-300 ${isActive("/dashboard") ? "text-blue-400" : "text-gray-300"
                                            }`}
                                    >
                                        <LayoutHeader className="w-4 h-4" />
                                        Dashboard
                                    </Link>
                                    <Button
                                        onClick={handleSignOut}
                                        variant="ghost"
                                        className="text-white hover:bg-white/10"
                                    >
                                        Sign Out
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/auth/login"
                                        className="text-sm font-medium text-blue-400 transition hover:text-blue-300"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href="/auth/register"
                                        className="text-sm font-medium text-blue-400 transition hover:text-blue-300"
                                    >
                                        Register
                                    </Link>

                                </>
                            )}
                        </div>
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center justify-center rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}
            {isMenuOpen && (
                <div className="border-t border-white/10 bg-[#0B0B0F] md:hidden shadow-xl absolute w-full">
                    <div className="space-y-3 px-4 py-6">

                        {/* Nav Links */}
                        <ul className="space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition hover:bg-white/5 hover:text-white ${isActive(link.href) ? "bg-white/10 text-blue-400" : "text-gray-300"
                                            }`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.icon}
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Divider */}
                        <div className="border-t border-white/10 pt-4">
                            <div className="flex flex-col gap-3">
                                {user ? (
                                    <>
                                        <div className="px-4 py-2 text-sm text-gray-400">
                                            Logged in as <span className="font-bold text-white">{user.name}</span>
                                        </div>
                                        <Link
                                            href="/dashboard"
                                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition hover:bg-white/5 hover:text-white ${isActive("/dashboard") ? "bg-white/10 text-blue-400" : "text-gray-300"
                                                }`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <LayoutHeader className="w-5 h-5" />
                                            Dashboard
                                        </Link>
                                        <Button
                                            onClick={() => {
                                                handleSignOut();
                                                setIsMenuOpen(false);
                                            }}
                                            className="bg-danger/20 text-danger hover:bg-danger/30 font-medium w-full justify-start px-4 py-3"
                                            radius="lg"
                                            variant="flat"
                                        >
                                            Sign Out
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/auth/login"
                                            className="text-sm font-medium text-blue-400 transition hover:text-blue-300"
                                        >
                                            Login
                                        </Link>

                                        <Link
                                            href="/auth/register"
                                            className="text-sm font-medium text-blue-400 transition hover:text-blue-300"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}