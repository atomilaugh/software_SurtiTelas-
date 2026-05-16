import {
  memo,
  ReactNode,
} from 'react';

import Sidebar from './Sidebar';
import Header from './Header';

import {
  useDashboardUIStore,
} from '../../store/dashboardUI.store';

import {
  useTheme,
} from '@presentation/contexts/ThemeContext';

import { cn } from '@/shared/utils';

interface Props {
  children: ReactNode;
}

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const workspaceTransition = `
  transition-[margin]
  duration-300
  ease-[cubic-bezier(0.22,1,0.36,1)]
`;

const DashboardLayout = ({
  children,
}: Props) => {
  const { sidebarOpen } =
    useDashboardUIStore();

  const { theme } =
    useTheme();

  const dark =
    theme === 'dark';

  return (
    <div
      className={cn(
        `
          relative
          min-h-screen
          overflow-hidden
        `,
        dark
          ? `
            bg-[#050505]
            text-white
          `
          : `
            bg-[#F4F7FB]
            text-slate-900
          `
      )}
    >
      {/* ------------------------------------------------------------------ */}
      {/* BACKGROUND EFFECTS */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        {/* TOP GLOW */}

        <div
          className={cn(
            `
              absolute
              left-[-120px]
              top-[-120px]

              h-[320px]
              w-[320px]

              rounded-full

              blur-[120px]
            `,
            dark
              ? `
                bg-violet-500/10
              `
              : `
                bg-blue-400/20
              `
          )}
        />

        {/* RIGHT GLOW */}

        <div
          className={cn(
            `
              absolute
              right-[-140px]
              top-[20%]

              h-[300px]
              w-[300px]

              rounded-full

              blur-[130px]
            `,
            dark
              ? `
                bg-cyan-500/10
              `
              : `
                bg-indigo-300/20
              `
          )}
        />

        {/* GRID */}

        <div
          className={cn(
            `
              absolute
              inset-0
              opacity-[0.035]
            `,
            dark
              ? `
                [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)]
              `
              : `
                [background-image:linear-gradient(rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.08)_1px,transparent_1px)]
              `,
            `
              [background-size:44px_44px]
            `
          )}
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* SIDEBAR */}
      {/* ------------------------------------------------------------------ */}

      <Sidebar />

      {/* ------------------------------------------------------------------ */}
      {/* WORKSPACE */}
      {/* ------------------------------------------------------------------ */}

      <div
        className={cn(
          `
            relative
            z-10

            min-h-screen
          `,
          workspaceTransition,
          sidebarOpen
            ? 'lg:ml-[280px]'
            : 'lg:ml-[96px]'
        )}
      >
        {/* ------------------------------------------------------------------ */}
        {/* HEADER */}
        {/* ------------------------------------------------------------------ */}

        <Header />

        {/* ------------------------------------------------------------------ */}
        {/* MAIN */}
        {/* ------------------------------------------------------------------ */}

        <main
          className="
            relative

            px-4
            py-5

            md:px-6
            md:py-6

            xl:px-8
            xl:py-7
          "
        >
          {/* ------------------------------------------------------------------ */}
          {/* CONTENT WRAPPER */}
          {/* ------------------------------------------------------------------ */}

          <div
            className="
              mx-auto
              w-full
              max-w-[1800px]
            "
          >
            {/* ------------------------------------------------------------------ */}
            {/* CONTENT SURFACE */}
            {/* ------------------------------------------------------------------ */}

            <div
              className={cn(
                `
                  relative
                  overflow-hidden

                  rounded-[32px]

                  border

                  p-4

                  shadow-[0_10px_60px_rgba(0,0,0,0.08)]

                  md:p-5
                  xl:p-6
                `,
                dark
                  ? `
                    border-white/[0.06]
                    bg-white/[0.03]

                    backdrop-blur-xl
                  `
                  : `
                    border-white/70
                    bg-white/80

                    backdrop-blur-xl
                  `
              )}
            >
              {/* INNER GLOW */}

              <div
                className={cn(
                  `
                    pointer-events-none
                    absolute
                    inset-0
                    rounded-[32px]
                  `,
                  dark
                    ? `
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]
                    `
                    : `
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]
                    `
                )}
              />

              {/* CONTENT */}

              <div
                className="
                  relative
                  z-10

                  space-y-6
                "
              >
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default memo(DashboardLayout);