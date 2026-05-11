import React from 'react';

interface HeaderProps {
  moduleName: string;
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ moduleName, userName }) => (
  <header className="border-b border-slate-200 bg-white py-5 px-6 shadow-sm sm:px-8">
    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{moduleName}</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-950">Dashboard</h1>
      </div>
      <div className="inline-flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-sm font-bold uppercase text-white shadow">A</div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{userName}</p>
          <p className="text-sm text-slate-500">Administrador</p>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
