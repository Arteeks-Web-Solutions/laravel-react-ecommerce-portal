import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/components/App';
import '@/assets/tailwind.css';

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

import './bootstrap';

createRoot(document.getElementById('app')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
