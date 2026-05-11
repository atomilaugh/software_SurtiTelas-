import { Bell, Search, ChevronDown, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <header className="mb-8 flex flex-col gap-4 rounded-[32px] border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{subtitle}</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-950">{title}</h2>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-72">
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Buscar pedidos, clientes o rutas"
            className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-400 focus:bg-white"
          />
        </div>
        <button
          type="button"
          onClick={() => setDarkMode((prev) => !prev)}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          {darkMode ? 'Claro' : 'Dark'}
        </button>
        <button type="button" className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-white shadow-lg shadow-slate-950/20 transition hover:bg-slate-800">
          <Bell size={20} />
        </button>
      </div>
    </header>
  );
};
