import { useState } from 'react';
import { Plus, X, Save } from 'lucide-react';

export default function Produccion({ animals, productionRecords, setProductionRecords }) {
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ date: new Date().toISOString().split('T')[0], animalId: '', morning: '', afternoon: '' });

  const todayRecords = productionRecords.filter(r => r.date === filterDate);
  const activeAnimals = animals.filter(a => a.status === 'Producción');

  const totalMorning = todayRecords.reduce((s, r) => s + r.morning, 0);
  const totalAfternoon = todayRecords.reduce((s, r) => s + r.afternoon, 0);
  const totalDay = todayRecords.reduce((s, r) => s + r.total, 0);

  const handleSave = () => {
    if (!form.animalId || !form.morning || !form.afternoon) return;
    const morning = Number(form.morning);
    const afternoon = Number(form.afternoon);
    const newRecord = {
      id: Date.now(),
      date: form.date,
      animalId: form.animalId,
      morning,
      afternoon,
      total: morning + afternoon,
    };
    setProductionRecords(prev => [...prev, newRecord]);
    const animal = animals.find(a => a.id === form.animalId);
    if (animal) {
      animal.lastProduction = morning + afternoon;
    }
    setForm({ date: new Date().toISOString().split('T')[0], animalId: '', morning: '', afternoon: '' });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar este registro?')) {
      setProductionRecords(prev => prev.filter(r => r.id !== id));
    }
  };

  const allDates = [...new Set(productionRecords.map(r => r.date))].sort().reverse();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Producción</h1>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} /> Registrar Ordeño
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-100 p-4">
          <p className="text-slate-500 text-xs mb-1">Mañana</p>
          <p className="text-2xl font-bold text-emerald-700">{totalMorning}L</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4">
          <p className="text-slate-500 text-xs mb-1">Tarde</p>
          <p className="text-2xl font-bold text-blue-700">{totalAfternoon}L</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4">
          <p className="text-slate-500 text-xs mb-1">Total día</p>
          <p className="text-2xl font-bold text-slate-900">{totalDay}L</p>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-700" />
        <span className="text-xs text-slate-400">{todayRecords.length} registro(s)</span>
      </div>
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        {todayRecords.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">Sin registros para esta fecha</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Animal</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Mañana</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Tarde</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Total</th>
                  <th className="text-right px-4 py-3 font-semibold text-slate-600">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {todayRecords.map(r => {
                  const animal = animals.find(a => a.id === r.animalId);
                  return (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">{animal?.name || r.animalId}</td>
                      <td className="px-4 py-3 text-slate-600">{r.morning}L</td>
                      <td className="px-4 py-3 text-slate-600">{r.afternoon}L</td>
                      <td className="px-4 py-3 font-semibold text-slate-900">{r.total}L</td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => handleDelete(r.id)} className="p-1 text-slate-400 hover:text-red-600 transition-colors"><X size={14} /></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {allDates.length > 0 && (
        <details className="bg-white rounded-xl border border-slate-100">
          <summary className="px-4 py-3 font-semibold text-sm text-slate-700 cursor-pointer hover:bg-slate-50 rounded-xl">Historial completo ({productionRecords.length} registros)</summary>
          <div className="overflow-x-auto border-t border-slate-100">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Fecha</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Animal</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Mañana</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Tarde</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {productionRecords.slice().reverse().map(r => {
                  const animal = animals.find(a => a.id === r.animalId);
                  return (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-500 font-mono text-xs">{new Date(r.date).toLocaleDateString('es-CO')}</td>
                      <td className="px-4 py-3 font-medium text-slate-900">{animal?.name || r.animalId}</td>
                      <td className="px-4 py-3 text-slate-600">{r.morning}L</td>
                      <td className="px-4 py-3 text-slate-600">{r.afternoon}L</td>
                      <td className="px-4 py-3 font-semibold text-slate-900">{r.total}L</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </details>
      )}
      {showForm && (
        <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-900">Registrar Ordeño</h2>
              <button onClick={() => setShowForm(false)} className="p-1 text-slate-400 hover:text-slate-600"><X size={18} /></button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Fecha</label>
                <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-700" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Animal</label>
                <select value={form.animalId} onChange={e => setForm({ ...form, animalId: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-700">
                  <option value="">Seleccionar...</option>
                  {activeAnimals.map(a => (
                    <option key={a.id} value={a.id}>{a.name} ({a.id})</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Mañana (L)</label>
                  <input type="number" min="0" step="0.5" value={form.morning} onChange={e => setForm({ ...form, morning: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-700" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Tarde (L)</label>
                  <input type="number" min="0" step="0.5" value={form.afternoon} onChange={e => setForm({ ...form, afternoon: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-700" />
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800">Cancelar</button>
              <button onClick={handleSave} className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <Save size={16} /> Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
