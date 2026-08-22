import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'antd/dist/reset.css'; // Ant Design 5 不强制要求，但为了基础重置

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
