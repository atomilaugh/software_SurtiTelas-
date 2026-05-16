import {
  memo,
  ReactNode,
} from 'react';

import {
  NavLink,
} from 'react-router-dom';

import {
  ChevronRight,
} from 'lucide-react';

import {
  motion,
} from 'framer-motion';

import { cn } from '@/shared/utils';

interface SidebarItemProps {
  label: string;
  icon?: ReactNode;
  to?: string;
  active?: boolean;
  collapsed?: boolean;
  badge?: string | number;
  onClick?: () => void;
}

const SidebarItem = ({
  label,
  icon,
  to,
  active = false,
  collapsed = false,
  badge,
  onClick,
}: SidebarItemProps) => {
  const Component = to
    ? NavLink
    : 'button';

  return (
    <Component
      {...(to ? { to } : { onClick })}
      title={
        collapsed ? label : undefined
      }
      className={cn(
        `
          group
          relative

          flex
          items-center
          gap-3

          min-h-[60px]
          w-full

          overflow-hidden

          rounded-[20px]

          border
          border-transparent

          px-3
          py-2.5

          transition-all
          duration-300
          ease-out
        `,

        active
          ? `
            border-white/[0.06]

            bg-gradient-to-br
            from-[#161616]
            via-[#191919]
            to-[#1D1D1D]

            shadow-[0_10px_28px_rgba(0,0,0,0.24)]
          `
          : `
            hover:border-white/[0.04]
            hover:bg-white/[0.03]
          `,

        collapsed &&
          `
            mx-auto
            h-[60px]
            w-[60px]

            justify-center

            px-0
          `
      )}
    >
      {/* ACTIVE BAR */}

      {active && (
        <motion.div
          layoutId="sidebar-item-indicator"
          className="
            absolute
            left-0
            top-1/2

            h-9
            w-[3px]

            -translate-y-1/2

            rounded-r-full

            bg-white
          "
        />
      )}

      {/* ICON */}

      {icon && (
        <div
          className={cn(
            `
              relative
              z-10

              flex
              items-center
              justify-center

              transition-all
              duration-300
            `,

            collapsed
              ? `
                h-10
                w-10

                rounded-full
              `
              : `
                h-11
                w-11

                rounded-[16px]
              `,

            active
              ? `
                border
                border-white/[0.06]

                bg-white/[0.05]
              `
              : `
                bg-white/[0.03]

                group-hover:bg-white/[0.05]
              `
          )}
        >
          <div
            className={cn(
              `
                transition-all
                duration-300
              `,
              active
                ? 'text-white'
                : `
                  text-[#8A8A8A]

                  group-hover:text-white
                `
            )}
          >
            {icon}
          </div>
        </div>
      )}

      {/* CONTENT */}

      {!collapsed && (
        <>
          <div
            className="
              relative
              z-10

              min-w-0
              flex-1
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
                className={cn(
                  `
                    truncate

                    text-[14px]
                    font-semibold

                    tracking-[-0.02em]

                    transition-colors
                    duration-300
                  `,
                  active
                    ? 'text-white'
                    : `
                      text-[#D1D1D1]

                      group-hover:text-white
                    `
                )}
              >
                {label}
              </span>

              {badge && (
                <div
                  className="
                    flex
                    h-5
                    min-w-[20px]
                    items-center
                    justify-center

                    rounded-full

                    bg-white/[0.06]

                    px-1.5

                    text-[10px]
                    font-bold

                    text-white
                  "
                >
                  {badge}
                </div>
              )}
            </div>
          </div>

          {/* CHEVRON */}

          <ChevronRight
            size={16}
            className={cn(
              `
                relative
                z-10

                transition-all
                duration-300
              `,
              active
                ? `
                  translate-x-0

                  text-white
                `
                : `
                  translate-x-[-4px]

                  text-[#5F5F5F]
                  opacity-0

                  group-hover:translate-x-0
                  group-hover:opacity-100
                `
            )}
          />
        </>
      )}

      {/* HOVER GLOW */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          opacity-0

          transition-opacity
          duration-500

          group-hover:opacity-100
        "
      >
        <div
          className="
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
      </div>
    </Component>
  );
};

export default memo(SidebarItem);