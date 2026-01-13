import React from 'react';

function TextInput({ value, onChange, charCount, maxChars }) {
  const handleChange = ({target}) => {
    onChange(target.value);
  };

  const progress = maxChars > 0 ? (charCount / maxChars) * 100 : 0;
  const isNearLimit = charCount > maxChars * 0.9;
  const charLimitId = 'char-limit-message';
  const progressId = 'character-progress';

  return (
    <div className="text-input-container">
      <div className="input-label">
        <label htmlFor="source-text-input">Source Text</label>
        <span 
          id={charLimitId}
          className={`char-counter ${charCount >= maxChars ? 'limit-reached' : ''}`}
          aria-live="polite"
          aria-atomic="true"
        >
          {charCount} / {maxChars} characters
        </span>
      </div>
      
      <textarea
        id="source-text-input"
        className="text-input"
        value={value}
        onChange={handleChange}
        placeholder="Enter text to translate..."
        rows={10}
        maxLength={maxChars}
        aria-label="Text to translate"
        aria-describedby={`${charLimitId} ${progressId}`}
        aria-required="true"
      />
      
      {/* Progress bar */}
      <div 
        className="progress-container" 
        role="progressbar"
        id={progressId}
        aria-label="Character usage"
        aria-valuenow={charCount}
        aria-valuemin="0"
        aria-valuemax={maxChars}
        aria-valuetext={`${charCount} out of ${maxChars} characters used`}
      >
        <div 
          className={`progress-bar ${isNearLimit ? 'near-limit' : ''}`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      
      {charCount >= maxChars && (
        <p 
          className="limit-warning"
          role="alert"
          aria-live="assertive"
        >
          Character limit reached!
        </p>
      )}
    </div>
  );
}

export default TextInput;