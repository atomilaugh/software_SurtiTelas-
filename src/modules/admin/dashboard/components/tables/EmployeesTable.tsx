import React from 'react';

import { motion } from 'framer-motion';

import {
  MoreHorizontal,
  Search,
  ShieldCheck,
  Mail,
  Phone,
  Users,
} from 'lucide-react';

import { cn } from '@/shared/utils';

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

const EMPLOYEES = [
  {
    id: 1,
    name: 'Carlos Ramírez',
    role: 'Administrador',
    email: 'carlos@surticamisetas.com',
    phone: '+57 301 482 1920',
    status: 'Activo',
  },

  {
    id: 2,
    name: 'Laura Gómez',
    role: 'Asesora Comercial',
    email: 'laura@surticamisetas.com',
    phone: '+57 320 882 1102',
    status: 'Activo',
  },

  {
    id: 3,
    name: 'Andrés Ruiz',
    role: 'Inventario',
    email: 'andres@surticamisetas.com',
    phone: '+57 310 442 8830',
    status: 'En pausa',
  },

  {
    id: 4,
    name: 'Valentina Torres',
    role: 'Producción',
    email: 'valentina@surticamisetas.com',
    phone: '+57 314 889 1201',
    status: 'Activo',
  },
];

/* -------------------------------------------------------------------------- */
/*                              EMPLOYEES TABLE                               */
/* -------------------------------------------------------------------------- */

