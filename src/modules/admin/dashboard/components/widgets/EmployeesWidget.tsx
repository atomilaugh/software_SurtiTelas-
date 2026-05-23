import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const TEAM = [
  { name: 'Lucía Morales',  role: 'Asesor Senior',  sales: 18, growth: 12,  colors: ['#8b5cf6', '#6366f1'] },
  { name: 'Luis García',    role: 'Asesor Ventas',  sales: 15, growth: 8,   colors: ['#10b981', '#06b6d4'] },
  { name: 'Carmen Silva',   role: 'Asesor Ventas',  sales: 12, growth: -2,  colors: ['#f59e0b', '#f97316'] },
  { name: 'Roberto Díaz',   role: 'Supervisor',     sales: 8,  growth: 5,   colors: ['#ef4444', '#ec4899'] },
];

const EmployeesWidget = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.3, ease: 'easeOut' }}
    className="card p-5"
  >
    <div className="flex items-center gap-2.5 mb-4">
      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.1)' }}>
        <Trophy size={13} style={{ color: '#f59e0b' }} />
      </div>
      <div>
        <p className="text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>Top Asesores</p>
        <p className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>Este mes</p>
      </div>
    </div>

    <div className="space-y-2.5">
      {TEAM.map((p, i) => {
        const pct = (p.sales / TEAM[0].sales) * 100;
        const up  = p.growth > 0;
        return (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.22, delay: 0.35 + i * 0.07 }}
            className="flex items-center gap-2.5 p-2 rounded-xl transition-all duration-150"
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-subtle)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            {/* Rank */}
            <span
              className="text-[10.5px] font-bold w-4 text-center shrink-0"
              style={{ color: i === 0 ? '#f59e0b' : 'var(--text-tertiary)' }}
            >
              {i + 1}
            </span>

            {/* Avatar */}
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center text-white text-[10px] font-bold shrink-0"
              style={{ background: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})` }}
            >
              {p.name[0]}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{p.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'var(--bg-muted)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.7, delay: 0.45 + i * 0.08, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${p.colors[0]}, ${p.colors[1]})` }}
                  />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="text-right shrink-0">
              <p className="text-[12.5px] font-bold font-tabular" style={{ color: 'var(--text-primary)' }}>{p.sales}</p>
              <p className={`text-[10px] font-medium ${up ? 'text-emerald-500' : 'text-red-500'}`}>
                {up ? '+' : ''}{p.growth}%
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  </motion.div>
);

export default EmployeesWidget;
