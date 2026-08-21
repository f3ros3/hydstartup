import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, BellRing, Rocket } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(() => {
    try {
      return localStorage.getItem('hyd_newsletter_subscribed') === 'true';
    } catch {
      return false;
    }
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubscribed(true);
      try {
        localStorage.setItem('hyd_newsletter_subscribed', 'true');
        localStorage.setItem('hyd_newsletter_email', email);
      } catch (err) {}
    }, 600);
  };

  return (
    <section className="relative z-10 w-full max-w-6xl mx-auto my-8 sm:my-12 px-3 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-10 dark:bg-gradient-to-br dark:from-[#0E1526]/90 dark:via-[#11192E]/90 dark:to-[#0B1020]/90 bg-gradient-to-br from-white/90 via-slate-50/90 to-orange-50/70 border dark:border-slate-800/80 border-slate-200/90 shadow-2xl backdrop-blur-xl transition-all">
        
        {/* Ambient Glow Gradients */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Text Column */}
          <div className="flex-1 text-center lg:text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30 bg-orange-500/20 text-orange-700 border border-orange-500/30 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hyderabad Tech Weekly Digest</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight dark:text-white text-slate-900">
              Stay Ahead in Hyderabad's <span className="dark:text-emerald-400 text-orange-600">Tech Ecosystem</span> 🚀
            </h3>

            <p className="text-xs sm:text-sm dark:text-slate-300 text-slate-700 font-medium max-w-xl leading-relaxed">
              Join <strong>4,500+</strong> Hyderabad developers, engineers, and startup founders. Receive weekly curated tech job openings, unicorn funding alerts, and T-Hub/HITEC City networking meetups.
            </p>

            {/* Perks Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-[11px] font-bold dark:text-slate-400 text-slate-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Verified Active Openings
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                Zero Spam Guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <BellRing className="w-3.5 h-3.5 text-amber-500" />
                Every Thursday Morning
              </span>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="w-full lg:w-auto lg:min-w-[380px] shrink-0">
            {isSubscribed ? (
              <div className="p-6 rounded-2xl dark:bg-emerald-500/10 bg-emerald-50 border dark:border-emerald-500/30 border-emerald-300 text-center space-y-2.5 shadow-lg">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/30">
                  <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h4 className="text-base font-extrabold dark:text-white text-slate-900">You're Subscribed! 🎉</h4>
                <p className="text-xs dark:text-slate-300 text-slate-700">
                  You'll receive the next edition of Hyderabad Tech Opportunities straight to your inbox.
                </p>
                <button
                  onClick={() => {
                    setIsSubscribed(false);
                    try {
                      localStorage.removeItem('hyd_newsletter_subscribed');
                    } catch (e) {}
                  }}
                  className="text-[11px] font-bold text-slate-400 hover:text-emerald-500 underline cursor-pointer pt-1"
                >
                  Change email address
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <div className="relative flex flex-col sm:flex-row items-stretch gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMsg) setErrorMsg('');
                      }}
                      placeholder="Enter your email (e.g. shaik@tech.io)"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl dark:bg-slate-900/80 bg-white border dark:border-slate-700 border-slate-300 text-xs sm:text-sm font-semibold dark:text-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {errorMsg && (
                  <p className="text-[11px] font-bold text-rose-500 pl-1">{errorMsg}</p>
                )}

                <p className="text-[10px] text-center dark:text-slate-400 text-slate-500 font-medium">
                  🔒 We respect your privacy. Unsubscribe anytime with 1 click.
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
