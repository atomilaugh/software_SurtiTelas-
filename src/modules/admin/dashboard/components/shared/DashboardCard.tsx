import { ReactNode } from 'react';

import { motion } from 'framer-motion';

import { cn } from '@/shared/utils';

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;

  action?: ReactNode;

  className?: string;
  contentClassName?: string;

  noPadding?: boolean;
}

const DashboardCard = ({
  title,
  subtitle,
  children,
  action,
  className,
  contentClassName,
  noPadding = false,
}: DashboardCardProps) => {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
      whileHover={{
        y: -2,
      }}
      className={cn(
        `
          group
          relative
          overflow-hidden

          rounded-[30px]

          border

          bg-white
          dark:bg-[#0F1117]

          border-[#E8ECF2]
          dark:border-white/[0.06]

          shadow-[0_4px_20px_rgba(15,23,42,0.04)]
          dark:shadow-[0_10px_40px_rgba(0,0,0,0.35)]

          transition-all
          duration-300
        `,
        `
          hover:shadow-[0_10px_35px_rgba(15,23,42,0.08)]
          dark:hover:shadow-[0_14px_50px_rgba(0,0,0,0.45)]
        `,
        className
      )}
    >
      {/* Ambient Glow */}

      <div
        className="
          pointer-events-none

          absolute
          right-[-80px]
          top-[-80px]

          h-[180px]
          w-[180px]

          rounded-full

          bg-indigo-500/[0.04]
          blur-3xl
        "
      />

      {/* Top Border Accent */}

      <div
        className="
          absolute
          inset-x-0
          top-0

          h-[1px]

          bg-gradient-to-r
          from-transparent
          via-white/70
          to-transparent

          dark:via-white/[0.12]
        "
      />

      {/* Header */}

      <div
        className={cn(
          `
            relative
            z-10

            flex
            items-start
            justify-between
            gap-4

            border-b

            px-7
            pt-6
            pb-5
          `,
          `
            border-[#EEF2F7]
            dark:border-white/[0.06]
          `
        )}
      >
        {/* Left */}

        <div className="min-w-0">
          <h3
            className="
              truncate

              text-[20px]
              font-semibold

              tracking-[-0.03em]

              text-slate-900
              dark:text-white
            "
          >
            {title}
          </h3>

          {subtitle && (
            <p
              className="
                mt-1.5

                text-sm
                leading-relaxed

                text-slate-500
                dark:text-zinc-400
              "
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Action */}

        {action && (
          <div
            className="
              shrink-0
            "
          >
            {action}
          </div>
        )}
      </div>

      {/* Content */}

      <div
        className={cn(
          noPadding
            ? ''
            : 'p-7',
          contentClassName
        )}
      >
        {children}
      </div>
    </motion.section>
  );
};

export default DashboardCard;