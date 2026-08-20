import React from 'react';
import { X, Bookmark, Trash2, ExternalLink, Briefcase, MapPin, ChevronRight } from 'lucide-react';
import AnimatedApplyButton from './AnimatedApplyButton';

export default function BookmarksDrawer({
  isOpen,
  onClose,
  bookmarkedJobs = [],
  onSelectJob,
  onRemoveBookmark,
  onClearAll
}) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="absolute inset-y-0 right-0 max-w-full flex pl-10 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md dark:bg-[#0F172A] bg-white/95 backdrop-blur-2xl border-l dark:border-slate-800 border-orange-200 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 dark:bg-slate-900 bg-orange-50/80 border-b dark:border-slate-800 border-orange-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl dark:bg-emerald-500/10 dark:text-emerald-400 bg-orange-100 text-orange-600">
                <Bookmark className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="font-black dark:text-white text-slate-950 text-base">Saved Opportunities</h3>
                <p className="text-xs dark:text-slate-400 text-slate-600 font-medium">{bookmarkedJobs.length} Bookmarked Roles</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {bookmarkedJobs.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="p-2 text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                  title="Clear all bookmarks"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              
              <button
                onClick={onClose}
                className="p-2 dark:text-slate-400 dark:hover:text-white text-slate-500 hover:text-slate-900 rounded-lg dark:hover:bg-slate-800 hover:bg-orange-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="p-5 overflow-y-auto space-y-3 flex-1 text-sm">
            {bookmarkedJobs.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-12 h-12 rounded-full dark:bg-slate-800 bg-slate-100 flex items-center justify-center mx-auto dark:text-slate-500 text-slate-400">
                  <Bookmark className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold dark:text-slate-300 text-slate-800">No saved jobs yet</p>
                <p className="text-xs dark:text-slate-500 text-slate-500 max-w-xs mx-auto">
                  Click the bookmark icon on any job card to save it for later review and quick application.
                </p>
              </div>
            ) : (
              bookmarkedJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-3.5 rounded-2xl dark:bg-slate-900/90 dark:border-slate-800 dark:hover:border-slate-700 bg-slate-50 border border-slate-200 hover:border-orange-200 transition-all flex flex-col justify-between gap-3 group shadow-sm"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 
                        onClick={() => {
                          onClose();
                          onSelectJob(job);
                        }}
                        className="font-black dark:text-white text-slate-900 text-xs dark:hover:text-emerald-400 hover:text-orange-600 cursor-pointer transition-colors"
                      >
                        {job.title}
                      </h4>

                      <button
                        onClick={() => onRemoveBookmark(job.id)}
                        className="dark:text-slate-500 text-slate-400 hover:text-rose-500 p-1 transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs font-bold dark:text-emerald-400 text-orange-600 mt-0.5">{job.companyName}</p>
                    
                    <div className="flex items-center gap-2 mt-2 text-[11px] dark:text-slate-400 text-slate-600 font-medium">
                      {job.salaryRange && <span className="dark:text-emerald-300 text-emerald-700 font-mono font-bold">{job.salaryRange}</span>}
                      <span>•</span>
                      <span>{job.area}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t dark:border-slate-800/80 border-slate-200">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectJob(job);
                      }}
                      className="text-xs font-bold dark:text-cyan-400 text-orange-600 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>

                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(job.companyName + ' ' + job.title + ' careers hyderabad')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold flex items-center gap-1 hover:scale-105 transition-all"
                    >
                      <span>Apply</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {bookmarkedJobs.length > 0 && (
            <div className="p-4 dark:bg-slate-900/90 bg-slate-50 border-t dark:border-slate-800 border-slate-200 text-center">
              <p className="text-xs dark:text-slate-400 text-slate-500 font-medium">
                Saved in your browser local storage
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
