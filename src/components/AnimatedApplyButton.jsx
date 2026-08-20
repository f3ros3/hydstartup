import React from 'react';

export default function AnimatedApplyButton({
  onClick,
  href,
  children = 'Apply Now',
  className = '',
  size = 'md', // 'sm' | 'md' | 'lg'
  color = '#059669'
}) {
  const sizeClass = size === 'sm' ? 'uiverse-btn-sm' : size === 'lg' ? 'uiverse-btn-lg' : 'uiverse-btn-md';

  const innerContent = (
    <>
      <span className="uiverse-button__icon-wrapper">
        <svg
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="uiverse-button__icon-svg"
          width={size === 'sm' ? 8 : size === 'lg' ? 12 : 10}
        >
          <path
            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
            fill="currentColor"
          />
        </svg>

        <svg
          viewBox="0 0 14 15"
          fill="none"
          width={size === 'sm' ? 8 : size === 'lg' ? 12 : 10}
          xmlns="http://www.w3.org/2000/svg"
          className="uiverse-button__icon-svg uiverse-button__icon-svg--copy"
        >
          <path
            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={`uiverse-button ${sizeClass} ${className}`}
        style={{ '--clr': color }}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`uiverse-button ${sizeClass} ${className}`}
      style={{ '--clr': color }}
    >
      {innerContent}
    </button>
  );
}
