import React, { useState, useMemo } from 'react';
import { Search, Hash, FileJson, Image as ImageIcon, Building2, Briefcase, Lock } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const tools: Tool[] = [
  {
    id: 'abn',
    name: 'ABN Generator',
    description: 'Generate valid Australian Business Numbers with checksum validation.',
    icon: Briefcase,
    color: 'bg-indigo-500',
  },
  {
    id: 'acn',
    name: 'ACN Generator',
    description: 'Generate valid Australian Company Numbers with checksum validation.',
    icon: Building2,
    color: 'bg-blue-500',
  },
  {
    id: 'sha1',
    name: 'SHA1 Generator',
    description: 'Generate SHA1 hashes from text input.',
    icon: Hash,
    color: 'bg-emerald-500',
  },
  {
    id: 'md5',
    name: 'MD5 Tool',
    description: 'Encrypt text to MD5 and simulate decryption.',
    icon: Lock,
    color: 'bg-teal-500',
  },
  {
    id: 'json',
    name: 'JSON Formatter',
    description: 'Format, pretty print, or minify JSON data. Download as text.',
    icon: FileJson,
    color: 'bg-amber-500',
  },
  {
    id: 'thumbnail',
    name: 'Thumbnail Generator',
    description: 'Create placeholder images with custom dimensions and text.',
    icon: ImageIcon,
    color: 'bg-sky-500',
  },
];

interface DashboardProps {
  onSelectTool: (id: string) => void;
}

export function Dashboard({ onSelectTool }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = useMemo(() => {
    return tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-4 py-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Developer Productivity Toolbox
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          A collection of essential tools for developers. Generate test data, format code, and create placeholders instantly.
        </p>
      </div>

      <div className="relative max-w-xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-11 pr-4 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-shadow"
          placeholder="Search tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {filteredTools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onSelectTool(tool.id)}
            className="group flex flex-col items-start p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-md transition-all text-left"
          >
            <div className={`p-3 rounded-2xl ${tool.color} text-white mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
              <tool.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              {tool.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
              {tool.description}
            </p>
          </button>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 dark:text-slate-400">No tools found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}
