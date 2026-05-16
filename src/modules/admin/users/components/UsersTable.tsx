import {
  Pencil,
  Trash2,
} from "lucide-react";

import {
  UserEntity,
} from "../types/user.types";

interface Props {
  users: UserEntity[];
}

const getRoleStyle = (
  role: string
) => {
  switch (role) {

    case "admin":
      return "bg-red-100 text-red-700";

    case "asesor":
      return "bg-blue-100 text-blue-700";

    case "domiciliario":
      return "bg-yellow-100 text-yellow-700";

    default:
      return "bg-green-100 text-green-700";
  }
};

const UsersTable = ({
  users,
}: Props) => {
  return (
    <div
      className="
        bg-white
        dark:bg-zinc-900
        border
        border-zinc-200
        dark:border-zinc-800
        rounded-3xl
        overflow-hidden
        shadow-sm
      "
    >
      <div className="overflow-x-auto">

        <table className="w-full min-w-[900px]">

          <thead
            className="
              border-b
              border-zinc-200
              dark:border-zinc-800
            "
          >
            <tr>

              <th className="text-left p-5">
                Usuario
              </th>

              <th className="text-left p-5">
                Correo
              </th>

              <th className="text-left p-5">
                Teléfono
              </th>

              <th className="text-left p-5">
                Rol
              </th>

              <th className="text-left p-5">
                Estado
              </th>

              <th className="text-left p-5">
                Acciones
              </th>

            </tr>
          </thead>

          <tbody>

            {users.map((user) => (
              <tr
                key={user.id}
                className="
                  border-b
                  border-zinc-100
                  dark:border-zinc-800
                  hover:bg-zinc-50
                  dark:hover:bg-zinc-800/40
                  transition
                "
              >

                <td className="p-5">
                  <div>
                    <p
                      className="
                        font-semibold
                        dark:text-white
                      "
                    >
                      {user.fullName}
                    </p>

                    <span
                      className="
                        text-sm
                        text-zinc-500
                      "
                    >
                      {user.createdAt}
                    </span>
                  </div>
                </td>

                <td className="p-5">
                  {user.email}
                </td>

                <td className="p-5">
                  {user.phone}
                </td>

                <td className="p-5">

                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-medium
                      ${getRoleStyle(user.role)}
                    `}
                  >
                    {user.role}
                  </span>

                </td>

                <td className="p-5">

                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-medium
                      ${
                        user.active
                          ? "bg-green-100 text-green-700"
                          : "bg-zinc-200 text-zinc-700"
                      }
                    `}
                  >
                    {user.active
                      ? "Activo"
                      : "Inactivo"}
                  </span>

                </td>

                <td className="p-5">

                  <div className="flex gap-3">

                    <button
                      className="
                        w-10
                        h-10
                        rounded-xl
                        border
                        border-zinc-200
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      className="
                        w-10
                        h-10
                        rounded-xl
                        border
                        border-red-200
                        text-red-600
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
};

export default UsersTable;