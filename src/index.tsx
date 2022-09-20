import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/app/app';
import './assets/css/styles.scss';
import { Toast } from './components/toast/toast';

const root = createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
    <Toast />
  </React.StrictMode>
);
