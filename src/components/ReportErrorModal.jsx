import React, { useState } from 'react';
import { X, Flag, CheckCircle2, AlertCircle, Send } from 'lucide-react';

export default function ReportErrorModal({ isOpen, onClose, defaultItemName = '' }) {
  const [targetEntity, setTargetEntity] = useState(defaultItemName || '');
  const [errorType, setErrorType] = useState('broken-link');
  const [description, setDescription] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    try {
      const reports = JSON.parse(localStorage.getItem('hyd_error_reports') || '[]');
      reports.push({
        targetEntity,
        errorType,
        description,
        reporterEmail,
        reportedAt: new Date().toISOString()
      });
      localStorage.setItem('hyd_error_reports', JSON.stringify(reports));
    } catch {
      // ignore
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setDescription('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-modal-title"
    >
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
              <Flag className="w-5 h-5" />
            </div>
            <div>
              <h2 id="report-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
                Report an Error / Suggest Edit
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Help us keep Hyderabad tech directory 100% accurate</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Report Logged!</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
                Thank you for flagging this. Our editorial team investigates reported broken links and updates within 24 hours.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-2 px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl text-sm"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Company / Job Listing Reference
                </label>
                <input
                  type="text"
                  placeholder="e.g. Darwinbox or Senior Backend Engineer Job"
                  value={targetEntity}
                  onChange={(e) => setTargetEntity(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Issue Type
                </label>
                <select
                  value={errorType}
                  onChange={(e) => setErrorType(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="broken-link">Broken Career / Apply Link</option>
                  <option value="closed-job">Job Vacancy Closed / Inactive</option>
                  <option value="moved-office">Moved Office / Wrong Hub Location</option>
                  <option value="outdated-info">Outdated Funding / Tech Stack Info</option>
                  <option value="other">Other Editorial Inaccuracy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Details / Correct Information <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows="3"
                  placeholder="Please describe the issue or share the updated link..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Email (Optional, if you want confirmation)
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={reporterEmail}
                  onChange={(e) => setReporterEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md"
                >
                  <Send className="w-4 h-4" />
                  Submit Report
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
