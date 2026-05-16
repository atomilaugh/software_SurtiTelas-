import {
  memo,
} from 'react';

import {
  motion,
} from 'framer-motion';

import {
  Activity,
  Sparkles,
} from 'lucide-react';

import SalesLineChart from './SalesLineChart';

import AlertsPanel from '../alerts/AlertsPanel';

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
            Business Intelligence
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
          Analytics Overview
        </h2>

        <p
          className="
            mt-1

            max-w-[680px]

            text-[14px]
            leading-relaxed

            text-[#71717A]
          "
        >
          Monitoreo avanzado de
          ventas, comportamiento
          operativo y métricas
          estratégicas en tiempo
          real.
        </p>
      </div>

      {/* RIGHT */}

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
            items-center
            gap-2

            rounded-2xl

            border
            border-emerald-500/15

            bg-emerald-500/10

            px-4
            py-2.5

            backdrop-blur-xl
          "
        >
          <div
            className="
              relative
              flex
              items-center
              justify-center
            "
          >
            <span
              className="
                absolute

                h-2.5
                w-2.5

                animate-ping

                rounded-full

                bg-emerald-400/50
              "
            />

            <span
              className="
                relative

                h-2.5
                w-2.5

                rounded-full

                bg-emerald-400
              "
            />
          </div>

          <span
            className="
              text-[12px]
              font-semibold

              text-emerald-300
            "
          >
            Sistema operativo
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
            Actualización en vivo
          </span>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                              ANALYTICS GRID                                */
/* -------------------------------------------------------------------------- */

const AnalyticsGrid = () => {
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
      {/* BACKGROUND EFFECTS */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          overflow-hidden
        "
      >
        {/* TOP RIGHT GLOW */}

        <div
          className="
            absolute
            -top-28
            right-[-80px]

            h-[340px]
            w-[340px]

            rounded-full

            bg-cyan-500/5

            blur-3xl
          "
        />

        {/* BOTTOM LEFT GLOW */}

        <div
          className="
            absolute
            bottom-[-80px]
            left-[-60px]

            h-[280px]
            w-[280px]

            rounded-full

            bg-violet-500/5

            blur-3xl
          "
        />

        {/* CENTER LIGHT */}

        <div
          className="
            absolute
            left-1/2
            top-0

            h-[420px]
            w-[420px]

            -translate-x-1/2

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
          variants={itemVariants}
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
          {/* MAIN CHART */}

          <motion.div
            variants={itemVariants}
            className={cn(
              `
                min-w-0

                xl:col-span-8
                2xl:col-span-9
              `
            )}
          >
            <div
              className="
                relative

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

              {/* INNER GLOW */}

              <div
                className="
                  pointer-events-none

                  absolute
                  inset-0

                  bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_50%)]
                "
              />

              <div
                className="
                  relative
                  z-10
                "
              >
                <SalesLineChart />
              </div>
            </div>
          </motion.div>

          {/* ALERTS */}

          <motion.div
            variants={itemVariants}
            className={cn(
              `
                min-w-0

                xl:col-span-4
                2xl:col-span-3
              `
            )}
          >
            <div
              className="
                relative

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

              {/* SIDE GLOW */}

              <div
                className="
                  pointer-events-none

                  absolute
                  right-0
                  top-0

                  h-44
                  w-44

                  rounded-full

                  bg-orange-500/5

                  blur-3xl
                "
              />

              <div
                className="
                  relative
                  z-10
                "
              >
                <AlertsPanel />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default memo(
  AnalyticsGrid
);