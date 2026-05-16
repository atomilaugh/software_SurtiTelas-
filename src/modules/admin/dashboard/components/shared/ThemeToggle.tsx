import { motion } from 'framer-motion';

import {
  Moon,
  Sun,
} from 'lucide-react';

import { useTheme } from '@/presentation/contexts/ThemeContext';

const ThemeToggle = () => {
  const {
    theme,
    toggleTheme,
  } = useTheme();

  const isDark =
    theme === 'dark';

  return (
    <motion.button
      whileHover={{
        y: -1,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.96,
      }}
      onClick={toggleTheme}
      aria-label="Cambiar tema"
      className="
        group
        relative

        flex
        h-[50px]
        w-[50px]
        items-center
        justify-center

        overflow-hidden

        rounded-2xl

        border

        border-[#E7ECF3]
        dark:border-white/[0.06]

        bg-white
        dark:bg-[#0F1117]

        shadow-[0_4px_18px_rgba(15,23,42,0.05)]
        dark:shadow-[0_10px_30px_rgba(0,0,0,0.30)]

        transition-all
        duration-300

        hover:border-[#D8E0EA]
        dark:hover:border-white/[0.10]
      "
    >
      {/* Ambient Glow */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          opacity-0

          transition-opacity
          duration-300

          group-hover:opacity-100
        "
      >
        <div
          className="
            absolute
            inset-0

            bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.10),transparent_70%)]
          "
        />
      </div>

      {/* Background Orb */}

      <motion.div
        animate={{
          scale: isDark
            ? 1
            : 0.92,
          rotate: isDark
            ? 180
            : 0,
        }}
        transition={{
          duration: 0.4,
          ease: 'easeOut',
        }}
        className="
          absolute

          h-9
          w-9

          rounded-2xl

          bg-gradient-to-br
          from-indigo-500/10
          to-violet-500/10

          dark:from-amber-500/10
          dark:to-orange-500/10
        "
      />

      {/* Icon */}

      <motion.div
        key={theme}
        initial={{
          opacity: 0,
          rotate: -90,
          scale: 0.7,
        }}
        animate={{
          opacity: 1,
          rotate: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          rotate: 90,
          scale: 0.7,
        }}
        transition={{
          duration: 0.28,
          ease: 'easeOut',
        }}
        className="
          relative
          z-10
        "
      >
        {isDark ? (
          <Sun
            size={20}
            strokeWidth={2.2}
            className="
              text-amber-400
            "
          />
        ) : (
          <Moon
            size={19}
            strokeWidth={2.2}
            className="
              text-slate-700
            "
          />
        )}
      </motion.div>

      {/* Border Highlight */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          rounded-2xl

          ring-1
          ring-inset

          ring-white/50
          dark:ring-white/[0.04]
        "
      />
    </motion.button>
  );
};

export default ThemeToggle;