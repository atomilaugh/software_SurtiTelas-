import {
  memo,
  useEffect,
  useState,
} from 'react';

import {
  NavLink,
  useLocation,
} from 'react-router-dom';

import {
  motion,
  AnimatePresence,
} from 'framer-motion';

import {
  LucideIcon,
  LayoutDashboard,
  Settings,
  ChevronDown,
  Users,
  Boxes,
  Factory,
  ShoppingCart,
  BarChart3,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

import { cn } from '@/shared/utils';

import { useDashboardUIStore } from '../../store/dashboardUI.store';

import { useAuth } from '@presentation/contexts/AuthContext';

import companyLogo from '@/assets/images/logos/partner-logo-2-Photoroom.png';

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface SubItem {
  label: string;
  path: string;
}

interface NavItem {
  label: string;
  icon: LucideIcon;
  path?: string;
  badge?: string;
  children?: SubItem[];
}

/* -------------------------------------------------------------------------- */
/*                              NAVIGATION DATA                               */
/* -------------------------------------------------------------------------- */

const NAVIGATION: NavItem[] = [
  {
    label: 'Dashboard General',
    icon: LayoutDashboard,
    path: '/admin/dashboard',
  },

  {
    label: 'Configuración',
    icon: Settings,
    children: [
      {
        label: 'Roles',
        path: '/admin/configuracion/roles',
      },
      {
        label: 'Permisos',
        path: '/admin/configuracion/permisos',
      },
    ],
  },

  {
    label: 'Usuarios',
    icon: Users,
    children: [
      {
        label: 'Gestión de usuarios',
        path: '/admin/users',
      },
      {
        label: 'Gestión de acceso',
        path: '/admin/users/access',
      },
    ],
  },

  {
    label: 'Inventario',
    icon: Boxes,
    badge: '12',
    children: [
      {
        label: 'Gestión de insumos',
        path: '/admin/inventario/insumos',
      },
      {
        label: 'Productos terminados',
        path: '/admin/inventario/productos',
      },
    ],
  },

  {
    label: 'Producción',
    icon: Factory,
    children: [
      {
        label: 'Órdenes',
        path: '/admin/produccion/ordenes',
      },
      {
        label: 'Seguimiento',
        path: '/admin/produccion/seguimiento',
      },
    ],
  },

  {
    label: 'Ventas y Pedidos',
    icon: ShoppingCart,
    children: [
      {
        label: 'Pedidos',
        path: '/admin/pedidos',
      },
      {
        label: 'Facturación',
        path: '/admin/facturacion',
      },
    ],
  },

  {
    label: 'Dashboard Analítico',
    icon: BarChart3,
    path: '/admin/analytics',
  },
];

/* -------------------------------------------------------------------------- */
/*                               ANIMATIONS                                   */
/* -------------------------------------------------------------------------- */

const dropdownVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.18,
      ease: [0.4, 0, 1, 1],
    },
  },

  expanded: {
    height: 'auto',
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: [0, 0, 0.2, 1],
    },
  },
};

/* -------------------------------------------------------------------------- */
/*                               SIDEBAR ITEM                                 */
/* -------------------------------------------------------------------------- */

