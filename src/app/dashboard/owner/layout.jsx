"use client"
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { useSession } from "@/lib/auth-client";

export default  function OwnerLayout({ children }) {
    
    const { data: session } = useSession();
        const user = session?.user;

    
    if (!user) {
        redirect("/auth/login"); 
    }

    
    if (user.role !== "owner") {
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