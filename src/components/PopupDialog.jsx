import React, { useEffect, useRef } from 'react';

export default function PopupDialog({ onClose, labelledBy, children, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    dialog.showModal();
    return () => dialog.close();
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      className={`site-dialog m-auto max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-xl dark:border-slate-700 dark:bg-[#0F172A] dark:text-slate-100 ${className}`}
      onCancel={event => { event.preventDefault(); onClose(); }}
      onClick={event => {
        if (event.target !== event.currentTarget) return;
        const { left, right, top, bottom } = event.currentTarget.getBoundingClientRect();
        if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) onClose();
      }}
    >
      {children}
    </dialog>
  );
}
