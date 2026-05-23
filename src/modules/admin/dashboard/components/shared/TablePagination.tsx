import { motion } from 'framer-motion';

import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { cn } from '@/shared/utils';

interface TablePaginationProps {
  page: number;
  totalPages: number;

  onPrevious: () => void;
  onNext: () => void;

  className?: string;
}

const TablePagination = ({
  page,
  totalPages,
  onPrevious,
  onNext,
  className,
}: TablePaginationProps) => {
  const isFirstPage =
    page === 1;

  const isLastPage =
    page === totalPages;

  return (
    <div
      className={cn(
        `
          mt-7

          flex
          flex-col
          items-center
          justify-between
          gap-4

          rounded-[24px]

          border

          bg-white
          dark:bg-[#0F1117]

          border-[#E8ECF2]
          dark:border-white/[0.06]

          px-5
          py-4

          shadow-[0_4px_18px_rgba(15,23,42,0.04)]
          dark:shadow-[0_10px_30px_rgba(0,0,0,0.25)]

          sm:flex-row
        `,
        className
      )}
    >
      {/* Left Actions */}

      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        <PaginationButton
          onClick={onPrevious}
          disabled={isFirstPage}
          icon={
            <ChevronLeft size={16} />
          }
          label="Anterior"
        />

        <PaginationButton
          onClick={onNext}
          disabled={isLastPage}
          icon={
            <ChevronRight size={16} />
          }
          label="Siguiente"
          reverse
        />
      </div>

      {/* Center Info */}

      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <div
          className="
            flex
            h-10
            min-w-[40px]
            items-center
            justify-center

            rounded-xl

            bg-indigo-50
            dark:bg-indigo-500/10

            px-3
          "
        >
          <span
            className="
              text-sm
              font-semibold

              text-indigo-600
              dark:text-indigo-400
            "
          >
            {page}
          </span>
        </div>

        <div>
          <p
            className="
              text-sm
              font-medium

              text-slate-700
              dark:text-zinc-200
            "
          >
            Página actual
          </p>

          <p
            className="
              text-xs

              text-slate-500
              dark:text-zinc-500
            "
          >
            de {totalPages} páginas
          </p>
        </div>
      </div>

      {/* Right Status */}

      <div
        className="
          hidden
          items-center
          gap-2

          rounded-full

          bg-emerald-50
          dark:bg-emerald-500/10

          px-3
          py-2

          lg:flex
        "
      >
        <div
          className="
            h-2
            w-2

            rounded-full

            bg-emerald-500
          "
        />

        <span
          className="
            text-xs
            font-semibold

            text-emerald-600
            dark:text-emerald-400
          "
        >
          Navegación activa
        </span>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                             PAGINATION BUTTON                              */
/* -------------------------------------------------------------------------- */

interface PaginationButtonProps {
  label: string;
  disabled?: boolean;

  icon: React.ReactNode;

  onClick: () => void;

  reverse?: boolean;
}

const PaginationButton = ({
  label,
  disabled,
  icon,
  onClick,
  reverse = false,
}: PaginationButtonProps) => {
  return (
    <motion.button
      whileHover={
        disabled
          ? undefined
          : {
              y: -1,
            }
      }
      whileTap={
        disabled
          ? undefined
          : {
              scale: 0.98,
            }
      }
      onClick={onClick}
      disabled={disabled}
      className={cn(
        `
          flex
          h-11
          items-center
          gap-2

          rounded-2xl

          border

          px-4

          text-sm
          font-semibold

          transition-all
          duration-200
        `,
        `
          border-[#E5EAF1]
          bg-white

          hover:bg-slate-50
          hover:border-[#D8E0EA]

          dark:border-white/[0.06]
          dark:bg-white/[0.03]
          dark:hover:bg-white/[0.05]
        `,
        `
          disabled:pointer-events-none
          disabled:opacity-40
        `
      )}
    >
      {!reverse && icon}

      <span
        className="
          text-slate-700
          dark:text-zinc-200
        "
      >
        {label}
      </span>

      {reverse && icon}
    </motion.button>
  );
};

export default TablePagination;