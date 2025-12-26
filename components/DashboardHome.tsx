
import React from 'react';
import { BackendStat } from '../types';
import { ArrowUpRight, ArrowDownRight, Users, Image as ImageIcon, Server, Activity } from 'lucide-react';

const stats: BackendStat[] = [
  { label: 'Total Users', value: '1,284', change: '+12%', trend: 'up' },
  { label: 'Cloudinary Storage', value: '42.8 GB', change: '+5.4 GB', trend: 'up' },
  { label: 'Mongo Records', value: '12,402', change: '-2%', trend: 'down' },
  { label: 'API Uptime', value: '99.99%', change: 'Stable', trend: 'up' },
];

const DashboardHome: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">System Overview</h2>
        <p className="text-slate-500">Real-time monitoring of Bhamini-P1198's backend cluster.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg ${
                stat.label.includes('Users') ? 'bg-blue-50 text-blue-600' :
                stat.label.includes('Storage') ? 'bg-purple-50 text-purple-600' :
                stat.label.includes('Mongo') ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
              }`}>
                {stat.label.includes('Users') && <Users size={20} />}
                {stat.label.includes('Storage') && <ImageIcon size={20} />}
                {stat.label.includes('Mongo') && <Server size={20} />}
                {stat.label.includes('API') && <Activity size={20} />}
              </div>
              <span className={`flex items-center text-xs font-bold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Database Throughput</h3>
          <div className="h-64 bg-slate-50 rounded-xl flex items-center justify-center border border-dashed border-slate-300">
             <div className="text-center">
                <p className="text-slate-400 font-medium">Real-time Throughput Graph Visualization</p>
                <p className="text-xs text-slate-400 mt-1">(Integrated with MongoDB Atlas Streams)</p>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Uploads</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                <img src={`https://picsum.photos/50/50?random=${i}`} className="w-10 h-10 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">Asset_{4280 + i}.png</p>
                  <p className="text-xs text-slate-500">Cloudinary ID: cld_v3_x{i}82</p>
                </div>
                <div className="text-xs font-medium text-slate-400">2m ago</div>
              </div>
            ))}
            <button className="w-full py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors mt-2">
              View All Media
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
