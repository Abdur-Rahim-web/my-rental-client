import { Button } from "@heroui/react";
import { House, ShieldExclamation } from "@gravity-ui/icons";
import Link from "next/link";

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050508] p-4">

            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />

            <div className="relative z-10 w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl text-center">

                <div className="mx-auto w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                    <ShieldExclamation className="w-10 h-10 text-red-500" />
                </div>

                <h1 className="text-4xl font-black text-white mb-3">Access Denied</h1>
                <p className="text-gray-400 mb-8 leading-relaxed">
                    Oops! It seems you don&apos;t have the necessary permissions to access this area. Please head back to safety.
                </p>

                <div className="flex flex-col gap-3">
                    <Link
                        href="/"
                        className="flex items-center justify-center w-full h-14 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/20"
                    >
                        Back to Home
                    </Link>

                    <Link
                        href="/auth/login"
                        className="flex items-center justify-center w-full h-14 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-all duration-300 shadow-lg shadow-blue-500/20"
                    >
                        Return to Login
                    </Link>

                </div>
            </div>
        </div>
    );
}