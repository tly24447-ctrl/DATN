// src/app/(public)/layout.tsx
import { Navbar } from '@/src/presentation/components/layout/Navbar';
// import { Footer } from '@/src/presentation/components/layout/Footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      {/* <Footer /> */}
    </>
  );
}