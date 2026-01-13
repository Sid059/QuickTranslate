import React from 'react';

function ErrorMessage({ error }) {
  if (!error) return null;
  
  return (
    <div 
      className="error-message"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <span className="error-icon" aria-hidden="true"></span>
      <span className="error-text">{error}</span>
    </div>
  );
}

export default ErrorMessage;