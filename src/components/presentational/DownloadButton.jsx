import React, { useState } from 'react';

function DownloadButton({ onDownload, disabled }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const buttonId = 'download-translation-button';
  
  const handleClick = async () => {
    if (disabled || isDownloading) return;
    
    setIsDownloading(true);
    
    try {
      await onDownload();
      setTimeout(() => setIsDownloading(false), 1000);
    } catch (error) {
      setIsDownloading(false);
      console.error('Download failed:', error);
    }
  };
  
  const downloadStatus = isDownloading ? 'Downloading translation...' : 
                        disabled ? 'No translation available to download' : 
                        'Download translation as text file';
  
  return (
    <button
      id={buttonId}
      className={`download-button ${disabled ? 'disabled' : ''} ${isDownloading ? 'downloading' : ''}`}
      onClick={handleClick}
      disabled={disabled || isDownloading}
      aria-label={downloadStatus}
      aria-busy={isDownloading}
      aria-live="polite"
    >
      {isDownloading ? (
        <>
          <span className="material-icons" style={{ fontSize: '18px' }} aria-hidden="true">⏳</span>
          <span aria-live="polite">Downloading...</span>
        </>
      ) : (
        <>
          <span className="material-icons" style={{ fontSize: '18px' }} aria-hidden="true">⬇️</span>
          <span>Download Translation</span>
        </>
      )}
    </button>
  );
}

export default DownloadButton;