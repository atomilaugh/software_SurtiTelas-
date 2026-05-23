import React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/shared/utils';

interface EmptyStateProps {
  message?: string;
  icon?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'No hay datos disponibles',
  icon = <AlertCircle className="h-6 w-6 text-slate-400" aria-hidden="true" />,
  className,
}) => {
  return (
    <div
      role="status"
      aria-label="Estado vacío"
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 p-10 text-center',
        className
      )}
    >
      {icon}
      <p className="mt-3 text-sm font-medium text-slate-500">{message}</p>
    </div>
  );
};

export default EmptyState;
