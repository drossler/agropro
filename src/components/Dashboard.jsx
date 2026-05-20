import { Droplet, TrendingUp, Tractor, AlertTriangle, Milk } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard({ animals, productionRecords }) {
  const today = new Date().toISOString().split('T')[0];
  const todayRecords = productionRecords.filter(r => r.date === today);
  const totalToday = todayRecords.reduce((s, r) => s + r.total, 0);

  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayRecords = productionRecords.filter(r => r.date === dateStr);
    const total = dayRecords.reduce((s, r) => s + r.total, 0);
    return {
      date: d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' }),
      Total: total,
      Mañana: dayRecords.reduce((s, r) => s + r.morning, 0),
      Tarde: dayRecords.reduce((s, r) => s + r.afternoon, 0),
    };
  }).reverse();

  const weeklyAvg = last7Days.length ? Math.round(last7Days.reduce((s, d) => s + d.Total, 0) / last7Days.length) : 0;

  const activeCows = animals.filter(a => a.status === 'Producción').length;

  const bestCow = [...animals].sort((a, b) => b.averageProduction - a.averageProduction)[0];

  const recentAlerts = productionRecords.filter(r => {
    const animal = animals.find(a => a.id === r.animalId);
    return animal && r.total < animal.averageProduction * 0.5;
  }).slice(-3);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Droplet size={20} className="text-emerald-700" />
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">Hoy</span>
          </div>
          <p className="text-slate-500 text-xs mb-1">Litros producidos</p>
          <p className="text-3xl font-bold text-slate-900">{totalToday}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-blue-700" />
            </div>
          </div>
          <p className="text-slate-500 text-xs mb-1">Promedio semanal</p>
          <p className="text-3xl font-bold text-slate-900">{weeklyAvg}L</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Tractor size={20} className="text-amber-700" />
            </div>
          </div>
          <p className="text-slate-500 text-xs mb-1">Vacas activas</p>
          <p className="text-3xl font-bold text-slate-900">{activeCows}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Milk size={20} className="text-purple-700" />
            </div>
          </div>
          <p className="text-slate-500 text-xs mb-1">Mejor vaca</p>
          <p className="text-xl font-bold text-slate-900">{bestCow ? bestCow.name : '—'}</p>
          <p className="text-xs text-slate-400">{bestCow ? `${bestCow.averageProduction}L promedio` : ''}</p>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-100 p-5">
        <h2 className="text-base font-bold text-slate-900 mb-4">Producción últimos 7 días</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={last7Days}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip contentStyle={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px' }} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="Mañana" fill="#059669" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Tarde" fill="#0891b2" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {recentAlerts.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center gap-2 text-amber-800 mb-2">
            <AlertTriangle size={16} />
            <span className="font-semibold text-sm">Alertas de producción baja</span>
          </div>
          {recentAlerts.map((r, i) => {
            const animal = animals.find(a => a.id === r.animalId);
            return (
              <p key={i} className="text-xs text-amber-700 ml-6">
                {animal?.name || r.animalId} — solo {r.total}L el {new Date(r.date).toLocaleDateString('es-CO')}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}
