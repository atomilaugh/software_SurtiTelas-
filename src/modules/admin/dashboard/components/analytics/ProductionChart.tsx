import { motion } from 'framer-motion';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

import {
  Activity,
  TrendingUp,
} from 'lucide-react';

import { useTheme } from '@presentation/contexts/ThemeContext';

import { cn } from '@/shared/utils';

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

const DATA = [
  { day: 'L', pedidos: 12, entregados: 10 },
  { day: 'M', pedidos: 18, entregados: 15 },
  { day: 'X', pedidos: 15, entregados: 14 },
  { day: 'J', pedidos: 22, entregados: 18 },
  { day: 'V', pedidos: 28, entregados: 24 },
  { day: 'S', pedidos: 35, entregados: 30 },
  { day: 'D', pedidos: 20, entregados: 17 },
];

/* -------------------------------------------------------------------------- */
/*                                  TOOLTIP                                   */
/* -------------------------------------------------------------------------- */

const CustomTooltip = ({
  active,
  payload,
  label,
}: any) => {
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        `
          min-w-[150px]

          rounded-2xl

          border

          px-4
          py-3

          backdrop-blur-xl
        `,
        isDark
          ? `
            border-white/[0.08]
            bg-[#11131A]/95

            shadow-[0_10px_35px_rgba(0,0,0,0.45)]
          `
          : `
            border-[#E7ECF3]
            bg-white/95

            shadow-[0_10px_30px_rgba(15,23,42,0.10)]
          `
      )}
    >
      <p
        className={cn(
          `
            mb-2

            text-[12px]
            font-semibold
          `,
          isDark
            ? 'text-white'
            : 'text-[#0F172A]'
        )}
      >
        {label}
      </p>

      <div className="space-y-2">
        {payload.map((item: any) => (
          <div
            key={item.dataKey}
            className="
              flex
              items-center
              gap-2
            "
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{
                background: item.fill,
              }}
            />

            <span
              className={cn(
                `
                  text-[11px]
                `,
                isDark
                  ? 'text-zinc-400'
                  : 'text-slate-500'
              )}
            >
              {item.dataKey === 'pedidos'
                ? 'Pedidos'
                : 'Entregados'}
            </span>

            <span
              className={cn(
                `
                  ml-auto

                  text-[11px]
                  font-semibold
                `,
                isDark
                  ? 'text-white'
                  : 'text-[#0F172A]'
              )}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                              PRODUCTION CHART                              */
/* -------------------------------------------------------------------------- */

const ProductionChart = () => {
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 14,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      className={cn(
        `
          relative
          overflow-hidden

          rounded-[28px]

          border

          p-6

          backdrop-blur-2xl

          transition-all
          duration-300
        `,
        isDark
          ? `
            border-white/[0.06]
            bg-[#0F1117]/92

            shadow-[0_12px_40px_rgba(0,0,0,0.35)]
          `
          : `
            border-[#E8EDF5]
            bg-white

            shadow-[0_8px_30px_rgba(15,23,42,0.06)]
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

      {/* GLOW */}

      <div
        className="
          pointer-events-none

          absolute
          right-[-60px]
          top-[-60px]

          h-48
          w-48

          rounded-full

          bg-blue-500/10

          blur-3xl
        "
      />

      {/* HEADER */}

      <div
        className="
          relative
          z-10

          mb-6

          flex
          items-start
          justify-between
          gap-4
        "
      >
        {/* LEFT */}

        <div className="flex items-center gap-4">
          <div
            className={cn(
              `
                relative

                flex
                h-14
                w-14
                items-center
                justify-center

                rounded-2xl
              `,
              isDark
                ? `
                  border
                  border-blue-500/10

                  bg-blue-500/10
                `
                : `
                  bg-blue-50
                `
            )}
          >
            <div
              className="
                absolute
                inset-0

                rounded-2xl

                bg-blue-500/10

                blur-xl
              "
            />

            <Activity
              size={24}
              className="
                relative
                z-10

                text-blue-500
              "
            />
          </div>

          <div>
            <h3
              className={cn(
                `
                  text-[16px]
                  font-semibold

                  tracking-[-0.03em]
                `,
                isDark
                  ? 'text-white'
                  : 'text-[#0F172A]'
              )}
            >
              Producción semanal
            </h3>

            <p
              className={cn(
                `
                  mt-1

                  text-[13px]
                `,
                isDark
                  ? 'text-zinc-500'
                  : 'text-slate-500'
              )}
            >
              Comparativa entre pedidos y entregas
            </p>
          </div>
        </div>

        {/* STATUS */}

        <div
          className={cn(
            `
              flex
              items-center
              gap-1.5

              rounded-full

              px-3
              py-1.5

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

          +14%
        </div>
      </div>

      {/* CHART */}

      <div className="relative z-10 h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={DATA}
            barGap={6}
            margin={{
              top: 10,
              right: 0,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke={
                isDark
                  ? 'rgba(255,255,255,0.05)'
                  : '#E5EAF1'
              }
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: isDark
                  ? '#71717A'
                  : '#64748B',
                fontFamily: 'Inter',
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: isDark
                  ? '#71717A'
                  : '#64748B',
                fontFamily: 'Inter',
              }}
            />

            <Tooltip
              cursor={{
                fill: isDark
                  ? 'rgba(255,255,255,0.03)'
                  : 'rgba(15,23,42,0.03)',
                radius: 10,
              }}
              content={<CustomTooltip />}
            />

            <Bar
              dataKey="pedidos"
              fill="#6366F1"
              radius={[8, 8, 0, 0]}
              maxBarSize={18}
            />

            <Bar
              dataKey="entregados"
              fill="#10B981"
              radius={[8, 8, 0, 0]}
              maxBarSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* FOOTER */}

      <div
        className={cn(
          `
            relative
            z-10

            mt-5
            pt-5

            flex
            items-center
            gap-6

            border-t
          `,
          isDark
            ? 'border-white/[0.06]'
            : 'border-[#EEF2F7]'
        )}
      >
        <div className="flex items-center gap-2">
          <span
            className="
              h-2.5
              w-2.5

              rounded-full

              bg-indigo-500
            "
          />

          <span
            className={cn(
              `
                text-[12px]
                font-medium
              `,
              isDark
                ? 'text-zinc-400'
                : 'text-slate-500'
            )}
          >
            Pedidos
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="
              h-2.5
              w-2.5

              rounded-full

              bg-emerald-500
            "
          />

          <span
            className={cn(
              `
                text-[12px]
                font-medium
              `,
              isDark
                ? 'text-zinc-400'
                : 'text-slate-500'
            )}
          >
            Entregados
          </span>
        </div>
      </div>
    </motion.section>
  );
};

export default ProductionChart;