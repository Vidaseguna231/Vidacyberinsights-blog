
import React, { useState, useMemo, useEffect } from 'react';
import Layout from './components/Layout';
import ArticleCard from './components/ArticleCard';
import ArticleView from './components/ArticleView';
import HubView from './components/HubView';
import SearchBar from './components/SearchBar';
import { INITIAL_ARTICLES } from './constants';
import { Article, UserRole, Language, UserProfile, Recommendation } from './types';
import { searchArticles } from './services/geminiService';
import { getRecommendations } from './services/recommendationService';
import { Filter, GraduationCap, Users, Briefcase, School, Star, Sparkles } from 'lucide-react';

type ViewState = 
  | { type: 'home' }
  | { type: 'article'; id: string }
  | { type: 'role-hub'; role: UserRole }
  | { type: 'topic-hub'; topic: string }
  | { type: 'series-hub'; series: string }
  | { type: 'archive-hub'; date: string };

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>({ type: 'home' });
  const [userRole, setUserRole] = useState<UserRole>('all'); // Persistent preference
  const [language, setLanguage] = useState<Language>('en');
  const [searchResults, setSearchResults] = useState<string[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  
  // Recommendation State for Home
  const [homeRecommendations, setHomeRecommendations] = useState<Recommendation[]>([]);

  // Update document title based on view
  useEffect(() => {
    if (viewState.type === 'home') document.title = 'Vidacyberinsights - Global Cybersecurity Awareness';
  }, [viewState]);

  // Update recommendations when role changes (Only relevant for Home view mostly)
  useEffect(() => {
    if (userRole === 'all') {
        setHomeRecommendations([]);
        return;
    }

    const mockUser: UserProfile = {
        id: 'home-visitor',
        role: userRole,
        language: language,
        savedTopics: [],
        completedArticleIds: []
    };

    const response = getRecommendations(mockUser, INITIAL_ARTICLES);
    setHomeRecommendations(response.recommendations);

  }, [userRole, language]);

  // Featured articles for Home
  const featuredArticles = useMemo(() => {
      return INITIAL_ARTICLES.slice(0, 4);
  }, []);

  // -- Navigation Handlers --

  const navigateToArticle = (id: string) => {
    setViewState({ type: 'article', id });
    window.scrollTo(0, 0);
  };

  const navigateToRoleHub = (role: UserRole) => {
    setViewState({ type: 'role-hub', role });
    setUserRole(role); // Also update global preference
    window.scrollTo(0, 0);
  };

  const navigateToTopicHub = (topic: string) => {
    setViewState({ type: 'topic-hub', topic });
    window.scrollTo(0, 0);
  };
  
  const navigateToSeriesHub = (series: string) => {
    setViewState({ type: 'series-hub', series });
    window.scrollTo(0, 0);
  }

  const navigateToArchiveHub = (date: string) => {
    setViewState({ type: 'archive-hub', date });
    window.scrollTo(0, 0);
  }

  const navigateHome = () => {
    setViewState({ type: 'home' });
    setSearchResults(null);
    window.scrollTo(0, 0);
  };

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    const ids = await searchArticles(query, INITIAL_ARTICLES);
    setSearchResults(ids);
    setIsSearching(false);
    
    // Ensure we are on home to show results, or decide how to show search results.
    // For now, simpler to stay on home if searching.
    if (viewState.type !== 'home') {
        setViewState({ type: 'home' });
    }
    
    setTimeout(() => {
        const resultsEl = document.getElementById('search-results');
        if (resultsEl) resultsEl.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // -- Render Logic --

  const getActiveArticle = () => {
      if (viewState.type === 'article') {
          return INITIAL_ARTICLES.find(a => a.id === viewState.id);
      }
      return null;
  };

  const selectedArticle = getActiveArticle();
  const relatedArticles = selectedArticle 
    ? INITIAL_ARTICLES
        .filter(a => a.id !== selectedArticle.id && (a.audience === selectedArticle.audience || a.tags.some(t => selectedArticle.tags.includes(t))))
        .slice(0, 3)
    : [];

  return (
    <Layout
      userRole={userRole}
      onRoleChange={navigateToRoleHub}
      language={language}
      onLanguageChange={setLanguage}
      onNavigateHome={navigateHome}
      onNavigateArchive={navigateToArchiveHub}
    >
      {viewState.type === 'home' && (
        <div className="space-y-16 fade-in pb-12">
          
          {/* 1. Homepage Hero Section */}
          <section className="relative text-center py-20 px-4 -mt-8 bg-slate-900 text-white rounded-b-[3rem] shadow-2xl overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900 via-slate-900 to-slate-950 pointer-events-none"></div>
            
            <div className="relative z-10 max-w-4xl mx-auto">
                <span className="inline-block px-3 py-1 rounded-full bg-cyan-900/50 border border-cyan-500/30 text-cyan-300 text-sm font-semibold mb-6 animate-pulse">
                    Global Cybersecurity Awareness
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
                Secure Your Digital Life, <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">One Click at a Time.</span>
                </h1>
                <p className="text-slate-300 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
                Vidacyberinsights provides accessible, multilingual, and role-based education to help you navigate the digital world safely.
                </p>

                {/* Main Role Selector Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                    {[
                        { id: 'student', icon: GraduationCap, label: 'Student' },
                        { id: 'parent', icon: Users, label: 'Parent' },
                        { id: 'business', icon: Briefcase, label: 'Business' },
                        { id: 'educator', icon: School, label: 'Educator' },
                    ].map((role) => (
                        <button
                            key={role.id}
                            onClick={() => navigateToRoleHub(role.id as UserRole)}
                            className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-3 group ${
                                userRole === role.id 
                                ? 'bg-cyan-600 border-cyan-500 text-white shadow-lg scale-105' 
                                : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-slate-500 text-slate-400 hover:text-white'
                            }`}
                        >
                            <role.icon className={`w-8 h-8 ${userRole === role.id ? 'text-white' : 'text-cyan-500 group-hover:text-cyan-400'}`} />
                            <span className="font-semibold text-sm">{role.label}</span>
                        </button>
                    ))}
                </div>
            </div>
          </section>

          {/* 2. Recommendations or Featured Section */}
          <section className="container mx-auto px-4">
              {homeRecommendations.length > 0 && !searchResults ? (
                  <div className="fade-in">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                            <Sparkles className="w-6 h-6 text-indigo-600 fill-indigo-100" />
                            Recommended For You
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {homeRecommendations.slice(0, 3).map(rec => {
                              const article = INITIAL_ARTICLES.find(a => a.id === rec.articleId);
                              if (!article) return null;
                              return (
                                  <ArticleCard 
                                    key={article.id} 
                                    article={article} 
                                    onClick={navigateToArticle} 
                                    onTagClick={navigateToTopicHub}
                                    recommendationReason={rec.reason}
                                  />
                              );
                          })}
                      </div>
                  </div>
              ) : (
                  !searchResults && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                                Featured Insights
                            </h2>
                        </div>
                        <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide snap-x snap-mandatory">
                            {featuredArticles.map(article => (
                                <div key={article.id} className="min-w-[300px] md:min-w-[400px] snap-center">
                                    <ArticleCard 
                                        article={article} 
                                        onClick={navigateToArticle} 
                                        onTagClick={navigateToTopicHub}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                  )
              )}
          </section>

          {/* 3. Search & Explore Section */}
          <section id="search-results" className="container mx-auto px-4 bg-slate-50 rounded-3xl p-4 md:p-8">
            <div className="max-w-3xl mx-auto text-center mb-10">
                 <h2 className="text-3xl font-bold text-slate-900 mb-4">Explore Knowledge Base</h2>
                 <p className="text-slate-600 mb-8">Search our library to find exactly what you need.</p>
                 <SearchBar onSearch={handleSearch} isSearching={isSearching} />
            </div>

            {searchResults ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {INITIAL_ARTICLES
                    .filter(a => searchResults.includes(a.id))
                    .sort((a, b) => searchResults.indexOf(a.id) - searchResults.indexOf(b.id))
                    .map((article) => (
                    <ArticleCard 
                        key={article.id} 
                        article={article} 
                        onClick={navigateToArticle} 
                        onTagClick={navigateToTopicHub}
                    />
                ))}
                </div>
            ) : null}
          </section>
        </div>
      )}

      {viewState.type === 'role-hub' && (
          <HubView 
            type="role" 
            value={viewState.role} 
            onNavigateArticle={navigateToArticle}
            onNavigateTopic={navigateToTopicHub}
          />
      )}

      {viewState.type === 'topic-hub' && (
          <HubView 
            type="topic" 
            value={viewState.topic} 
            onNavigateArticle={navigateToArticle}
            onNavigateTopic={navigateToTopicHub}
          />
      )}

      {viewState.type === 'series-hub' && (
          <HubView 
            type="series" 
            value={viewState.series} 
            onNavigateArticle={navigateToArticle}
            onNavigateTopic={navigateToTopicHub}
          />
      )}

      {viewState.type === 'archive-hub' && (
          <HubView 
            type="archive" 
            value={viewState.date} 
            onNavigateArticle={navigateToArticle}
            onNavigateTopic={navigateToTopicHub}
          />
      )}

      {viewState.type === 'article' && selectedArticle && (
        <div className="pt-8 px-4">
            <ArticleView 
              article={selectedArticle} 
              onBack={navigateHome}
              relatedArticles={relatedArticles}
              onArticleClick={navigateToArticle}
              onSeriesClick={navigateToSeriesHub}
            />
        </div>
      )}
    </Layout>
  );
};

export default App;
