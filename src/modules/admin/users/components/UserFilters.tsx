interface Props {
  search: string;

  onSearch: (
    value: string
  ) => void;

  roleFilter: string;

  onRoleFilter: (
    value: string
  ) => void;
}

const UserFilters = ({
  search,
  onSearch,
  roleFilter,
  onRoleFilter,
}: Props) => {
  return (
    <div
      className="
        flex
        flex-col
        lg:flex-row
        gap-4
        justify-between
        mb-6
      "
    >
      <input
        value={search}
        onChange={(e) =>
          onSearch(e.target.value)
        }
        placeholder="Buscar usuario..."
        className="
          w-full
          lg:w-[350px]
          h-12
          rounded-2xl
          border
          border-zinc-200
          dark:border-zinc-700
          bg-white
          dark:bg-zinc-900
          px-4
          outline-none
        "
      />

      <select
        value={roleFilter}
        onChange={(e) =>
          onRoleFilter(e.target.value)
        }
        className="
          h-12
          rounded-2xl
          border
          border-zinc-200
          dark:border-zinc-700
          bg-white
          dark:bg-zinc-900
          px-4
          outline-none
        "
      >
        <option value="">
          Todos los roles
        </option>

        <option value="admin">
          Admin
        </option>

        <option value="asesor">
          Asesor
        </option>

        <option value="domiciliario">
          Domiciliario
        </option>

        <option value="cliente">
          Cliente
        </option>
      </select>
    </div>
  );
};

export default UserFilters;