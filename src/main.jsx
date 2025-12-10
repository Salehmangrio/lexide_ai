// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Toaster } from 'react-hot-toast';

// Wrap your app with Toaster inside the render
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: '#363636',
          color: '#fff',
          fontSize: '15px',
          borderRadius: '12px',
          padding: '16px',
        },
        success: {
          icon: 'Success',
          style: {
            background: '#10b981',
          },
        },
        error: {
          icon: 'Error',
          style: {
            background: '#ef4444',
          },
        },
      }}
    />
  </StrictMode>
);