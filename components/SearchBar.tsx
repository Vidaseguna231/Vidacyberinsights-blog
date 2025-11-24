import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => Promise<void>;
  isSearching: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isSearching }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto w-full mb-12 group">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question about cybersecurity..."
          className="w-full pl-12 pr-4 py-4 bg-white rounded-full border border-slate-200 shadow-sm focus:ring-4 focus:ring-cyan-100 focus:border-cyan-400 outline-none transition-all text-lg"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {isSearching ? <Loader2 className="w-5 h-5 animate-spin text-cyan-500" /> : <Search className="w-5 h-5" />}
        </div>
        <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors"
        >
            Ask AI
        </button>
      </div>
      <p className="text-center text-slate-400 text-xs mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
        Powered by Gemini Semantic Search
      </p>
    </form>
  );
};

export default SearchBar;