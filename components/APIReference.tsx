
import React, { useState, useEffect } from 'react';
import { Globe, Shield, Image as ImageIcon, Lock, Key, Copy, Check, AlertCircle, ShieldAlert, Play, Send, Database, Terminal, User as UserIcon, LogOut, Loader2, Settings, Wifi, WifiOff, Zap } from 'lucide-react';

const APIReference: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('bhamini_token'));
  const [loading, setLoading] = useState(false);
  const [pinging, setPinging] = useState(false);
  const [lastResponse, setLastResponse] = useState<any>(null);
  const [lastStatus, setLastStatus] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'docs' | 'tester'>('docs');
  
  // Corrected spelling and added state for dynamic URL testing
  const [apiBase, setApiBase] = useState(localStorage.getItem('bhamini_api_url') || "https://bhamini-p1198-backend.onrender.com/api");
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    localStorage.setItem('bhamini_api_url', apiBase);
  }, [apiBase]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const pingHealth = async () => {
    setPinging(true);
    try {
      const start = Date.now();
      const res = await fetch(`${apiBase}/health`);
      const data = await res.json();
      const latency = Date.now() - start;
      setLastStatus(res.status);
      setLastResponse({ ...data, latency: `${latency}ms`, note: "Server is AWAKE and responding." });
      setActiveTab('tester');
    } catch (err: any) {
      setLastStatus(0);
      setLastResponse({ error: "Connection Failed", reason: "Server Sleeping or URL Invalid", help: "Render free tier takes 60s to wake up. Try again in a moment." });
      setActiveTab('tester');
    } finally {
      setPinging(false);
    }
  };

  const handleTestRequest = async (endpoint: any) => {
    setLoading(true);
    setLastResponse(null);
    setLastStatus(null);
    
    // Ensure URL matches the current base
    const fullUrl = `${apiBase}${endpoint.path}`;

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };

      if (endpoint.auth) {
        if (!token) {
          throw new Error("No token found. Please Login or Register first.");
        }
        // Correct 401 Fix: Ensure 'Bearer ' prefix is always present
        headers['Authorization'] = `Bearer ${token}`;
      }

      const options: RequestInit = {
        method: endpoint.method,
        headers,
      };

      if (endpoint.method === 'POST' && endpoint.body) {
        options.body = JSON.stringify(endpoint.body);
      }

      const response = await fetch(fullUrl, options);
      const data = await response.json();
      
      setLastStatus(response.status);
      setLastResponse(data);

      if (endpoint.path === '/auth/login' && data.token) {
        setToken(data.token);
        localStorage.setItem('bhamini_token', data.token);
      }
    } catch (err: any) {
      setLastStatus(err.message.includes('token') ? 401 : 0);
      setLastResponse({ 
        error: 'Request Error', 
        message: err.message,
        hint: err.message.includes('Failed to fetch') 
          ? "This usually means the server is down or the URL is incorrect." 
          : "Check your authentication session."
      });
    } finally {
      setLoading(false);
      setActiveTab('tester');
    }
  };

  const clearSession = () => {
    setToken(null);
    localStorage.removeItem('bhamini_token');
    setLastResponse(null);
    setLastStatus(null);
  };

  const endpoints = [
    {
      group: 'Authentication',
      icon: Shield,
      items: [
        {
          method: 'POST',
          path: '/auth/register',
          desc: 'Create account and receive first token.',
          body: { username: "tester_" + Math.floor(Math.random() * 1000), email: `test${Math.floor(Math.random() * 1000)}@example.com`, password: "password123" }
        },
        {
          method: 'POST',
          path: '/auth/login',
          desc: 'Log in to update your active session token.',
          body: { email: "jane@example.com", password: "securePassword123" }
        }
      ]
    },
    {
      group: 'Image Management',
      icon: ImageIcon,
      items: [
        {
          method: 'GET',
          path: '/images',
          desc: 'Fetch your images (Requires Bearer Token).',
          auth: true
        },
        {
          method: 'POST',
          path: '/images/upload',
          desc: 'Upload dummy image to Cloudinary.',
          body: { imageBase64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", fileName: "test_dot.png" },
          auth: true
        }
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Backend Command Center</h2>
          <p className="text-slate-500 font-medium flex items-center gap-2">
            Targeting: <code className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{apiBase}</code>
          </p>
        </div>
        <div className="flex items-center gap-2">
           <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-xl transition-all ${showSettings ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-500'}`}
           >
             <Settings size={20} />
           </button>
           <button 
            onClick={pingHealth}
            disabled={pinging}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-all disabled:opacity-50"
           >
             {pinging ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
             Wake Server
           </button>
        </div>
      </header>

      {showSettings && (
        <div className="bg-white border border-indigo-200 rounded-3xl p-6 shadow-lg animate-in zoom-in-95 duration-200">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Globe size={18} className="text-indigo-600" /> API Connection Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Base API URL (Render/Localhost)</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={apiBase}
                  onChange={(e) => setApiBase(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="https://your-app.onrender.com/api"
                />
                <button 
                  onClick={() => setApiBase("https://bhamini-p1198-backend.onrender.com/api")}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all"
                >
                  Reset Default
                </button>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 italic">
              * Change this if your Render deployment URL is different from the default.
            </p>
          </div>
        </div>
      )}

      {/* Mode Switcher */}
      <div className="flex gap-2 p-1 bg-slate-200/50 w-fit rounded-xl border border-slate-200">
        <button 
          onClick={() => setActiveTab('docs')}
          className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'docs' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
        >
          <Database size={16} /> API Directory
        </button>
        <button 
          onClick={() => setActiveTab('tester')}
          className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'tester' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
        >
          <Terminal size={16} /> Debug Console {lastStatus !== null && <span className={`w-2 h-2 rounded-full ${lastStatus > 0 && lastStatus < 300 ? 'bg-emerald-500' : 'bg-red-500'}`}></span>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className={`lg:col-span-7 space-y-6 ${activeTab === 'tester' ? 'hidden lg:block' : ''}`}>
          {endpoints.map((group, gIdx) => (
            <div key={gIdx} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
                <group.icon className="text-slate-600" size={20} />
                <h3 className="font-bold text-slate-800">{group.group}</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {group.items.map((item, iIdx) => (
                  <div key={iIdx} className="p-6 hover:bg-slate-50/20 transition-colors">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-black tracking-widest ${
                            item.method === 'GET' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {item.method}
                          </span>
                          <code className="text-xs font-mono font-bold text-slate-900">{item.path}</code>
                        </div>
                        <button 
                          onClick={() => handleTestRequest(item)}
                          disabled={loading}
                          className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-[10px] font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200 disabled:opacity-50"
                        >
                          {loading ? <Loader2 size={12} className="animate-spin" /> : <Play size={12} />}
                          Run Request
                        </button>
                      </div>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                      {item.auth && (
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600 uppercase tracking-tighter">
                          <Lock size={12} /> Protected Route
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`lg:col-span-5 space-y-6 ${activeTab === 'docs' ? 'hidden lg:block' : ''}`}>
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[600px] border border-slate-800">
            <div className="px-6 py-4 bg-slate-800/50 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
                <span className="ml-3 text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] font-black">Output</span>
              </div>
              {lastStatus !== null && (
                <div className="flex items-center gap-2">
                   <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                    lastStatus === 0 ? 'bg-red-500/20 text-red-400' :
                    lastStatus < 300 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {lastStatus === 0 ? "NETWORK ERROR" : `STATUS ${lastStatus}`}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex-1 p-6 font-mono text-xs overflow-auto scrollbar-thin scrollbar-thumb-white/10 bg-slate-950/50">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 text-indigo-400">
                  <Loader2 className="animate-spin" size={32} />
                  <p className="text-[10px] font-bold tracking-widest uppercase animate-pulse">Communicating with Backend...</p>
                </div>
              ) : lastResponse ? (
                <pre className="text-indigo-300 whitespace-pre-wrap leading-relaxed">
                  {JSON.stringify(lastResponse, null, 2)}
                </pre>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-700 text-center space-y-4">
                  <div className="p-4 bg-slate-900 rounded-full border border-slate-800">
                    <Wifi size={32} className="opacity-20" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-600">No active request</p>
                    <p className="text-[10px] max-w-[200px] leading-relaxed">Trigger an endpoint on the left to capture live response data here.</p>
                  </div>
                </div>
              )}
            </div>

            {lastStatus === 0 && (
              <div className="p-4 bg-red-500/10 border-t border-red-500/20">
                <div className="flex items-start gap-3">
                  <WifiOff className="text-red-400 shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="text-[10px] font-black text-red-300 uppercase tracking-wider">Connection Refused</p>
                    <p className="text-[10px] text-red-400/80 leading-relaxed mt-1">
                      1. Is your Render URL correct? <br/>
                      2. Is your MongoDB "Network Access" set to <code className="bg-red-900/40 px-1 rounded">0.0.0.0/0</code>?<br/>
                      3. Is the server waking up? (Wait 60s)
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {lastStatus === 401 && (
              <div className="p-4 bg-amber-500/10 border-t border-amber-500/20">
                <div className="flex items-start gap-3">
                  <Lock className="text-amber-400 shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="text-[10px] font-black text-amber-300 uppercase tracking-wider">Auth Required</p>
                    <p className="text-[10px] text-amber-400/80 leading-relaxed mt-1">
                      Missing or invalid token. Run <b>POST /auth/login</b> first to generate a fresh session.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Shield size={64} className="text-indigo-600" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
              <Key size={16} className="text-indigo-600" /> Session Manager
            </h4>
            <div className="space-y-3">
              <div className={`p-4 rounded-2xl border transition-all ${token ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100'}`}>
                <div className="flex items-center justify-between mb-2">
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Active JWT</span>
                   {token && (
                     <div className="flex gap-2">
                       <button onClick={() => copyToClipboard(token, 'sess')} className="text-indigo-600 text-[10px] font-bold hover:underline">Copy</button>
                       <button onClick={clearSession} className="text-red-500 text-[10px] font-bold hover:underline">Clear</button>
                     </div>
                   )}
                </div>
                <p className="text-[10px] font-mono text-slate-600 break-all leading-relaxed h-12 overflow-y-auto scrollbar-hide">
                  {token || "No active session. Please authenticate."}
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-100">
                <Info size={14} className="shrink-0" />
                <p className="text-[9px] font-medium leading-tight">
                  Tester automatically injects <code>Authorization: Bearer [token]</code> for all protected endpoints.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
);

export default APIReference;
