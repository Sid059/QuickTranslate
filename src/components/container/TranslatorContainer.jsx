import { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { translateText } from '../../services/translateService';
import TextInput from '../presentational/TextInput';
import LanguageDropdown from '../presentational/LanguageDropdown';
import TranslationOutput from '../presentational/TranslationOutput';
import DownloadButton from '../presentational/DownloadButton';
import Loader from '../presentational/Loader';
import ErrorMessage from '../presentational/ErrorMessage';
import { languages } from '../../data/language';
import { downloadAsTxt } from '../../utils/fileDownloadUtils';

function TranslatorContainer() {
  // State management
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Constants
  const MAX_CHAR_LIMIT = 5000;
  
  // Debounce the input
  const debouncedText = useDebounce(inputText, 500);

  // Effect: Trigger translation
  useEffect(() => {
    const translate = async () => {
      if (!debouncedText.trim()) {
        setTranslatedText('');
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await translateText(debouncedText, targetLanguage);
        setTranslatedText(result);
      } catch (err) {
        setError(err.message || 'Translation failed.');
        setTranslatedText('');
      } finally {
        setIsLoading(false);
      }
    };

    translate();
  }, [debouncedText, targetLanguage]);

  // Handlers
  const handleInputChange = (newText) => {
    if (newText.length <= MAX_CHAR_LIMIT) {
      setInputText(newText);
    }
  };

  const handleLanguageChange = (langCode) => {
    setTargetLanguage(langCode);
    setShowDropdown(false);
  };

  const handleDownload = () => {
    if (!translatedText || isLoading) return;
    downloadAsTxt(translatedText, 'translation');
  };

  // Character count
  const charCount = inputText.length;

  // Selected language name
  const selectedLanguage = languages.find(l => l.code === targetLanguage);

  return (
    <div className="translator-app">
      {/* INPUT PANEL */}
      <div className="input-panel">
        <div className="panel-header">
          <span className="panel-title">English</span>
          <button 
            className="language-toggle"
            onClick={() => setShowDropdown(!showDropdown)}
            aria-expanded={showDropdown}
            aria-haspopup="listbox"
            aria-controls="language-dropdown"
            aria-label={`Select target language. Currently selected: ${selectedLanguage?.name || 'Spanish'}`}
          >
            {selectedLanguage?.name || 'Select Language'}
            <span className="toggle-icon" aria-hidden="true">{showDropdown ? '▲' : '▼'}</span>
          </button>
        </div>

        {showDropdown && (
          <div 
            className="dropdown-wrapper"
            id="language-dropdown"
            role="region"
            aria-label="Language selection"
          >
            <LanguageDropdown
              selected={targetLanguage}
              onChange={handleLanguageChange}
            />
          </div>
        )}

        <TextInput
          value={inputText}
          onChange={handleInputChange}
          charCount={charCount}
          maxChars={MAX_CHAR_LIMIT}
          placeholder="Type text in English..."
        />
      </div>

      {/* OUTPUT PANEL */}
      <div className="output-panel">
        <div className="panel-header">
          <span className="panel-title">Translation</span>
          <span className="selected-language">
            {selectedLanguage?.name || 'Spanish'}
          </span>
        </div>

        {isLoading && <Loader />}
        {error && <ErrorMessage error={error} />}

        <TranslationOutput translatedText={translatedText} />

        <DownloadButton
          onDownload={handleDownload}
          disabled={!translatedText || isLoading}
        />
      </div>
    </div>
  );
}

export default TranslatorContainer;