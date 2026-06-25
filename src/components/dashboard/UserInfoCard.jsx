"use client";

import React from "react";
import { useSession } from "@/lib/auth-client";
import { Mail, ShieldCheck, User, Loader2 } from "lucide-react"; 

export default function UserInfoCard() {
    const { data: session, isPending } = useSession();
    const user = session?.user;

    if (isPending) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="max-w-sm w-full bg-white rounded-3xl overflow-hidden shadow-lg border border-zinc-100 transition-all hover:shadow-xl">
            {/* Top Background Pattern */}
            <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-700"></div>

            <div className="px-6 pb-6">
                {/* Avatar */}
                <div className="relative -mt-12 mb-4">
                    <div className="w-24 h-24 rounded-full border-4 border-white bg-zinc-100 flex items-center justify-center text-blue-600 font-bold text-3xl shadow-md uppercase">
                        {user.name?.charAt(0) || "U"}
                    </div>
                </div>

                {/* Name & Title */}
                <div className="mb-6">
                    <h3 className="text-2xl font-extrabold text-zinc-900">{user.name}</h3>
                    <p className="text-zinc-500 font-medium">User Profile</p>
                </div>

                {/* Information Grid */}
                <div className="space-y-4">
                    {/* Email */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                        <Mail className="text-blue-500 w-5 h-5" />
                        <div>
                            <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">Email</p>
                            <p className="text-sm font-semibold text-zinc-700">{user.email}</p>
                        </div>
                    </div>

                    {/* Role */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                        <ShieldCheck className="text-emerald-500 w-5 h-5" />
                        <div>
                            <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">Role</p>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                {user.role || "User"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}