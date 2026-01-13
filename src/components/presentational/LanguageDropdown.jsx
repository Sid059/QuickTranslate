import React, { useState, useRef } from 'react';
import { languages } from '../../data/language';

function LanguageDropdown({ selected, onChange }) {
  const [search, setSearch] = useState('');
  const dropdownRef = useRef(null);

  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(search.toLowerCase()) ||
    lang.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchChange = ({target}) => {
    setSearch(target.value);
  };

  const handleLanguageClick = (langCode) => {
    onChange(langCode);
  };

  const handleKeyDown = ({key}) => {
    if (key === 'Enter' && filteredLanguages.length > 0) {
      handleLanguageClick(filteredLanguages[0].code);
    }
  };

  return (
    <div 
      className="language-dropdown" 
      ref={dropdownRef}
      role="listbox"
      aria-label="Select target language"
      aria-expanded="true"
      aria-activedescendant={`language-${selected}`}
    >
      <input
        type="text"
        className="search-input"
        placeholder="Search language..."
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        autoFocus
        aria-label="Filter languages"
        aria-controls="languages-list"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded="true"
      />
      
      <div 
        className="languages-list" 
        id="languages-list"
        role="list"
        aria-label="Available languages"
      >
        {filteredLanguages.length === 0 ? (
          <div 
            className="no-results"
            role="option"
            aria-selected="false"
          >
            No languages found
          </div>
        ) : (
          filteredLanguages.map(lang => (
            <div
              key={lang.code}
              id={`language-${lang.code}`}
              className={`language-item ${selected === lang.code ? 'selected' : ''}`}
              onClick={() => handleLanguageClick(lang.code)}
              role="option"
              aria-selected={selected === lang.code}
              tabIndex={0}
              onKeyDown={({key}) => {
                if (key === 'Enter' || key === ' ') {
                  handleLanguageClick(lang.code);
                }
              }}
            >
              <span className="language-name">{lang.name}</span>
              <span className="language-code" aria-hidden="true">{lang.code}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LanguageDropdown;