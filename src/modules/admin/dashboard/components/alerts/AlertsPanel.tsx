import {
  memo,
  useMemo,
  useState,
} from 'react';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';

import {
  ChevronDown,
  LogOut,
  Settings,
  ShieldCheck,
  UserCircle2,
} from 'lucide-react';

import {
  useAuth,
} from '@presentation/contexts/AuthContext';

import {
  useTheme,
} from '@presentation/contexts/ThemeContext';

import { cn } from '@/shared/utils';

const UserDropdown = () => {
  const {
    user,
    logout,
  } = useAuth();

  const { theme } =
    useTheme();

  const [open, setOpen] =
    useState(false);

  const isDark =
    theme === 'dark';

  const initials = useMemo(() => {
    return (
      user?.email?.[0]?.toUpperCase() ??
      'A'
    );
  }, [user]);

  return (
    <div className="relative">
      {/* TRIGGER */}

      <button
        onClick={() =>
          setOpen((v) => !v)
        }
        className={cn(
          `
            group

            flex
            items-center
            gap-3

            rounded-2xl

            border

            px-2.5
            py-2

            transition-all
            duration-300
          `,
          isDark
            ? `
              border-white/[0.06]
              bg-[#0E0E0E]

              hover:bg-[#151515]
            `
            : `
              border-slate-200
              bg-white

              hover:bg-slate-50
            `
        )}
      >
        {/* AVATAR */}

        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center

            rounded-2xl

            bg-gradient-to-br
            from-yellow-300
            to-amber-500

            text-sm
            font-bold

            text-black

            shadow-[0_6px_18px_rgba(234,179,8,0.25)]
          "
        >
          {initials}
        </div>

        {/* USER INFO */}

        <div className="hidden text-left lg:block">
          <p
            className={cn(
              `
                text-[13px]
                font-semibold

                tracking-[-0.02em]
              `,
              isDark
                ? 'text-white'
                : 'text-slate-900'
            )}
          >
            {user?.role ??
              'Administrador'}
          </p>

          <p
            className={cn(
              `
                max-w-[180px]
                truncate

                text-[11px]
              `,
              isDark
                ? 'text-zinc-500'
                : 'text-slate-500'
            )}
          >
            {user?.email ??
              'admin@surticamisetas.com'}
          </p>
        </div>

        {/* CHEVRON */}

        <motion.div
          animate={{
            rotate: open
              ? 180
              : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            `
              hidden
              lg:block
            `,
            isDark
              ? 'text-zinc-500'
              : 'text-slate-500'
          )}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      {/* DROPDOWN */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.96,
            }}
            transition={{
              duration: 0.18,
            }}
            className={cn(
              `
                absolute
                right-0
                top-[calc(100%+12px)]
                z-50

                w-[290px]

                overflow-hidden

                rounded-[24px]

                border

                shadow-[0_18px_50px_rgba(0,0,0,0.25)]

                backdrop-blur-2xl
              `,
              isDark
                ? `
                  border-white/[0.06]
                  bg-[#0B0B0B]/95
                `
                : `
                  border-slate-200
                  bg-white/95
                `
            )}
          >
            {/* HEADER */}

            <div
              className={cn(
                `
                  flex
                  items-center
                  gap-3

                  border-b

                  p-4
                `,
                isDark
                  ? 'border-white/[0.06]'
                  : 'border-slate-200'
              )}
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center

                  rounded-2xl

                  bg-gradient-to-br
                  from-yellow-300
                  to-amber-500

                  text-sm
                  font-bold

                  text-black
                "
              >
                {initials}
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    `
                      truncate

                      text-[14px]
                      font-semibold
                    `,
                    isDark
                      ? 'text-white'
                      : 'text-slate-900'
                  )}
                >
                  {user?.role ??
                    'Administrador'}
                </p>

                <p
                  className={cn(
                    `
                      truncate

                      text-[12px]
                    `,
                    isDark
                      ? 'text-zinc-500'
                      : 'text-slate-500'
                  )}
                >
                  {user?.email ??
                    'admin@surticamisetas.com'}
                </p>
              </div>

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center

                  rounded-2xl

                  border
                  border-emerald-500/20

                  bg-emerald-500/10

                  text-emerald-400
                "
              >
                <ShieldCheck
                  size={16}
                />
              </div>
            </div>

            {/* MENU */}

            <div className="p-2">
              {[
                {
                  label: 'Mi perfil',
                  icon:
                    UserCircle2,
                },

                {
                  label:
                    'Configuración',
                  icon: Settings,
                },
              ].map((item) => {
                const Icon =
                  item.icon;

                return (
                  <button
                    key={item.label}
                    className={cn(
                      `
                        group

                        flex
                        w-full
                        items-center
                        gap-3

                        rounded-2xl

                        px-3
                        py-3

                        transition-all
                        duration-300
                      `,
                      isDark
                        ? `
                          hover:bg-white/[0.04]
                        `
                        : `
                          hover:bg-slate-100
                        `
                    )}
                  >
                    <div
                      className={cn(
                        `
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center

                          rounded-xl

                          transition-all
                          duration-300
                        `,
                        isDark
                          ? `
                            bg-white/[0.04]

                            group-hover:bg-white/[0.06]
                          `
                          : `
                            bg-slate-100

                            group-hover:bg-white
                          `
                      )}
                    >
                      <Icon
                        size={16}
                        className={cn(
                          isDark
                            ? 'text-zinc-400'
                            : 'text-slate-600'
                        )}
                      />
                    </div>

                    <span
                      className={cn(
                        `
                          text-[13px]
                          font-medium
                        `,
                        isDark
                          ? 'text-white'
                          : 'text-slate-800'
                      )}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* FOOTER */}

            <div
              className={cn(
                `
                  border-t
                  p-2
                `,
                isDark
                  ? 'border-white/[0.06]'
                  : 'border-slate-200'
              )}
            >
              <button
                onClick={logout}
                className={cn(
                  `
                    group

                    flex
                    w-full
                    items-center
                    gap-3

                    rounded-2xl

                    px-3
                    py-3

                    transition-all
                    duration-300
                  `,
                  isDark
                    ? `
                      text-red-400

                      hover:bg-red-500/10
                    `
                    : `
                      text-red-600

                      hover:bg-red-50
                    `
                )}
              >
                <div
                  className={cn(
                    `
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center

                      rounded-xl
                    `,
                    isDark
                      ? `
                        bg-red-500/10
                      `
                      : `
                        bg-red-100
                      `
                  )}
                >
                  <LogOut size={16} />
                </div>

                <span
                  className="
                    text-[13px]
                    font-semibold
                  "
                >
                  Cerrar sesión
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(UserDropdown);