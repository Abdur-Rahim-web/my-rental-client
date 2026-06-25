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

    const { data: session } = useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        await signOut();
    };

    const dashboardLinks = {
        tenant: '/dashboard/tenant',
        owner: '/dashboard/owner',
        admin: '/dashboard/admin'
    };

    const dashboardHref = user ? (dashboardLinks[user.role] || "/dashboard") : "/dashboard";

    const navLinks = [
        { label: "Home", href: "/", icon: <House className="w-4 h-4" /> },
        { label: "All Properties", href: "/properties", icon: <Layers className="w-4 h-4" /> },
    ];

    if (user) {
        navLinks.push({ label: "Dashboard", href: dashboardHref, icon: <LayoutHeader className="w-4 h-4" /> });
    }

    const isActive = (path) => pathname === path;

    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0B0F]/80 backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg text-white">
                        <House className="w-5 h-5" />
                    </div>
                    <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 tracking-wide">
                        Nestora
                    </h1>
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition hover:bg-white/10 hover:text-white ${isActive(link.href) ? "text-blue-400 bg-white/10" : "text-gray-300"}`}
                                >
                                    {link.icon} {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="h-6 w-px bg-white/20" />

                    <div className="flex items-center gap-3">
                        {user ? (
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-white">Hi, {user.name}</span>
                                <Button onClick={handleSignOut} variant="ghost" className="text-gray-300 hover:text-white">
                                    Sign Out
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Link href="/auth/login" className="text-sm font-medium text-blue-400 hover:text-blue-300">Login</Link>

                                <Link href="/auth/register" className="px-3 py-2 bg-blue-600 rounded-lg text-center text-white font-bold">Register</Link>
                            </>
                        )}
                    </div>
                </div>

                
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center justify-center rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
                >
                    {isMenuOpen ? "Close" : "Menu"}
                </button>
            </div>

            
            {isMenuOpen && (
                <div className="border-t border-white/10 bg-[#0B0B0F] md:hidden px-4 py-6">
                    <ul className="space-y-2">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`block px-4 py-3 text-base font-medium ${isActive(link.href) ? "text-blue-400" : "text-gray-300"}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="border-t border-white/10 pt-4 mt-4">
                        {user ? (
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-white">Hi, {user.name}</span>
                                <Button onClick={handleSignOut} variant="ghost" className="text-gray-300 hover:text-white">
                                    Sign Out
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Link href="/auth/login" className="px-4 py-3 text-white">Login</Link>
                                <Link href="/auth/register" className="px-4 py-3 bg-blue-600 rounded-lg text-center text-white font-bold">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}