import {
  Users,
  ShieldCheck,
  Truck,
  UserCheck,
} from "lucide-react";

import {
  UserEntity,
} from "../types/user.types";

interface Props {
  users: UserEntity[];
}

const UserStatsCards = ({
  users,
}: Props) => {

  const admins =
    users.filter(
      (user) => user.role === "admin"
    ).length;

  const advisors =
    users.filter(
      (user) => user.role === "asesor"
    ).length;

  const delivery =
    users.filter(
      (user) =>
        user.role === "domiciliario"
    ).length;

  const activeUsers =
    users.filter(
      (user) => user.active
    ).length;

  const stats = [
    {
      title: "Usuarios",
      value: users.length,
      icon: Users,
    },

    {
      title: "Admins",
      value: admins,
      icon: ShieldCheck,
    },

    {
      title: "Asesores",
      value: advisors,
      icon: UserCheck,
    },

    {
      title: "Domiciliarios",
      value: delivery,
      icon: Truck,
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-5
      "
    >
      {stats.map((item) => {

        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              bg-white
              dark:bg-zinc-900
              border
              border-zinc-200
              dark:border-zinc-800
              rounded-3xl
              p-6
              shadow-sm
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <div>
                <p
                  className="
                    text-sm
                    text-zinc-500
                  "
                >
                  {item.title}
                </p>

                <h2
                  className="
                    text-3xl
                    font-bold
                    mt-2
                    dark:text-white
                  "
                >
                  {item.value}
                </h2>
              </div>

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-slate-100
                  dark:bg-zinc-800
                  flex
                  items-center
                  justify-center
                "
              >
                <Icon size={26} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserStatsCards;