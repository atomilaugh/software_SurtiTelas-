import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useAuth } from '@presentation/contexts/AuthContext';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';

const ClienteDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <DashboardLayout
      title="Dashboard Cliente"
      subtitle={`Bienvenido ${user?.name ?? 'Cliente'}. Aquí puedes revisar tu cuenta y pedidos.`}
    >
      <section className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Resumen</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">Tu experiencia de compra</h2>
            <p className="mt-2 text-slate-600">Explora el catálogo, revisa tu carrito y haz seguimiento de tus pedidos.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:bg-slate-100"
              onClick={() => navigate('/catalogo')}
            >
              <div className="flex items-center gap-3">
                <ShoppingCart size={20} />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Ir al catálogo</p>
                  <p className="text-sm text-slate-500">Explora productos y ofertas.</p>
                </div>
              </div>
            </button>

            <button
              type="button"
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:bg-slate-100"
              onClick={() => navigate('/carrito')}
            >
              <div className="flex items-center gap-3">
                <ArrowRight size={20} />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Ver carrito</p>
                  <p className="text-sm text-slate-500">Revisa tus artículos antes de pagar.</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Soporte</p>
          <div className="mt-5 space-y-4 text-slate-700">
            <p>Si necesitas ayuda con un pedido o quieres ver tus últimas compras, nuestro equipo está listo para asistirte.</p>
            <p className="font-semibold">Email: soporte@surtitelas.com</p>
            <p className="font-semibold">Teléfono: +57 300 123 4567</p>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default ClienteDashboard;
