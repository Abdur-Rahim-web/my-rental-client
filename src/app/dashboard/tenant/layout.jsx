"use client"
import { redirect } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function TenantLayout({ children }) {
    
    const { data: session, isPending } = useSession();
    const user = session?.user;

    
    if (isPending) return null; 

    
    if (!user) {
        redirect("/auth/login"); 
    }

    
    if (user.role !== "tenant") {
        redirect("/unauthorized"); 
    }

    return (
        <div className="flex min-h-screen bg-background">
            <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                {children}
            </main>
        </div>
    );
}