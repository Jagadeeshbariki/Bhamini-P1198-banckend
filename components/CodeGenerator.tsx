
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { Copy, Check, Sparkles, Loader2, FileCode, Folder, ChevronRight, Download, Terminal, Globe, Cloud, Key, Database, ShieldAlert, CheckCircle2, ListChecks, Info, AlertTriangle, FileWarning, ExternalLink, RefreshCw, GitBranch, Github } from 'lucide-react';

interface ProjectFile {
  path: string;
  content: string;
  language: string;
}

const CodeGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<{ files: ProjectFile[]; summary: string } | null>(null);
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'env' | 'troubleshoot'>('code');

  const envVars = [
    { key: 'MONGO_URI', value: 'mongodb+srv://Jagadeesh:P1198@cluster0.zfagv3c.mongodb.net/?appName=Cluster0', desc: 'Your MongoDB Cluster0 Connection String' },
    { key: 'CLOUDINARY_CLOUD_NAME', value: 'dbohmpxko', desc: 'Cloudinary Cloud Name' },
    { key: 'CLOUDINARY_API_KEY', value: '829126349486959', desc: 'Cloudinary API Key' },
    { key: 'CLOUDINARY_API_SECRET', value: 'WX3TeoeR9rnpHmxPt3qADRAglwo', desc: 'Cloudinary Secret (Keep Private)' },
    { key: 'JWT_SECRET', value: 'Bhamini_P1198_Secure_Auth_Key_2024', desc: 'Used for signing Login Tokens' },
    { key: 'PORT', value: '5000', desc: 'The port the server runs on' },
    { key: 'FRONTEND_URL', value: 'http://localhost:3000', desc: 'Used for CORS (Update when deploying frontend)' },
  ];

  const generateProject = async () => {
    setLoading(true);
    try {
      const result = await geminiService.generateFullBackendProject('Bhamini-P1198');
      setProject(result);
      if (result.files.length > 0) {
        const priorityFile = result.files.find(f => f.path === 'package.json') || result.files.find(f => f.path === 'server.js');
        setSelectedFilePath(priorityFile?.path || result.files[0].path);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedFile = project?.files.find(f => f.path === selectedFilePath);

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-700 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-indigo-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Cloud size={120} />
        </div>
        <div className="max-w-xl relative z-10">
          <h2 className="text-3xl font-bold mb-2">Production Deployment Architect</h2>
          <p className="text-indigo-100 opacity-90 mb-4">
            Full Node.js + MongoDB + Cloudinary stack for <strong>Bhamini-P1198</strong>. 
            The <strong>server.js</strong> and <strong>package.json</strong> are now active in the root directory.
          </p>
          <div className="flex flex-wrap gap-3">
             <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-xs font-mono border border-white/20">
                <Database size={14} className="text-green-400" /> Database Linked
             </div>
             <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-xs font-mono border border-white/20">
                <Key size={14} className="text-blue-400" /> API Keys Mapped
             </div>
          </div>
        </div>
        <button 
          onClick={generateProject}
          disabled={loading}
          className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold hover:shadow-lg hover:scale-[1.02] transition-all flex items-center gap-3 disabled:opacity-50 relative z-10 whitespace-nowrap"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
          {loading ? 'Assembling Project...' : 'Regenerate Complete Project'}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 p-1 bg-slate-200/50 w-fit rounded-xl border border-slate-200">
        <button 
          onClick={() => setActiveTab('code')}
          className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'code' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <FileCode size={16} /> Code Explorer
        </button>
        <button 
          onClick={() => setActiveTab('env')}
          className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'env' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <ListChecks size={16} /> Env Variables
        </button>
        <button 
          onClick={() => setActiveTab('troubleshoot')}
          className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'troubleshoot' ? 'bg-white text-red-600 shadow-sm ring-2 ring-red-100' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <AlertTriangle size={16} /> Fix Render Error
        </button>
      </div>

      {activeTab === 'troubleshoot' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
           <div className="bg-white border border-red-100 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                  <div className="bg-red-100 p-3 rounded-2xl text-red-600">
                    <RefreshCw size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Auto-Deployment is ACTIVE</h3>
                    <p className="text-slate-500 text-sm">Render detects GitHub changes automatically. No manual refresh needed.</p>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Github size={16} className="text-slate-600" />
                    <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">Step 1: Commit</span>
                  </div>
                  <p className="text-xs text-slate-500">Push your updated <b>server.js</b> or <b>package.json</b> to GitHub.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Cloud size={16} className="text-indigo-600" />
                    <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">Step 2: Detect</span>
                  </div>
                  <p className="text-xs text-slate-500">Render detects the push and starts a new build immediately.</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe size={16} className="text-emerald-600" />
                    <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">Step 3: Live</span>
                  </div>
                  <p className="text-xs text-slate-500">Once the build passes, your new code is live on your Render URL.</p>
                </div>
              </div>

              <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
                <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                  <Info size={18} /> Important: Auto-Deploy Toggle
                </h4>
                <p className="text-sm text-amber-700 mb-4">
                  By default, Render has <strong>Auto-Deploy: Yes</strong> enabled. If your site isn't updating:
                </p>
                <ol className="text-xs text-amber-800 space-y-2 list-decimal ml-4">
                  <li>Go to your Render Dashboard.</li>
                  <li>Click on your Service (Bhamini-P1198-Backend).</li>
                  <li>Go to <b>Settings</b>.</li>
                  <li>Ensure <b>Auto-Deploy</b> is set to <b>Yes</b>.</li>
                </ol>
              </div>
           </div>

           <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                  <div className="bg-slate-100 p-3 rounded-2xl text-slate-600">
                    <FileWarning size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Critical File Paths</h3>
                    <p className="text-slate-500 text-sm">Verify your repository structure matches this layout.</p>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs shrink-0">1</div>
                        <div>
                          <p className="font-bold text-slate-800">Root Directory Only</p>
                          <p className="text-sm text-slate-500 mt-1">Place <code>server.js</code> in the <b>main folder</b>, not inside <code>src/</code>.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">2</div>
                        <div>
                          <p className="font-bold text-slate-800">Start Command</p>
                          <p className="text-sm text-slate-500 mt-1">Your Render Start Command must be <code>node server.js</code>.</p>
                        </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-green-600" /> Repository Mapping
                    </h4>
                    <div className="font-mono text-sm space-y-1 text-slate-600">
                        <div className="flex items-center gap-2"><Folder size={14} className="text-indigo-400" /> repo-root/</div>
                        <div className="flex items-center gap-2 ml-4 bg-green-100/50 px-2 py-0.5 rounded"><FileCode size={14} className="text-slate-400" /> <b>server.js</b></div>
                        <div className="flex items-center gap-2 ml-4 bg-green-100/50 px-2 py-0.5 rounded"><FileCode size={14} className="text-slate-400" /> <b>package.json</b></div>
                        <div className="flex items-center gap-2 ml-4"><FileCode size={14} className="text-slate-400" /> index.html</div>
                    </div>
                  </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'env' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Deployment Environment Variables</h3>
                <p className="text-slate-500 text-sm">Copy these key-value pairs into your hosting provider's settings.</p>
              </div>
              <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-xl border border-amber-100 text-xs font-bold">
                <ShieldAlert size={14} /> Secret Data - Keep Private
              </div>
            </div>
            
            <div className="overflow-hidden border border-slate-100 rounded-2xl">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Variable Key</th>
                    <th className="px-6 py-4">Current Value</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {envVars.map((env) => (
                    <tr key={env.key} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-indigo-600">{env.key}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-slate-700 font-mono truncate max-w-[400px]">{env.value}</span>
                          <span className="text-[10px] text-slate-400">{env.desc}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => copyToClipboard(env.value)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                          title="Copy Value"
                        >
                          <Copy size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'code' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col h-[600px] shadow-sm">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
              <Folder size={18} className="text-indigo-600" />
              <span className="font-bold text-slate-700 text-sm">Deployment Files</span>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Active Root Files</div>
              <button
                onClick={() => setSelectedFilePath('server.js')}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 transition-colors text-sm ${
                  selectedFilePath === 'server.js' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <FileCode size={16} className="text-indigo-600" />
                <span>server.js</span>
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 ml-auto animate-pulse"></div>
              </button>
              <button
                onClick={() => setSelectedFilePath('package.json')}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 transition-colors text-sm ${
                  selectedFilePath === 'package.json' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <FileCode size={16} className="text-indigo-600" />
                <span>package.json</span>
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 ml-auto animate-pulse"></div>
              </button>

              {project && (
                <>
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">Module Structure</div>
                  {project.files.filter(f => f.path !== 'server.js' && f.path !== 'package.json').map((file) => (
                    <button
                      key={file.path}
                      onClick={() => setSelectedFilePath(file.path)}
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 transition-colors text-sm ${
                        selectedFilePath === file.path ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <FileCode size={16} className="text-slate-400" />
                      <span className="truncate">{file.path}</span>
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="lg:col-span-3 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col h-[600px] overflow-hidden shadow-2xl relative">
            {!selectedFilePath ? (
               <div className="flex-1 flex flex-col items-center justify-center text-slate-500 space-y-4">
                  <Terminal size={48} />
                  <p>Select a file to view or copy the source code.</p>
               </div>
            ) : (
              <>
                <div className="px-6 py-4 border-b border-white/5 bg-slate-900/50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-slate-400 tracking-wider">
                       {selectedFilePath}
                       {(selectedFilePath === 'server.js' || selectedFilePath === 'package.json') && <span className="ml-3 text-red-400 font-bold uppercase tracking-widest">[Deployment Critical]</span>}
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      const content = selectedFile?.content || '';
                      copyToClipboard(content);
                    }}
                    className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all flex items-center gap-2 text-xs"
                  >
                    {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy Source'}
                  </button>
                </div>
                <div className="flex-1 overflow-auto p-6 font-mono text-sm leading-relaxed scrollbar-thin scrollbar-thumb-white/10">
                  <pre className="text-indigo-300 whitespace-pre-wrap">
                    <code>{selectedFile?.content || '/* Source file loaded. Copy it manually if needed. */'}</code>
                  </pre>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeGenerator;
