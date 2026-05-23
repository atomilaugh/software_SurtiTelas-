import { useMemo, useState } from "react";
import DashboardLayout from "../dashboard/components/layout/DashboardLayout";
import { useUsers } from "./hooks/useUsers";
import UserStatsCards from "./components/UserStatsCards";
import UserFilters from "./components/UserFilters";
import UsersTable from "./components/UsersTable";

const UsersPage = () => {
  const { data: users = [] } = useUsers();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const filteredUsers = useMemo(() =>
    users.filter((user: any) => {
      const matchesSearch = user.fullName.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter ? user.role === roleFilter : true;
      return matchesSearch && matchesRole;
    }),
    [users, search, roleFilter]
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold dark:text-white">Gestión de Usuarios</h1>
            <p className="text-zinc-500 mt-2">Administra usuarios del sistema</p>
          </div>
          <button className="h-12 px-6 rounded-2xl bg-slate-900 text-white font-medium">Nuevo Usuario</button>
        </div>
        <UserStatsCards users={users} />
        <UserFilters search={search} onSearch={setSearch} roleFilter={roleFilter} onRoleFilter={setRoleFilter} />
        <UsersTable users={filteredUsers} />
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;