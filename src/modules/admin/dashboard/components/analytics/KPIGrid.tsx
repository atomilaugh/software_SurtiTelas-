import {
  Users,
  UserCircle2,
  Boxes,
  ShoppingBag,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  LucideIcon,
} from 'lucide-react';

import { motion } from 'framer-motion';

import { cn } from '@/shared/utils';

import { useTheme } from '@presentation/contexts/ThemeContext';

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface KPIItem {
  title: string;
  value: string;
  trend: string;
  icon: LucideIcon;

  color: string;
  bg: string;
}

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

const KPIS: KPIItem[] = [
  {
    title: 'Total usuarios',
    value: '248',
    trend: '+12%',
    icon: Users,

    color: '#2563EB',
    bg: 'bg-blue-500/12',
  },

  {
    title: 'Empleados / asesores',
    value: '15',
    trend: '+4%',
    icon: UserCircle2,

    color: '#9333EA',
    bg: 'bg-violet-500/12',
  },

  {
    title: 'Total insumos',
    value: '156',
    trend: '+8%',
    icon: Boxes,

    color: '#16A34A',
    bg: 'bg-emerald-500/12',
  },

  {
    title: 'Productos terminados',
    value: '89',
    trend: '+5%',
    icon: ShoppingBag,

    color: '#EA580C',
    bg: 'bg-orange-500/12',
  },

  {
    title: 'Ventas del mes',
    value: '$67,000',
    trend: '+18%',
    icon: DollarSign,

    color: '#DB2777',
    bg: 'bg-pink-500/12',
  },

  {
    title: 'Pedidos procesados',
    value: '142',
    trend: '+9%',
    icon: ShoppingCart,

    color: '#4F46E5',
    bg: 'bg-indigo-500/12',
  },
];

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

const KPIGrid = () => {
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <section
      className="
        grid
        grid-cols-1
        gap-5

        sm:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-6
      "
    >
      {KPIS.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.article
            key={item.title}
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.04,
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            whileHover={{
              y: -4,
            }}
            className="group relative"
          >
            <div
              className={cn(
                `
                  relative
                  overflow-hidden

                  rounded-[24px]

                  border

                  px-5
                  py-5

                  transition-all
                  duration-300

                  backdrop-blur-xl
                `,
                isDark
                  ? `
                    border-white/[0.06]
                    bg-[#111318]

                    shadow-[0_10px_30px_rgba(0,0,0,0.30)]

                    hover:border-white/[0.10]
                    hover:bg-[#151821]
                  `
                  : `
                    border-[#E7ECF3]
                    bg-white

                    shadow-[0_6px_24px_rgba(15,23,42,0.05)]

                    hover:border-[#D8E0EA]
                    hover:shadow-[0_10px_32px_rgba(15,23,42,0.08)]
                  `
              )}
            >
              {/* TOP LIGHT */}

              <div
                className={cn(
                  `
                    absolute
                    inset-x-0
                    top-0

                    h-px
                  `,
                  isDark
                    ? `
                      bg-gradient-to-r
                      from-transparent
                      via-white/20
                      to-transparent
                    `
                    : `
                      bg-gradient-to-r
                      from-transparent
                      via-slate-200
                      to-transparent
                    `
                )}
              />

              {/* CONTENT */}

              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >
                {/* ICON */}

                <div
                  className={cn(
                    `
                      relative

                      flex
                      h-[62px]
                      w-[62px]
                      shrink-0
                      items-center
                      justify-center

                      rounded-2xl

                      transition-all
                      duration-300

                      group-hover:scale-105
                    `,
                    item.bg,
                    isDark
                      ? 'border border-white/[0.05]'
                      : ''
                  )}
                >
                  {/* GLOW */}

                  <div
                    className="
                      absolute
                      inset-0

                      rounded-2xl

                      opacity-20
                      blur-xl
                    "
                    style={{
                      background: item.color,
                    }}
                  />

                  <Icon
                    size={28}
                    strokeWidth={2.1}
                    style={{
                      color: item.color,
                    }}
                    className="relative z-10"
                  />
                </div>

                {/* TEXT */}

                <div className="min-w-0 flex-1">
                  {/* VALUE */}

                  <div
                    className={cn(
                      `
                        text-[42px]
                        font-black

                        leading-none

                        tracking-[-0.06em]
                      `,
                      isDark
                        ? 'text-white'
                        : 'text-[#0F172A]'
                    )}
                  >
                    {item.value}
                  </div>

                  {/* LABEL */}

                  <p
                    className={cn(
                      `
                        mt-2

                        text-[15px]
                        font-medium

                        leading-snug
                      `,
                      isDark
                        ? 'text-[#A1A1AA]'
                        : 'text-[#475569]'
                    )}
                  >
                    {item.title}
                  </p>
                </div>

                {/* TREND */}

                <div
                  className={cn(
                    `
                      absolute
                      right-4
                      top-4

                      flex
                      items-center
                      gap-1

                      rounded-full

                      px-2.5
                      py-1

                      text-[11px]
                      font-semibold
                    `,
                    isDark
                      ? `
                        border
                        border-emerald-500/15

                        bg-emerald-500/10

                        text-emerald-400
                      `
                      : `
                        bg-emerald-50

                        text-emerald-600
                      `
                  )}
                >
                  <TrendingUp size={12} />

                  {item.trend}
                </div>
              </div>

              {/* BOTTOM ACCENT */}

              <div
                className="absolute bottom-0 left-0 h-[3px] w-full"
                style={{
                  background: `
                    linear-gradient(
                      90deg,
                      ${item.color},
                      transparent
                    )
                  `,
                }}
              />
            </div>
          </motion.article>
        );
      })}
    </section>
  );
};

export default KPIGrid;