import {
  memo,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  motion,
  type Variants,
} from 'framer-motion';

import {
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  LucideIcon,
} from 'lucide-react';

import { cn } from '@/shared/utils';

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

export interface KPICardProps {
  title: string;

  value: string | number;

  prefix?: string;

  suffix?: string;

  change?: number;

  changeLabel?: string;

  icon: LucideIcon;

  accentColor?: string;

  delay?: number;

  progress?: number;

  className?: string;
}

/* -------------------------------------------------------------------------- */
/*                                 ANIMATION                                  */
/* -------------------------------------------------------------------------- */

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

/* -------------------------------------------------------------------------- */
/*                                USE COUNTER                                 */
/* -------------------------------------------------------------------------- */

const useCounter = (
  target: number,
  duration = 1400
) => {
  const [count, setCount] =
    useState(0);

  useEffect(() => {
    if (!target) return;

    let raf = 0;

    const start =
      performance.now();

    const update = (
      now: number
    ) => {
      const progress = Math.min(
        (now - start) / duration,
        1
      );

      const eased =
        1 -
        Math.pow(
          1 - progress,
          4
        );

      setCount(
        Math.round(
          eased * target
        )
      );

      if (progress < 1) {
        raf =
          requestAnimationFrame(
            update
          );
      }
    };

    raf =
      requestAnimationFrame(
        update
      );

    return () =>
      cancelAnimationFrame(raf);
  }, [target, duration]);

  return count;
};

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

