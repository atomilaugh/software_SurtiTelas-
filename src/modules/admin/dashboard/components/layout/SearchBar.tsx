import {
  forwardRef,
  InputHTMLAttributes,
} from 'react';

import {
  motion,
} from 'framer-motion';

import {
  Search,
} from 'lucide-react';

import {
  cn,
} from '@/shared/utils';

import {
  useTheme,
} from '@presentation/contexts/ThemeContext';

interface SearchBarProps
  extends InputHTMLAttributes<HTMLInputElement> {
  loading?: boolean;
}

const SearchBar = forwardRef<
  HTMLInputElement,
  SearchBarProps
>(
  (
    {
      className,
      loading,
      placeholder = 'Buscar...',
      ...props
    },
    ref
  ) => {
    const { theme } =
      useTheme();

    const dark =
      theme === 'dark';

    return (
      <motion.div
        whileTap={{
          scale: 0.995,
        }}
        className={cn(
          `
            group
            relative

            flex
            h-[52px]
            w-full
            items-center
            gap-3

            overflow-hidden

            rounded-2xl

            border

            px-4

            transition-all
            duration-300
          `,
          dark
            ? `
              border-white/[0.06]
              bg-white/[0.03]

              hover:bg-white/[0.05]
              hover:border-white/[0.08]

              focus-within:border-violet-500/40
              focus-within:bg-white/[0.05]
            `
            : `
              border-slate-200
              bg-white/80

              hover:bg-white
              hover:border-slate-300

              focus-within:border-violet-400
            `,
          className
        )}
        style={{
          backdropFilter:
            'blur(16px)',
        }}
      >
        {/* SEARCH ICON */}

        <div
          className={cn(
            `
              flex
              items-center
              justify-center

              transition-all
              duration-300
            `,
            dark
              ? `
                text-zinc-500

                group-focus-within:text-violet-400
              `
              : `
                text-slate-400

                group-focus-within:text-violet-500
              `
          )}
        >
          <Search size={18} />
        </div>

        {/* INPUT */}

        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          className={cn(
            `
              h-full
              flex-1

              bg-transparent

              text-[14px]
              font-medium

              outline-none

              transition-all
              duration-300
            `,
            dark
              ? `
                text-white
                placeholder:text-zinc-500
              `
              : `
                text-slate-900
                placeholder:text-slate-400
              `
          )}
          {...props}
        />

        {/* RIGHT ACTIONS */}

        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          {/* LOADING */}

          {loading && (
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                repeat:
                  Infinity,
                duration: 1,
                ease: 'linear',
              }}
              className={cn(
                `
                  h-4
                  w-4

                  rounded-full

                  border-2
                  border-transparent
                `,
                dark
                  ? `
                    border-t-violet-400
                  `
                  : `
                    border-t-violet-500
                  `
              )}
            />
          )}

          {/* SHORTCUT */}

          <kbd
            className={cn(
              `
                hidden
                sm:flex

                h-7
                items-center
                justify-center

                rounded-lg

                border

                px-2.5

                text-[11px]
                font-medium

                transition-all
                duration-300
              `,
              dark
                ? `
                  border-white/[0.06]
                  bg-white/[0.04]
                  text-zinc-500
                `
                : `
                  border-slate-200
                  bg-slate-50
                  text-slate-500
                `
            )}
          >
            ⌘K
          </kbd>
        </div>

        {/* GLOW */}

        <div
          className={cn(
            `
              pointer-events-none
              absolute
              inset-0

              opacity-0

              transition-opacity
              duration-300

              group-focus-within:opacity-100
            `,
            dark
              ? `
                bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08),transparent_70%)]
              `
              : `
                bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.06),transparent_70%)]
              `
          )}
        />
      </motion.div>
    );
  }
);

SearchBar.displayName =
  'SearchBar';

export default SearchBar;