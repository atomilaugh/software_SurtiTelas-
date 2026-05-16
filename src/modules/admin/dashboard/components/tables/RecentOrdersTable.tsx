import { useMemo, useState } from 'react';

import { motion } from 'framer-motion';

import {
  Search,
  ArrowRight,
  Clock3,
  CheckCircle2,
  Loader2,
  XCircle,
  Truck,
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const ORDERS = [
  {
    id: 'SC-0001',
    client: 'Laura Gómez',
    amount: '$170k',
    status: 'entregado',
    date: '10 dic',
  },
  {
    id: 'SC-0002',
    client: 'Carlos Martínez',
    amount: '$130k',
    status: 'enviado',
    date: '10 dic',
  },
  {
    id: 'SC-0003',
    client: 'Ana Rodríguez',
    amount: '$165k',
    status: 'preparando',
    date: '11 dic',
  },
  {
    id: 'SC-0004',
    client: 'Pedro Sánchez',
    amount: '$189k',
    status: 'pagado',
    date: '11 dic',
  },
  {
    id: 'SC-0005',
    client: 'Sofía Torres',
    amount: '$178k',
    status: 'pendiente',
    date: '11 dic',
  },
];

const STATUS = {
  entregado: {
    label: 'Entregado',
    icon: CheckCircle2,
    color:
      'text-emerald-600 dark:text-emerald-400',

    bg:
      'bg-emerald-500/10',
  },

  enviado: {
    label: 'Enviado',
    icon: Truck,
    color:
      'text-blue-600 dark:text-blue-400',

    bg:
      'bg-blue-500/10',
  },

  preparando: {
    label: 'Preparando',
    icon: Loader2,
    color:
      'text-violet-600 dark:text-violet-400',

    bg:
      'bg-violet-500/10',
  },

  pagado: {
    label: 'Pagado',
    icon: CheckCircle2,
    color:
      'text-cyan-600 dark:text-cyan-400',

    bg:
      'bg-cyan-500/10',
  },

  pendiente: {
    label: 'Pendiente',
    icon: Clock3,
    color:
      'text-amber-600 dark:text-amber-400',

    bg:
      'bg-amber-500/10',
  },

  cancelado: {
    label: 'Cancelado',
    icon: XCircle,
    color:
      'text-red-600 dark:text-red-400',

    bg:
      'bg-red-500/10',
  },
};

const AVATARS = [
  'from-violet-500 to-fuchsia-500',
  'from-blue-500 to-cyan-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-amber-500',
  'from-pink-500 to-rose-500',
];

const RecentOrdersTable = () => {
  const [query, setQuery] =
    useState('');

  const navigate =
    useNavigate();

  const rows = useMemo(() => {
    return ORDERS.filter(
      (order) =>
        order.client
          .toLowerCase()
          .includes(
            query.toLowerCase()
          ) ||
        order.id.includes(query)
    );
  }, [query]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        overflow-hidden
        rounded-[28px]
        border
        border-zinc-200
        bg-white

        shadow-[0_10px_30px_rgba(15,23,42,0.06)]

        dark:border-white/[0.06]
        dark:bg-[#0F1117]
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          gap-4

          border-b
          border-zinc-200

          p-6

          dark:border-white/[0.06]

          xl:flex-row
          xl:items-center
          xl:justify-between
        "
      >
        <div>
          <h3
            className="
              text-[20px]
              font-semibold
              tracking-[-0.03em]

              text-zinc-900
              dark:text-white
            "
          >
            Pedidos recientes
          </h3>

          <p
            className="
              mt-1
              text-sm
              text-zinc-500
              dark:text-zinc-400
            "
          >
            Últimos pedidos procesados
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* SEARCH */}

          <div className="relative">
            <Search
              size={16}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-zinc-400
              "
            />

            <input
              value={query}
              onChange={(e) =>
                setQuery(
                  e.target.value
                )
              }
              placeholder="Buscar pedido..."
              className="
                h-11
                w-[230px]

                rounded-2xl

                border
                border-zinc-200

                bg-zinc-50

                pl-11
                pr-4

                text-sm

                outline-none

                transition-all
                duration-200

                placeholder:text-zinc-400

                focus:border-zinc-400
                focus:bg-white

                dark:border-white/[0.06]
                dark:bg-white/[0.03]
                dark:text-white
                dark:placeholder:text-zinc-500
                dark:focus:border-white/[0.12]
              "
            />
          </div>

          {/* BUTTON */}

          <button
            onClick={() =>
              navigate(
                '/admin/pedidos'
              )
            }
            className="
              inline-flex
              h-11
              items-center
              gap-2

              rounded-2xl

              bg-zinc-900

              px-5

              text-sm
              font-medium
              text-white

              transition-all
              duration-200

              hover:opacity-90

              dark:bg-white
              dark:text-black
            "
          >
            Ver todos

            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr
              className="
                border-b
                border-zinc-200

                dark:border-white/[0.06]
              "
            >
              {[
                'Cliente',
                'Monto',
                'Estado',
                'Fecha',
              ].map((head) => (
                <th
                  key={head}
                  className="
                    px-6
                    py-4
                    text-left

                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.08em]

                    text-zinc-500
                    dark:text-zinc-500
                  "
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map(
              (order, index) => {
                const status =
                  STATUS[
                    order.status as keyof typeof STATUS
                  ];

                const Icon =
                  status.icon;

                return (
                  <tr
                    key={order.id}
                    className="
                      border-b
                      border-zinc-100

                      transition-colors
                      duration-200

                      hover:bg-zinc-50/80

                      dark:border-white/[0.04]
                      dark:hover:bg-white/[0.02]
                    "
                  >
                    {/* CLIENT */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div
                          className={`
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center

                            rounded-2xl

                            bg-gradient-to-br
                            ${
                              AVATARS[
                                index %
                                  AVATARS.length
                              ]
                            }

                            text-sm
                            font-semibold
                            text-white
                          `}
                        >
                          {order.client[0]}
                        </div>

                        <div>
                          <p
                            className="
                              text-sm
                              font-semibold

                              text-zinc-900
                              dark:text-white
                            "
                          >
                            {order.client}
                          </p>

                          <p
                            className="
                              mt-0.5
                              text-xs
                              text-zinc-500
                              dark:text-zinc-400
                            "
                          >
                            {order.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* AMOUNT */}

                    <td className="px-6 py-5">
                      <span
                        className="
                          text-sm
                          font-semibold

                          text-zinc-900
                          dark:text-white
                        "
                      >
                        {order.amount}
                      </span>
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-5">
                      <div
                        className={`
                          inline-flex
                          items-center
                          gap-2

                          rounded-full

                          px-3
                          py-1.5

                          text-xs
                          font-medium

                          ${status.bg}
                          ${status.color}
                        `}
                      >
                        <Icon size={13} />

                        {status.label}
                      </div>
                    </td>

                    {/* DATE */}

                    <td
                      className="
                        px-6
                        py-5

                        text-sm
                        text-zinc-500
                        dark:text-zinc-400
                      "
                    >
                      {order.date}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default RecentOrdersTable;