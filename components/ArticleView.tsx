
import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { BookOpen, BrainCircuit, Wand2, ArrowLeft, Calendar, User, ArrowRight, Layers } from 'lucide-react';
import QuizModal from './QuizModal';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
  relatedArticles: Article[];
  onArticleClick: (id: string) => void;
  onSeriesClick?: (series: string) => void;
}

const ArticleView: React.FC<ArticleViewProps> = ({ article, onBack, relatedArticles, onArticleClick, onSeriesClick }) => {
  const [complexity, setComplexity] = useState<'beginner' | 'advanced'>('beginner');
  const [content, setContent] = useState<string>(article.content);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Instant content switching without "AI loading" state to build trust
  useEffect(() => {
      // Default to standard content
      let newContent = article.content;

      if (complexity === 'beginner' && article.contentBeginner) {
          newContent = article.contentBeginner;
      } else if (complexity === 'advanced' && article.contentAdvanced) {
          newContent = article.contentAdvanced;
      } else if (complexity === 'beginner' && article.audience === 'student') {
           // If it's a student article, the default IS beginner usually, but we ensure consistency
           newContent = article.content;
      } else if (complexity === 'advanced' && article.audience === 'business') {
           newContent = article.content;
      }

      setContent(newContent);
  }, [complexity, article]);

  // Robust Markdown Parser
  const parseInlineMarkdown = (text: string) => {
    // Split by bold syntax first
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
        }
        return part;
    });
  };

  const renderContent = (text: string) => {
    return text.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return <div key={index} className="h-6"></div>;

      if (trimmedLine.startsWith('## ')) {
          return <h2 key={index} className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-slate-900 tracking-tight leading-tight">{trimmedLine.replace('## ', '')}</h2>;
      }
      
      if (trimmedLine.startsWith('### ')) {
          return <h3 key={index} className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-slate-800 leading-snug">{trimmedLine.replace('### ', '')}</h3>;
      }
      
      if (trimmedLine.startsWith('#### ')) {
          return <h4 key={index} className="text-xl md:text-2xl font-bold mt-6 mb-3 text-slate-800 leading-snug">{trimmedLine.replace('#### ', '')}</h4>;
      }
      
      if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
          const content = trimmedLine.replace(/^[\*-] /, '');
          return (
            <li key={index} className="ml-6 mb-3 list-disc pl-2 text-slate-700 leading-relaxed text-lg md:text-xl marker:text-cyan-500">
                {parseInlineMarkdown(content)}
            </li>
          );
      }
      
      if (trimmedLine.match(/^\d+\. /)) {
          const content = trimmedLine.replace(/^\d+\. /, '');
          return (
            <li key={index} className="ml-6 mb-3 list-decimal pl-2 text-slate-700 leading-relaxed text-lg md:text-xl marker:text-slate-900 font-medium">
                {parseInlineMarkdown(content)}
            </li>
          );
      }

      return (
        <p key={index} className="mb-6 text-slate-700 leading-8 text-lg md:text-xl font-normal text-opacity-90">
          {parseInlineMarkdown(trimmedLine)}
        </p>
      );
    });
  };

  return (
    <div className="w-full fade-in pb-20">
      
      {/* Full Bleed Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[65vh] lg:h-[70vh]">
         <img 
            src={article.imageUrl} 
            alt={article.altText || article.title} 
            className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
         
         {/* Navigation Overlay */}
         <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10">
            <button 
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full transition-all text-sm font-medium border border-white/20"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Hub
            </button>
         </div>

         {/* Hero Content */}
         <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-16">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-wrap gap-3 mb-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500 text-white shadow-sm`}>
                        {article.audience}
                    </span>
                    {article.series && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/20">
                            {article.series}
                        </span>
                    )}
                </div>

                {article.imageCaption && (
                    <p className="text-slate-300 text-sm md:text-base italic mb-4 font-serif opacity-80 max-w-2xl border-l-2 border-cyan-500 pl-3">
                        {article.imageCaption}
                    </p>
                )}
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-sm">
                    {article.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-slate-200 font-medium">
                     <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-cyan-400" />
                        <span>{article.author}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-cyan-400" />
                        <span>{article.publishDate}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-cyan-400" />
                        <span>{article.readTime} read</span>
                     </div>
                </div>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8 px-4 md:px-8">
        
        {/* Left Sidebar (Desktop Only) - Outline / Metadata */}
        <div className="hidden lg:block lg:col-span-3 pt-8">
             <div className="sticky top-24 space-y-8">
                 <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {article.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded hover:bg-slate-200 transition-colors cursor-default">
                                {tag}
                            </span>
                        ))}
                    </div>
                 </div>
                 
                 {article.series && onSeriesClick && (
                     <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                         <h4 className="text-indigo-900 font-bold text-sm mb-2 flex items-center gap-2">
                             <Layers className="w-4 h-4" /> Series
                         </h4>
                         <p className="text-indigo-700 text-xs mb-3">Part of the <strong>{article.series}</strong> learning path.</p>
                         <button 
                            onClick={() => onSeriesClick(article.series!)}
                            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-wide"
                         >
                             View Series →
                         </button>
                     </div>
                 )}
             </div>
        </div>

        {/* Main Content Column */}
        <div className="lg:col-span-7">
            
            {/* Controls */}
            <div className="sticky top-16 z-20 bg-white/90 backdrop-blur-md py-4 border-b border-slate-100 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center bg-slate-100 rounded-lg p-1 w-full sm:w-auto">
                    <button
                    onClick={() => setComplexity('beginner')}
                    className={`flex-1 sm:flex-none px-4 md:px-6 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                        complexity === 'beginner' 
                        ? 'bg-white text-emerald-700 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                    >
                    <BookOpen className="w-4 h-4" />
                    Simple
                    </button>
                    <button
                    onClick={() => setComplexity('advanced')}
                    className={`flex-1 sm:flex-none px-4 md:px-6 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                        complexity === 'advanced' 
                        ? 'bg-white text-indigo-700 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                    >
                    <BrainCircuit className="w-4 h-4" />
                    Expert
                    </button>
                </div>

                <button 
                    onClick={() => setIsQuizOpen(true)}
                    className="w-full sm:w-auto px-6 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-lg font-semibold shadow-lg shadow-slate-200 transition-all flex items-center justify-center gap-2 text-sm"
                >
                    <Wand2 className="w-4 h-4 text-cyan-400" />
                    Take Quiz
                </button>
            </div>

            {/* Article Text */}
            <article className="markdown-body min-h-[500px]">
              {renderContent(content)}
            </article>

            {/* Post-Article Divider */}
            <div className="h-px bg-slate-200 my-12"></div>

             {/* Recommended Articles Mobile/Desktop Bottom */}
             <div className="mt-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-8">Read Next</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedArticles.slice(0, 2).map(rel => (
                        <div 
                            key={rel.id} 
                            onClick={() => onArticleClick(rel.id)}
                            className="group cursor-pointer"
                        >
                            <div className="h-48 rounded-xl overflow-hidden relative mb-4">
                                <img 
                                    src={rel.imageUrl} 
                                    alt={rel.altText || rel.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                />
                                <div className="absolute top-2 left-2">
                                    <span className="bg-white/90 backdrop-blur text-slate-900 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                                        {rel.audience}
                                    </span>
                                </div>
                            </div>
                            <h4 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-cyan-700 transition-colors">
                                {rel.title}
                            </h4>
                            <p className="text-slate-500 text-sm line-clamp-2">{rel.summary}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Right Sidebar - Spacer or Future Widgets */}
        <div className="hidden lg:block lg:col-span-2"></div>
      
      </div>

      {isQuizOpen && (
        <QuizModal 
            isOpen={isQuizOpen} 
            onClose={() => setIsQuizOpen(false)} 
            articleContent={content} 
        />
      )}
    </div>
  );
};

export default ArticleView;