const KPICard = memo(
  ({
    title,
    value,
    prefix = '',
    suffix = '',
    change,
    changeLabel = 'vs mes anterior',
    icon: Icon,
    accentColor = '#6366F1',
    delay = 0,
    progress = 78,
    className,
  }: KPICardProps) => {
    /* ---------------------------------------------------------------------- */
    /* VALUE                                                                  */
    /* ---------------------------------------------------------------------- */

    const numericValue =
      useMemo(() => {
        if (
          typeof value ===
          'number'
        ) {
          return value;
        }

        return (
          parseFloat(
            String(value).replace(
              /[^0-9.]/g,
              ''
            )
          ) || 0
        );
      }, [value]);

    const animatedValue =
      useCounter(
        numericValue
      );

    const formattedValue =
      typeof value ===
      'number'
        ? animatedValue.toLocaleString(
            'es-CO'
          )
        : value;

    /* ---------------------------------------------------------------------- */
    /* CHANGE STATUS                                                          */
    /* ---------------------------------------------------------------------- */

    const positive =
      change != null &&
      change > 0;

    const negative =
      change != null &&
      change < 0;

    const neutral =
      change === 0;

    const TrendIcon =
      positive
        ? ArrowUpRight
        : negative
        ? ArrowDownRight
        : Minus;

    /* ---------------------------------------------------------------------- */
    /* RENDER                                                                 */
    /* ---------------------------------------------------------------------- */

    return (
      <motion.article
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{
          delay,
        }}
        whileHover={{
          y: -6,
        }}
        className={cn(
          `
            group
            relative

            overflow-hidden

            rounded-[32px]

            border

            p-6

            backdrop-blur-2xl

            transition-all
            duration-500
          `,
          `
            border-slate-200/80

            bg-white/[0.92]

            shadow-[0_10px_40px_rgba(15,23,42,0.06)]

            dark:border-white/[0.06]

            dark:bg-[#0F1117]/92

            dark:shadow-[0_12px_50px_rgba(0,0,0,0.35)]
          `,
          className
        )}
      >
        {/* ------------------------------------------------------------------ */}
        {/* PREMIUM BACKGROUND                                                 */}
        {/* ------------------------------------------------------------------ */}

        <div
          className="
            pointer-events-none

            absolute
            inset-0
          "
        >
          {/* Glow */}

          <div
            className="
              absolute
              right-[-80px]
              top-[-80px]

              h-[220px]
              w-[220px]

              rounded-full

              opacity-[0.10]

              blur-3xl
            "
            style={{
              background:
                accentColor,
            }}
          />

          {/* Noise */}

          <div
            className="
              absolute
              inset-0

              opacity-[0.03]

              mix-blend-overlay
            "
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
              backgroundSize:
                '24px 24px',
            }}
          />
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* TOP SECTION                                                        */}
        {/* ------------------------------------------------------------------ */}

        <div
          className="
            relative
            z-10

            flex
            items-start
            justify-between
            gap-5
          "
        >
          {/* LEFT */}

          <div className="min-w-0 flex-1">
            <p
              className="
                text-[11px]
                font-semibold

                uppercase
                tracking-[0.14em]

                text-slate-500

                dark:text-zinc-500
              "
            >
              {title}
            </p>

            {/* VALUE */}

            <div className="mt-5">
              <h2
                className="
                  truncate

                  text-[44px]
                  font-black

                  leading-none

                  tracking-[-0.08em]

                  text-slate-950

                  dark:text-white
                "
              >
                {prefix}
                {formattedValue}
                {suffix}
              </h2>
            </div>

            {/* CHANGE */}

            {change != null && (
              <div
                className="
                  mt-5

                  flex
                  items-center
                  gap-3
                "
              >
                <div
                  className={cn(
                    `
                      inline-flex
                      items-center
                      gap-1.5

                      rounded-full

                      border

                      px-3
                      py-1.5

                      text-[12px]
                      font-semibold

                      backdrop-blur-xl
                    `,
                    positive &&
                      `
                        border-emerald-500/20
                        bg-emerald-500/10
                        text-emerald-600

                        dark:text-emerald-400
                      `,
                    negative &&
                      `
                        border-red-500/20
                        bg-red-500/10
                        text-red-500

                        dark:text-red-400
                      `,
                    neutral &&
                      `
                        border-slate-300
                        bg-slate-100
                        text-slate-500

                        dark:border-white/[0.06]
                        dark:bg-white/[0.04]
                        dark:text-zinc-400
                      `
                  )}
                >
                  <TrendIcon
                    size={14}
                  />

                  {positive &&
                    '+'}

                  {change}%
                </div>

                <span
                  className="
                    text-[12px]
                    font-medium

                    text-slate-500

                    dark:text-zinc-500
                  "
                >
                  {changeLabel}
                </span>
              </div>
            )}
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* ICON                                                             */}
          {/* ---------------------------------------------------------------- */}

          <motion.div
            whileHover={{
              rotate: -6,
              scale: 1.04,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              relative

              flex
              h-[74px]
              w-[74px]
              shrink-0
              items-center
              justify-center

              rounded-[26px]

              border

              backdrop-blur-xl
            "
            style={{
              background: `
                linear-gradient(
                  135deg,
                  ${accentColor}18,
                  transparent
                )
              `,

              borderColor: `${accentColor}20`,
            }}
          >
            {/* Ring */}

            <div
              className="
                absolute
                inset-0

                rounded-[26px]

                opacity-40
              "
              style={{
                background: `
                  radial-gradient(
                    circle at top,
                    ${accentColor}30,
                    transparent 70%
                  )
                `,
              }}
            />

            {/* Icon */}

            <Icon
              size={30}
              strokeWidth={2}
              style={{
                color:
                  accentColor,
              }}
            />
          </motion.div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* FOOTER                                                             */}
        {/* ------------------------------------------------------------------ */}

        <div
          className="
            relative
            z-10

            mt-8
          "
        >
          {/* PROGRESS */}

          <div
            className="
              h-[6px]
              overflow-hidden

              rounded-full

              bg-slate-200/80

              dark:bg-white/[0.05]
            "
          >
            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: `${progress}%`,
              }}
              transition={{
                duration: 1.2,
                delay:
                  delay + 0.2,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ] as const,
              }}
              className="
                relative
                h-full

                rounded-full
              "
              style={{
                background: `
                  linear-gradient(
                    90deg,
                    ${accentColor},
                    ${accentColor}95
                  )
                `,
              }}
            >
              {/* Shine */}

              <div
                className="
                  absolute
                  right-0
                  top-0

                  h-full
                  w-10

                  bg-white/30

                  blur-md
                "
              />
            </motion.div>
          </div>

          {/* FOOTER INFO */}

          <div
            className="
              mt-4

              flex
              items-center
              justify-between
            "
          >
            <span
              className="
                text-[11px]
                font-medium

                uppercase
                tracking-[0.12em]

                text-slate-400

                dark:text-zinc-600
              "
            >
              Performance
            </span>

            <span
              className="
                text-[12px]
                font-semibold

                text-slate-600

                dark:text-zinc-400
              "
            >
              {progress}%
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* HOVER BORDER                                                       */}
        {/* ------------------------------------------------------------------ */}

        <div
          className="
            pointer-events-none

            absolute
            inset-0

            rounded-[32px]

            ring-1
            ring-transparent

            transition-all
            duration-500

            group-hover:ring-white/[0.06]
          "
        />
      </motion.article>
    );
  }
);

KPICard.displayName =
  'KPICard';

export default KPICard;