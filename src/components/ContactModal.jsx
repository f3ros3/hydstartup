import React, { useState } from 'react';
import { X, Mail, MapPin, Send, MessageSquare, CheckCircle2, Clock } from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    try {
      const messages = JSON.parse(localStorage.getItem('hyd_contact_messages') || '[]');
      messages.push({
        ...formData,
        sentAt: new Date().toISOString()
      });
      localStorage.setItem('hyd_contact_messages', JSON.stringify(messages));
    } catch {
      // ignore
    }

    setIsSent(true);
  };

  const handleReset = () => {
    setIsSent(false);
    setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Get in Touch</span>
            <h2 id="contact-modal-title" className="text-xl font-bold text-slate-900 dark:text-white">
              Contact HydStartup Portal
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl">
              <Mail className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-1.5" />
              <div className="text-xs font-bold text-slate-900 dark:text-white">Direct Email</div>
              <a href="mailto:techwithshaik2@gmail.com" className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline break-all">
                techwithshaik2@gmail.com
              </a>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl">
              <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-1.5" />
              <div className="text-xs font-bold text-slate-900 dark:text-white">Response SLA</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Within 24-48 business hours
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl">
              <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-1.5" />
              <div className="text-xs font-bold text-slate-900 dark:text-white">Location</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Hyderabad, Telangana, India
              </p>
            </div>
          </div>

          {isSent ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 mx-auto bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Message Sent Successfully!</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                Thank you for reaching out. We will get back to your email ({formData.email}) shortly.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-2 px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl text-xs"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Your Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rahul@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Editorial Feedback">Editorial / Content Feedback</option>
                  <option value="Partnership & Data Curation">Partnership & Data Curation</option>
                  <option value="Grievance / Legal Request">Grievance / Legal Request</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows="3"
                  placeholder="How can we assist you today?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                <a
                  href="https://www.instagram.com/techwithshaik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-pink-500 transition-colors"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>@techwithshaik</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-emerald-500/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
