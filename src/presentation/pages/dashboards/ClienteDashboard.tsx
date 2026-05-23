import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useAuth } from '@presentation/contexts/AuthContext';

const ClienteDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Dashboard Cliente</h1>
      <p className="text-slate-500 dark:text-zinc-400 mb-8">Bienvenido {user?.email ?? 'Cliente'}.</p>
      <div className="grid gap-4 sm:grid-cols-2 max-w-xl">
        <button onClick={() => navigate('/catalogo')} className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 text-left hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <ShoppingCart size={20} className="text-slate-600 dark:text-zinc-400" />
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Ir al catálogo</p>
              <p className="text-sm text-slate-500 dark:text-zinc-400">Explora productos y ofertas.</p>
            </div>
          </div>
        </button>
        <button onClick={() => navigate('/carrito')} className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 text-left hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <ArrowRight size={20} className="text-slate-600 dark:text-zinc-400" />
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Ver carrito</p>
              <p className="text-sm text-slate-500 dark:text-zinc-400">Revisa tus artículos.</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ClienteDashboard;
