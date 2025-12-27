
import React from 'react';
import { BackendStat } from '../types';
import { ArrowUpRight, ArrowDownRight, Users, Image as ImageIcon, Server, Activity, AlertCircle, ShieldAlert, ArrowRight, CheckCircle } from 'lucide-react';

const stats: BackendStat[] = [
  { label: 'Total Users', value: '1,284', change: '+12%', trend: 'up' },
  { label: 'Cloudinary Storage', value: '42.8 GB', change: '+5.4 GB', trend: 'up' },
  { label: 'Mongo Records', value: '12,402', change: '-2%', trend: 'down' },
  { label: 'API Uptime', value: '99.99%', change: 'Stable', trend: 'up' },
];

const DashboardHome: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">System Overview</h2>
          <p className="text-slate-500">Real-time status of Bhamini-P1198 Cluster.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-100 text-xs font-bold">
          <CheckCircle size={14} /> System Health: Optimal
        </div>
      </header>

      {/* Critical MongoDB IP Alert */}
      <section className="bg-amber-50 border border-amber-200 rounded-3xl p-6 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
          <ShieldAlert size={80} />
        </div>
        <div className="flex items-start gap-5 relative z-10">
          <div className="bg-amber-500 p-3 rounded-2xl text-white shadow-lg shadow-amber-500/20">
            <AlertCircle size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-amber-900 mb-1">Missing MongoDB Whitelist?</h3>
            <p className="text-amber-700 text-sm mb-4 max-w-2xl leading-relaxed">
              If your API requests time out, MongoDB Atlas is likely blocking Render. 
              You must add <code className="bg-white px-1.5 rounded font-bold border border-amber-200">0.0.0.0/0</code> to your <b>Network Access</b>.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://cloud.mongodb.com/" 
                target="_blank" 
                className="inline-flex items-center gap-2 bg-amber-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-amber-700 transition-colors"
              >
                Open Atlas Settings <ArrowRight size={14} />
              </a>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-amber-200 text-[10px] font-mono font-bold text-amber-800">
                IP: 0.0.0.0/0 (Global Access)
              </div>
            </div>
          </div>
        </div>
      </section>

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
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">Database Throughput</h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-200">Live Stream</span>
          </div>
          <div className="h-64 bg-slate-50 rounded-xl flex items-center justify-center border border-dashed border-slate-300 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent"></div>
             <div className="text-center relative z-10">
                <p className="text-slate-400 font-medium">Real-time Cluster Metrics</p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter">(Integrated with MongoDB Atlas streams-v1)</p>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-slate-100 group">
                <div className="relative">
                  <img src={`https://picsum.photos/50/50?random=${i}`} className="w-10 h-10 rounded-xl object-cover" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">Asset_{4280 + i}.png</p>
                  <p className="text-[10px] text-slate-500 font-mono">cld_v3_x{i}82</p>
                </div>
                <div className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">{i}m ago</div>
              </div>
            ))}
            <button className="w-full py-3 text-xs font-bold text-indigo-600 bg-indigo-50/50 hover:bg-indigo-600 hover:text-white rounded-xl transition-all mt-2 border border-indigo-100">
              Launch Media Library
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
