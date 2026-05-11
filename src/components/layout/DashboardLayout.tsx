import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface DashboardLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ title, subtitle, children }) => (
  <div className="min-h-screen bg-slate-100 text-slate-900">
    <div className="mx-auto flex min-h-screen max-w-[1700px]">
      <Sidebar />
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <Header title={title} subtitle={subtitle} />
        <div className="space-y-8">{children}</div>
      </div>
    </div>
  </div>
);
