import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Sparkles, Building2, Briefcase, MapPin, DollarSign, Send, Check } from 'lucide-react';
import { ROLE_CATEGORIES, INDUSTRIES, EXPERIENCE_LEVELS, WORK_MODES } from './FilterBar';
import { HYDERABAD_HUBS } from '../data/hubs';

export default function PostJobModal({ isOpen, onClose, onAddJob }) {
  const [formData, setFormData] = useState({
    companyName: '',
    title: '',
    roleCategory: 'Engineering',
    industry: 'SaaS / Enterprise',
    experienceLevel: 'Mid-Level (3-6 yrs)',
    workMode: 'Hybrid',
    salaryRange: '₹18 - ₹30 LPA',
    hubId: 'hitec-city',
    area: 'HITEC City, Hyderabad',
    skills: 'React, Node.js, AWS, TypeScript',
    description: '',
    careerUrl: '',
    hrMail: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.companyName || !formData.title || !formData.description) {
      alert('Please fill in Company Name, Job Title, and Description');
      return;
    }

    const newJob = {
      id: `job-custom-${Date.now()}`,
      companyId: formData.companyName.toLowerCase().replace(/\s+/g, '-'),
      companyName: formData.companyName,
      title: formData.title,
      roleCategory: formData.roleCategory,
      industry: formData.industry,
      experienceLevel: formData.experienceLevel,
      experience: formData.experienceLevel,
      workMode: formData.workMode,
      salaryRange: formData.salaryRange,
      postedDaysAgo: 0,
      hubId: formData.hubId,
      area: formData.area || 'Hyderabad',
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      description: formData.description,
      responsibilities: [
        `Deliver high impact product features for ${formData.companyName}.`,
        "Collaborate with cross-functional product and engineering squads in Hyderabad.",
        "Ensure scalability, code quality, and fast execution."
      ],
      requirements: [
        `Demonstrated experience relevant to ${formData.title}.`,
        `Hands-on expertise in ${formData.skills}.`,
        "Strong problem-solving and communication skills."
      ],
      perks: ["Startup ESOPs", "Health Insurance", "Flexible Work Culture"],
      careerUrl: formData.careerUrl,
      hrMail: formData.hrMail
    };

    onAddJob(newJob);

    // Fire celebratory confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1600);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-[#0F172A] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 to-[#131E35] border-b border-slate-800 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">Post a Hyderabad Startup Job</h2>
              <p className="text-xs text-slate-400 mt-0.5">Reach thousands of top Hyderabad engineers & tech talent</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Job Posted Successfully!</h3>
            <p className="text-sm text-slate-400">Your job is now live on the Hyderabad Startup Map and Job Board.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            
            {/* Row 1: Company & Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Company / Startup Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Darwinbox, Skyroot, MyStartup"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Frontend Engineer (React)"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Row 2: Category & Industry */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Role Category</label>
                <select
                  value={formData.roleCategory}
                  onChange={(e) => setFormData({ ...formData, roleCategory: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  {ROLE_CATEGORIES.filter(r => r !== 'All Roles').map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Industry Sector</label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  {INDUSTRIES.filter(i => i !== 'All Industries').map(i => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Hub & Salary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Hyderabad Cluster</label>
                <select
                  value={formData.hubId}
                  onChange={(e) => {
                    const hub = HYDERABAD_HUBS.find(h => h.id === e.target.value);
                    setFormData({ 
                      ...formData, 
                      hubId: e.target.value,
                      area: hub ? `${hub.name}, Hyderabad` : 'Hyderabad'
                    });
                  }}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  {HYDERABAD_HUBS.filter(h => h.id !== 'all').map(h => (
                    <option key={h.id} value={h.id}>{h.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Salary Range (₹ LPA)</label>
                <input
                  type="text"
                  placeholder="e.g. ₹20 - ₹35 LPA"
                  value={formData.salaryRange}
                  onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Work Mode</label>
                <select
                  value={formData.workMode}
                  onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  {WORK_MODES.filter(w => w !== 'All Modes').map(w => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 4: Tech Stack Skills */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Required Tech Stack (comma separated)</label>
              <input
                type="text"
                placeholder="e.g. React, Next.js, Python, PostgreSQL, AWS"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            {/* Row 5: Description */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Job Description & Responsibilities *</label>
              <textarea
                required
                rows={3}
                placeholder="Describe key responsibilities, role impact, and what makes this position exciting..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Row 6: Application Link & HR Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Career / Apply URL</label>
                <input
                  type="url"
                  placeholder="https://company.com/careers/job-123"
                  value={formData.careerUrl}
                  onChange={(e) => setFormData({ ...formData, careerUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Official HR / Hiring Email</label>
                <input
                  type="email"
                  placeholder="careers@company.com"
                  value={formData.hrMail}
                  onChange={(e) => setFormData({ ...formData, hrMail: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Publish Job Opening to Hyderabad Map</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
