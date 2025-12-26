
import React from 'react';
import { Copy, Terminal, Server, ShieldCheck, Database, Cloud, CheckCircle, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const envVars = [
    { key: 'PORT', value: '5000', desc: 'Port the server binds to' },
    { key: 'MONGO_URI', value: 'mongodb+srv://Jagadeesh:P1198@cluster0.zfagv3c.mongodb.net/?appName=Cluster0', desc: 'MongoDB Atlas Connection String' },
    { key: 'CLOUDINARY_CLOUD_NAME', value: 'dbohmpxko', desc: 'Cloudinary Account Name' },
    { key: 'CLOUDINARY_API_KEY', value: '829126349486959', desc: 'Cloudinary Key' },
    { key: 'CLOUDINARY_API_SECRET', value: 'WX3TeoeR9rnpHmxPt3qADRAglwo', desc: 'Cloudinary Secret' },
    { key: 'JWT_SECRET', value: 'Bhamini_P1198_Auth_2024', desc: 'Used for securing login tokens' },
  ];

  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 md:p-12 font-sans selection:bg-indigo-500/30">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row items-start md:items-center gap-6 border-b border-slate-800 pb-10">
          <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-4 rounded-3xl shadow-lg shadow-indigo-500/20">
            <Server size={40} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Bhamini-P1198 Backend</h1>
            <p className="text-slate-400 text-lg">Structured for Production Deployment on Render.com</p>
          </div>
        </header>

        <section className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-8 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
              <ShieldCheck className="text-indigo-400" /> Required Environment Variables
            </h2>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 bg-slate-800 px-3 py-1 rounded-full">
              Production Env
            </span>
          </div>
          
          <div className="space-y-4">
            {envVars.map((env) => (
              <div key={env.key} className="flex flex-col md:flex-row md:items-center justify-between bg-[#1e293b]/50 p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/30 transition-all group">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-indigo-400 font-mono font-bold text-sm">{env.key}</span>
                    <span className="text-[10px] text-slate-500 font-medium px-2 py-0.5 bg-slate-800 rounded uppercase tracking-tighter">Required</span>
                  </div>
                  <div className="font-mono text-xs text-slate-300 break-all bg-black/20 p-2 rounded-lg mt-2 mb-1">
                    {env.value}
                  </div>
                  <p className="text-[10px] text-slate-500 italic">{env.desc}</p>
                </div>
                <button 
                  onClick={() => copy(env.value)}
                  className="mt-4 md:mt-0 ml-0 md:ml-4 flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-indigo-600 hover:text-white rounded-xl transition-all text-slate-400 text-xs font-bold group-hover:shadow-lg group-hover:shadow-indigo-500/10"
                >
                  <Copy size={14} /> Copy Value
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 hover:border-green-500/30 transition-all">
            <div className="bg-green-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
              <Database className="text-green-500" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">MongoDB Cluster0</h3>
            <ul className="text-sm text-slate-400 space-y-2">
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> User Credentials collection</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Image URL storage</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Mongoose Object Modeling</li>
            </ul>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 hover:border-blue-500/30 transition-all">
            <div className="bg-blue-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
              <Cloud className="text-blue-500" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Cloudinary Asset Flow</h3>
            <ul className="text-sm text-slate-400 space-y-2">
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-blue-500" /> Base64 image uploads</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-blue-500" /> Optimized delivery (CDN)</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-blue-500" /> Persistent public IDs</li>
            </ul>
          </div>
        </div>

        <section className="bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-indigo-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Terminal size={180} />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-2xl font-extrabold mb-4">Final Deployment Check</h3>
            <p className="text-indigo-100 mb-8 leading-relaxed">
              Your backend code is now pure and optimized. All complex UI logic has been stripped to prevent memory overhead during build time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-black/20 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 mb-1">Start Command</p>
                <code className="text-sm font-mono font-bold">node server.js</code>
              </div>
              <div className="bg-black/20 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 mb-1">Entry Point</p>
                <code className="text-sm font-mono font-bold">server.js</code>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center pt-10 pb-20">
          <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
            <AlertCircle size={14} /> Only use environment variables from the Render Dashboard for production.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
