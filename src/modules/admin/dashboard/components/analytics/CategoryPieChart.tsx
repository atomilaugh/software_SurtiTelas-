import {
  memo,
  useMemo,
} from 'react';

import {
  motion,
} from 'framer-motion';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import {
  Sparkles,
  Tag,
  TrendingUp,
  Layers3,
} from 'lucide-react';

import { cn } from '@/shared/utils';

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

const DATA = [
  {
    name: 'Camisetas',
    pct: 35,
    color: '#6366F1',
  },

  {
    name: 'Pantalones',
    pct: 25,
    color: '#8B5CF6',
  },

  {
    name: 'Vestidos',
    pct: 18,
    color: '#A78BFA',
  },

  {
    name: 'Chaquetas',
    pct: 12,
    color: '#C4B5FD',
  },

  {
    name: 'Accesorios',
    pct: 10,
    color: '#DDD6FE',
  },
];

/* -------------------------------------------------------------------------- */
/*                                CALCULATIONS                                */
/* -------------------------------------------------------------------------- */

const totalSales = DATA.reduce(
  (acc, item) =>
    acc + item.pct,
  0
);

const topCategory =
  DATA[0];

/* -------------------------------------------------------------------------- */
/*                                ANIMATIONS                                  */
/* -------------------------------------------------------------------------- */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* -------------------------------------------------------------------------- */
/*                              CUSTOM TOOLTIP                                */
/* -------------------------------------------------------------------------- */

