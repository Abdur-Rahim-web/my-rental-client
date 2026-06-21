import Link from "next/link";
import {
    LogoFacebook,
    LogoLinkedin,
    LogoGithub,
    House
} from "@gravity-ui/icons";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#0B0B0F] text-white">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

                {/* TOP SECTION */}
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

                    {/* LEFT: Branding & Social */}
                    <div className="space-y-6">

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
                                <House className="h-5 w-5 text-white" />
                            </div>

                            <div className="leading-none">
                                <h2 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 tracking-wide">
                                    Nestora
                                </h2>
                            </div>
                        </Link>

                        {/* Description */}
                        <p className="max-w-xs leading-8 text-gray-400">
                            Your trusted platform for finding the perfect home. We make renting seamless, secure, and hassle-free.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4 pt-6">
                            <Link
                                href="#"
                                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 transition hover:bg-blue-600 hover:text-white"
                            >
                                <LogoFacebook className="h-5 w-5" />
                            </Link>

                            <Link
                                href="#"
                                className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 transition hover:bg-blue-500"
                            >
                                <LogoGithub className="h-5 w-5" />
                            </Link>

                            <Link
                                href="#"
                                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 transition hover:bg-blue-600 hover:text-white"
                            >
                                <LogoLinkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* PROPERTIES (Replaced Product) */}
                    <div>
                        <h3 className="mb-6 text-lg font-semibold text-blue-400">
                            Properties
                        </h3>

                        <ul className="space-y-4 text-gray-400">
                            <li>
                                <Link href="/properties" className="transition hover:text-white hover:pl-1">
                                    All Properties
                                </Link>
                            </li>
                            <li>
                                <Link href="/properties?category=apartment" className="transition hover:text-white hover:pl-1">
                                    Apartments
                                </Link>
                            </li>
                            <li>
                                <Link href="/properties?category=house" className="transition hover:text-white hover:pl-1">
                                    Houses & Villas
                                </Link>
                            </li>
                            <li>
                                <Link href="/properties?category=commercial" className="transition hover:text-white hover:pl-1">
                                    Commercial Spaces
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* QUICK LINKS (Replaced Navigations) */}
                    <div>
                        <h3 className="mb-6 text-lg font-semibold text-blue-400">
                            Quick Links
                        </h3>

                        <ul className="space-y-4 text-gray-400">
                            <li>
                                <Link
                                    href="/about"
                                    className="transition hover:text-white hover:pl-1"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="transition hover:text-white hover:pl-1"
                                >
                                    Contact Support
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="transition hover:text-white hover:pl-1">
                                    User Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* RESOURCES */}
                    <div>
                        <h3 className="mb-6 text-lg font-semibold text-blue-400">
                            Resources
                        </h3>

                        <ul className="space-y-4 text-gray-400">
                            <li>
                                <Link
                                    href="/blog"
                                    className="transition hover:text-white hover:pl-1"
                                >
                                    Real Estate Blog
                                </Link>
                            </li>

                            <li>
                                <Link href="/faq" className="transition hover:text-white hover:pl-1">
                                    Help Center & FAQs
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* BOTTOM SECTION */}
                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row">
                    <p>Copyright {new Date().getFullYear()} — Nestora</p>

                    <div className="flex items-center gap-6">
                        <Link href="/terms" className="transition hover:text-white">
                            Terms & Policy
                        </Link>

                        <Link href="/privacy" className="transition hover:text-white">
                            Privacy Guideline
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}