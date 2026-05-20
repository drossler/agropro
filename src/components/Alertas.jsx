import { useState } from 'react';
import { Bell, AlertTriangle, Plus, X, Check, Circle } from 'lucide-react';

const alertTypes = [
  { value: 'salud', label: 'Salud', color: 'red' },
  { value: 'produccion', label: 'Producción', color: 'amber' },
  { value: 'reproduccion', label: 'Reproducción', color: 'blue' },
];

const severityLabels = { alta: 'Alta', media: 'Media', baja: 'Baja' };
const severityColors = { alta: 'red', media: 'amber', baja: 'blue' };
const typeColors = { salud: 'red', produccion: 'amber', reproduccion: 'blue' };

export default function Alertas({ alerts, setAlerts, animals, productionRecords }) {
  const [showForm, setShowForm] = useState(false);
  const [filterType, setFilterType] = useState('todas');
  const [filterResolved, setFilterResolved] = useState('todas');
  const [form, setForm] = useState({ type: 'salud', title: '', description: '', severity: 'media', animalId: '' });

  const generateAutoAlerts = () => {
    const newAlerts = [];
    const today = new Date().toISOString().split('T')[0];

    productionRecords.forEach(r => {
      if (r.date === today) {
        const animal = animals.find(a => a.id === r.animalId);
        if (animal && r.total < animal.averageProduction * 0.5) {
          newAlerts.push({
            id: Date.now() + Math.random(),
            type: 'produccion',
            title: `Baja producción: ${animal.name}`,
            description: `${animal.name} produjo solo ${r.total}L (promedio: ${animal.averageProduction}L)`,
            date: today,
            severity: 'alta',
            resolved: false,
          });
        }
      }
    });

    animals.forEach(a => {
      if (a.status === 'Enferma') {
        const exists = alerts.some(al => al.title?.includes(a.name) && al.type === 'salud');
        if (!exists) {
          newAlerts.push({
            id: Date.now() + Math.random() + 1,
            type: 'salud',
            title: `Animal enfermo: ${a.name}`,
            description: `${a.name} (${a.id}) está marcado como enfermo. Requiere atención.`,
            date: today,
            severity: 'alta',
            resolved: false,
          });
        }
      }
    });

    return newAlerts;
  };

  const autoAlerts = generateAutoAlerts();

  const allAlerts = [...autoAlerts.filter(a => !alerts.some(al => al.id === a.id)), ...alerts];

  const filtered = allAlerts.filter(a => {
    if (filterType !== 'todas' && a.type !== filterType) return false;
    if (filterResolved === 'activas' && a.resolved) return false;
    if (filterResolved === 'resueltas' && !a.resolved) return false;
    return true;
  });

  const handleAddAlert = () => {
    if (!form.title) return;
    setAlerts(prev => [...prev, {
      ...form,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      resolved: false,
    }]);
    setForm({ type: 'salud', title: '', description: '', severity: 'media', animalId: '' });
    setShowForm(false);
  };

  const toggleResolved = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: !a.resolved } : a));
  };

  const deleteAlert = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const activeCount = allAlerts.filter(a => !a.resolved).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900">Alertas</h1>
          {activeCount > 0 && (
            <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full">{activeCount} activas</span>
          )}
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} /> Nueva Alerta
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-700">
          <option value="todas">Todos los tipos</option>
          {alertTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        <select value={filterResolved} onChange={e => setFilterResolved(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-700">
          <option value="todas">Todas</option>
          <option value="activas">Activas</option>
          <option value="resueltas">Resueltas</option>
        </select>
      </div>
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-100 p-8 text-center text-slate-400 text-sm">No hay alertas</div>
        ) : (
          filtered.map(a => {
            const tColor = typeColors[a.type] || 'slate';
            const bgColor = a.resolved ? 'bg-slate-50 border-slate-200' : `bg-${tColor}-50 border-${tColor}-200`;
            const dotColor = a.resolved ? 'text-slate-300' : `text-${tColor}-500`;
            return (
              <div key={a.id} className={`bg-white rounded-xl border border-slate-100 p-4 ${a.resolved ? 'opacity-60' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 ${dotColor}`}>
                    {a.resolved ? <Circle size={16} /> : <Bell size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-slate-900">{a.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        a.severity === 'alta' ? 'bg-red-100 text-red-700' :
                        a.severity === 'media' ? 'bg-amber-100 text-amber-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>{severityLabels[a.severity]}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        a.type === 'salud' ? 'bg-red-100 text-red-700' :
                        a.type === 'produccion' ? 'bg-amber-100 text-amber-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>{alertTypes.find(t => t.value === a.type)?.label}</span>
                    </div>
                    {a.description && <p className="text-xs text-slate-500 mb-1">{a.description}</p>}
                    <p className="text-xs text-slate-400">{new Date(a.date).toLocaleDateString('es-CO')}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => toggleResolved(a.id)} className={`p-1.5 rounded-lg transition-colors ${a.resolved ? 'text-slate-400 hover:text-slate-600' : 'text-emerald-600 hover:bg-emerald-50'}`} title={a.resolved ? 'Reactivar' : 'Resolver'}>
                      <Check size={14} />
                    </button>
                    <button onClick={() => deleteAlert(a.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-900">Nueva Alerta</h2>
              <button onClick={() => setShowForm(false)} className="p-1 text-slate-400 hover:text-slate-600"><X size={18} /></button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Título</label>
                <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Ej: Vaca con fiebre" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-700" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Descripción</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} placeholder="Describe el detalle de la alerta..." className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-700" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Tipo</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-700">
                    {alertTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Severidad</label>
                  <select value={form.severity} onChange={e => setForm({ ...form, severity: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-700">
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Animal relacionado (opcional)</label>
                <select value={form.animalId} onChange={e => setForm({ ...form, animalId: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-700">
                  <option value="">Ninguno</option>
                  {animals.map(a => <option key={a.id} value={a.id}>{a.name} ({a.id})</option>)}
                </select>
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800">Cancelar</button>
              <button onClick={handleAddAlert} className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <Plus size={16} /> Crear Alerta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
