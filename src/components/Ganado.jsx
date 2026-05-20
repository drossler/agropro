import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, X, Save } from 'lucide-react';

const breeds = ['Holstein', 'Jersey', 'Normando', 'Gyr', 'Cebú', 'Criollo'];
const statuses = ['Producción', 'Seca', 'Gestante', 'Enferma'];

const emptyAnimal = () => ({
  id: '',
  name: '',
  breed: 'Holstein',
  gender: 'F',
  birthDate: '',
  status: 'Producción',
  averageProduction: 0,
  lastProduction: 0,
  notes: '',
});

export default function Ganado({ animals, setAnimals }) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todas');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyAnimal());

  const filtered = animals.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
                        a.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'Todas' || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const openNew = () => {
    const nextNum = String(animals.length + 1).padStart(3, '0');
    setForm({ ...emptyAnimal(), id: `AGR-${nextNum}` });
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (animal) => {
    setForm({ ...animal });
    setEditingId(animal.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name || !form.id) return;
    if (editingId) {
      setAnimals(prev => prev.map(a => a.id === editingId ? { ...form } : a));
    } else {
      setAnimals(prev => [...prev, { ...form, lastProduction: form.averageProduction }]);
    }
    setShowForm(false);
    setForm(emptyAnimal());
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar este animal?')) {
      setAnimals(prev => prev.filter(a => a.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Ganado</h1>
        <button onClick={openNew} className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} /> Nuevo Animal
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nombre o ID..." className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-700" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-700">
          <option value="Todas">Todas</option>
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">No hay animales registrados</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">ID</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Nombre</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Raza</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Estado</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Promedio</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Última</th>
                  <th className="text-right px-4 py-3 font-semibold text-slate-600">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(a => (
                  <tr key={a.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{a.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{a.name}</td>
                    <td className="px-4 py-3 text-slate-600">{a.breed}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        a.status === 'Producción' ? 'bg-emerald-100 text-emerald-700' :
                        a.status === 'Gestante' ? 'bg-blue-100 text-blue-700' :
                        a.status === 'Seca' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>{a.status}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{a.averageProduction}L</td>
                    <td className="px-4 py-3 text-slate-600">{a.lastProduction}L</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => openEdit(a)} className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"><Edit2 size={14} /></button>
                      <button onClick={() => handleDelete(a.id)} className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-900">{editingId ? 'Editar Animal' : 'Nuevo Animal'}</h2>
              <button onClick={() => setShowForm(false)} className="p-1 text-slate-400 hover:text-slate-600"><X size={18} /></button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">ID</label>
                  <input type="text" value={form.id} onChange={e => setForm({ ...form, id: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-700" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Nombre</label>
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-700" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Raza</label>
                  <select value={form.breed} onChange={e => setForm({ ...form, breed: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-700">
                    {breeds.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Sexo</label>
                  <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-700">
                    <option value="F">Hembra</option>
                    <option value="M">Macho</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Fecha de nacimiento</label>
                <input type="date" value={form.birthDate} onChange={e => setForm({ ...form, birthDate: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-700" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Estado</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-700">
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Producción promedio (L)</label>
                  <input type="number" value={form.averageProduction} onChange={e => setForm({ ...form, averageProduction: Number(e.target.value) })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-700" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Notas</label>
                <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={2} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-700" />
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
