import React, { useState } from 'react';
import './App.css';
import Login from './components/Login'; // Путь к файлу Login.js
import Storage from './components/Storage'; // Путь к файлу Storage.js

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Хранилище заметок</h1>
      </header>
      <main>
        {isAuthenticated ? (
          <Storage onLogout={() => setIsAuthenticated(false)} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </main>
    </div>
  );
}

export default App;