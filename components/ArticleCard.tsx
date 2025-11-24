
import React from 'react';
import { Article } from '../types';
import { Clock, Tag, ArrowRight, Sparkles } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onClick: (id: string) => void;
  recommendationReason?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick, recommendationReason }) => {
  return (
    <article 
      className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:border-cyan-100 transition-all cursor-pointer group flex flex-col h-full relative"
      onClick={() => onClick(article.id)}
    >
      {recommendationReason && (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {recommendationReason}
        </div>
      )}
      
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <img 
          src={article.imageUrl} 
          alt={article.altText || article.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
            <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest shadow-sm ${
                article.audience === 'student' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                article.audience === 'business' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                'bg-purple-50 text-purple-700 border border-purple-100'
            }`}>
                {article.audience}
            </span>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-3 uppercase tracking-wider">
          <Clock className="w-3 h-3" />
          <span>{article.readTime} READ</span>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-cyan-700 transition-colors leading-tight">
          {article.title}
        </h3>
        
        <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
          {article.summary}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
           <div className="flex gap-2">
             {article.tags.slice(0, 2).map(tag => (
               <span key={tag} className="inline-flex items-center text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded uppercase">
                 {tag}
               </span>
             ))}
           </div>
           <span className="text-cyan-600 p-2 rounded-full hover:bg-cyan-50 transition-all">
             <ArrowRight className="w-5 h-5" />
           </span>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
