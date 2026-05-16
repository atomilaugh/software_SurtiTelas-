import {
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  useLocation,
  useNavigate,
} from 'react-router-dom';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';

import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bell,
  Bike,
  Boxes,
  CheckCircle,
  Download,
  LayoutDashboard,
  Menu,
  Moon,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Sun,
  UserCircle,
  Users,
  Zap,
} from 'lucide-react';

import { cn } from '@/shared/utils';

import {
  useDashboardUIStore,
} from '../../store/dashboardUI.store';

import { useAuth } from '@presentation/contexts/AuthContext';

import { useTheme } from '@presentation/contexts/ThemeContext';

/* -------------------------------------------------------------------------- */
/*                                   CONFIG                                   */
/* -------------------------------------------------------------------------- */

const PAGES: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/inventario': 'Inventario',
  '/admin/pedidos': 'Pedidos',
  '/admin/clientes': 'Clientes',
  '/admin/domiciliarios': 'Domiciliarios',
  '/admin/analytics': 'Analytics',
  '/admin/users': 'Usuarios',
  '/admin/configuracion': 'Configuración',
};

const CMD_ITEMS = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    path: '/admin/dashboard',
    group: 'Páginas',
  },
  {
    icon: Boxes,
    label: 'Inventario',
    path: '/admin/inventario',
    group: 'Páginas',
  },
  {
    icon: ShoppingCart,
    label: 'Pedidos',
    path: '/admin/pedidos',
    group: 'Páginas',
  },
  {
    icon: UserCircle,
    label: 'Clientes',
    path: '/admin/clientes',
    group: 'Páginas',
  },
  {
    icon: Bike,
    label: 'Domiciliarios',
    path: '/admin/domiciliarios',
    group: 'Páginas',
  },
  {
    icon: BarChart3,
    label: 'Analytics',
    path: '/admin/analytics',
    group: 'Páginas',
  },
  {
    icon: Users,
    label: 'Usuarios',
    path: '/admin/users',
    group: 'Sistema',
  },
  {
    icon: Settings,
    label: 'Configuración',
    path: '/admin/configuracion',
    group: 'Sistema',
  },
];

const NOTIFS = [
  {
    id: 1,
    icon: AlertTriangle,
    title: 'Stock bajo',
    desc: 'Camiseta Polo — 8 uds.',
    time: '5m',
    color: 'amber',
    unread: true,
  },
  {
    id: 2,
    icon: Package,
    title: 'Nuevo pedido',
    desc: 'SC-2024-0007 · $189k',
    time: '12m',
    color: 'blue',
    unread: true,
  },
  {
    id: 3,
    icon: CheckCircle,
    title: 'Pedido entregado',
    desc: 'SC-2024-0001',
    time: '1h',
    color: 'emerald',
    unread: false,
  },
  {
    id: 4,
    icon: Zap,
    title: 'Reporte generado',
    desc: 'Ventas mensuales',
    time: '2h',
    color: 'violet',
    unread: false,
  },
];

/* -------------------------------------------------------------------------- */
/*                                UI HELPERS                                  */
/* -------------------------------------------------------------------------- */

const glass =
  'border border-white/[0.06] bg-white/[0.04] backdrop-blur-xl';

const iconButton = (dark: boolean) =>
  cn(
    `
      relative
      flex
      h-11
      w-11
      items-center
      justify-center

      rounded-2xl

      transition-all
      duration-300

      active:scale-[0.96]
    `,
    dark
      ? `
        border border-white/[0.06]
        bg-white/[0.03]
        text-zinc-300

        hover:bg-white/[0.06]
      `
      : `
        border border-slate-200
        bg-white
        text-slate-700

        hover:bg-slate-100
      `
  );

/* -------------------------------------------------------------------------- */
/*                             COMMAND PALETTE                                */
/* -------------------------------------------------------------------------- */

