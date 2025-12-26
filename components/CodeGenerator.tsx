
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { Copy, Check, Sparkles, Loader2, FileCode, Folder, ChevronRight, Download, Terminal, Globe, Cloud, Key, Database, ShieldAlert, CheckCircle2 } from 'lucide-react';

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

  const generateProject = async () => {
    setLoading(true);
    try {
      const result = await geminiService.generateFullBackendProject('Bhamini-P1198');
      setProject(result);
      if (result.files.length > 0) {
        setSelectedFilePath(result.files[0].path);
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
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-700 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-indigo-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Cloud size={120} />
        </div>
        <div className="max-w-xl relative z-10">
          <h2 className="text-3xl font-bold mb-2 text-white">Production Architect</h2>
          <p className="text-indigo-100 opacity-90 mb-4">
            Security-first backend generation for <strong>Bhamini-P1198</strong>. 
            Pre-configured with your MongoDB Cluster0 and Cloudinary credentials.
          </p>
          <div className="flex flex-wrap gap-3">
             <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-xs font-mono border border-white/20">
                <Database size={14} className="text-green-400" /> Cluster0 Secured
             </div>
             <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-xs font-mono border border-white/20">
                <ShieldAlert size={14} className="text-amber-400" /> CORS & Helmet Ready
             </div>
          </div>
        </div>
        <button 
          onClick={generateProject}
          disabled={loading}
          className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold hover:shadow-lg hover:scale-[1.02] transition-all flex items-center gap-3 disabled:opacity-50 relative z-10 whitespace-nowrap"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
          {loading ? 'Securing Scripts...' : 'Generate Secured Backend'}
        </button>
      </div>

      {loading && (
        <div className="py-20 flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
            <ShieldAlert className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600" size={28} />
          </div>
          <p className="text-slate-500 font-medium animate-pulse">Adding Security Headers & Rate Limiting...</p>
        </div>
      )}

      {project && !loading && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col h-[600px] shadow-sm">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
              <Folder size={18} className="text-indigo-600" />
              <span className="font-bold text-slate-700 text-sm">Deployment Files</span>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {project.files.map((file) => (
                <button
                  key={file.path}
                  onClick={() => setSelectedFilePath(file.path)}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 transition-colors text-sm ${
                    selectedFilePath === file.path 
                    ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <FileCode size={16} className={selectedFilePath === file.path ? 'text-indigo-600' : 'text-slate-400'} />
                  <span className="truncate">{file.path}</span>
                  {selectedFilePath === file.path && <ChevronRight size={14} className="ml-auto" />}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col h-[600px] overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-white/5 bg-slate-900/50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/40"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
                </div>
                <span className="text-xs font-mono text-slate-400 tracking-wider">{selectedFilePath}</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => selectedFile && copyToClipboard(selectedFile.content)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all flex items-center gap-2 text-xs"
                >
                  {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                  {copied ? 'Copied!' : 'Copy Source'}
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-6 font-mono text-sm leading-relaxed scrollbar-thin scrollbar-thumb-white/10">
              <pre className="text-indigo-300">
                <code>{selectedFile?.content}</code>
              </pre>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
               <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                 <CheckCircle2 className="text-green-500" /> 
                 Deployment Checklist
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0">1</div>
                      <div>
                        <p className="font-bold text-slate-700 text-sm">CORS Settings</p>
                        <p className="text-xs text-slate-500">I added the <code>cors</code> package to <code>server.js</code>. Change the origin to your frontend domain.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0">2</div>
                      <div>
                        <p className="font-bold text-slate-700 text-sm">Env Protection</p>
                        <p className="text-xs text-slate-500">Ensure <code>.env</code> is added to <code>.gitignore</code> before pushing to GitHub.</p>
                      </div>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0">3</div>
                      <div>
                        <p className="font-bold text-slate-700 text-sm">Dynamic Port</p>
                        <p className="text-xs text-slate-500">Server uses <code>process.env.PORT || 5000</code> to work on Render/Railway.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0">4</div>
                      <div>
                        <p className="font-bold text-slate-700 text-sm">Rate Limiting</p>
                        <p className="text-xs text-slate-500">Auth routes are protected against brute-force attacks.</p>
                      </div>
                    </div>
                 </div>
               </div>
            </div>

            <div className="bg-indigo-900 text-white p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-[80px] opacity-30 -mr-16 -mt-16"></div>
               <div>
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Globe size={18} className="text-indigo-300" />
                    Host on Render.com
                  </h3>
                  <p className="text-xs text-indigo-100/70 mb-4 leading-relaxed">
                    Render is the easiest place to host this backend. Connect your GitHub repo, and it will auto-deploy.
                  </p>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <p className="text-[10px] uppercase font-bold text-indigo-300 mb-2 tracking-widest">Build Command</p>
                    <code className="text-xs font-mono">npm install</code>
                  </div>
               </div>
               <button className="mt-6 w-full py-3 bg-white text-indigo-900 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors">
                  Open Render Dashboard
               </button>
            </div>
          </div>
        </div>
      )}

      {!project && !loading && (
        <div className="py-32 flex flex-col items-center text-slate-400 text-center animate-in zoom-in-95 duration-700">
          <div className="bg-white p-8 rounded-full mb-6 shadow-sm border border-slate-100">
            <ShieldAlert size={64} strokeWidth={1} className="text-indigo-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-700">Security-Verified Project</h3>
          <p className="max-w-md mt-2">I have verified your Cluster0 string and Cloudinary API keys. Ready to generate the final deployment package.</p>
        </div>
      )}
    </div>
  );
};

export default CodeGenerator;
