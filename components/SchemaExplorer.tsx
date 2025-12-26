
import React, { useState } from 'react';
import { Database, FileJson, Link, ChevronRight, HardDrive } from 'lucide-react';

const SchemaExplorer: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>('users');

  const collections = [
    {
      id: 'users',
      name: 'UserCredentials',
      fields: [
        { name: '_id', type: 'ObjectId', desc: 'Primary key' },
        { name: 'username', type: 'String', desc: 'Unique display name' },
        { name: 'email', type: 'String', desc: 'Auth identifier' },
        { name: 'passwordHash', type: 'String', desc: 'Bcrypt hashed string' },
        { name: 'profileImage', type: 'String', desc: 'Cloudinary Secure URL' },
        { name: 'createdAt', type: 'Date', desc: 'Audit timestamp' }
      ]
    },
    {
      id: 'media',
      name: 'ImageAssets',
      fields: [
        { name: '_id', type: 'ObjectId', desc: 'Primary key' },
        { name: 'ownerId', type: 'ObjectId', desc: 'Reference to User' },
        { name: 'cloudinaryUrl', type: 'String', desc: 'CDN edge URL' },
        { name: 'publicId', type: 'String', desc: 'Cloudinary resource ID' },
        { name: 'metadata', type: 'Object', desc: 'Gemini generated tags' },
        { name: 'status', type: 'Enum', desc: '[active, archived, processing]' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Schema Explorer</h2>
        <p className="text-slate-500">Direct mapping of MongoDB Collections & Object Structures.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {collections.map((col) => (
            <div 
              key={col.id} 
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                expanded === col.id ? 'border-indigo-200 ring-2 ring-indigo-50 shadow-sm' : 'border-slate-200 bg-white shadow-none'
              }`}
            >
              <button 
                onClick={() => setExpanded(expanded === col.id ? null : col.id)}
                className="w-full flex items-center justify-between p-5 text-left bg-white"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${expanded === col.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    <Database size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{col.name}</h4>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">MongoDB Collection</p>
                  </div>
                </div>
                <ChevronRight className={`transition-transform duration-300 ${expanded === col.id ? 'rotate-90 text-indigo-600' : 'text-slate-300'}`} />
              </button>

              {expanded === col.id && (
                <div className="p-5 bg-slate-50 border-t border-slate-100 animate-in slide-in-from-top-2">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-200">
                        <th className="pb-2 font-semibold">Field</th>
                        <th className="pb-2 font-semibold">Type</th>
                        <th className="pb-2 font-semibold">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {col.fields.map((field, idx) => (
                        <tr key={idx} className="group hover:bg-white transition-colors">
                          <td className="py-3 font-mono text-indigo-600 font-semibold">{field.name}</td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 bg-slate-200 rounded text-[10px] font-bold text-slate-600 uppercase">
                              {field.type}
                            </span>
                          </td>
                          <td className="py-3 text-slate-500">{field.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-center">
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[120px] opacity-20 -mr-32 -mt-32"></div>
           <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Link className="text-indigo-400" />
                <h3 className="text-xl font-bold">Cloudinary Pipeline</h3>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400"><FileJson size={20}/></div>
                  <div>
                    <p className="font-semibold text-sm">Payload Preparation</p>
                    <p className="text-xs text-white/50">Base64 conversion & Signing</p>
                  </div>
                </div>
                <div className="flex items-center justify-center py-2">
                  <div className="h-8 w-px bg-white/20 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-indigo-500 rounded-full glow shadow-[0_0_10px_#6366f1]"></div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="bg-indigo-500/20 p-2 rounded-lg text-indigo-400"><HardDrive size={20}/></div>
                  <div>
                    <p className="font-semibold text-sm">Remote Cloudinary Storage</p>
                    <p className="text-xs text-white/50">Asset Optimization & CDN Distribution</p>
                  </div>
                </div>
                <div className="flex items-center justify-center py-2 rotate-180">
                  <div className="h-8 w-px bg-white/20 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-indigo-500 rounded-full glow shadow-[0_0_10px_#6366f1]"></div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-indigo-600/20 border border-indigo-500/30 rounded-2xl">
                  <div className="bg-indigo-500/30 p-2 rounded-lg text-indigo-300"><Database size={20}/></div>
                  <div>
                    <p className="font-semibold text-sm">Mongo Update Hook</p>
                    <p className="text-xs text-indigo-200/50">Store URL & Public ID references</p>
                  </div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SchemaExplorer;
