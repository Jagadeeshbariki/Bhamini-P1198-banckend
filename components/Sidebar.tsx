
import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, Users, Image as ImageIcon, Database, Code2, ShieldCheck, Globe } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: ViewState.Dashboard, label: 'Dashboard', icon: LayoutDashboard },
    { id: ViewState.UserManagement, label: 'User Controls', icon: Users },
    { id: ViewState.MediaLibrary, label: 'Media Library', icon: ImageIcon },
    { id: ViewState.SchemaExplorer, label: 'Schema Explorer', icon: Database },
    { id: ViewState.CodeGenerator, label: 'Backend Code', icon: Code2 },
    { id: ViewState.APIReference, label: 'API Reference', icon: Globe },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3 border-b border-slate-100">
        <div className="bg-indigo-600 p-2 rounded-lg text-white">
          <ShieldCheck size={24} />
        </div>
        <div>
          <h1 className="font-bold text-slate-800 leading-none">Bhamini</h1>
          <span className="text-xs text-slate-500 font-medium tracking-wider">P1198 ADMIN</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-indigo-50 text-indigo-600 font-semibold' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
              <span>{item.label}</span>
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600"></div>}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3">
          <img src="https://picsum.photos/40/40?random=1" className="w-10 h-10 rounded-full border border-white shadow-sm" alt="Admin" />
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-slate-800 truncate">S. K. Bhamini</p>
            <p className="text-xs text-slate-500 truncate">System Architect</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
