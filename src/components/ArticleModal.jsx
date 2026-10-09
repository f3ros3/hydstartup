import React from 'react';
import { X, Clock, Calendar, User, ArrowLeft, Share2, Tag, BookOpen } from 'lucide-react';

export default function ArticleModal({ article, isOpen, onClose }) {
  if (!isOpen || !article) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-title"
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <BookOpen className="w-4 h-4" />
            <span>{article.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Share article"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
          {/* Metadata */}
          <div className="space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
            <h1 id="article-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {article.title}
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {article.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-emerald-500" />
                {article.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {article.publishedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
            </div>
          </div>

          {/* Rendered HTML Content */}
          <div 
            className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed space-y-4
              prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white
              prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3
              prose-h3:text-lg prose-h3:mt-4 prose-h3:mb-2
              prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed
              prose-ul:list-disc prose-ul:pl-5 prose-ul:space-y-1.5
              prose-ol:list-decimal prose-ol:pl-5 prose-ol:space-y-1.5
              prose-strong:text-slate-900 dark:prose-strong:text-white
              prose-table:w-full prose-table:border-collapse"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                <Tag className="w-3 h-3" /> Tags:
              </span>
              {article.tags.map(t => (
                <span key={t} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded-lg">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
          <span className="text-xs text-slate-500">HydStartup Portal Research Desk</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl text-xs"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
}
