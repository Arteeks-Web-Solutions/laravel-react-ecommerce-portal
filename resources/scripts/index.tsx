import '@/assets/tailwind.css';
import App from '@/components/App';
import state from '@/state';
import { StoreProvider } from 'easy-peasy';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('app')!).render(
    <StrictMode>
        <StoreProvider store={state}>
            <App />
        </StoreProvider>
    </StrictMode>,
);
