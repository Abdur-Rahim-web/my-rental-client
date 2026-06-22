"use client";

import React from "react";
import { useSession } from "@/lib/auth-client"; 

export default function UserInfoCard() {
    const { data: session, isPending } = useSession();
    const user = session?.user;

    if (isPending) {
        return (
            <div className="flex justify-center p-8">
                <div className="animate-pulse bg-zinc-100 h-40 w-80 rounded-2xl"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-zinc-200 text-center text-zinc-500">
                No user logged in.
            </div>
        );
    }

    return (
        <div className="max-w-sm w-full p-6 bg-white rounded-3xl shadow-xl shadow-zinc-100 border border-zinc-100">
            
            <div className="flex flex-col items-center text-center gap-4">
                
                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-2xl uppercase border-4 border-blue-50">
                    {user.name?.charAt(0) || "U"}
                </div>

                <div>
                    <h3 className="text-xl font-bold text-zinc-900">{user.name}</h3>
                    <p className="text-sm text-zinc-500">{user.email}</p>
                </div>
            </div>

            
            <div className="mt-6 pt-4 border-t border-zinc-100">
                <p className="text-[10px] tracking-widest text-zinc-400 uppercase font-bold mb-1">User Role</p>
                <p className="text-xs text-zinc-600 bg-zinc-50 p-2 rounded-lg break-all font-mono">
                    {user.role}
                </p>
            </div>
        </div>
    );
}