
import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { BookOpen, BrainCircuit, Wand2, ArrowLeft, Calendar, User, ArrowRight } from 'lucide-react';
import QuizModal from './QuizModal';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
  relatedArticles: Article[];
  onArticleClick: (id: string) => void;
}

const ArticleView: React.FC<ArticleViewProps> = ({ article, onBack, relatedArticles, onArticleClick }) => {
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
      if (!trimmedLine) return <div key={index} className="h-4"></div>;

      if (trimmedLine.startsWith('## ')) {
          return <h2 key={index} className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-slate-900 tracking-tight">{trimmedLine.replace('## ', '')}</h2>;
      }
      
      if (trimmedLine.startsWith('### ')) {
          return <h3 key={index} className="text-xl md:text-2xl font-bold mt-6 mb-3 text-slate-800">{trimmedLine.replace('### ', '')}</h3>;
      }
      
      if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
          const content = trimmedLine.replace(/^[\*-] /, '');
          return (
            <li key={index} className="ml-6 mb-2 list-disc pl-2 text-slate-700 leading-relaxed marker:text-cyan-500">
                {parseInlineMarkdown(content)}
            </li>
          );
      }
      
      if (trimmedLine.match(/^\d+\. /)) {
          const content = trimmedLine.replace(/^\d+\. /, '');
          return (
            <li key={index} className="ml-6 mb-2 list-decimal pl-2 text-slate-700 leading-relaxed marker:text-slate-900 font-medium">
                {parseInlineMarkdown(content)}
            </li>
          );
      }

      return (
        <p key={index} className="mb-4 text-slate-700 leading-7 text-lg">
          {parseInlineMarkdown(trimmedLine)}
        </p>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto fade-in pb-12">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center text-slate-500 hover:text-cyan-600 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Knowledge Base
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
        
        {/* New Layout: Image Separated from Text */}
        <div className="w-full h-64 md:h-96 overflow-hidden bg-slate-100 relative">
             <img 
                src={article.imageUrl} 
                alt={article.altText || article.title} 
                className="w-full h-full object-cover" 
             />
             <div className="absolute top-4 left-4 flex gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-slate-900 shadow-sm`}>
                    {article.audience}
                </span>
             </div>
        </div>

        <div className="p-6 md:p-10 border-b border-slate-100">
             <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                        {tag}
                    </span>
                ))}
             </div>

             <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight text-slate-900">
                {article.title}
             </h1>
             
             <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium">
                 <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-cyan-500" />
                    <span>{article.author}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cyan-500" />
                    <span>{article.publishDate}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-cyan-500" />
                    <span>{article.readTime} read</span>
                 </div>
             </div>
        </div>

        {/* Controls - Sticky Header for Content */}
        <div className="px-6 py-4 md:px-10 bg-slate-50/80 backdrop-blur-md sticky top-16 z-20 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
           <div className="flex items-center bg-white rounded-lg p-1 border border-slate-200 shadow-sm w-full sm:w-auto">
             <button
               onClick={() => setComplexity('beginner')}
               className={`flex-1 sm:flex-none px-6 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                 complexity === 'beginner' 
                 ? 'bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-200' 
                 : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
               }`}
             >
               <BookOpen className="w-4 h-4" />
               Simple
             </button>
             <button
               onClick={() => setComplexity('advanced')}
               className={`flex-1 sm:flex-none px-6 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                 complexity === 'advanced' 
                 ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200' 
                 : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
               }`}
             >
               <BrainCircuit className="w-4 h-4" />
               Expert
             </button>
           </div>

           <button 
             onClick={() => setIsQuizOpen(true)}
             className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg font-semibold shadow-md transition-all flex items-center justify-center gap-2"
           >
             <Wand2 className="w-4 h-4 text-cyan-400" />
             Take Quiz
           </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-12 min-h-[400px]">
             <article className="markdown-body max-w-none">
              {renderContent(content)}
             </article>
        </div>
      </div>

      {/* Recommended Articles */}
      {relatedArticles.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                Related Knowledge
                <div className="h-px bg-slate-200 flex-grow ml-4"></div>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map(rel => (
                    <div 
                        key={rel.id} 
                        onClick={() => onArticleClick(rel.id)}
                        className="bg-white rounded-xl border border-slate-200 hover:shadow-lg hover:border-cyan-200 transition-all cursor-pointer group flex flex-col overflow-hidden"
                    >
                        <div className="h-40 overflow-hidden relative">
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
                        <div className="p-5 flex flex-col flex-grow">
                            <h4 className="font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-cyan-700 transition-colors leading-snug">
                                {rel.title}
                            </h4>
                            <div className="mt-auto pt-4 flex items-center text-cyan-600 text-xs font-bold uppercase tracking-wide group-hover:gap-2 transition-all">
                                Read Article <ArrowRight className="w-3 h-3 ml-1" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
      )}

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