const EmployeesTable: React.FC = () => {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
        ease: 'easeOut',
      }}
      className="
        relative
        overflow-hidden

        rounded-[30px]

        border

        border-[#E7ECF3]
        dark:border-white/[0.06]

        bg-white
        dark:bg-[#0F1117]

        shadow-[0_6px_28px_rgba(15,23,42,0.05)]
        dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)]
      "
    >
      {/* Ambient Glow */}

      <div
        className="
          pointer-events-none

          absolute
          right-[-100px]
          top-[-100px]

          h-[220px]
          w-[220px]

          rounded-full

          bg-indigo-500/[0.04]

          blur-3xl
        "
      />

      {/* Header */}

      <div
        className="
          relative
          z-10

          flex
          flex-col
          gap-5

          border-b

          border-[#EEF2F7]
          dark:border-white/[0.06]

          px-7
          py-6

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* Left */}

        <div className="flex items-center gap-4">
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center

              rounded-2xl

              bg-indigo-50
              dark:bg-indigo-500/10
            "
          >
            <Users
              size={24}
              className="
                text-indigo-600
                dark:text-indigo-400
              "
            />
          </div>

          <div>
            <h2
              className="
                text-[22px]
                font-semibold

                tracking-[-0.03em]

                text-slate-900
                dark:text-white
              "
            >
              Empleados
            </h2>

            <p
              className="
                mt-1

                text-sm

                text-slate-500
                dark:text-zinc-400
              "
            >
              Gestión general del personal registrado
            </p>
          </div>
        </div>

        {/* Search */}

        <div
          className="
            relative

            w-full

            lg:w-[320px]
          "
        >
          <Search
            size={17}
            className="
              absolute
              left-4
              top-1/2

              -translate-y-1/2

              text-slate-400
              dark:text-zinc-500
            "
          />

          <input
            placeholder="Buscar empleado..."
            className="
              h-[48px]
              w-full

              rounded-2xl

              border

              border-[#E7ECF3]
              dark:border-white/[0.06]

              bg-[#F8FAFC]
              dark:bg-white/[0.03]

              pl-11
              pr-4

              text-sm
              font-medium

              text-slate-900
              placeholder:text-slate-400

              dark:text-white
              dark:placeholder:text-zinc-500

              outline-none

              transition-all
              duration-200

              focus:border-indigo-500/30
              focus:ring-4
              focus:ring-indigo-500/10
            "
          />
        </div>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px]">
          <thead>
            <tr
              className="
                border-b

                border-[#EEF2F7]
                dark:border-white/[0.06]
              "
            >
              {[
                'Empleado',
                'Cargo',
                'Correo',
                'Teléfono',
                'Estado',
                '',
              ].map((head) => (
                <th
                  key={head}
                  className="
                    px-7
                    py-4

                    text-left
                    text-[12px]
                    font-semibold

                    uppercase
                    tracking-[0.08em]

                    text-slate-500
                    dark:text-zinc-500
                  "
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {EMPLOYEES.map(
              (employee, index) => {
                const active =
                  employee.status ===
                  'Activo';

                return (
                  <motion.tr
                    key={employee.id}
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay:
                        index * 0.05,
                    }}
                    className="
                      group

                      border-b

                      border-[#F1F5F9]
                      dark:border-white/[0.04]

                      transition-colors
                      duration-200

                      hover:bg-[#F8FAFC]
                      dark:hover:bg-white/[0.02]
                    "
                  >
                    {/* Employee */}

                    <td className="px-7 py-5">
                      <div className="flex items-center gap-4">
                        <div
                          className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center

                            rounded-2xl

                            bg-gradient-to-br
                            from-indigo-500
                            to-violet-500

                            text-sm
                            font-bold

                            text-white

                            shadow-[0_8px_24px_rgba(99,102,241,0.25)]
                          "
                        >
                          {employee.name
                            .charAt(0)}
                        </div>

                        <div>
                          <p
                            className="
                              text-[14px]
                              font-semibold

                              text-slate-900
                              dark:text-white
                            "
                          >
                            {employee.name}
                          </p>

                          <p
                            className="
                              mt-1

                              text-xs

                              text-slate-500
                              dark:text-zinc-500
                            "
                          >
                            ID #
                            {employee.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}

                    <td className="px-7 py-5">
                      <div
                        className="
                          inline-flex
                          items-center
                          gap-2

                          rounded-full

                          bg-indigo-50
                          dark:bg-indigo-500/10

                          px-3
                          py-2
                        "
                      >
                        <ShieldCheck
                          size={14}
                          className="
                            text-indigo-500
                          "
                        />

                        <span
                          className="
                            text-xs
                            font-semibold

                            text-indigo-600
                            dark:text-indigo-400
                          "
                        >
                          {employee.role}
                        </span>
                      </div>
                    </td>

                    {/* Email */}

                    <td className="px-7 py-5">
                      <div className="flex items-center gap-2">
                        <Mail
                          size={15}
                          className="
                            text-slate-400
                            dark:text-zinc-500
                          "
                        />

                        <span
                          className="
                            text-sm

                            text-slate-700
                            dark:text-zinc-300
                          "
                        >
                          {employee.email}
                        </span>
                      </div>
                    </td>

                    {/* Phone */}

                    <td className="px-7 py-5">
                      <div className="flex items-center gap-2">
                        <Phone
                          size={15}
                          className="
                            text-slate-400
                            dark:text-zinc-500
                          "
                        />

                        <span
                          className="
                            text-sm

                            text-slate-700
                            dark:text-zinc-300
                          "
                        >
                          {employee.phone}
                        </span>
                      </div>
                    </td>

                    {/* Status */}

                    <td className="px-7 py-5">
                      <div
                        className={cn(
                          `
                            inline-flex
                            items-center
                            gap-2

                            rounded-full

                            px-3
                            py-2
                          `,
                          active
                            ? `
                              bg-emerald-50
                              dark:bg-emerald-500/10
                            `
                            : `
                              bg-amber-50
                              dark:bg-amber-500/10
                            `
                        )}
                      >
                        <div
                          className={cn(
                            `
                              h-2
                              w-2

                              rounded-full
                            `,
                            active
                              ? `
                                bg-emerald-500
                              `
                              : `
                                bg-amber-500
                              `
                          )}
                        />

                        <span
                          className={cn(
                            `
                              text-xs
                              font-semibold
                            `,
                            active
                              ? `
                                text-emerald-600
                                dark:text-emerald-400
                              `
                              : `
                                text-amber-600
                                dark:text-amber-400
                              `
                          )}
                        >
                          {employee.status}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}

                    <td className="px-7 py-5 text-right">
                      <button
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center

                          rounded-xl

                          border

                          border-[#E7ECF3]
                          dark:border-white/[0.06]

                          bg-white
                          dark:bg-white/[0.03]

                          text-slate-500
                          dark:text-zinc-400

                          transition-all
                          duration-200

                          hover:bg-slate-50
                          hover:text-slate-900

                          dark:hover:bg-white/[0.05]
                          dark:hover:text-white
                        "
                      >
                        <MoreHorizontal
                          size={17}
                        />
                      </button>
                    </td>
                  </motion.tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
};

export default EmployeesTable;