const CommandPalette = memo(
  ({
    open,
    onClose,
  }: {
    open: boolean;
    onClose: () => void;
  }) => {
    const navigate = useNavigate();

    const { theme } = useTheme();

    const dark = theme === 'dark';

    const inputRef =
      useRef<HTMLInputElement>(null);

    const [query, setQuery] =
      useState('');

    const [selected, setSelected] =
      useState(0);

    const filtered = useMemo(() => {
      return CMD_ITEMS.filter((item) =>
        item.label
          .toLowerCase()
          .includes(
            query.toLowerCase()
          )
      );
    }, [query]);

    useEffect(() => {
      if (!open) return;

      setQuery('');
      setSelected(0);

      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }, [open]);

    useEffect(() => {
      const handle = (
        e: KeyboardEvent
      ) => {
        if (!open) return;

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();

            setSelected((p) =>
              Math.min(
                p + 1,
                filtered.length - 1
              )
            );
            break;

          case 'ArrowUp':
            e.preventDefault();

            setSelected((p) =>
              Math.max(p - 1, 0)
            );
            break;

          case 'Escape':
            onClose();
            break;

          case 'Enter':
            if (!filtered[selected])
              return;

            navigate(
              filtered[selected].path
            );

            onClose();
            break;
        }
      };

      window.addEventListener(
        'keydown',
        handle
      );

      return () =>
        window.removeEventListener(
          'keydown',
          handle
        );
    }, [
      filtered,
      navigate,
      onClose,
      open,
      selected,
    ]);

    return (
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onClose}
            className="
              fixed
              inset-0
              z-[200]

              flex
              justify-center

              bg-black/50
              px-4
              pt-[12vh]
              backdrop-blur-md
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
                y: -20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: -20,
              }}
              transition={{
                duration: 0.2,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              className={cn(
                `
                  h-fit
                  w-full
                  max-w-[620px]

                  overflow-hidden

                  rounded-[28px]

                  shadow-2xl
                `,
                glass,
                dark
                  ? 'bg-[#090909]'
                  : 'bg-white'
              )}
            >
              <div
                className="
                  flex
                  items-center
                  gap-4

                  border-b
                  border-white/[0.06]

                  px-5
                  py-4
                "
              >
                <Search
                  size={18}
                  className="
                    text-slate-400
                  "
                />

                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) =>
                    setQuery(
                      e.target.value
                    )
                  }
                  placeholder="Buscar módulos..."
                  className="
                    flex-1
                    bg-transparent
                    text-sm
                    outline-none
                  "
                />

                <kbd
                  className="
                    rounded-lg
                    border
                    border-white/[0.06]
                    bg-white/[0.04]

                    px-2
                    py-1

                    text-[10px]
                    text-slate-400
                  "
                >
                  ESC
                </kbd>
              </div>

              <div
                className="
                  max-h-[420px]
                  overflow-y-auto
                  p-2
                "
              >
                {filtered.map(
                  (item, index) => {
                    const Icon =
                      item.icon;

                    const active =
                      index === selected;

                    return (
                      <button
                        key={item.path}
                        onClick={() => {
                          navigate(
                            item.path
                          );

                          onClose();
                        }}
                        onMouseEnter={() =>
                          setSelected(
                            index
                          )
                        }
                        className={cn(
                          `
                            flex
                            w-full
                            items-center
                            gap-4

                            rounded-2xl

                            px-4
                            py-3

                            transition-all
                            duration-200
                          `,
                          active
                            ? dark
                              ? 'bg-white/[0.06]'
                              : 'bg-slate-100'
                            : 'hover:bg-white/[0.04]'
                        )}
                      >
                        <div
                          className="
                            flex
                            h-11
                            w-11
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
                          />
                        </div>

                        <span
                          className="
                            flex-1
                            text-left
                            text-sm
                            font-medium
                          "
                        >
                          {item.label}
                        </span>

                        {active && (
                          <ArrowRight
                            size={16}
                            className="
                              text-slate-400
                            "
                          />
                        )}
                      </button>
                    );
                  }
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

CommandPalette.displayName =
  'CommandPalette';

/* -------------------------------------------------------------------------- */
/*                                   HEADER                                   */
/* -------------------------------------------------------------------------- */

const Header = () => {
  const location =
    useLocation();

  const { user } = useAuth();

  const {
    theme,
    toggleTheme,
  } = useTheme();

  const dark =
    theme === 'dark';

  const {
    toggleSidebar,
  } = useDashboardUIStore();

  const [cmdOpen, setCmdOpen] =
    useState(false);

  const [notifOpen, setNotifOpen] =
    useState(false);

  const unread = useMemo(
    () =>
      NOTIFS.filter(
        (n) => n.unread
      ).length,
    []
  );

  const page =
    PAGES[
      location.pathname
    ] ?? 'Panel';

  useEffect(() => {
    const handle = (
      e: KeyboardEvent
    ) => {
      if (
        (e.metaKey || e.ctrlKey) &&
        e.key.toLowerCase() === 'k'
      ) {
        e.preventDefault();

        setCmdOpen((p) => !p);
      }

      if (e.key === 'Escape') {
        setNotifOpen(false);
      }
    };

    window.addEventListener(
      'keydown',
      handle
    );

    return () =>
      window.removeEventListener(
        'keydown',
        handle
      );
  }, []);

  return (
    <>
      <CommandPalette
        open={cmdOpen}
        onClose={() =>
          setCmdOpen(false)
        }
      />

      <header
        className={cn(
          `
            sticky
            top-0
            z-40

            flex
            h-[78px]
            items-center
            gap-4

            border-b

            px-4
            md:px-6
            xl:px-8
          `,
          dark
            ? `
              border-white/[0.06]
              bg-[#050505]/80
            `
            : `
              border-slate-200
              bg-white/80
            `
        )}
        style={{
          backdropFilter:
            'blur(18px)',
        }}
      >
        {/* LEFT */}

        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <button
            onClick={toggleSidebar}
            className={cn(
              iconButton(dark),
              'xl:hidden'
            )}
          >
            <Menu size={18} />
          </button>

          <div>
            <p
              className="
                text-[11px]
                font-medium
                uppercase
                tracking-[0.18em]

                text-slate-400
              "
            >
              Enterprise ERP
            </p>

            <h1
              className={cn(
                `
                  text-[22px]
                  font-semibold
                  tracking-[-0.04em]
                `,
                dark
                  ? 'text-white'
                  : 'text-slate-900'
              )}
            >
              {page}
            </h1>
          </div>
        </div>

        {/* SEARCH */}

        <div
          className="
            hidden
            flex-1
            justify-center
            md:flex
          "
        >
          <button
            onClick={() =>
              setCmdOpen(true)
            }
            className={cn(
              `
                flex
                h-12
                w-full
                max-w-[520px]
                items-center
                gap-3

                rounded-2xl

                px-4

                transition-all
                duration-300
              `,
              glass
            )}
          >
            <Search
              size={16}
              className="
                text-slate-400
              "
            />

            <span
              className="
                flex-1
                text-left
                text-sm
                text-slate-400
              "
            >
              Buscar módulos,
              pedidos o usuarios...
            </span>

            <kbd
              className="
                rounded-lg
                border
                border-white/[0.06]
                bg-white/[0.04]

                px-2
                py-1

                text-[11px]
                text-slate-400
              "
            >
              ⌘ K
            </kbd>
          </button>
        </div>

        {/* RIGHT */}

        <div
          className="
            ml-auto
            flex
            items-center
            gap-2
          "
        >
          <button
            onClick={toggleTheme}
            className={iconButton(dark)}
          >
            {dark ? (
              <Sun size={17} />
            ) : (
              <Moon size={17} />
            )}
          </button>

          <div className="relative">
            <button
              onClick={() =>
                setNotifOpen(
                  (p) => !p
                )
              }
              className={iconButton(dark)}
            >
              <Bell size={17} />

              {unread > 0 && (
                <span
                  className="
                    absolute
                    right-2
                    top-2

                    h-2.5
                    w-2.5

                    rounded-full
                    bg-red-500
                  "
                />
              )}
            </button>
          </div>

          <button
            className={cn(
              `
                hidden
                items-center
                gap-2

                rounded-2xl

                px-4
                py-3

                text-sm
                font-semibold

                transition-all
                duration-300

                sm:flex
              `,
              glass
            )}
          >
            <Download size={16} />
            Exportar
          </button>

          <div
            className={cn(
              `
                flex
                items-center
                gap-3

                rounded-2xl

                px-2
                py-2
              `,
              glass
            )}
          >
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

                font-bold
                text-black
              "
            >
              {user?.email?.[0]?.toUpperCase() ??
                'A'}
            </div>

            <div className="hidden lg:block">
              <p
                className="
                  text-sm
                  font-semibold
                "
              >
                {user?.role ??
                  'Administrador'}
              </p>

              <p
                className="
                  text-[12px]
                  text-slate-400
                "
              >
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default memo(Header);