"use client";
import { useSession } from '@/lib/auth-client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';

export default function DashboardLayout({ children }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/auth/login');
    }
  }, [session, isPending, router]);

  if (isPending) return <div className="text-center mt-20">Loading Dashboard...</div>;
  if (!session?.user) return null;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Role pass করা হচ্ছে */}
      <DashboardSidebar role={session.user.role} />
      
      {/* Main Content Area */}
      <main className="flex-1 p-8 bg-gray-50">
        {children}
      </main>
    </div>
  );
}