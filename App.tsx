
import React, { useState, useMemo, useEffect } from 'react';
import Layout from './components/Layout';
import ArticleCard from './components/ArticleCard';
import ArticleView from './components/ArticleView';
import SearchBar from './components/SearchBar';
import { INITIAL_ARTICLES } from './constants';
import { Article, UserRole, Language, UserProfile, Recommendation } from './types';
import { searchArticles } from './services/geminiService';
import { getRecommendations } from './services/recommendationService';
import { Filter, GraduationCap, Users, Briefcase, School, Star, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'article'>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('all');
  const [language, setLanguage] = useState<Language>('en');
  const [searchResults, setSearchResults] = useState<string[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  
  // Recommendation State
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  // Derive unique topics (tags) from available articles
  const availableTopics = useMemo(() => {
     const allTags = new Set<string>();
     INITIAL_ARTICLES.forEach(a => a.tags.forEach(t => allTags.add(t)));
     return Array.from(allTags).sort();
  }, []);

  // Update recommendations when role changes
  useEffect(() => {
    if (userRole === 'all') {
        setRecommendations([]);
        return;
    }

    // Mock User Profile for the selected role
    const mockUser: UserProfile = {
        id: 'mock-user-1',
        role: userRole,
        language: language,
        savedTopics: userRole === 'business' ? ['Ransomware', 'Strategy'] : ['Basics'], // Simulate some saved interest
        completedArticleIds: [] // Simulate new user
    };

    const response = getRecommendations(mockUser, INITIAL_ARTICLES);
    setRecommendations(response.recommendations);
    console.log("Recommendation Debug:", response.debug);

  }, [userRole, language]);

  // Filter articles based on Role, Search Results, and Topic
  const filteredArticles = useMemo(() => {
    let articles = INITIAL_ARTICLES;

    // Filter by Role
    if (userRole !== 'all') {
      articles = articles.filter(a => a.audience === userRole);
    }

    // Filter by Topic
    if (selectedTopic) {
        articles = articles.filter(a => a.tags.includes(selectedTopic));
    }

    // Filter by Search (if active)
    if (searchResults) {
      // Sort by the order returned by Gemini
      articles = articles.filter(a => searchResults.includes(a.id));
      articles.sort((a, b) => searchResults.indexOf(a.id) - searchResults.indexOf(b.id));
    }

    return articles;
  }, [userRole, searchResults, selectedTopic]);

  // Featured articles (fallback if no specific recommendations or user is 'all')
  const featuredArticles = useMemo(() => {
      return INITIAL_ARTICLES.slice(0, 4);
  }, []);

  const handleArticleClick = (id: string) => {
    setSelectedArticleId(id);
    setCurrentView('article');
    window.scrollTo(0, 0);
  };

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    // Pass all articles to the search service to determine relevance
    const ids = await searchArticles(query, INITIAL_ARTICLES);
    setSearchResults(ids);
    setIsSearching(false);
    
    // If we search, we want to scroll to the results area usually
    const resultsEl = document.getElementById('blog-feed');
    if (resultsEl) resultsEl.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHomeNavigate = () => {
    setCurrentView('home');
    setSelectedArticleId(null);
    setSearchResults(null);
    setSelectedTopic(null);
    // userRole state persists or resets depending on preference, currently persists
  };

  const selectedArticle = INITIAL_ARTICLES.find(a => a.id === selectedArticleId);

  // Find recommended articles (same audience or shared tags, excluding current)
  const relatedArticles = selectedArticle 
    ? INITIAL_ARTICLES
        .filter(a => a.id !== selectedArticle.id && (a.audience === selectedArticle.audience || a.tags.some(t => selectedArticle.tags.includes(t))))
        .slice(0, 3)
    : [];

  // Helper to get article object from ID
  const getArticleById = (id: string) => INITIAL_ARTICLES.find(a => a.id === id);

  return (
    <Layout
      userRole={userRole}
      onRoleChange={(role) => {
        setUserRole(role);
        setSearchResults(null);
        setSelectedTopic(null);
        setCurrentView('home');
      }}
      language={language}
      onLanguageChange={setLanguage}
      onNavigateHome={handleHomeNavigate}
    >
      {currentView === 'home' ? (
        <div className="space-y-16 fade-in pb-12">
          
          {/* 1. Homepage Hero Section */}
          <section className="relative text-center py-20 px-4 -mt-8 bg-slate-900 text-white rounded-b-[3rem] shadow-2xl overflow-hidden">
             {/* Abstract Background pattern */}
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
                            onClick={() => setUserRole(role.id as UserRole)}
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
              {recommendations.length > 0 ? (
                  <div className="fade-in">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                            <Sparkles className="w-6 h-6 text-indigo-600 fill-indigo-100" />
                            Recommended For You
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {recommendations.map(rec => {
                              const article = getArticleById(rec.articleId);
                              if (!article) return null;
                              return (
                                  <ArticleCard 
                                    key={article.id} 
                                    article={article} 
                                    onClick={handleArticleClick} 
                                    recommendationReason={rec.reason}
                                  />
                              );
                          })}
                      </div>
                  </div>
              ) : (
                  // Default Featured Carousel
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
                                    <ArticleCard article={article} onClick={handleArticleClick} />
                                </div>
                            ))}
                        </div>
                    </div>
                  )
              )}
          </section>

          {/* 3. Blog Feed Section */}
          <section id="blog-feed" className="container mx-auto px-4 bg-slate-50 rounded-3xl p-4 md:p-8">
            <div className="max-w-3xl mx-auto text-center mb-10">
                 <h2 className="text-3xl font-bold text-slate-900 mb-4">Explore Knowledge Base</h2>
                 <p className="text-slate-600 mb-8">Search our library or filter by topic to find exactly what you need.</p>
                 <SearchBar onSearch={handleSearch} isSearching={isSearching} />
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 border-b border-slate-200 pb-4">
                 <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                    <Filter className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    <button 
                        onClick={() => setSelectedTopic(null)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border whitespace-nowrap ${
                            selectedTopic === null ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                        }`}
                    >
                        All Topics
                    </button>
                    {availableTopics.map(topic => (
                        <button 
                            key={topic}
                            onClick={() => setSelectedTopic(topic === selectedTopic ? null : topic)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border whitespace-nowrap ${
                                selectedTopic === topic ? 'bg-cyan-600 text-white border-cyan-600' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                            }`}
                        >
                            {topic}
                        </button>
                    ))}
                 </div>
                 
                 <div className="text-sm text-slate-500 font-medium">
                     Showing {filteredArticles.length} Articles
                 </div>
            </div>

            {/* Results Grid */}
            {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                    <ArticleCard 
                    key={article.id} 
                    article={article} 
                    onClick={handleArticleClick} 
                    />
                ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-slate-200">
                    <div className="text-slate-400 mb-2">No articles found</div>
                    <button onClick={() => {setSearchResults(null); setSelectedTopic(null); setUserRole('all')}} className="text-cyan-600 hover:underline font-medium">
                        Clear all filters
                    </button>
                </div>
            )}
          </section>
        </div>
      ) : (
        selectedArticle && (
          <div className="pt-8 px-4">
              <ArticleView 
                article={selectedArticle} 
                onBack={handleHomeNavigate}
                relatedArticles={relatedArticles}
                onArticleClick={handleArticleClick}
              />
          </div>
        )
      )}
    </Layout>
  );
};

export default App;
