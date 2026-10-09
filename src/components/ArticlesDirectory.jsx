import React, { useState } from 'react';
import { HYDERABAD_ARTICLES } from '../data/articles';
import { BookOpen, Clock, Tag, ArrowRight, Sparkles, Filter } from 'lucide-react';

export default function ArticlesDirectory({ onSelectArticle }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Ecosystem Research', 'SaaS & Cloud', 'AI & DeepTech', 'SpaceTech & Defence', 'Career & Talent', 'CleanTech & EV', 'HealthTech & Bio', 'City & Lifestyle'];

  const filteredArticles = selectedCategory === 'All'
    ? HYDERABAD_ARTICLES
    : HYDERABAD_ARTICLES.filter(a => a.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl border border-indigo-500/20 text-white shadow-xl overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-xs font-semibold text-indigo-300">
            <Sparkles className="w-3.5 h-3.5" />
            Original Editorial & Research Guides
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Hyderabad Tech Insights & Ecosystem Reports
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Data-backed analyses of venture capital inflows, tech corridor comparisons, compensation benchmarks, and hiring playbooks across Greater Hyderabad's startup clusters.
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredArticles.map(article => (
          <article
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className="group cursor-pointer flex flex-col justify-between p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 font-medium rounded-lg">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-[11px]">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
              </div>

              <h2 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                {article.title}
              </h2>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">{article.publishedDate}</span>
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                Read Guide <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
