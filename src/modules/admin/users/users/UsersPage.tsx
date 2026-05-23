import { useMemo, useState } from "react";

import DashboardLayout from "../../dashboard/components/layout/DashboardLayout";

import { useUsers } from "../hooks/useUsers";

import UserStatsCards from "../components/UserStatsCards";

import UserFilters from "../components/UserFilters";

import UsersTable from "../components/UsersTable";

const UsersPage = () => {
  const {
    data: users = [],
    isLoading,
    error,
  } = useUsers();

  const [search, setSearch] =
    useState("");

  const [roleFilter, setRoleFilter] =
    useState("");

  const filteredUsers =
    useMemo(() => {
      return users.filter((user: any) => {
        const matchesSearch =
          user.fullName
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesRole =
          roleFilter
            ? user.role === roleFilter
            : true;

        return (
          matchesSearch &&
          matchesRole
        );
      });
    }, [
      users,
      search,
      roleFilter,
    ]);

  if (isLoading) {
    return (
      <div className="p-10">
        Cargando usuarios...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-red-500">
        Error cargando usuarios
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-4
          "
        >
          <div>
            <h1
              className="
                text-3xl
                font-bold
                dark:text-white
              "
            >
              Gestión de Usuarios
            </h1>

            <p
              className="
                text-zinc-500
                mt-2
              "
            >
              Administra usuarios del sistema
            </p>
          </div>

          <button
            className="
              h-12
              px-6
              rounded-2xl
              bg-slate-900
              text-white
              font-medium
            "
          >
            Nuevo Usuario
          </button>
        </div>

        {/* STATS */}
        <UserStatsCards
          users={users}
        />

        {/* FILTERS */}
        <UserFilters
          search={search}
          onSearch={setSearch}
          roleFilter={roleFilter}
          onRoleFilter={setRoleFilter}
        />

        {/* TABLE */}
        <UsersTable
          users={filteredUsers}
        />
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;