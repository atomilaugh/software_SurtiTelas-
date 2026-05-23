import { motion } from 'framer-motion';

import {
  Search,
  X,
} from 'lucide-react';

import { cn } from '@/shared/utils';

interface TableSearchProps {
  value: string;

  onChange: (
    value: string
  ) => void;

  placeholder?: string;

  className?: string;
}

const TableSearch = ({
  value,
  onChange,
  placeholder = 'Buscar pedido...',
  className,
}: TableSearchProps) => {
  return (
    <div
      className={cn(
        `
          relative

          w-full

          md:w-[360px]
        `,
        className
      )}
    >
      {/* Glow */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          rounded-[22px]

          bg-indigo-500/[0.03]

          opacity-0
          blur-xl

          transition-opacity
          duration-300

          group-focus-within:opacity-100
        "
      />

      {/* Input Wrapper */}

      <motion.div
        whileFocus={{
          scale: 1.005,
        }}
        className="
          group
          relative
        "
      >
        {/* Search Icon */}

        <div
          className="
            pointer-events-none

            absolute
            left-4
            top-1/2
            z-10

            -translate-y-1/2
          "
        >
          <Search
            size={18}
            className="
              text-slate-400
              transition-colors
              duration-200

              group-focus-within:text-indigo-500
              dark:text-zinc-500
              dark:group-focus-within:text-indigo-400
            "
          />
        </div>

        {/* Input */}

        <input
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder={placeholder}
          className="
            h-[52px]
            w-full

            rounded-[22px]

            border

            border-[#E7ECF3]
            dark:border-white/[0.06]

            bg-white
            dark:bg-[#0F1117]

            pl-12
            pr-12

            text-[14px]
            font-medium

            text-slate-900
            placeholder:text-slate-400

            dark:text-white
            dark:placeholder:text-zinc-500

            shadow-[0_4px_18px_rgba(15,23,42,0.04)]
            dark:shadow-[0_10px_30px_rgba(0,0,0,0.25)]

            outline-none

            transition-all
            duration-200

            focus:border-indigo-500/30
            focus:ring-4
            focus:ring-indigo-500/10

            dark:focus:border-indigo-500/20
            dark:focus:ring-indigo-500/10
          "
        />

        {/* Clear Button */}

        {value && (
          <motion.button
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
            }}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() =>
              onChange('')
            }
            className="
              absolute
              right-3
              top-1/2

              flex
              h-8
              w-8
              items-center
              justify-center

              -translate-y-1/2

              rounded-full

              bg-slate-100
              hover:bg-slate-200

              dark:bg-white/[0.05]
              dark:hover:bg-white/[0.08]

              transition-colors
              duration-200
            "
          >
            <X
              size={14}
              className="
                text-slate-500
                dark:text-zinc-400
              "
            />
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default TableSearch;