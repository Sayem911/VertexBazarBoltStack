import "@/app/globals.css";
import Link from 'next/link';
import Header from '@/components/Header';
import DynamicSidebar from '@/components/DynamicSidebar';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#2C363A]">
      <div className="flex">
        {/* Sidebar for desktop */}
        <div className="hidden md:block w-64 fixed h-full">
          <aside className="h-full bg-[#252D31] border-r border-[#3A454A]">
            <div className="p-4">
              <Link href="/" className="text-2xl font-bold text-white">
                Our Store
              </Link>
            </div>
            <DynamicSidebar />
          </aside>
        </div>

        {/* Main content */}
        <div className="flex-1 md:ml-64">
          <Header />
          <main className="min-h-screen bg-[#2C363A]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>
          <footer className="bg-[#252D31] border-t border-[#3A454A]">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-gray-400">
              © 2024 Our Store. All rights reserved.
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}