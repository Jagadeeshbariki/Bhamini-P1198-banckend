
import React from 'react';
import { Globe, Shield, Image as ImageIcon, Lock, Key, Copy, Check } from 'lucide-react';

const APIReference: React.FC = () => {
  const [copied, setCopied] = React.useState<string | null>(null);

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
          desc: 'Creates a new user account in MongoDB.',
          body: `{ "username": "jane_doe", "email": "jane@example.com", "password": "securePassword123" }`
        },
        {
          method: 'POST',
          path: '/auth/login',
          desc: 'Authenticates user and returns a JWT token. (Protected by Rate Limiting)',
          body: `{ "email": "jane@example.com", "password": "securePassword123" }`
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
          desc: 'Fetch all images owned by the authenticated user.',
          auth: true
        },
        {
          method: 'POST',
          path: '/images/upload',
          desc: 'Uploads base64 image string to Cloudinary and saves URL to Mongo.',
          body: `{ "image": "data:image/jpeg;base64,...", "fileName": "profile.jpg" }`,
          auth: true
        },
        {
          method: 'DELETE',
          path: '/images/:id',
          desc: 'Removes image from both Cloudinary and MongoDB.',
          auth: true
        }
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">API Documentation</h2>
          <p className="text-slate-500 font-medium">Standard REST endpoints for the Bhamini-P1198 Backend.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 text-sm font-mono text-slate-600">
          <Globe size={16} className="text-indigo-600" />
          Base URL: /api
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {endpoints.map((group, gIdx) => (
          <div key={gIdx} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className={`px-6 py-4 bg-${group.color}-50 border-b border-slate-100 flex items-center gap-3`}>
              <group.icon className={`text-${group.color}-600`} size={20} />
              <h3 className={`font-bold text-${group.color}-900`}>{group.group}</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {group.items.map((item, iIdx) => (
                <div key={iIdx} className="p-6 hover:bg-slate-50/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        item.method === 'GET' ? 'bg-green-100 text-green-700' :
                        item.method === 'POST' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {item.method}
                      </span>
                      <code className="text-sm font-mono font-bold text-slate-700">{item.path}</code>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.auth && (
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold border border-amber-100 uppercase tracking-wider">
                          <Lock size={12} /> Requires Auth
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">{item.desc}</p>
                  
                  {item.body && (
                    <div className="relative group">
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => copyToClipboard(item.body!, `${gIdx}-${iIdx}`)}
                          className="p-1.5 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition-colors"
                        >
                          {copied === `${gIdx}-${iIdx}` ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                        </button>
                      </div>
                      <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs text-indigo-300 overflow-x-auto border border-slate-800">
                        <pre>{item.body}</pre>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Key size={120} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-xl font-bold mb-4">How to authenticate?</h3>
          <p className="text-indigo-100/80 text-sm leading-relaxed mb-6">
            After a successful <b>POST /auth/login</b>, the server returns a JWT string. 
            You must include this string in the headers of all protected requests like this:
          </p>
          <div className="bg-white/10 p-4 rounded-2xl border border-white/10 font-mono text-xs">
            Authorization: Bearer YOUR_JWT_TOKEN_HERE
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIReference;
