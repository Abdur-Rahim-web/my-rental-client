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
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar Component */}
      <DashboardSidebar />
      
      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}