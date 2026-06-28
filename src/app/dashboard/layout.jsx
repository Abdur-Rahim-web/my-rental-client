"use client";

import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isPending && !session?.user) {
      router.replace("/auth/login");
    }
  }, [mounted, isPending, session, router]);

  if (!mounted || isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 lg:flex-row">
      <DashboardSidebar />

      <main className="flex-1 overflow-x-hidden p-4 lg:p-8">
        {children}
      </main>
    </div>
  );
}