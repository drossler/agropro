import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Ganado from './components/Ganado';
import Produccion from './components/Produccion';
import Reportes from './components/Reportes';
import Alertas from './components/Alertas';

const STORAGE_KEYS = {
  animals: 'agropro_animals',
  production: 'agropro_production',
  alerts: 'agropro_alerts',
};

function loadData(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

const defaultAnimals = [
  { id: 'HOL-001', name: 'Florencia', breed: 'Holstein', gender: 'F', birthDate: '2020-03-15', status: 'Producción', averageProduction: 28, lastProduction: 32, notes: '' },
  { id: 'HOL-002', name: 'Mariana', breed: 'Holstein', gender: 'F', birthDate: '2021-06-20', status: 'Producción', averageProduction: 26, lastProduction: 25, notes: '' },
  { id: 'JER-001', name: 'Candela', breed: 'Jersey', gender: 'F', birthDate: '2019-11-10', status: 'Producción', averageProduction: 18, lastProduction: 20, notes: '' },
  { id: 'HOL-003', name: 'Lucía', breed: 'Holstein', gender: 'F', birthDate: '2022-01-05', status: 'Gestante', averageProduction: 0, lastProduction: 22, notes: 'Parto esperado en agosto' },
  { id: 'NOR-001', name: 'Rosa', breed: 'Normando', gender: 'F', birthDate: '2020-09-18', status: 'Seca', averageProduction: 20, lastProduction: 18, notes: '' },
  { id: 'JER-002', name: 'Estrella', breed: 'Jersey', gender: 'F', birthDate: '2021-12-01', status: 'Producción', averageProduction: 22, lastProduction: 24, notes: '' },
];

const defaultProduction = [];
for (let i = 6; i >= 0; i--) {
  const d = new Date();
  d.setDate(d.getDate() - i);
  const dateStr = d.toISOString().split('T')[0];
  defaultProduction.push({ id: i * 2, date: dateStr, animalId: 'HOL-001', morning: 15, afternoon: 13, total: 28 });
  defaultProduction.push({ id: i * 2 + 1, date: dateStr, animalId: 'HOL-002', morning: 14, afternoon: 12, total: 26 });
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [animals, setAnimals] = useState(() => loadData(STORAGE_KEYS.animals, defaultAnimals));
  const [productionRecords, setProductionRecords] = useState(() => loadData(STORAGE_KEYS.production, defaultProduction));
  const [alerts, setAlerts] = useState(() => loadData(STORAGE_KEYS.alerts, []));

  useEffect(() => { localStorage.setItem(STORAGE_KEYS.animals, JSON.stringify(animals)); }, [animals]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.production, JSON.stringify(productionRecords)); }, [productionRecords]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.alerts, JSON.stringify(alerts)); }, [alerts]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
    setCurrentSection('dashboard');
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard': return <Dashboard animals={animals} productionRecords={productionRecords} />;
      case 'ganado': return <Ganado animals={animals} setAnimals={setAnimals} />;
      case 'produccion': return <Produccion animals={animals} productionRecords={productionRecords} setProductionRecords={setProductionRecords} />;
      case 'reportes': return <Reportes animals={animals} productionRecords={productionRecords} />;
      case 'alertas': return <Alertas animals={animals} productionRecords={productionRecords} alerts={alerts} setAlerts={setAlerts} />;
      default: return <Dashboard animals={animals} productionRecords={productionRecords} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-700 rounded-2xl mb-4">
              <span className="text-3xl">🐄</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">AgroPro</h1>
            <p className="text-lg text-emerald-700 font-medium">La finca en tu bolsillo</p>
          </div>
          <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Correo</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="correo@finca.com" className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-emerald-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Contraseña</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-emerald-700" />
            </div>
            <button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-lg">Ingresar</button>
          </form>
          <p className="text-center text-sm text-slate-600 mt-6">Cualquier correo y contraseña</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar currentSection={currentSection} onNavigate={setCurrentSection} onLogout={handleLogout} isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-slate-900">AgroPro</span>
            <span className="text-xs text-slate-400 capitalize">/{currentSection}</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
