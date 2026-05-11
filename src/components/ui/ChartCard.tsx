import { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, subtitle, children }) => (
  <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
    <div className="mb-6 flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{title}</p>
        <p className="mt-2 text-base font-semibold text-slate-900">{subtitle}</p>
      </div>
    </div>
    <div className="h-[320px] w-full">{children}</div>
  </section>
);
