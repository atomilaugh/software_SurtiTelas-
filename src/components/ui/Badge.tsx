import clsx from 'clsx';

interface BadgeProps {
  label: string;
  variant?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  rounded?: boolean;
  className?: string;
}

const palette: Record<NonNullable<BadgeProps['variant']>, string> = {
  neutral: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-100 text-emerald-800',
  warning: 'bg-amber-100 text-amber-800',
  danger: 'bg-rose-100 text-rose-800',
  info: 'bg-sky-100 text-sky-800',
};

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'neutral', rounded = true, className }) => (
  <span className={clsx('inline-flex items-center px-3 py-1 text-sm font-semibold tracking-tight', palette[variant], rounded ? 'rounded-full' : 'rounded-md', className)}>
    {label}
  </span>
);
