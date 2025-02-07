import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Если есть файл стилей
import App from './App'; // Импортируем главный компонент

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(<App />);