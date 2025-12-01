
import React from 'react';
import { UserRole, Article } from '../types';
import { INITIAL_ARTICLES } from '../constants';
import { ArrowRight, CheckCircle, Lock, BookOpen, Map, Flag } from 'lucide-react';

interface RoadmapViewProps {
  onNavigateArticle: (id: string) => void;
}

const RoadmapView: React.FC<RoadmapViewProps> = ({ onNavigateArticle }) => {
  
  // Define the paths by Article IDs
  const PATHS: Record<string, { title: string, description: string, steps: string[] }> = {
    all: {
      title: "Foundations",
      description: "Essential knowledge for everyone. Start here.",
      steps: ['8', '9', '1', '7', '5', '10'] // What is Cyber -> Why Learn -> Passwords -> MFA -> Phishing -> Router
    },
    student: {
      title: "Student Path",
      description: "Protect your social media, grades, and future career.",
      steps: ['8', '5', '1', '7'] // Basics -> Phishing -> Passwords -> MFA
    },
    parent: {
      title: "Parent Path",
      description: "Keep your family safe and guide your kids online.",
      steps: ['8', '3', '11', '10'] // Basics -> Kids Social -> Teen Privacy -> Router
    },
    business: {
      title: "Business Path",
      description: "Secure your revenue, data, and reputation.",
      steps: ['8', '6', '2', '5'] // Basics -> Checklist -> Ransomware -> Phishing
    },
    educator: {
      title: "Educator Path",
      description: "Resources and curriculum for the digital classroom.",
      steps: ['8', '4', '5', '1'] // Basics -> Digital Cit -> Phishing -> Passwords
    }
  };

  const renderPath = (roleKey: string) => {
    const path = PATHS[roleKey];
    if (!path) return null;

    return (
      <div key={roleKey} className="mb-16 last:mb-0">
        <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 rounded-xl ${roleKey === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {roleKey === 'all' ? <Flag className="w-6 h-6" /> : <Map className="w-6 h-6" />}
            </div>
            <div>
                <h2 className="text-2xl font-bold text-slate-900 capitalize">{path.title}</h2>
                <p className="text-slate-600 text-sm">{path.description}</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 relative">
             {/* Connector Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 -translate-y-1/2 rounded-full"></div>

            {path.steps.map((stepId, index) => {
                const article = INITIAL_ARTICLES.find(a => a.id === stepId);
                if (!article) return null;
                
                return (
                    <div 
                        key={stepId} 
                        onClick={() => onNavigateArticle(article.id)}
                        className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <BookOpen className="w-24 h-24 text-indigo-600" />
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center text-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                {index + 1}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded">
                                {article.readTime}
                            </span>
                        </div>

                        <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                            {article.title}
                        </h3>
                        <p className="text-slate-500 text-xs line-clamp-2 mb-4">
                            {article.summary}
                        </p>

                        <div className="flex items-center text-indigo-600 text-xs font-bold gap-1 mt-auto">
                            Start Lesson <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12 fade-in">
        <header className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-100">
                Structured Learning
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
                Your Cybersecurity Roadmap
            </h1>
            <p className="text-lg text-slate-600">
                Not sure where to start? Follow these step-by-step paths designed to take you from beginner to secure, tailored to your role.
            </p>
        </header>

        {renderPath('all')}
        
        <div className="my-16 border-t border-slate-200"></div>
        
        <h2 className="text-center text-xl font-bold text-slate-400 uppercase tracking-widest mb-12">Role-Specific Paths</h2>
        
        {renderPath('student')}
        {renderPath('parent')}
        {renderPath('business')}
        {renderPath('educator')}
    </div>
  );
};

export default RoadmapView;
