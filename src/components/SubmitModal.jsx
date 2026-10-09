import React, { useState } from 'react';
import { X, Send, Building2, Briefcase, Link, MapPin, Mail, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SubmitModal({ isOpen, onClose }) {
  const [submissionType, setSubmissionType] = useState('startup'); // 'startup' | 'job'
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    careerUrl: '',
    industry: 'SaaS / Enterprise',
    hubArea: 'hitec-city',
    jobTitle: '',
    jobApplyUrl: '',
    experienceLevel: 'Mid-Level (3-6 yrs)',
    salaryRange: '',
    submitterEmail: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Please provide a valid company name.');
      return;
    }
    if (!formData.submitterEmail.trim() || !formData.submitterEmail.includes('@')) {
      setErrorMsg('Please provide a valid contact email.');
      return;
    }

    // Save to localStorage as a submission record
    try {
      const existing = JSON.parse(localStorage.getItem('hyd_submissions') || '[]');
      existing.push({
        ...formData,
        submissionType,
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('hyd_submissions', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setErrorMsg('');
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      website: '',
      careerUrl: '',
      industry: 'SaaS / Enterprise',
      hubArea: 'hitec-city',
      jobTitle: '',
      jobApplyUrl: '',
      experienceLevel: 'Mid-Level (3-6 yrs)',
      salaryRange: '',
      submitterEmail: '',
      notes: ''
    });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="submit-modal-title"
    >
      <div 
        className="relative w-full max-w-xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Community Submission</span>
            <h2 id="submit-modal-title" className="text-xl font-bold text-slate-900 dark:text-white">
              {submissionType === 'startup' ? 'Submit a Hyderabad Startup' : 'Submit a Verified Job Role'}
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

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Submission Received!</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                Thank you for contributing to the Hyderabad startup portal. Our editorial team reviews every listing against official company career portals before publishing.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors shadow-md"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type Switcher */}
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setSubmissionType('startup')}
                  className={`flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-xl transition-all ${
                    submissionType === 'startup'
                      ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  Startup Profile
                </button>
                <button
                  type="button"
                  onClick={() => setSubmissionType('job')}
                  className={`flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-xl transition-all ${
                    submissionType === 'job'
                      ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  Job Vacancy
                </button>
              </div>

              {errorMsg && (
                <div className="flex items-center gap-2 p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-700 dark:text-rose-300 text-xs font-medium">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Startup Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Company Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Darwinbox, Skyroot Aerospace"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              {/* Sector & Hub */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Sector / Industry
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  >
                    <option value="SaaS / Enterprise">SaaS / Enterprise</option>
                    <option value="AI / DeepTech">AI / DeepTech</option>
                    <option value="FinTech / SaaS">FinTech & Banking</option>
                    <option value="SpaceTech & Aerospace">SpaceTech & Aerospace</option>
                    <option value="CleanTech & EV">CleanTech & EV</option>
                    <option value="HealthTech & Bio">HealthTech & Bio</option>
                    <option value="EdTech & Consumer">EdTech & Consumer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Tech Hub Area
                  </label>
                  <select
                    value={formData.hubArea}
                    onChange={(e) => setFormData({ ...formData, hubArea: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  >
                    <option value="t-hub-raidurg">T-Hub / Knowledge City</option>
                    <option value="hitec-city">HITEC City & Mindspace</option>
                    <option value="financial-district">Financial District / Nanakramguda</option>
                    <option value="gachibowli">Gachibowli Corridor</option>
                    <option value="madhapur">Madhapur & Durgam Cheruvu</option>
                    <option value="jubilee-hills">Jubilee & Banjara Hills</option>
                    <option value="begumpet">Begumpet & Central Hyd</option>
                  </select>
                </div>
              </div>

              {/* Website & Careers URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Website URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Careers Portal URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/careers"
                    value={formData.careerUrl}
                    onChange={(e) => setFormData({ ...formData, careerUrl: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>
              </div>

              {/* Job Specific Fields */}
              {submissionType === 'job' && (
                <div className="space-y-3 p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Job Role Title <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Senior Backend Engineer - Go / Distributed Systems"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Experience Level
                      </label>
                      <select
                        value={formData.experienceLevel}
                        onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                        className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="Fresher (0-1 yr)">Fresher (0-1 yr)</option>
                        <option value="Junior (1-3 yrs)">Junior (1-3 yrs)</option>
                        <option value="Mid-Level (3-6 yrs)">Mid-Level (3-6 yrs)</option>
                        <option value="Senior / Lead (6+ yrs)">Senior / Lead (6+ yrs)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Salary Range (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. ₹20 - ₹35 LPA"
                        value={formData.salaryRange}
                        onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                        className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submitter Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Official Email (For Verification) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="founder@startup.com or recruiter@company.in"
                  value={formData.submitterEmail}
                  onChange={(e) => setFormData({ ...formData, submitterEmail: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Additional Context / Verification Notes
                </label>
                <textarea
                  rows="2"
                  placeholder="Office address in Hyderabad, key investors, or verified ATS link..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                ></textarea>
              </div>

              {/* Footer Actions */}
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
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-emerald-500/20"
                >
                  <Send className="w-4 h-4" />
                  Submit for Review
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
