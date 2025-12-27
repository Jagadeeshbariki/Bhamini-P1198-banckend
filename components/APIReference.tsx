
import React, { useState } from 'react';
import { Globe, Shield, Image as ImageIcon, Lock, Key, Copy, Check, AlertCircle, HelpCircle, Terminal, ExternalLink } from 'lucide-react';

const APIReference: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  
  const apiBase = "https://bhamini-p1198-banckend.onrender.com/api";

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const endpoints = [
    {
      group: 'Authentication',
      icon: Shield,
      color: 'blue',
      items: [
        {
          method: 'POST',
          path: '/auth/register',
          fullUrl: `${apiBase}/auth/register`,
          desc: 'Creates a new user account in MongoDB.',
          body: { username: "jane_doe", email: "jane@example.com", password: "securePassword123" }
        },
        {
          method: 'POST',
          path: '/auth/login',
          fullUrl: `${apiBase}/auth/login`,
          desc: 'Authenticates user and returns a JWT token.',
          body: { email: "jane@example.com", password: "securePassword123" }
        }
      ]
    },
    {
      group: 'Image Management',
      icon: ImageIcon,
      color: 'purple',
      items: [
        {
          method: 'GET',
          path: '/images',
          fullUrl: `${apiBase}/images`,
          desc: 'Fetch all images owned by the authenticated user.',
          auth: true
        },
        {
          method: 'POST',
          path: '/images/upload',
          fullUrl: `${apiBase}/images/upload`,
          desc: 'Uploads base64 image string to Cloudinary and saves URL to Mongo.',
          body: { imageBase64: "data:image/jpeg;base64,...", fileName: "profile.jpg" },
          auth: true
        }
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">API Documentation</h2>
          <p className="text-slate-500 font-medium">Postman Testing Station for Bhamini-P1198.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600/10 px-4 py-2 rounded-xl border border-indigo-200 flex items-center gap-2">
            <Globe size={16} className="text-indigo-600" />
            <span className="text-xs font-mono text-indigo-700">Base URL: <b className="text-indigo-900">{apiBase}</b></span>
          </div>
        </div>
      </header>

      {/* 404 Troubleshooting Alert */}
      <section className="bg-red-50 border-2 border-red-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-start gap-5">
          <div className="bg-red-500 p-3 rounded-2xl text-white">
            <HelpCircle size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-red-900 mb-1">Getting "404 Not Found" in Postman?</h3>
            <p className="text-red-700 text-sm mb-4">
              Render ignores requests that don't include the <code className="bg-red-200 px-1.5 rounded font-bold">/api</code> prefix. 
              Always use the <b>Full URL</b> provided below.
            </p>
            <div className="flex items-center justify-between bg-white border border-red-200 p-3 rounded-xl font-mono text-xs">
              <span className="text-slate-400">Example:</span>
              <code className="text-red-600 font-bold">{apiBase}/auth/register</code>
              <button onClick={() => copyToClipboard(`${apiBase}/auth/register`, 'fix')} className="text-slate-400 hover:text-red-600 transition-colors">
                {copied === 'fix' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8">
        {endpoints.map((group, gIdx) => (
          <div key={gIdx} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className={`px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center gap-3`}>
              <group.icon className={`text-slate-600`} size={20} />
              <h3 className={`font-bold text-slate-800`}>{group.group}</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {group.items.map((item, iIdx) => (
                <div key={iIdx} className="p-6 hover:bg-slate-50/20 transition-colors">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black tracking-widest ${
                          item.method === 'GET' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {item.method}
                        </span>
                        <code className="text-sm font-mono font-bold text-slate-900 break-all">{item.fullUrl}</code>
                        <button 
                          onClick={() => copyToClipboard(item.fullUrl, `${gIdx}-${iIdx}-url`)}
                          className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 transition-colors"
                          title="Copy Full URL"
                        >
                          {copied === `${gIdx}-${iIdx}-url` ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.auth && (
                          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold border border-amber-100 uppercase tracking-wider">
                            <Lock size={12} /> Bearer Token Required
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-500">{item.desc}</p>
                    
                    {item.body && (
                      <div className="relative group mt-2">
                        <div className="flex items-center justify-between mb-2 px-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Postman Raw Body (JSON)</span>
                        </div>
                        <div className="bg-slate-900 rounded-2xl p-5 font-mono text-xs text-indigo-300 overflow-x-auto border border-slate-800 group-hover:border-indigo-500/30 transition-colors">
                          <button 
                            onClick={() => copyToClipboard(JSON.stringify(item.body, null, 2), `${gIdx}-${iIdx}-body`)}
                            className="absolute top-10 right-4 p-2 bg-slate-800 text-slate-400 rounded-lg hover:text-white transition-all opacity-0 group-hover:opacity-100"
                          >
                            {copied === `${gIdx}-${iIdx}-body` ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                          </button>
                          <pre>{JSON.stringify(item.body, null, 2)}</pre>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Key size={120} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
            <Lock className="text-indigo-400" /> How to Test Protected Routes?
          </h3>
          <ol className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <li className="flex gap-3">
              <span className="font-bold text-indigo-400">1.</span>
              <span>Call <b>POST /auth/login</b> and copy the <code>token</code> from the response.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-indigo-400">2.</span>
              <span>In Postman, go to the <b>Auth</b> tab of your next request.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-indigo-400">3.</span>
              <span>Select <b>Bearer Token</b> and paste your JWT there.</span>
            </li>
          </ol>
          <div className="mt-8 bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Terminal size={18} className="text-indigo-400" />
              <span className="text-xs font-mono text-indigo-200 tracking-tight">Authorization: Bearer [TOKEN]</span>
            </div>
            <a href="https://www.postman.com/downloads/" target="_blank" className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
              Download Postman <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIReference;
