
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardHome from './components/DashboardHome';
import SchemaExplorer from './components/SchemaExplorer';
import CodeGenerator from './components/CodeGenerator';
import APIReference from './components/APIReference';
import { ViewState } from './types';

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
      case ViewState.APIReference:
        return <APIReference />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 ml-64 p-8 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
