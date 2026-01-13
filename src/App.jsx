import React from 'react';
import TranslatorContainer from './components/container/TranslatorContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-title-wrapper">
            <img 
              src="./src/assets/images/languages.png" 
              alt="QuickTranslate Logo" 
              className="app-logo"
              width="32"
              height="32"
            />
            <h1>QuickTranslate</h1>
          </div>
          <p>Translate text to multiple languages</p>
        </div>
      </header>
      
      <main className="app-main">
        <TranslatorContainer />
      </main>
      
      <footer className="app-footer">
        <p>Powered by MyMemory Translation API • Supports 100+ languages</p>
      </footer>
    </div>
  );
}

export default App;