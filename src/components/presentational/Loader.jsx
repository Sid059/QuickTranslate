import React from 'react';

function Loader({ isLoading }) {
  if (!isLoading) return null;
  
  return (
    <div 
      className="loader-overlay"
      role="status"
      aria-label="Translating text"
      aria-live="polite"
    >
      <div 
        className="loader-spinner" 
        aria-hidden="true"
      />
      <p className="loader-text">Translating...</p>
      <div className="sr-only">Translation in progress, please wait.</div>
    </div>
  );
}

export default Loader;