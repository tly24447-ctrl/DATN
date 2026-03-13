'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/presentation/hooks/useAuth';
import AdminSidebar from '@/src/presentation/components/admin/layout/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { currUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait until loading is finished before making a decision
    if (!loading) {
      if (!currUser || !currUser.isAdmin) {
        console.warn('Unauthorized access attempt. Redirecting to home...');
        router.push('/');
      }
    }
  }, [currUser, loading, router]);

  // Prevent "flicker" of admin content while checking permissions
  if (loading || !currUser || !currUser.isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-slate-500 animate-pulse">Verifying credentials...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-slate-100 p-8">
        {children}
      </main>
    </div>
  );
}