import React, { useEffect, useState } from 'react';

// Extensive curated list of technology & top tech company logos with wide roving drift & mouse parallax
export default function FloatingTechBackground() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX / innerWidth) - 0.5) * 35;
      const y = ((e.clientY / innerHeight) - 0.5) * 35;

      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setMouseOffset({ x, y });
      });
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        const { innerWidth, innerHeight } = window;
        const x = ((touch.clientX / innerWidth) - 0.5) * 25;
        const y = ((touch.clientY / innerHeight) - 0.5) * 25;
        setMouseOffset({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const techLogos = [
    // --- DIRECTLY UNDER HEADER & SUBHEADER (TOP 0% - 15%) ---
    {
      name: 'Python',
      color: '#38BDF8',
      top: '1%',
      left: '14%',
      size: 'w-10 sm:w-12 h-10 sm:h-12',
      blur: 'blur-[1px]',
      opacity: 'opacity-35',
      delay: '0s',
      duration: '14s',
      driftClass: 'animate-drift-1',
      parallaxFactor: 1.2,
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.9 2c-3.5 0-5.8 1.5-5.8 4.3v1.8h5.9v.8H3.8C1.7 8.9 0 10.7 0 13.7c0 3.2 1.7 4.8 4.7 4.8h1.5v-2.3c0-1.8 1.4-3.2 3.2-3.2h5.8c1.3 0 2.3-.9 2.3-2.3V5.8C17.5 3.3 15.4 2 11.9 2zm-1.8 2.2c.5 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zM12.1 22c3.5 0 5.8-1.5 5.8-4.3v-1.8H12v-.8h8.2c2.1 0 3.8-1.8 3.8-4.8 0-3.2-1.7-4.8-4.7-4.8h-1.5v2.3c0 1.8-1.4 3.2-3.2 3.2H8.8c-1.3 0-2.3.9-2.3 2.3v4.9c0 2.5 2.1 3.8 5.6 3.8zm1.8-2.2c-.5 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"/>
        </svg>
      )
    },
    {
      name: 'Apple',
      color: '#CBD5E1',
      top: '3%',
      left: '52%',
      size: 'w-9 sm:w-11 h-9 sm:h-11',
      blur: 'blur-[1px]',
      opacity: 'opacity-30',
      delay: '2s',
      duration: '16s',
      driftClass: 'animate-drift-3',
      parallaxFactor: -1.1,
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.75c.66-.82 1.11-1.96.99-3.1-.96.04-2.11.64-2.8 1.45-.6.69-1.13 1.84-1 2.97 1.07.08 2.16-.54 2.81-1.32z"/>
        </svg>
      )
    },
    {
      name: 'TypeScript',
      color: '#3178C6',
      top: '2%',
      left: '82%',
      size: 'w-10 sm:w-12 h-10 sm:h-12',
      blur: 'blur-[1px]',
      opacity: 'opacity-35',
      delay: '1s',
      duration: '15s',
      driftClass: 'animate-drift-2',
      parallaxFactor: 1.3,
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm11.246 12.339c.075 0 .15.012.222.036 1.488.498 2.52 1.344 3.096 2.538.576 1.194.864 2.682.864 4.464 0 1.632-.27 3.036-.81 4.212s-1.374 2.088-2.502 2.736-2.52.972-4.176.972c-1.44 0-2.688-.204-3.744-.612v-3.708c.984.456 2.016.684 3.096.684 1.152 0 2.04-.264 2.664-.792s.936-1.308.936-2.34c0-.888-.264-1.572-.792-2.052s-1.368-.828-2.52-1.044c-1.896-.36-3.24-.96-4.032-1.8s-1.188-1.956-1.188-3.348c0-1.488.27-2.76.81-3.816s1.332-1.872 2.376-2.448 2.316-.864 3.816-.864c1.248 0 2.376.168 3.384.504v3.528c-.912-.384-1.872-.576-2.88-.576-1.032 0-1.848.24-2.448.72s-.9 1.152-.9 2.016c0 .768.252 1.38.756 1.836s1.296.792 2.376 1.008c.576.12 1.056.24 1.44.36z"/>
        </svg>
      )
    },
    {
      name: 'OpenAI',
      color: '#10A37F',
      top: '10%',
      left: '4%',
      size: 'w-10 sm:w-12 h-10 sm:h-12',
      blur: 'blur-[1px]',
      opacity: 'opacity-35',
      delay: '3s',
      duration: '17s',
      driftClass: 'animate-drift-4',
      parallaxFactor: -1.3,
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.771-4.205 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.746-7.074zm-9.022 12.608a4.475 4.475 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zm-1.64-10.74a4.477 4.477 0 0 1 2.345-1.974l-.004.164v5.518a.792.792 0 0 0 .393.685l5.843 3.368-2.02 1.168a.08.08 0 0 1-.07.006L3.6 13.738a4.502 4.502 0 0 1-1.64-6.174zm15.82 4.092l-5.843-3.37 2.02-1.166a.08.08 0 0 1 .07-.006l4.846 2.793a4.502 4.502 0 0 1-.369 8.125v-5.69a.79.79 0 0 0-.393-.686zm2.016-3.874l-.142-.086-4.78-2.757a.78.78 0 0 0-.783 0L8.248 8.308V5.976a.08.08 0 0 1 .033-.062l4.84-2.794a4.5 4.5 0 0 1 6.679 4.66zM12 14.083L9.17 12.45l2.83-1.633 2.83 1.633z"/>
        </svg>
      )
    },
    {
      name: 'NVIDIA',
      color: '#76B900',
      top: '11%',
      left: '36%',
      size: 'w-11 sm:w-13 h-11 sm:h-13',
      blur: 'blur-[1.5px]',
      opacity: 'opacity-30',
      delay: '1.5s',
      duration: '18s',
      driftClass: 'animate-drift-2',
      parallaxFactor: 1.1,
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.966 2.102C6.518 2.102 2.1 6.52 2.1 11.968c0 5.448 4.418 9.866 9.866 9.866 5.448 0 9.866-4.418 9.866-9.866 0-5.448-4.418-9.866-9.866-9.866zm.88 15.356c-3.13 0-5.672-2.542-5.672-5.672 0-3.13 2.542-5.672 5.672-5.672 1.48 0 2.83.567 3.847 1.498l-1.397 1.397c-.643-.593-1.5-.955-2.45-.955-1.996 0-3.618 1.622-3.618 3.618 0 1.996 1.622 3.618 3.618 3.618 1.745 0 3.205-1.24 3.535-2.887H12.846v-1.94h5.617c.07.362.107.737.107 1.12 0 3.23-2.614 5.875-5.724 5.875z"/>
        </svg>
      )
    },
    {
      name: 'Docker',
      color: '#2496ED',
      top: '9%',
      left: '68%',
      size: 'w-11 sm:w-13 h-11 sm:h-13',
      blur: 'blur-[2px]',
      opacity: 'opacity-30',
      delay: '4s',
      duration: '16s',
      driftClass: 'animate-drift-1',
      parallaxFactor: -1.2,
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.98 11.12h-2.09v-2.1h2.1v2.1zm-2.48 0H9.41v-2.1h2.09v2.1zm-2.5 0H6.91v-2.1h2.1v2.1zm-2.49 0H4.42v-2.1h2.1v2.1zm7.47-2.48h-2.09v-2.1h2.1v2.1zm-2.48 0H9.41v-2.1h2.09v2.1zm-2.5 0H6.91v-2.1h2.1v2.1zm7.46 2.48h2.1v-2.1h-2.1v2.1zm8.95.83c-.45-.33-1.41-.44-2.14-.34-.14-.73-.55-1.42-1.12-1.92l-.57-.47-.41.6c-.39.57-.61 1.25-.66 1.95-.51.27-1.45.39-2.1.18l-.34-.11-.22.28c-.85 1.09-1.25 2.53-1.25 4.09 0 .39.04.78.11 1.15H1.47C.66 16.5 0 17.16 0 17.97c0 3.32 2.69 6.03 6.02 6.03 5.48 0 9.87-3.69 11.08-8.91 1.74-.06 3.8-.57 5.17-2.07.41-.44.57-.96.48-1.53-.08-.53-.45-.92-.85-1.1z"/>
        </svg>
      )
    },
    {
      name: 'GitHub',
      color: '#94A3B8',
      top: '12%',
      left: '94%',
      size: 'w-10 sm:w-12 h-10 sm:h-12',
      blur: 'blur-[1px]',
      opacity: 'opacity-30',
      delay: '2.5s',
      duration: '17s',
      driftClass: 'animate-drift-3',
      parallaxFactor: 1.4,
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      )
    },

    // --- MID SECTION / HERO & MAIN SPLIT VIEW (20% - 60%) ---
    {
      name: 'Golang',
      color: '#00ADD8',
      top: '25%',
      left: '8%',
      size: 'w-11 sm:w-13 h-11 sm:h-13',
      blur: 'blur-[1.5px]',
      opacity: 'opacity-35',
      delay: '1.2s',
      duration: '15s',
      driftClass: 'animate-drift-1',
      parallaxFactor: -1.5,
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.811 10.231c.147-.563.364-1.077.65-1.542.476-.776 1.139-1.378 1.988-1.808.85-.43 1.83-.645 2.94-.645 1.488 0 2.766.417 3.834 1.251 1.067.834 1.764 1.996 2.091 3.486h-2.584c-.237-.803-.687-1.428-1.35-1.874-.663-.446-1.442-.669-2.337-.669-.974 0-1.785.289-2.433.867-.648.578-.992 1.341-1.032 2.289h9.108c-.015.828-.152 1.62-.411 2.376-.39 1.137-1.038 2.083-1.944 2.838-.906.755-2.02 1.133-3.342 1.133-1.548 0-2.85-.45-3.906-1.35-1.056-.9-1.688-2.146-1.896-3.738h9.384c-.168.84-.57 1.512-1.206 2.016-.636.504-1.416.756-2.34.756-.84 0-1.548-.222-2.124-.666-.576-.444-.924-1.056-1.044-1.836H1.811zM18.847 7.02h2.892l-4.704 9.96h-2.616l4.428-9.96z"/>
        </svg>
      )
    },
    {
      name: 'React',
      color: '#61DAFB',
      top: '28%',
      left: '88%',
      size: 'w-12 sm:w-14 h-12 sm:h-14',
      blur: 'blur-[2px]',
      opacity: 'opacity-35',
      delay: '3.5s',
      duration: '18s',
      driftClass: 'animate-drift-4',
      parallaxFactor: 1.2,
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm0-7.5c-4.8 0-9 1.5-11 3.8 2 2.3 6.2 3.8 11 3.8s9-1.5 11-3.8c-2-2.3-6.2-3.8-11-3.8zm0 15c-4.8 0-9 1.5-11 3.8 2 2.3 6.2 3.8 11 3.8s9-1.5 11-3.8c-2-2.3-6.2-3.8-11-3.8z"/>
        </svg>
      )
    },
    {
      name: 'Amazon / AWS',
      color: '#FF9900',
      top: '40%',
      left: '3%',
      size: 'w-12 sm:w-14 h-12 sm:h-14',
      blur: 'blur-[2px]',
      opacity: 'opacity-35',
      delay: '2s',
      duration: '16s',
      driftClass: 'animate-drift-2',
      parallaxFactor: -1.4,
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.86 11.23c-.15.22-.39.3-.65.2l-1.39-.56a.54.54 0 0 1-.32-.67c.81-2.05 2.6-3.48 4.79-3.82.26-.04.5.14.54.4l.22 1.48c.04.26-.14.5-.4.54-1.57.24-2.85 1.27-3.43 2.74zM18.8 15.65c-2.73 2.01-6.42 3.08-9.84 3.08-4.63 0-8.8-1.89-11.95-5.07-.25-.25-.19-.62.11-.8.25-.15.58-.1.79.11 2.91 2.91 6.74 4.64 11.05 4.64 3.12 0 6.47-.98 9.01-2.78.36-.26.83.1.53.52l.3.3zM21.73 14.3c-.34-.44-2.28-.21-3.15-.1-.26.03-.3-.21-.07-.37 1.51-1.04 3.99-.74 4.3.12.31.87-.79 3.32-2.23 4.47-.22.18-.43.08-.34-.15.3-.77 1.83-3.53 1.49-3.97z"/>
        </svg>
      )
    },
    {
      name: 'Meta',
      color: '#0668E1',
      top: '42%',
      left: '94%',
      size: 'w-11 sm:w-13 h-11 sm:h-13',
      blur: 'blur-[1.5px]',
      opacity: 'opacity-30',
      delay: '0.8s',
      duration: '14s',
      driftClass: 'animate-drift-3',
      parallaxFactor: 1.5,
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
        </svg>
      )
    },
    {
      name: 'Google',
      color: '#4285F4',
      top: '55%',
      left: '91%',
      size: 'w-11 sm:w-13 h-11 sm:h-13',
      blur: 'blur-[1.5px]',
      opacity: 'opacity-35',
      delay: '1.8s',
      duration: '17s',
      driftClass: 'animate-drift-1',
      parallaxFactor: -1.1,
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
        </svg>
      )
    },
    {
      name: 'Rust',
      color: '#DEA584',
      top: '56%',
      left: '6%',
      size: 'w-11 sm:w-13 h-11 sm:h-13',
      blur: 'blur-[1.5px]',
      opacity: 'opacity-30',
      delay: '4s',
      duration: '15s',
      driftClass: 'animate-drift-3',
      parallaxFactor: 1.3,
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.834 11.236l-1.026-.644a11.956 11.956 0 0 0-.25-1.18l.835-.87a.465.465 0 0 0-.05-.668l-1.127-.852a.465.465 0 0 0-.668.05l-.646.91a11.758 11.758 0 0 0-1.1-.555l.235-1.182a.466.466 0 0 0-.372-.547l-1.37-.272a.466.466 0 0 0-.547.372l-.248 1.232a11.83 11.83 0 0 0-1.222-.178l-.348-1.2a.466.466 0 0 0-.448-.335h-1.4a.466.466 0 0 0-.448.335l-.348 1.2a11.85 11.85 0 0 0-1.222.178l-.248-1.232a.466.466 0 0 0-.547-.372l-1.37.272a.466.466 0 0 0-.372.547l.235 1.182c-.39.167-.76.353-1.1.555l-.646-.91a.465.465 0 0 0-.668-.05l-1.127.852a.465.465 0 0 0-.05.668l.835.87c-.1.39-.184.783-.25 1.18l-1.026.644a.466.466 0 0 0-.214.542l.504 1.306a.466.466 0 0 0 .542.214l1.17-.468c.046.402.115.798.206 1.185l-.946.852a.466.466 0 0 0-.095.577l.797 1.166a.466.466 0 0 0 .577.095l1.09-.646c.237.33.498.64.78.924l-.59 1.12a.466.466 0 0 0 .153.567l1.206.74a.466.466 0 0 0 .567-.153l.69-1.065c.34.184.695.342 1.06.47l-.133 1.297a.466.466 0 0 0 .42.508l1.406.143a.466.466 0 0 0 .508-.42l.142-1.385c.4.032.805.032 1.206 0l.142 1.385a.466.466 0 0 0 .508.42l1.406-.143a.466.466 0 0 0 .42-.508l-.133-1.297c.365-.128.72-.286 1.06-.47l.69 1.065a.466.466 0 0 0 .567.153l1.206-.74a.466.466 0 0 0 .153-.567l-.59-1.12c.282-.284.543-.594.78-.924l1.09.646a.466.466 0 0 0 .577-.095l.797-1.166a.466.466 0 0 0-.095-.577l-.946-.852c.091-.387.16-.783.206-1.185l1.17.468a.466.466 0 0 0 .542-.214l.504-1.306a.466.466 0 0 0-.214-.542z"/>
        </svg>
      )
    },
    {
      name: 'Kubernetes',
      color: '#326CE5',
      top: '68%',
      left: '48%',
      size: 'w-12 sm:w-14 h-12 sm:h-14',
      blur: 'blur-[2px]',
      opacity: 'opacity-30',
      delay: '2.2s',
      duration: '19s',
      driftClass: 'animate-drift-4',
      parallaxFactor: -1.3,
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .5a1.5 1.5 0 0 0-.75.2l-9.5 5.5a1.5 1.5 0 0 0-.75 1.3v11a1.5 1.5 0 0 0 .75 1.3l9.5 5.5a1.5 1.5 0 0 0 1.5 0l9.5-5.5a1.5 1.5 0 0 0 .75-1.3v-11a1.5 1.5 0 0 0-.75-1.3l-9.5-5.5A1.5 1.5 0 0 0 12 .5z"/>
        </svg>
      )
    },

    // --- BOTTOM SECTION (70% - 95%) ---
    {
      name: 'Microsoft',
      color: '#00A4EF',
      top: '76%',
      left: '8%',
      size: 'w-11 sm:w-13 h-11 sm:h-13',
      blur: 'blur-[2px]',
      opacity: 'opacity-35',
      delay: '1.4s',
      duration: '16s',
      driftClass: 'animate-drift-2',
      parallaxFactor: 1.5,
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M1 1h10v10H1z" fill="#F25022"/>
          <path d="M13 1h10v10H13z" fill="#7FBA00"/>
          <path d="M1 13h10v10H1z" fill="#00A4EF"/>
          <path d="M13 13h10v10H13z" fill="#FFB900"/>
        </svg>
      )
    },
    {
      name: 'Java',
      color: '#E76F00',
      top: '82%',
      left: '86%',
      size: 'w-12 sm:w-14 h-12 sm:h-14',
      blur: 'blur-[1.5px]',
      opacity: 'opacity-35',
      delay: '3.2s',
      duration: '18s',
      driftClass: 'animate-drift-1',
      parallaxFactor: -1.2,
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.85 17.58c0-.01-.01-.01-.01-.02-.85-.82-1.02-1.57-.45-2.09.28-.26.68-.41 1.15-.43.51-.02 1.1.09 1.7.32.74.29 1.48.74 2.16 1.3.16.13.31.28.46.42-.51.27-1.12.44-1.78.47-.64.03-1.28-.05-1.89-.24-.46-.14-.85-.36-1.14-.64-.09-.09-.16-.19-.2-.29zM20.21 16.92c-.14.07-.3.12-.46.16-.9.23-1.92.21-2.95-.06-.55-.14-1.12-.35-1.68-.62.59-.28 1.25-.45 1.94-.48.65-.03 1.3.06 1.9.27.46.16.85.39 1.14.68.04.04.08.08.11.12v-.07zM9.54 13.06c-.36-.07-.72-.18-1.05-.33-.94-.42-1.54-1.1-1.55-1.74-.01-.35.15-.69.45-.98.37-.35.91-.56 1.54-.59.73-.04 1.56.12 2.4.45.89.36 1.79.91 2.6 1.6.21.18.41.36.61.55-.65.34-1.42.56-2.25.6-1.01.05-2.04-.15-2.75-.56z"/>
        </svg>
      )
    },
    {
      name: 'SQL',
      color: '#336791',
      top: '88%',
      left: '26%',
      size: 'w-11 sm:w-13 h-11 sm:h-13',
      blur: 'blur-[1.5px]',
      opacity: 'opacity-30',
      delay: '2.1s',
      duration: '16s',
      driftClass: 'animate-drift-3',
      parallaxFactor: 1.1,
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4zm0 2c4.42 0 8 1.34 8 3s-3.58 3-8 3-8-1.34-8-3 3.58-3 8-3zm8 6.74c-.95 1.13-3.66 2.26-8 2.26s-7.05-1.13-8-2.26V9.48c1.89 1.37 5.25 2.02 8 2.02s6.11-.65 8-2.02v1.26zm0 4c-.95 1.13-3.66 2.26-8 2.26s-7.05-1.13-8-2.26v-1.26c1.89 1.37 5.25 2.02 8 2.02s6.11-.65 8-2.02v1.26zm0 4c-.95 1.13-3.66 2.26-8 2.26s-7.05-1.13-8-2.26v-1.26c1.89 1.37 5.25 2.02 8 2.02s6.11-.65 8-2.02v1.26z"/>
        </svg>
      )
    },
    {
      name: 'Netflix',
      color: '#E50914',
      top: '86%',
      left: '60%',
      size: 'w-10 sm:w-12 h-10 sm:h-12',
      blur: 'blur-[1.5px]',
      opacity: 'opacity-30',
      delay: '1s',
      duration: '19s',
      driftClass: 'animate-drift-4',
      parallaxFactor: -1.3,
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.398 0v24c1.848-.344 3.69-.74 5.518-1.19V0H5.398zm7.684 0v18.066l5.52 4.744V0h-5.52z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {techLogos.map((tech, index) => {
        const factor = tech.parallaxFactor || 1;
        const translateX = mouseOffset.x * factor;
        const translateY = mouseOffset.y * factor;

        return (
          <div
            key={index}
            className="absolute transition-transform duration-500 ease-out"
            style={{
              top: tech.top,
              left: tech.left,
              transform: `translate3d(${translateX}px, ${translateY}px, 0)`
            }}
          >
            <div
              className={`${tech.size} ${tech.blur} ${tech.opacity} ${tech.driftClass} transition-all`}
              style={{
                color: tech.color,
                animationDelay: tech.delay,
                animationDuration: tech.duration,
                filter: typeof window !== 'undefined' && window.innerWidth < 768 ? 'none' : 'drop-shadow(0 0 20px currentColor)',
                willChange: 'transform',
              }}
            >
              {tech.svg}
            </div>
          </div>
        );
      })}
    </div>
  );
}
