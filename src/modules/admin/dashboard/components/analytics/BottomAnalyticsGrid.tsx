import {
  memo,
} from 'react';

import {
  motion,
} from 'framer-motion';

import {
  Activity,
  PieChart,
  Factory,
  Sparkles,
} from 'lucide-react';

import CategoryPieChart from './CategoryPieChart';

import ProductionChart from './ProductionChart';

import { cn } from '@/shared/utils';

/* -------------------------------------------------------------------------- */
/*                               ANIMATIONS                                   */
/* -------------------------------------------------------------------------- */

const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
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
/*                              SECTION HEADER                                */
/* -------------------------------------------------------------------------- */

const SectionHeader = () => {
  return (
    <div
      className="
        relative
        z-10

        mb-6

        flex
        flex-col
        gap-4

        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      {/* LEFT */}

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
            py-1.5

            backdrop-blur-xl
          "
        >
          <Sparkles
            size={14}
            className="
              text-cyan-400
            "
          />

          <span
            className="
              text-[11px]
              font-semibold

              uppercase
              tracking-[0.18em]

              text-[#A1A1AA]
            "
          >
            Manufacturing Metrics
          </span>
        </div>

        <h2
          className="
            text-[28px]
            font-bold

            tracking-[-0.05em]

            text-white
          "
        >
          Production Analytics
        </h2>

        <p
          className="
            mt-1

            max-w-[720px]

            text-[14px]
            leading-relaxed

            text-[#71717A]
          "
        >
          Distribución de categorías,
          rendimiento operativo y
          análisis de producción en
          tiempo real para la toma de
          decisiones estratégicas.
        </p>
      </div>

      {/* RIGHT */}

      <div
        className="
          flex
          flex-wrap
          items-center
          gap-3
        "
      >
        <div
          className="
            flex
            items-center
            gap-2

            rounded-2xl

            border
            border-cyan-500/15

            bg-cyan-500/10

            px-4
            py-2.5

            backdrop-blur-xl
          "
        >
          <PieChart
            size={15}
            className="
              text-cyan-300
            "
          />

          <span
            className="
              text-[12px]
              font-semibold

              text-cyan-200
            "
          >
            Insights activos
          </span>
        </div>

        <div
          className="
            hidden
            items-center
            gap-2

            rounded-2xl

            border
            border-white/[0.06]

            bg-white/[0.03]

            px-4
            py-2.5

            backdrop-blur-xl

            lg:flex
          "
        >
          <Activity
            size={15}
            className="
              text-violet-400
            "
          />

          <span
            className="
              text-[12px]
              font-semibold

              text-[#D4D4D8]
            "
          >
            Datos sincronizados
          </span>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                           GLASSMORPHISM CARD                               */
/* -------------------------------------------------------------------------- */

const AnalyticsCard = ({
  children,
  glow,
  icon: Icon,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  glow: string;
  icon: any;
  title: string;
  subtitle: string;
}) => {
  return (
    <div
      className="
        relative

        h-full

        overflow-hidden

        rounded-[32px]

        border
        border-white/[0.06]

        bg-[#0D0D0D]/90

        shadow-[0_24px_60px_rgba(0,0,0,0.28)]

        backdrop-blur-2xl
      "
    >
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
          via-white/[0.12]
          to-transparent
        "
      />

      {/* GLOW */}

      <div
        className={cn(
          `
            pointer-events-none

            absolute
            right-0
            top-0

            h-48
            w-48

            rounded-full

            blur-3xl
          `,
          glow
        )}
      />

      {/* HEADER */}

      <div
        className="
          relative
          z-10

          flex
          items-start
          justify-between

          border-b
          border-white/[0.05]

          px-6
          py-5
        "
      >
        <div>
          <h3
            className="
              text-[16px]
              font-semibold

              tracking-[-0.03em]

              text-white
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-1

              text-[12px]

              text-[#71717A]
            "
          >
            {subtitle}
          </p>
        </div>

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center

            rounded-2xl

            border
            border-white/[0.06]

            bg-white/[0.04]
          "
        >
          <Icon
            size={18}
            className="
              text-white
            "
          />
        </div>
      </div>

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
        "
      >
        {children}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                         BOTTOM ANALYTICS GRID                              */
/* -------------------------------------------------------------------------- */

const BottomAnalyticsGrid =
  () => {
    return (
      <motion.section
        variants={
          containerVariants
        }
        initial="hidden"
        animate="visible"
        className="
          relative
          mt-8
        "
      >
        {/* AMBIENT LIGHTS */}

        <div
          className="
            pointer-events-none

            absolute
            inset-0

            overflow-hidden
          "
        >
          {/* LEFT */}

          <div
            className="
              absolute
              left-[20%]
              top-0

              h-[260px]
              w-[260px]

              rounded-full

              bg-cyan-500/5

              blur-3xl
            "
          />

          {/* RIGHT */}

          <div
            className="
              absolute
              bottom-[-60px]
              right-[-40px]

              h-[320px]
              w-[320px]

              rounded-full

              bg-violet-500/5

              blur-3xl
            "
          />

          {/* CENTER */}

          <div
            className="
              absolute
              left-1/2
              top-1/2

              h-[400px]
              w-[400px]

              -translate-x-1/2
              -translate-y-1/2

              rounded-full

              bg-white/[0.02]

              blur-3xl
            "
          />
        </div>

        {/* CONTENT */}

        <div className="relative z-10">
          {/* HEADER */}

          <motion.div
            variants={
              itemVariants
            }
          >
            <SectionHeader />
          </motion.div>

          {/* GRID */}

          <div
            className="
              grid
              grid-cols-1
              gap-6

              xl:grid-cols-12
            "
          >
            {/* PIE CHART */}

            <motion.div
              variants={
                itemVariants
              }
              className="
                min-w-0

                xl:col-span-4
              "
            >
              <AnalyticsCard
                glow="bg-cyan-500/10"
                icon={PieChart}
                title="Distribución de Categorías"
                subtitle="Participación y rendimiento por línea de producto"
              >
                <CategoryPieChart />
              </AnalyticsCard>
            </motion.div>

            {/* PRODUCTION */}

            <motion.div
              variants={
                itemVariants
              }
              className="
                min-w-0

                xl:col-span-8
              "
            >
              <AnalyticsCard
                glow="bg-violet-500/10"
                icon={Factory}
                title="Performance de Producción"
                subtitle="Seguimiento de eficiencia y volumen operativo"
              >
                <ProductionChart />
              </AnalyticsCard>
            </motion.div>
          </div>
        </div>
      </motion.section>
    );
  };

export default memo(
  BottomAnalyticsGrid
);