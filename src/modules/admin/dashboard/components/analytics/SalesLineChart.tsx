import { motion } from 'framer-motion';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

import {
  TrendingUp,
  MoreHorizontal,
} from 'lucide-react';

import { cn } from '@/shared/utils';

import { useTheme } from '@presentation/contexts/ThemeContext';

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

const DATA = [
  { month: 'Ene', ventas: 45000, meta: 50000 },
  { month: 'Feb', ventas: 52000, meta: 50000 },
  { month: 'Mar', ventas: 48000, meta: 49000 },
  { month: 'Abr', ventas: 61000, meta: 55000 },
  { month: 'May', ventas: 54000, meta: 55000 },
  { month: 'Jun', ventas: 68000, meta: 60000 },
];

/* -------------------------------------------------------------------------- */
/*                              CUSTOM TOOLTIP                                */
/* -------------------------------------------------------------------------- */

const CustomTooltip = ({
  active,
  payload,
  label,
}: any) => {
  const { theme } = useTheme();

  if (
    !active ||
    !payload ||
    !payload.length
  ) {
    return null;
  }

  const isDark =
    theme === 'dark';

  return (
    <div
      className={cn(
        `
          min-w-[180px]

          rounded-2xl
          border

          px-4
          py-3

          shadow-2xl
          backdrop-blur-xl
        `,
        isDark
          ? `
            border-white/[0.08]
            bg-[#111318]/95
          `
          : `
            border-[#E5E7EB]
            bg-white/95
          `
      )}
    >
      <p
        className={cn(
          `
            mb-3

            text-sm
            font-semibold
          `,
          isDark
            ? 'text-white'
            : 'text-[#111827]'
        )}
      >
        {label}
      </p>

      <div className="space-y-2">
        {payload.map(
          (
            item: any,
            index: number
          ) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    background:
                      item.color,
                  }}
                />

                <span
                  className={cn(
                    `
                      text-xs
                      font-medium
                    `,
                    isDark
                      ? 'text-zinc-300'
                      : 'text-slate-600'
                  )}
                >
                  {item.dataKey ===
                  'ventas'
                    ? 'Ventas'
                    : 'Meta'}
                </span>
              </div>

              <span
                className={cn(
                  `
                    text-sm
                    font-semibold
                    tabular-nums
                  `,
                  isDark
                    ? 'text-white'
                    : 'text-slate-900'
                )}
              >
                $
                {(
                  item.value / 1000
                ).toFixed(0)}
                k
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                              SALES CHART                                   */
/* -------------------------------------------------------------------------- */

const SalesLineChart = () => {
  const { theme } = useTheme();

  const isDark =
    theme === 'dark';

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
        duration: 0.35,
      }}
      className={cn(
        `
          relative
          overflow-hidden

          rounded-[30px]
          border

          px-7
          pt-6
          pb-5
        `,
        isDark
          ? `
            border-white/[0.06]
            bg-[#0E1016]

            shadow-[0_10px_40px_rgba(0,0,0,0.45)]
          `
          : `
            border-[#E7EAF0]
            bg-white

            shadow-[0_8px_30px_rgba(15,23,42,0.05)]
          `
      )}
    >
      {/* Ambient Glow */}

      <div
        className="
          pointer-events-none

          absolute
          right-[-120px]
          top-[-120px]

          h-[260px]
          w-[260px]

          rounded-full

          bg-indigo-500/10

          blur-3xl
        "
      />

      {/* Header */}

      <div
        className="
          relative
          z-10

          mb-8

          flex
          items-start
          justify-between
        "
      >
        {/* Left */}

        <div>
          <div className="flex items-center gap-3">
            <div
              className={cn(
                `
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center

                  rounded-2xl
                `,
                isDark
                  ? `
                    bg-indigo-500/10
                  `
                  : `
                    bg-indigo-50
                  `
              )}
            >
              <TrendingUp
                size={18}
                className="
                  text-indigo-500
                "
              />
            </div>

            <div>
              <h3
                className={cn(
                  `
                    text-[20px]
                    font-semibold
                    tracking-[-0.03em]
                  `,
                  isDark
                    ? 'text-white'
                    : 'text-slate-900'
                )}
              >
                Ventas mensuales
              </h3>

              <p
                className={cn(
                  `
                    mt-1
                    text-sm
                  `,
                  isDark
                    ? 'text-zinc-400'
                    : 'text-slate-500'
                )}
              >
                Rendimiento comercial del último semestre
              </p>
            </div>
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-3">
          <div
            className={cn(
              `
                rounded-xl

                px-3
                py-2

                text-sm
                font-semibold
              `,
              isDark
                ? `
                  bg-emerald-500/10
                  text-emerald-400
                `
                : `
                  bg-emerald-50
                  text-emerald-600
                `
            )}
          >
            +18.4%
          </div>

          <button
            className={cn(
              `
                flex
                h-10
                w-10
                items-center
                justify-center

                rounded-xl

                transition-all
                duration-200
              `,
              isDark
                ? `
                  bg-white/[0.04]
                  hover:bg-white/[0.08]
                `
                : `
                  bg-slate-100
                  hover:bg-slate-200
                `
            )}
          >
            <MoreHorizontal
              size={18}
            />
          </button>
        </div>
      </div>

      {/* Chart */}

      <div className="h-[320px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={DATA}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke={
                isDark
                  ? 'rgba(255,255,255,0.06)'
                  : '#EEF2F7'
              }
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: isDark
                  ? '#A1A1AA'
                  : '#64748B',
                fontWeight: 500,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: isDark
                  ? '#71717A'
                  : '#94A3B8',
              }}
              tickFormatter={(
                value
              ) =>
                `$${value / 1000}k`
              }
            />

            <Tooltip
              content={
                <CustomTooltip />
              }
              cursor={{
                stroke: isDark
                  ? '#FFFFFF15'
                  : '#CBD5E1',
                strokeWidth: 1,
              }}
            />

            {/* Meta */}

            <Line
              type="monotone"
              dataKey="meta"
              stroke="#10B981"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              activeDot={{
                r: 5,
              }}
            />

            {/* Ventas */}

            <Line
              type="monotone"
              dataKey="ventas"
              stroke="#6366F1"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                fill: '#6366F1',
                stroke:
                  isDark
                    ? '#0E1016'
                    : '#FFFFFF',
                strokeWidth: 3,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}

      <div
        className={cn(
          `
            mt-5

            flex
            items-center
            gap-6

            border-t
            pt-4
          `,
          isDark
            ? 'border-white/[0.06]'
            : 'border-[#EEF2F7]'
        )}
      >
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-indigo-500" />

          <span
            className={cn(
              `
                text-xs
                font-medium
              `,
              isDark
                ? 'text-zinc-400'
                : 'text-slate-500'
            )}
          >
            Ventas reales
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />

          <span
            className={cn(
              `
                text-xs
                font-medium
              `,
              isDark
                ? 'text-zinc-400'
                : 'text-slate-500'
            )}
          >
            Meta proyectada
          </span>
        </div>
      </div>
    </motion.section>
  );
};

export default SalesLineChart;