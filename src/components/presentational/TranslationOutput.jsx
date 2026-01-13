import { useRef, useState } from 'react';

function TranslationOutput({ translatedText }) {
  const textareaRef = useRef(null);
  const [copyStatus, setCopyStatus] = useState('');
  const copyButtonId = 'copy-button';
  const outputTextId = 'translation-output-text';
  
  const handleCopy = async () => {
    if (!translatedText) return;
    
    try {
      await navigator.clipboard.writeText(translatedText);
      setCopyStatus('Copied to clipboard');
      
      setTimeout(() => {
        setCopyStatus('');
      }, 1500);
      
    } catch (error) {
      console.error('Copy failed:', error);
      setCopyStatus('Failed to copy');
      setTimeout(() => {
        setCopyStatus('');
      }, 1500);
    }
  };
  
  return (
    <div className="translation-output">
      <div className="output-header">
        <label htmlFor={outputTextId}>Translation</label>
        <button 
          id={copyButtonId}
          className="copy-button"
          onClick={handleCopy}
          disabled={!translatedText}
          aria-label="Copy translated text to clipboard"
          aria-live="polite"
          aria-describedby="copy-status"
        >
          {copyStatus ? '✓ ' : '📋 '}
          {copyStatus || 'Copy Text'}
        </button>
      </div>
      
      <textarea
        id={outputTextId}
        ref={textareaRef}
        className="output-text"
        value={translatedText || ''}
        readOnly
        placeholder="Translation will appear here..."
        rows={10}
        aria-label="Translated text"
        aria-describedby={copyButtonId}
      />
    </div>
  );
}

export default TranslationOutput;