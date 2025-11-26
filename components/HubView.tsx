
import React, { useState, useMemo, useEffect } from 'react';
import { Article, UserRole, UserProfile } from '../types';
import { INITIAL_ARTICLES } from '../constants';
import ArticleCard from './ArticleCard';
import { getRecommendations } from '../services/recommendationService';
import { Filter, Clock, BookOpen, ChevronLeft, ChevronRight, Tag, Sparkles, Layers, Archive } from 'lucide-react';

interface HubViewProps {
  type: 'role' | 'topic' | 'series' | 'archive';
  value: string;
  onNavigateArticle: (id: string) => void;
  onNavigateTopic: (topic: string) => void;
}

const HubView: React.FC<HubViewProps> = ({ type, value, onNavigateArticle, onNavigateTopic }) => {
  const [filterReadTime, setFilterReadTime] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // SEO: Update Page Title
  useEffect(() => {
    let titlePrefix = '';
    if (type === 'role') titlePrefix = `${value.charAt(0).toUpperCase() + value.slice(1)} Hub`;
    else if (type === 'topic') titlePrefix = `${value} - Topic Hub`;
    else if (type === 'series') titlePrefix = `${value} - Series`;
    else if (type === 'archive') titlePrefix = `${value} Archive`;
    
    document.title = `${titlePrefix} - Vidacyberinsights`;
  }, [type, value]);

  // 1. Data Selection
  const { relevantArticles, featuredArticles, recommendations } = useMemo(() => {
    let baseArticles = INITIAL_ARTICLES;

    // Filter by Context
    if (type === 'role') {
      baseArticles = baseArticles.filter(a => a.audience === value || a.audience === 'all');
    } else if (type === 'topic') {
      baseArticles = baseArticles.filter(a => a.tags.includes(value));
    } else if (type === 'series') {
      baseArticles = baseArticles.filter(a => a.series === value);
    } else if (type === 'archive') {
      // Archive value expected as "YYYY" or "YYYY-MM"
      baseArticles = baseArticles.filter(a => a.publishDate.includes(value));
    }

    // Apply UI Filters
    if (filterReadTime) {
        if (filterReadTime === 'short') baseArticles = baseArticles.filter(a => parseInt(a.readTime) < 5);
        if (filterReadTime === 'medium') baseArticles = baseArticles.filter(a => parseInt(a.readTime) >= 5 && parseInt(a.readTime) < 10);
        if (filterReadTime === 'long') baseArticles = baseArticles.filter(a => parseInt(a.readTime) >= 10);
    }

    // Sort by Date for "Latest"
    const latest = [...baseArticles].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

    // Featured (Simulated: pick first 2 or random)
    const featured = latest.slice(0, 2);

    // Recommendations (Journey)
    // Create a dummy user profile context for the engine
    const dummyProfile: UserProfile = {
        id: 'hub-visitor',
        role: type === 'role' ? (value as UserRole) : 'all',
        language: 'en',
        savedTopics: type === 'topic' ? [value] : [],
        completedArticleIds: []
    };
    const recs = getRecommendations(dummyProfile, INITIAL_ARTICLES).recommendations;

    return { relevantArticles: latest, featuredArticles: featured, recommendations: recs };
  }, [type, value, filterReadTime]);

  // Pagination
  const totalPages = Math.ceil(relevantArticles.length / itemsPerPage);
  const paginatedArticles = relevantArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Derived Related Topics
  const relatedTopics = useMemo(() => {
    const tags = new Set<string>();
    relevantArticles.forEach(a => a.tags.forEach(t => {
        if (t !== value) tags.add(t);
    }));
    return Array.from(tags).slice(0, 8);
  }, [relevantArticles, value]);

  // Header Icon Logic
  const renderHeaderIcon = () => {
      switch(type) {
          case 'role': return <BookOpen className="w-64 h-64" />;
          case 'topic': return <Tag className="w-64 h-64" />;
          case 'series': return <Layers className="w-64 h-64" />;
          case 'archive': return <Archive className="w-64 h-64" />;
          default: return <BookOpen className="w-64 h-64" />;
      }
  };

  // Header Text Logic
  const renderDescription = () => {
      if (type === 'role') return `Curated learning paths, guides, and essential security resources tailored for ${value}s.`;
      if (type === 'topic') return `Deep dive into ${value}. Explore articles, guides, and checklists related to this critical topic.`;
      if (type === 'series') return `A curated collection of articles in the "${value}" series. Follow the path to mastery.`;
      if (type === 'archive') return `Browsing all articles published in ${value}.`;
      return '';
  };

  const renderLabel = () => {
      if (type === 'role') return 'Audience Hub';
      if (type === 'topic') return 'Topic Explorer';
      if (type === 'series') return 'Content Series';
      if (type === 'archive') return 'Date Archive';
      return 'Hub';
  };

  return (
    <div className="container mx-auto px-4 py-8 fade-in">
      {/* Header Module */}
      <header className="mb-12 text-center md:text-left bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
             {renderHeaderIcon()}
        </div>
        <div className="relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider mb-4">
                {renderLabel()}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 capitalize">
                {value}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl">
                {renderDescription()}
            </p>
        </div>
      </header>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar: Filters & Related */}
        <aside className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 sticky top-24">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Filter className="w-4 h-4" /> Filters
                </h3>
                
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-semibold text-slate-500 uppercase block mb-2">Read Time</label>
                        <select 
                            className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                            onChange={(e) => setFilterReadTime(e.target.value || null)}
                            value={filterReadTime || ''}
                        >
                            <option value="">Any Duration</option>
                            <option value="short">Short (&lt; 5 min)</option>
                            <option value="medium">Medium (5-10 min)</option>
                            <option value="long">Long (&gt; 10 min)</option>
                        </select>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-4">Related Topics</h3>
                    <div className="flex flex-wrap gap-2">
                        {relatedTopics.map(t => (
                            <button 
                                key={t}
                                onClick={() => onNavigateTopic(t)}
                                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded transition-colors"
                            >
                                #{t}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3 space-y-12">
            
            {/* Module: Featured (Only show for Role/Topic/Series, maybe less relevant for Archive) */}
            {type !== 'archive' && featuredArticles.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        Featured
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {featuredArticles.map(article => (
                            <ArticleCard 
                                key={article.id} 
                                article={article} 
                                onClick={onNavigateArticle}
                                recommendationReason="Editor's Choice"
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* Module: Journey (Recommendations) */}
            {type === 'role' && recommendations.length > 0 && (
                <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                     <h2 className="text-xl font-bold text-slate-900 mb-4">Your Cyber Journey</h2>
                     <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
                         {recommendations.slice(0, 3).map(rec => {
                             const art = relevantArticles.find(a => a.id === rec.articleId) || featuredArticles.find(a => a.id === rec.articleId);
                             if (!art) return null;
                             return (
                                 <div key={rec.articleId} className="min-w-[280px] bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                                     <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-wider mb-2">{rec.reason}</span>
                                     <h4 className="font-bold text-slate-800 mb-2 line-clamp-2">{art.title}</h4>
                                     <button 
                                        onClick={() => onNavigateArticle(art.id)}
                                        className="mt-auto text-sm font-medium text-slate-500 hover:text-cyan-600 text-left"
                                     >
                                         Read Now →
                                     </button>
                                 </div>
                             )
                         })}
                     </div>
                </section>
            )}

            {/* Module: Latest / All Articles */}
            <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    {type === 'archive' ? `Articles from ${value}` : 'Articles'}
                </h2>
                {paginatedArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {paginatedArticles.map(article => (
                            <ArticleCard 
                                key={article.id} 
                                article={article} 
                                onClick={onNavigateArticle}
                                onTagClick={onNavigateTopic}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-slate-500 italic py-8">No articles found for this section.</div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4">
                        <button 
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="text-sm font-medium text-slate-600">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button 
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </section>

        </main>
      </div>
    </div>
  );
};

export default HubView;
