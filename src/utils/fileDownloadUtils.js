export function downloadAsTxt(text, filename = 'translation') {
  if (!text || text.trim() === '') {
    console.warn('No text to download');
    return;
  }

  try {
    // Create blob with text
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Set filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:]/g, '-');
    const fullFilename = `${filename}_${timestamp}.txt`;
    
    // Configure link
    link.href = url;
    link.download = fullFilename;
    link.style.display = 'none';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log(`Downloaded: ${fullFilename}`);
    
  } catch (error) {
    console.error('Download failed:', error);
    throw new Error('Failed to download file');
  }
}


export function formatWithMetadata(text, metadata = {}) {
  const {
    sourceText = '',
    sourceLang = 'Auto-detected',
    targetLang = '',
    timestamp = new Date().toLocaleString()
  } = metadata;
  
  let formattedText = '';
  
  // Add header
  formattedText += '=== TRANSLATION RESULT ===\n\n';
  
  // Source text
  formattedText += `SOURCE (${sourceLang}):\n`;
  formattedText += sourceText + '\n\n';
  
  // Separator
  formattedText += '─'.repeat(50) + '\n\n';
  
  // Translated text
  formattedText += `TRANSLATED (${targetLang}):\n`;
  formattedText += text;
  
  // Add footer with timestamp
  formattedText += '\n\n' + '─'.repeat(50) + '\n';
  formattedText += `Generated: ${timestamp}\n`;
  formattedText += 'Powered by MyMemory Translation API';
  
  return formattedText;
}