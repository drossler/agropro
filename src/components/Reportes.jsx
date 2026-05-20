import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#059669', '#0891b2', '#d97706', '#dc2626', '#7c3aed', '#db2777'];

export default function Reportes({ animals, productionRecords }) {
  const [period, setPeriod] = useState('7d');

  const groupedByDate = {};
  productionRecords.forEach(r => {
    if (!groupedByDate[r.date]) groupedByDate[r.date] = { morning: 0, afternoon: 0, total: 0, count: 0 };
    groupedByDate[r.date].morning += r.morning;
    groupedByDate[r.date].afternoon += r.afternoon;
    groupedByDate[r.date].total += r.total;
    groupedByDate[r.date].count += 1;
  });

  const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
  const chartData = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const data = groupedByDate[dateStr] || { morning: 0, afternoon: 0, total: 0 };
    chartData.push({
      date: d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' }),
      ...data,
    });
  }

  const animalProduction = {};
  productionRecords.forEach(r => {
    if (!animalProduction[r.animalId]) animalProduction[r.animalId] = 0;
    animalProduction[r.animalId] += r.total;
  });

  const topAnimals = Object.entries(animalProduction)
    .map(([id, total]) => ({ id, name: animals.find(a => a.id === id)?.name || id, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 6);

  const totalProduced = productionRecords.reduce((s, r) => s + r.total, 0);
  const totalRecords = productionRecords.length;
  const avgPerRecord = totalRecords ? (totalProduced / totalRecords).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Reportes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-100 p-4">
          <p className="text-slate-500 text-xs mb-1">Total producido</p>
          <p className="text-2xl font-bold text-slate-900">{totalProduced}L</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4">
          <p className="text-slate-500 text-xs mb-1">Registros</p>
          <p className="text-2xl font-bold text-slate-900">{totalRecords}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4">
          <p className="text-slate-500 text-xs mb-1">Promedio por ordeño</p>
          <p className="text-2xl font-bold text-slate-900">{avgPerRecord}L</p>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900">Producción diaria</h2>
          <select value={period} onChange={e => setPeriod(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-700">
            <option value="7d">7 días</option>
            <option value="30d">30 días</option>
            <option value="90d">90 días</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
            <YAxis stroke="#94a3b8" fontSize={11} />
            <Tooltip contentStyle={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px' }} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Line type="monotone" dataKey="total" stroke="#059669" strokeWidth={2} dot={{ fill: '#059669', r: 3 }} name="Total" />
            <Line type="monotone" dataKey="morning" stroke="#0891b2" strokeWidth={2} dot={{ fill: '#0891b2', r: 3 }} name="Mañana" />
            <Line type="monotone" dataKey="afternoon" stroke="#d97706" strokeWidth={2} dot={{ fill: '#d97706', r: 3 }} name="Tarde" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {topAnimals.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <h2 className="text-base font-bold text-slate-900 mb-4">Top animales productores</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={topAnimals} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} width={80} />
                <Tooltip contentStyle={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="total" fill="#059669" radius={[0, 4, 4, 0]} name="Total (L)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <h2 className="text-base font-bold text-slate-900 mb-4">Distribución por raza</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={(() => {
                  const byBreed = {};
                  animals.forEach(a => {
                    if (!byBreed[a.breed]) byBreed[a.breed] = 0;
                    byBreed[a.breed] += 1;
                  });
                  return Object.entries(byBreed).map(([name, value]) => ({ name, value }));
                })()} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {Object.keys(animals.reduce((acc, a) => { acc[a.breed] = true; return acc; }, {})).map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
