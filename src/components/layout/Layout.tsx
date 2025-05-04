
import React from 'react';
import { Sidebar } from './Sidebar';
import { Toaster } from '@/components/ui/sonner';

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
      <Toaster />
    </div>
  );
}
