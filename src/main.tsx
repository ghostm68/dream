import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('main.tsx loaded');
console.log('Checking Puter.js...');
if (typeof window.puter !== 'undefined') {
  console.log('Puter.js found');
} else {
  console.log('Puter.js not found yet');
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found');
  document.body.innerHTML = '<div style="padding: 20px; color: red; font-family: sans-serif;">Root element not found. Check HTML.</div>';
} else {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    console.log('React app rendered successfully');
  } catch (error) {
    console.error('Failed to render app:', error);
    rootElement.innerHTML = '<div style="padding: 20px; color: red; font-family: sans-serif;">Failed to load application. Check browser console for errors.</div>';
  }
}
