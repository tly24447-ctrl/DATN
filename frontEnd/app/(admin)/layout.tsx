// src/app/(admin)/layout.tsx
// import { AdminSidebar } from '@/src/presentation/components/admin/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* <AdminSidebar /> */}
      <main className="flex-1 bg-slate-100 p-8">
        {children}
      </main>
    </div>
  );
}