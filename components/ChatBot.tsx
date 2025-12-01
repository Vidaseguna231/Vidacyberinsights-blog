import React, { useState, useEffect, useRef } from 'react';
import { createChatSession } from '../services/geminiService';
import { UserRole, Language } from '../types';
import { MessageCircle, X, Send, Bot, User, Loader2, Minimize2, ArrowRight } from 'lucide-react';
import { Chat } from '@google/genai';
import { INITIAL_ARTICLES } from '../constants';

interface ChatBotProps {
  userRole: UserRole;
  language: Language;
}

interface Message {
  role: 'user' | 'model';
  text: string;
  recommendedArticleIds?: string[];
}

const ChatBot: React.FC<ChatBotProps> = ({ userRole, language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I am your Vidacyberinsights assistant. How can I help you stay safe online today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize or Reset Chat Session when context changes
  useEffect(() => {
    try {
      const session = createChatSession(userRole, language);
      setChatSession(session);
      // Optional: Reset messages on role switch or keep history? 
      // Keeping history might be confusing if the persona changes, so we reset for clarity.
      if (isOpen) {
         setMessages([{ role: 'model', text: `Chat context updated for role: ${userRole}. How can I help?` }]);
      }
    } catch (error) {
      console.error("Failed to init chat", error);
    }
  }, [userRole, language]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || !chatSession) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const result = await chatSession.sendMessage({ message: userMsg });
      let text = result.text || '';
      let recommendedIds: string[] = [];

      // Parse RECOMMENDATIONS tag from the response
      // Expected format: RECOMMENDED: [id1, id2]
      const recMatch = text.match(/RECOMMENDED: \[(.*?)\]/);
      if (recMatch) {
          const idsString = recMatch[1];
          recommendedIds = idsString.split(',').map(s => s.trim()).filter(Boolean);
          // Remove the tag from the visible text
          text = text.replace(recMatch[0], '').trim();
      }

      setMessages(prev => [...prev, { role: 'model', text, recommendedArticleIds: recommendedIds }]);
    } catch (error) {
      console.error("Chat error", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting right now. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Simple Markdown Parser (Bold & Lists)
  const renderMessageText = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, i) => {
        // Bold
        const parts = line.split(/(\*\*.*?\*\*)/g);
        const renderedLine = parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={j} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
            }
            return part;
        });

        if (line.trim().startsWith('- ')) {
            return <div key={i} className="flex gap-2 ml-2 mb-1"><span className="text-slate-400">•</span><span>{renderedLine}</span></div>;
        }
        
        return <p key={i} className={`mb-2 ${line.trim() === '' ? 'h-2' : ''}`}>{renderedLine}</p>;
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-xl hover:scale-105 transition-all flex items-center gap-2 group"
        aria-label="Open Support Chat"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-medium whitespace-nowrap">
          Ask AI
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-4 md:right-6 z-50 w-[90vw] md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300 max-h-[80vh]">
      {/* Header */}
      <div className="bg-slate-900 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-500 rounded-lg">
                <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
                <h3 className="font-bold text-sm">Assistant</h3>
                <p className="text-[10px] text-slate-300">Powered by Gemini 3 Pro</p>
            </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
            <Minimize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-4 bg-slate-50 min-h-[300px] max-h-[500px] space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`flex gap-3 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                     msg.role === 'model' ? 'bg-indigo-100' : 'bg-slate-200'
                }`}>
                    {msg.role === 'model' ? <Bot className="w-4 h-4 text-indigo-600" /> : <User className="w-4 h-4 text-slate-500" />}
                </div>
                
                <div 
                    className={`rounded-2xl p-3 text-sm leading-relaxed shadow-sm ${
                        msg.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'
                    }`}
                >
                    {msg.role === 'user' ? msg.text : renderMessageText(msg.text)}
                </div>
            </div>

            {/* Render Suggested Articles Chips */}
            {msg.recommendedArticleIds && msg.recommendedArticleIds.length > 0 && (
                <div className="ml-11 flex flex-col gap-2 w-full max-w-[85%]">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Suggested Reading</span>
                    {msg.recommendedArticleIds.map(id => {
                        const article = INITIAL_ARTICLES.find(a => a.id === id);
                        if (!article) return null;
                        return (
                            <div key={id} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm hover:border-indigo-300 transition-colors cursor-pointer group">
                                <h4 className="font-bold text-slate-800 text-xs mb-1 group-hover:text-indigo-600 transition-colors">{article.title}</h4>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-slate-500 uppercase">{article.audience}</span>
                                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-500" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
          </div>
        ))}
        {isLoading && (
            <div className="flex gap-3 justify-start">
                 <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                    <span className="text-xs text-slate-500">Thinking...</span>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
        <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-grow px-4 py-2 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />
        <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
            <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default ChatBot;