const SidebarRow = memo(
  ({
    item,
    sidebarOpen,
    currentPath,
  }: {
    item: NavItem;
    sidebarOpen: boolean;
    currentPath: string;
  }) => {
    const Icon = item.icon;

    const hasChildren = !!item.children;

    const isParentActive =
      hasChildren &&
      item.children!.some(
        (child) => currentPath === child.path
      );

    const isDirectActive =
      !hasChildren &&
      currentPath === item.path;

    const isExpanded =
      isDirectActive || isParentActive;

    const [isOpen, setIsOpen] =
      useState(isParentActive);

    useEffect(() => {
      if (isParentActive) {
        setIsOpen(true);
      }
    }, [isParentActive]);

    const toggleMenu = () => {
      if (!sidebarOpen) return;

      setIsOpen((prev) => !prev);
    };

    return (
      <div className="relative">
        {hasChildren ? (
          <>
            <button
              onClick={toggleMenu}
              title={!sidebarOpen ? item.label : ''}
              className={cn(
                `
                  group
                  relative

                  flex
                  w-full
                  items-center
                  justify-between

                  min-h-[68px]

                  overflow-hidden

                  rounded-[24px]

                  border
                  border-transparent

                  px-4
                  py-3

                  transition-all
                  duration-300
                  ease-out
                `,
                isExpanded
                  ? `
                    bg-gradient-to-br
                    from-[#151515]
                    via-[#181818]
                    to-[#1B1B1B]

                    border-white/[0.06]

                    shadow-[0_12px_30px_rgba(0,0,0,0.30)]

                    before:absolute
                    before:inset-0
                    before:bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent)]
                    before:pointer-events-none
                  `
                  : `
                    hover:bg-[#111111]
                  `,
                !sidebarOpen &&
                  `
                    h-[68px]
                    w-[68px]

                    mx-auto

                    justify-center
                  `
              )}
            >
              {isExpanded && (
                <>
                  <motion.div
                    layoutId="active-sidebar-glow"
                    className="
                      absolute
                      inset-0

                      rounded-[24px]

                      bg-white/[0.02]
                    "
                  />

                  <motion.div
                    layoutId="active-sidebar-line"
                    className="
                      absolute
                      left-0
                      top-1/2

                      h-10
                      w-[4px]

                      -translate-y-1/2

                      rounded-r-full

                      bg-white

                      shadow-[0_0_12px_rgba(255,255,255,0.25)]
                    "
                  />
                </>
              )}

              <div
                className={cn(
                  `
                    relative
                    z-10

                    flex
                    items-center
                    gap-4

                    min-w-0
                  `,
                  !sidebarOpen &&
                    `
                      justify-center
                    `
                )}
              >
                <div
                  className={cn(
                    `
                      relative

                      flex
                      items-center
                      justify-center

                      transition-all
                      duration-300
                    `,
                    sidebarOpen
                      ? `
                        h-12
                        w-12

                        rounded-[18px]
                      `
                      : `
                        h-11
                        w-11

                        rounded-full
                      `,
                    isExpanded
                      ? `
                        border
                        border-white/[0.06]

                        bg-white/[0.04]
                      `
                      : `
                        bg-[#111111]

                        group-hover:bg-[#181818]
                      `
                  )}
                >
                  <Icon
                    size={18}
                    strokeWidth={2}
                    className={cn(
                      `
                        transition-all
                        duration-300
                      `,
                      isExpanded
                        ? 'text-white'
                        : 'text-[#8B8B8B] group-hover:text-white'
                    )}
                  />
                </div>

                {sidebarOpen && (
                  <div className="min-w-0 flex-1 text-left">
                    <p
                      className={cn(
                        `
                          truncate

                          text-[15px]
                          font-semibold

                          tracking-[-0.02em]
                        `,
                        isExpanded
                          ? 'text-white'
                          : 'text-[#D1D1D1]'
                      )}
                    >
                      {item.label}
                    </p>
                  </div>
                )}
              </div>

              {sidebarOpen && (
                <div
                  className="
                    relative
                    z-10

                    flex
                    items-center
                    gap-2
                  "
                >
                  {item.badge && (
                    <div
                      className="
                        flex
                        h-6
                        min-w-[24px]
                        items-center
                        justify-center

                        rounded-full

                        border
                        border-white/[0.06]

                        bg-white/[0.04]

                        px-2

                        text-[10px]
                        font-semibold

                        text-white
                      "
                    >
                      {item.badge}
                    </div>
                  )}

                  <motion.div
                    animate={{
                      rotate: isOpen ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.22,
                    }}
                    className="
                      text-[#7A7A7A]
                    "
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </div>
              )}
            </button>

            <AnimatePresence initial={false}>
              {isOpen &&
                sidebarOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    className="overflow-hidden"
                  >
                    <div
                      className="
                        mt-2
                        ml-[76px]

                        space-y-2

                        pl-2
                      "
                    >
                      {item.children!.map((child) => {
                        const isChildActive =
                          currentPath === child.path;

                        return (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            className={cn(
                              `
                                group
                                relative

                                flex
                                items-center
                                gap-3

                                overflow-hidden

                                rounded-2xl

                                border
                                border-transparent

                                px-4
                                py-3

                                transition-all
                                duration-300
                              `,
                              isChildActive
                                ? `
                                  border-white/[0.06]

                                  bg-[#111111]

                                  shadow-[0_6px_20px_rgba(0,0,0,0.20)]
                                `
                                : `
                                  hover:bg-white/[0.03]
                                `
                            )}
                          >
                            {isChildActive && (
                              <motion.div
                                layoutId="active-sub-item"
                                className="
                                  absolute
                                  left-0
                                  top-1/2

                                  h-6
                                  w-[3px]

                                  -translate-y-1/2

                                  rounded-r-full

                                  bg-white
                                "
                              />
                            )}

                            <div
                              className={cn(
                                `
                                  relative

                                  flex
                                  h-7
                                  w-7
                                  items-center
                                  justify-center

                                  rounded-full

                                  transition-all
                                  duration-300
                                `,
                                isChildActive
                                  ? `
                                    bg-white/[0.08]
                                  `
                                  : `
                                    bg-[#141414]

                                    group-hover:bg-[#1E1E1E]
                                  `
                              )}
                            >
                              <div
                                className={cn(
                                  `
                                    h-[6px]
                                    w-[6px]

                                    rounded-full
                                  `,
                                  isChildActive
                                    ? `
                                      bg-white
                                    `
                                    : `
                                      bg-[#6A6A6A]

                                      group-hover:bg-[#B5B5B5]
                                    `
                                )}
                              />
                            </div>

                            <span
                              className={cn(
                                `
                                  text-[13px]
                                  font-medium

                                  tracking-[-0.01em]
                                `,
                                isChildActive
                                  ? `
                                    text-white
                                  `
                                  : `
                                    text-[#A1A1A1]

                                    group-hover:text-[#F5F5F5]
                                  `
                              )}
                            >
                              {child.label}
                            </span>
                          </NavLink>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>
          </>
        ) : (
          <NavLink
            to={item.path!}
            title={!sidebarOpen ? item.label : ''}
            className={cn(
              `
                group
                relative

                flex
                items-center

                min-h-[68px]

                overflow-hidden

                rounded-[24px]

                border
                border-transparent

                px-3
                py-2.5

                transition-all
                duration-300
              `,
              isDirectActive
                ? `
                  bg-gradient-to-br
                  from-[#151515]
                  via-[#181818]
                  to-[#1B1B1B]

                  border-white/[0.06]

                  shadow-[0_12px_30px_rgba(0,0,0,0.30)]
                `
                : `
                  hover:bg-[#111111]
                `,
              !sidebarOpen &&
                `
                  h-[68px]
                  w-[68px]

                  mx-auto

                  justify-center
                `
            )}
          >
            {isDirectActive && (
              <>
                <motion.div
                  layoutId="active-direct-background"
                  className="
                    absolute
                    inset-0

                    rounded-[24px]

                    bg-white/[0.02]
                  "
                />

                <motion.div
                  layoutId="active-sidebar-pill"
                  className="
                    absolute
                    left-0
                    top-1/2

                    h-10
                    w-[4px]

                    -translate-y-1/2

                    rounded-r-full

                    bg-white
                  "
                />
              </>
            )}

            <div
              className={cn(
                `
                  relative
                  z-10

                  flex
                  items-center
                  gap-4
                `,
                !sidebarOpen &&
                  `
                    justify-center
                  `
              )}
            >
              <div
                className={cn(
                  `
                    flex
                    items-center
                    justify-center

                    transition-all
                    duration-300
                  `,
                  sidebarOpen
                    ? `
                      h-12
                      w-12

                      rounded-[18px]
                    `
                    : `
                      h-11
                      w-11

                      rounded-full
                    `,
                  isDirectActive
                    ? `
                      border
                      border-white/[0.06]

                      bg-white/[0.04]
                    `
                    : `
                      bg-[#111111]

                      group-hover:bg-[#181818]
                    `
                )}
              >
                <Icon
                  size={18}
                  strokeWidth={2}
                  className={cn(
                    `
                      transition-all
                      duration-300
                    `,
                    isDirectActive
                      ? 'text-white'
                      : 'text-[#8B8B8B] group-hover:text-white'
                  )}
                />
              </div>

              {sidebarOpen && (
                <span
                  className={cn(
                    `
                      truncate

                      text-[15px]
                      font-semibold

                      tracking-[-0.02em]
                    `,
                    isDirectActive
                      ? 'text-white'
                      : 'text-[#D1D1D1]'
                  )}
                >
                  {item.label}
                </span>
              )}
            </div>
          </NavLink>
        )}
      </div>
    );
  }
);

SidebarRow.displayName = 'SidebarRow';

/* -------------------------------------------------------------------------- */
/*                                   SIDEBAR                                  */
/* -------------------------------------------------------------------------- */

const Sidebar = () => {
  const { pathname } = useLocation();

  const { logout } = useAuth();

  const {
    sidebarOpen,
    toggleSidebar,
  } = useDashboardUIStore() as any;

  return (
    <aside
      className={cn(
        `
          fixed
          left-0
          top-0
          z-50

          flex
          h-screen
          flex-col

          border-r
          border-white/[0.04]

          bg-[#060606]

          before:absolute
          before:inset-0
          before:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_35%)]
          before:pointer-events-none

          backdrop-blur-2xl

          shadow-[8px_0_30px_rgba(0,0,0,0.35)]

          transition-all
          duration-300
        `,
        sidebarOpen
          ? 'w-[300px]'
          : 'w-[90px]'
      )}
    >
      {/* HEADER */}

      <div
        className="
          relative

          flex
          h-[96px]
          items-center

          border-b
          border-white/[0.04]

          px-5
        "
      >
        <div
          className={cn(
            `
              flex
              w-full
              items-center
            `,
            sidebarOpen
              ? 'justify-between'
              : 'justify-center'
          )}
        >
          <div
            className={cn(
              `
                flex
                items-center
              `,
              sidebarOpen
                ? 'gap-4'
                : ''
            )}
          >
            <div
              className="
                relative

                flex
                h-14
                w-14
                items-center
                justify-center

                overflow-hidden

                rounded-[20px]

                border
                border-white/[0.06]

                bg-[#0E0E0E]

                shadow-[0_8px_25px_rgba(0,0,0,0.45)]

                transition-all
                duration-300

                hover:border-white/[0.10]
                hover:bg-[#151515]
              "
            >
              <div
                className="
                  absolute
                  inset-0

                  bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]
                "
              />

              <img
                src={companyLogo}
                alt="SurtiCamisetas"
                className="
                  relative
                  z-10

                  h-8
                  w-8

                  object-contain

                  brightness-125
                  contrast-125
                "
              />
            </div>

            {sidebarOpen && (
              <div className="min-w-0">
                <h2
                  className="
                    truncate

                    text-[17px]
                    font-semibold

                    tracking-[-0.03em]

                    text-[#FAFAFA]
                  "
                >
                  SurtiCamisetas
                </h2>

                <p
                  className="
                    mt-1

                    text-[10px]
                    font-medium

                    tracking-[0.22em]

                    uppercase

                    text-[#6F6F6F]
                  "
                >
                  ERP ENTERPRISE
                </p>
              </div>
            )}
          </div>

          {sidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center

                rounded-2xl

                border
                border-white/[0.06]

                bg-[#141414]

                text-[#A1A1A1]

                transition-all
                duration-300

                hover:border-white/[0.08]
                hover:bg-[#1B1B1B]
                hover:text-white
              "
            >
              <ChevronLeft size={16} />
            </button>
          )}
        </div>

        {!sidebarOpen && (
          <motion.button
            onClick={toggleSidebar}
            initial={{
              opacity: 0,
              x: -8,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="
              absolute
              right-[-14px]
              top-1/2
              z-50

              flex
              h-10
              w-10

              -translate-y-1/2

              items-center
              justify-center

              rounded-full

              border
              border-white/[0.06]

              bg-[#111111]/95

              backdrop-blur-xl

              shadow-[0_4px_18px_rgba(0,0,0,0.35)]

              transition-all
              duration-300

              hover:scale-105
              hover:border-white/[0.08]
              hover:bg-[#1A1A1A]
            "
          >
            <ChevronRight
              size={16}
              className="
                text-white
              "
            />
          </motion.button>
        )}
      </div>

      {/* NAVIGATION */}

      <nav
        className="
          relative

          flex-1

          overflow-y-auto

          py-5

          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        <div className="space-y-2.5 px-3">
          {NAVIGATION.map((item) => (
            <SidebarRow
              key={item.label}
              item={item}
              sidebarOpen={sidebarOpen}
              currentPath={pathname}
            />
          ))}
        </div>
      </nav>

      {/* FOOTER */}

      <div
        className="
          relative

          border-t
          border-white/[0.04]

          p-4
        "
      >
        {sidebarOpen && (
          <div
            className="
              mb-3

              flex
              items-center
              gap-3

              rounded-[26px]

              border
              border-white/[0.05]

              bg-gradient-to-b
              from-[#111111]
              to-[#0D0D0D]

              px-3.5
              py-3

              shadow-[0_10px_30px_rgba(0,0,0,0.28)]
            "
          >
<div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center

                rounded-xl

                bg-[#F4C430]

                text-sm
                font-bold

                text-black
              "
            >
              A
            </div>

            <div className="min-w-0 flex-1">
              <p
                className="
                  truncate

                  text-[14px]
                  font-semibold

                  text-white
                "
              >
                Administrador
              </p>

              <p
                className="
                  truncate

                  text-[11px]

                  text-[#7D7D7D]
                "
              >
                admin@surticamisetas.com
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

                shadow-[0_0_18px_rgba(16,185,129,0.18)]
              "
            >
              <ShieldCheck size={16} />
            </div>
          </div>
        )}

        <button
          onClick={logout}
          title={!sidebarOpen ? 'Cerrar sesión' : ''}
          className={cn(
            `
              group

              flex
              w-full
              items-center
              gap-4

              rounded-[22px]

              border
              border-transparent

              px-3.5
              py-2.5

              text-[#9A9A9A]

              transition-all
              duration-300

              hover:border-white/[0.06]
              hover:bg-[#111111]
              hover:text-white
            `,
            !sidebarOpen &&
              `
                h-[64px]
                w-[64px]

                mx-auto

                justify-center
              `
          )}
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center

              rounded-full

              bg-[#141414]

              transition-all
              duration-300

              group-hover:bg-[#1D1D1D]
            "
          >
            <LogOut size={17} />
          </div>

          {sidebarOpen && (
            <span
              className="
                text-[15px]
                font-semibold

                tracking-[-0.02em]
              "
            >
              Cerrar sesión
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;