const CustomTooltip = ({
  active,
  payload,
}: any) => {
  if (
    !active ||
    !payload?.length
  ) {
    return null;
  }

  const item = payload[0];

  return (
    <div
      className="
        rounded-[22px]

        border
        border-white/[0.08]

        bg-[#11131A]/95

        px-4
        py-3

        shadow-[0_12px_40px_rgba(0,0,0,0.35)]

        backdrop-blur-2xl
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        <span
          className="
            h-2.5
            w-2.5

            rounded-full
          "
          style={{
            background:
              item.payload.color,
          }}
        />

        <p
          className="
            text-sm
            font-semibold

            text-zinc-100
          "
        >
          {item.name}
        </p>
      </div>

      <p
        className="
          mt-1

          text-xs

          text-zinc-400
        "
      >
        {item.value}% del total
        de ventas
      </p>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                              LEGEND ITEM                                   */
/* -------------------------------------------------------------------------- */

const LegendItem = ({
  item,
  index,
}: {
  item: (typeof DATA)[0];
  index: number;
}) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{
        delay:
          index * 0.06,
      }}
      className="
        group
        relative

        overflow-hidden

        rounded-[24px]

        border
        border-white/[0.05]

        bg-white/[0.02]

        p-4

        transition-all
        duration-300

        hover:border-white/[0.08]
        hover:bg-white/[0.04]
      "
    >
      {/* HOVER GLOW */}

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
        style={{
          background: `radial-gradient(circle at right, ${item.color}18, transparent 55%)`,
        }}
      />

      <div
        className="
          relative
          z-10
        "
      >
        {/* TOP */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-3
          "
        >
          <div
            className="
              flex
              items-center
              gap-3

              min-w-0
            "
          >
            {/* COLOR */}

            <div
              className="
                relative

                flex
                h-11
                w-11
                items-center
                justify-center

                rounded-2xl
              "
              style={{
                background: `${item.color}15`,
              }}
            >
              <div
                className="
                  h-3
                  w-3

                  rounded-full
                "
                style={{
                  background:
                    item.color,
                }}
              />
            </div>

            {/* LABEL */}

            <div className="min-w-0">
              <p
                className="
                  truncate

                  text-[14px]
                  font-semibold

                  text-white
                "
              >
                {item.name}
              </p>

              <p
                className="
                  mt-0.5

                  text-[11px]

                  text-zinc-500
                "
              >
                Participación en
                ventas
              </p>
            </div>
          </div>

          {/* VALUE */}

          <div
            className="
              text-right
            "
          >
            <p
              className="
                text-[18px]
                font-bold

                tracking-[-0.04em]

                text-white
              "
            >
              {item.pct}%
            </p>
          </div>
        </div>

        {/* PROGRESS */}

        <div
          className="
            mt-4

            h-2

            overflow-hidden

            rounded-full

            bg-white/[0.05]
          "
        >
          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: `${item.pct}%`,
            }}
            transition={{
              duration: 0.9,
              delay:
                0.2 +
                index * 0.08,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="
              h-full

              rounded-full
            "
            style={{
              background:
                item.color,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/*                           CATEGORY PIE CHART                               */
/* -------------------------------------------------------------------------- */

const CategoryPieChart =
  () => {
    const categoryCount =
      useMemo(
        () => DATA.length,
        []
      );

    return (
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="
          relative

          overflow-hidden

          rounded-[34px]

          border
          border-white/[0.06]

          bg-[#0D0D0D]/92

          p-6

          shadow-[0_18px_60px_rgba(0,0,0,0.35)]

          backdrop-blur-2xl
        "
      >
        {/* AMBIENT LIGHT */}

        <div
          className="
            pointer-events-none

            absolute
            inset-0

            bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.10),transparent_40%)]
          "
        />

        <div
          className="
            pointer-events-none

            absolute
            bottom-[-80px]
            left-[-60px]

            h-[220px]
            w-[220px]

            rounded-full

            bg-indigo-500/5

            blur-3xl
          "
        />

        {/* TOP SHINE */}

        <div
          className="
            pointer-events-none

            absolute
            inset-x-0
            top-0

            h-px

            bg-gradient-to-r
            from-transparent
            via-white/[0.10]
            to-transparent
          "
        />

        {/* HEADER */}

        <div
          className="
            relative
            z-10

            mb-8

            flex
            items-start
            justify-between
            gap-4
          "
        >
          {/* LEFT */}

          <div
            className="
              flex
              items-start
              gap-4
            "
          >
            <div
              className="
                relative

                flex
                h-14
                w-14
                items-center
                justify-center

                rounded-[22px]

                border
                border-violet-500/20

                bg-violet-500/10
              "
            >
              <div
                className="
                  absolute
                  inset-0

                  rounded-[22px]

                  bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]
                "
              />

              <Tag
                size={20}
                className="
                  relative
                  z-10

                  text-violet-300
                "
              />
            </div>

            <div>
              <div
                className="
                  mb-2

                  inline-flex
                  items-center
                  gap-2

                  rounded-full

                  border
                  border-white/[0.06]

                  bg-white/[0.03]

                  px-3
                  py-1
                "
              >
                <Sparkles
                  size={12}
                  className="
                    text-violet-300
                  "
                />

                <span
                  className="
                    text-[10px]
                    font-semibold

                    uppercase
                    tracking-[0.18em]

                    text-zinc-400
                  "
                >
                  Category Insights
                </span>
              </div>

              <h3
                className="
                  text-[18px]
                  font-semibold

                  tracking-[-0.03em]

                  text-white
                "
              >
                Ventas por categoría
              </h3>

              <p
                className="
                  mt-1

                  text-[13px]

                  text-zinc-500
                "
              >
                Distribución de
                ingresos del catálogo
              </p>
            </div>
          </div>

          {/* RIGHT */}

          <div
            className="
              hidden

              rounded-2xl

              border
              border-white/[0.06]

              bg-white/[0.03]

              px-4
              py-3

              backdrop-blur-xl

              sm:block
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <Layers3
                size={15}
                className="
                  text-violet-300
                "
              />

              <span
                className="
                  text-[12px]
                  font-semibold

                  text-zinc-300
                "
              >
                {categoryCount}{' '}
                categorías
              </span>
            </div>
          </div>
        </div>

        {/* CONTENT */}

        <div
          className="
            relative
            z-10

            flex
            flex-col
            gap-8

            xl:flex-row
          "
        >
          {/* CHART */}

          <div
            className="
              relative

              flex
              items-center
              justify-center

              xl:w-[250px]
            "
          >
            {/* INNER GLOW */}

            <div
              className="
                absolute

                h-40
                w-40

                rounded-full

                bg-violet-500/10

                blur-3xl
              "
            />

            {/* CHART */}

            <div
              className="
                relative

                h-[240px]
                w-[240px]
              "
            >
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={DATA}
                    dataKey="pct"
                    cx="50%"
                    cy="50%"
                    innerRadius={
                      70
                    }
                    outerRadius={
                      94
                    }
                    paddingAngle={4}
                    strokeWidth={0}
                  >
                    {DATA.map(
                      (item) => (
                        <Cell
                          key={
                            item.name
                          }
                          fill={
                            item.color
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip
                    content={
                      <CustomTooltip />
                    }
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* CENTER */}

              <div
                className="
                  absolute
                  inset-0

                  flex
                  flex-col
                  items-center
                  justify-center
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-1
                  "
                >
                  <TrendingUp
                    size={18}
                    className="
                      text-emerald-400
                    "
                  />

                  <span
                    className="
                      text-[34px]
                      font-bold

                      tracking-[-0.05em]

                      text-white
                    "
                  >
                    {totalSales}%
                  </span>
                </div>

                <span
                  className="
                    mt-1

                    text-[12px]

                    text-zinc-500
                  "
                >
                  Total ventas
                </span>

                <div
                  className="
                    mt-3

                    rounded-full

                    border
                    border-emerald-500/15

                    bg-emerald-500/10

                    px-3
                    py-1
                  "
                >
                  <span
                    className="
                      text-[10px]
                      font-semibold

                      uppercase
                      tracking-[0.16em]

                      text-emerald-300
                    "
                  >
                    Top:{' '}
                    {
                      topCategory.name
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* LEGEND */}

          <div
            className="
              flex-1

              space-y-3
            "
          >
            {DATA.map(
              (
                item,
                index
              ) => (
                <LegendItem
                  key={
                    item.name
                  }
                  item={item}
                  index={index}
                />
              )
            )}
          </div>
        </div>
      </motion.section>
    );
  };

export default memo(
  CategoryPieChart
);