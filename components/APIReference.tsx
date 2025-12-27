
import React, { useState, useEffect } from 'react';
import { Globe, Shield, Image as ImageIcon, Lock, Key, Copy, Check, AlertCircle, ShieldAlert, Play, Send, Database, Terminal, User as UserIcon, LogOut, Loader2 } from 'lucide-react';

const APIReference: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('bhamini_token'));
  const [loading, setLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState<any>(null);
  const [lastStatus, setLastStatus] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'docs' | 'tester'>('docs');
  
  const apiBase = "https://bhamini-p1198-banckend.onrender.com/api";

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleTestRequest = async (endpoint: any) => {
    setLoading(true);
    setLastResponse(null);
    setLastStatus(null);
    
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };

      if (endpoint.auth && token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const options: RequestInit = {
        method: endpoint.method,
        headers,
      };

      if (endpoint.method === 'POST' && endpoint.body) {
        options.body = JSON.stringify(endpoint.body);
      }

      const response = await fetch(endpoint.fullUrl, options);
      const data = await response.json();
      
      setLastStatus(response.status);
      setLastResponse(data);

      // If logging in, save the token automatically
      if (endpoint.path === '/auth/login' && data.token) {
        setToken(data.token);
        localStorage.setItem('bhamini_token', data.token);
      }
    } catch (err: any) {
      setLastStatus(500);
      setLastResponse({ error: 'Connection Failed', message: err.message });
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
          fullUrl: `${apiBase}/auth/register`,
          desc: 'Create account and receive first token.',
          body: { username: "tester_" + Math.floor(Math.random() * 1000), email: `test${Math.floor(Math.random() * 1000)}@example.com`, password: "password123" }
        },
        {
          method: 'POST',
          path: '/auth/login',
          fullUrl: `${apiBase}/auth/login`,
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
          fullUrl: `${apiBase}/images`,
          desc: 'Fetch your images (Requires active session).',
          auth: true
        },
        {
          method: 'POST',
          path: '/images/upload',
          fullUrl: `${apiBase}/images/upload`,
          desc: 'Upload dummy image to Cloudinary.',
          body: { imageBase64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", fileName: "dot.png" },
          auth: true
        }
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">API Testing Command Center</h2>
          <p className="text-slate-500 font-medium">Test, Debug, and Manage Sessions for Bhamini-P1198.</p>
        </div>
        <div className="flex items-center gap-3">
          {token ? (
            <div className="bg-emerald-50 border border-emerald-200 pl-4 pr-2 py-2 rounded-xl flex items-center gap-3 shadow-sm">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-black text-emerald-600 tracking-tighter">Session Active</span>
                <span className="text-xs font-mono text-emerald-800 truncate w-24">...{token.slice(-10)}</span>
              </div>
              <button onClick={clearSession} className="p-2 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors" title="Clear Token">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl flex items-center gap-2 text-amber-700 text-xs font-bold">
              <ShieldAlert size={16} /> No Session Token
            </div>
          )}
        </div>
      </header>

      {/* Mode Switcher */}
      <div className="flex gap-2 p-1 bg-slate-200/50 w-fit rounded-xl border border-slate-200">
        <button 
          onClick={() => setActiveTab('docs')}
          className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'docs' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
        >
          <Database size={16} /> Endpoints
        </button>
        <button 
          onClick={() => setActiveTab('tester')}
          className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'tester' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
        >
          <Terminal size={16} /> Response Console {lastStatus && <span className={`w-2 h-2 rounded-full ${lastStatus < 300 ? 'bg-emerald-500' : 'bg-red-500'}`}></span>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Endpoint List */}
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
                          Try Request
                        </button>
                      </div>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                      {item.auth && (
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600 uppercase tracking-tighter">
                          <Lock size={12} /> Requires Authorization Header
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Response Console */}
        <div className={`lg:col-span-5 space-y-6 ${activeTab === 'docs' ? 'hidden lg:block' : ''}`}>
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[600px]">
            <div className="px-6 py-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="ml-2 text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Response Console</span>
              </div>
              {lastStatus && (
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                  lastStatus < 300 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  HTTP {lastStatus}
                </span>
              )}
            </div>
            
            <div className="flex-1 p-6 font-mono text-xs overflow-auto scrollbar-thin scrollbar-thumb-white/10">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 text-indigo-400">
                  <Loader2 className="animate-spin" size={32} />
                  <p className="animate-pulse">Waiting for Render response...</p>
                </div>
              ) : lastResponse ? (
                <pre className="text-indigo-300 whitespace-pre-wrap">
                  {JSON.stringify(lastResponse, null, 2)}
                </pre>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-600 text-center space-y-3">
                  <Send size={40} className="opacity-20" />
                  <p className="max-w-[200px]">Run an API request to see the raw JSON output here.</p>
                </div>
              )}
            </div>

            {lastStatus === 401 && (
              <div className="p-4 bg-red-500/10 border-t border-red-500/20">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="text-red-400 shrink-0" size={16} />
                  <div>
                    <p className="text-[10px] font-bold text-red-300 uppercase">401 Auth Error Detected</p>
                    <p className="text-[10px] text-red-400/80 leading-relaxed mt-1">
                      Your session token is missing or expired. Please use <b>POST /auth/login</b> to refresh your session.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h4 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
              <UserIcon size={16} className="text-indigo-600" /> Session Debugging
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between mb-1">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Token</span>
                   {token && <button onClick={() => copyToClipboard(token, 'sess')} className="text-indigo-600 text-[10px] font-bold hover:underline">Copy</button>}
                </div>
                <p className="text-[10px] font-mono text-slate-600 break-all leading-relaxed">
                  {token || "No active token in local storage."}
                </p>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed italic">
                The tester automatically injects this token into the <code>Authorization</code> header for all routes marked with a lock icon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIReference;
