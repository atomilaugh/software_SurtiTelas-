import { useState } from 'react';
import DashboardLayout from '../../dashboard/components/layout/DashboardLayout';
import { Card, Button, Input, Select, Alert, Tabs } from '@/shared/ui';
import { useTheme } from '@presentation/contexts/ThemeContext';
import { Sun, Moon, Building2, Bell, Shield, Percent, Palette, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const TABS = [
  { id: 'empresa', label: 'Empresa', icon: <Building2 size={14} /> },
  { id: 'notificaciones', label: 'Notificaciones', icon: <Bell size={14} /> },
  { id: 'impuestos', label: 'Impuestos', icon: <Percent size={14} /> },
  { id: 'seguridad', label: 'Seguridad', icon: <Shield size={14} /> },
  { id: 'tema', label: 'Tema', icon: <Palette size={14} /> },
];

const EmpresaTab = () => {
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); toast.success('Configuración guardada'); setTimeout(() => setSaved(false), 2000); };
  return (
    <div className="space-y-4 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Nombre de la empresa" defaultValue="SurtiCamisetas S.A.S" />
        <Input label="NIT" defaultValue="900123456-1" />
        <Input label="Email de contacto" defaultValue="info@surticamisetas.com" type="email" />
        <Input label="Teléfono" defaultValue="(604) 123-4567" />
        <Input label="Ciudad" defaultValue="Medellín" />
        <Input label="Departamento" defaultValue="Antioquia" />
      </div>
      <Input label="Dirección" defaultValue="Cra 15 #45-20, Centro Comercial Textil" />
      <Button onClick={handleSave} leftIcon={<Save size={14} />}>{saved ? '¡Guardado!' : 'Guardar cambios'}</Button>
    </div>
  );
};

const NotificacionesTab = () => {
  const [settings, setSettings] = useState({ stockBajo: true, nuevoPedido: true, pedidoEntregado: true, clienteNuevo: false, reporteDiario: true });
  const toggle = (key: keyof typeof settings) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  return (
    <div className="space-y-4 max-w-lg">
      {Object.entries(settings).map(([key, value]) => {
        const labels: Record<string, string> = { stockBajo: 'Alerta de stock bajo', nuevoPedido: 'Nuevo pedido recibido', pedidoEntregado: 'Pedido entregado', clienteNuevo: 'Nuevo cliente registrado', reporteDiario: 'Reporte diario' };
        return (
          <div key={key} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-zinc-800 rounded-xl">
            <span className="text-sm font-medium text-slate-900 dark:text-white">{labels[key]}</span>
            <button
              onClick={() => toggle(key as keyof typeof settings)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${value ? 'bg-slate-900 dark:bg-white' : 'bg-slate-200 dark:bg-zinc-700'}`}
            >
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white dark:bg-zinc-900 transition-transform duration-200 ${value ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        );
      })}
      <Button onClick={() => toast.success('Notificaciones guardadas')} leftIcon={<Save size={14} />}>Guardar</Button>
    </div>
  );
};

const ImpuestosTab = () => (
  <div className="space-y-4 max-w-md">
    <Alert variant="info" title="Configuración de impuestos">
      Configura los impuestos que aplican a tus ventas. Estos se calcularán automáticamente en cada pedido.
    </Alert>
    <div className="grid grid-cols-2 gap-4">
      <Input label="IVA (%)" defaultValue="19" type="number" />
      <Input label="ICA (%)" defaultValue="0" type="number" />
    </div>
    <Select label="Régimen tributario" options={[{ value: 'simplificado', label: 'Régimen Simplificado' }, { value: 'comun', label: 'Régimen Común' }]} defaultValue="simplificado" />
    <Button onClick={() => toast.success('Impuestos guardados')} leftIcon={<Save size={14} />}>Guardar</Button>
  </div>
);

const SeguridadTab = () => (
  <div className="space-y-4 max-w-md">
    <Alert variant="warning" title="Cambio de contraseña">
      Asegúrate de usar una contraseña segura de al menos 8 caracteres.
    </Alert>
    <Input label="Contraseña actual" type="password" placeholder="••••••••" />
    <Input label="Nueva contraseña" type="password" placeholder="••••••••" />
    <Input label="Confirmar contraseña" type="password" placeholder="••••••••" />
    <Button onClick={() => toast.success('Contraseña actualizada')} leftIcon={<Save size={14} />}>Actualizar contraseña</Button>
  </div>
);

const TemaTab = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="space-y-4 max-w-md">
      <p className="text-sm text-slate-600 dark:text-zinc-400">Selecciona el tema de la interfaz administrativa.</p>
      <div className="grid grid-cols-2 gap-4">
        {(['light', 'dark'] as const).map((t) => (
          <button
            key={t}
            onClick={() => t !== theme && toggleTheme()}
            className={`p-4 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center gap-3 ${theme === t ? 'border-slate-900 dark:border-white bg-slate-50 dark:bg-zinc-800' : 'border-slate-200 dark:border-zinc-700 hover:border-slate-400 dark:hover:border-zinc-500'}`}
          >
            {t === 'light' ? <Sun size={24} className="text-amber-500" /> : <Moon size={24} className="text-indigo-400" />}
            <span className="text-sm font-medium text-slate-900 dark:text-white capitalize">{t === 'light' ? 'Claro' : 'Oscuro'}</span>
            {theme === t && <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Activo</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

const SettingsPage = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Configuración</h1>
        <p className="text-slate-500 dark:text-zinc-400 mt-1">Administra la configuración del sistema</p>
      </div>
      <Card>
        <Tabs tabs={TABS}>
          {(active) => (
            <div className="mt-2">
              {active === 'empresa' && <EmpresaTab />}
              {active === 'notificaciones' && <NotificacionesTab />}
              {active === 'impuestos' && <ImpuestosTab />}
              {active === 'seguridad' && <SeguridadTab />}
              {active === 'tema' && <TemaTab />}
            </div>
          )}
        </Tabs>
      </Card>
    </div>
  </DashboardLayout>
);

export default SettingsPage;
