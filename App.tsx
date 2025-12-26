
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardHome from './components/DashboardHome';
import SchemaExplorer from './components/SchemaExplorer';
import CodeGenerator from './components/CodeGenerator';
import { ViewState } from './types';
import { Bell, Search, Settings } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.Dashboard);

  const renderView = () => {
    switch (currentView) {
      case ViewState.Dashboard:
        return <DashboardHome />;
      case ViewState.SchemaExplorer:
        return <SchemaExplorer />;
      case ViewState.CodeGenerator:
        return <CodeGenerator />;
      case ViewState.UserManagement:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400 bg-white rounded-3xl border border-dashed border-slate-300">
            <Settings size={48} strokeWidth={1} className="mb-4 opacity-50" />
            <h2 className="text-lg font-bold">User Management Module</h2>
            <p>Connect to MongoDB Instance to populate users.</p>
          </div>
        );
      case ViewState.MediaLibrary:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400 bg-white rounded-3xl border border-dashed border-slate-300">
            <Settings size={48} strokeWidth={1} className="mb-4 opacity-50" />
            <h2 className="text-lg font-bold">Cloudinary Media Library</h2>
            <p>Ready to sync with 'bhamini-p1198' cloud preset.</p>
          </div>
        );
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 ml-64 p-8 max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-10 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200 sticky top-4 z-50 shadow-sm">
          <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 w-96">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search schemas, users, or logs..." 
              className="bg-transparent border-none outline-none text-sm w-full text-slate-700"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-6 w-px bg-slate-200 mx-2"></div>
            <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-slate-800 transition-colors shadow-sm">
              <span className="text-sm font-semibold">Node Status: Active</span>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            </button>
          </div>
        </header>

        <div className="pb-12">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
