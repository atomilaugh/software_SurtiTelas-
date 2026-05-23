import React from 'react';
import { cn } from '@/shared/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, className }) => {
  return (
    <div className={cn('mb-6', className)}>
      <h2
        aria-label="Título de sección"
        className="text-xl font-bold text-slate-900 tracking-tight"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionTitle;
