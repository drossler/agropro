import { LayoutDashboard, Tractor, Milk, BarChart3, Bell, LogOut } from 'lucide-react';

const sections = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'ganado', label: 'Ganado', icon: Tractor },
  { id: 'produccion', label: 'Producción', icon: Milk },
  { id: 'reportes', label: 'Reportes', icon: BarChart3 },
  { id: 'alertas', label: 'Alertas', icon: Bell },
];

export default function Sidebar({ currentSection, onNavigate, onLogout, isOpen, onToggle }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-20 lg:hidden" onClick={onToggle} />
      )}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:block
        flex flex-col
      `}>
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-700 rounded-xl flex items-center justify-center flex-shrink-0">
              <Tractor size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">AgroPro</h1>
              <p className="text-xs text-slate-500">Gestión Ganadera</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {sections.map(sec => {
            const Icon = sec.icon;
            return (
              <button
                key={sec.id}
                onClick={() => { onNavigate(sec.id); onToggle(); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  currentSection === sec.id
                    ? 'bg-emerald-700 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon size={18} />
                {sec.label}
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-slate-100">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>
      </aside>
    </>
  );
}
