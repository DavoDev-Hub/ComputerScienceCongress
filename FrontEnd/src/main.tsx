import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import NavAdmin from './components/navAdmin.tsx'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <NavAdmin />
        <App />
    </StrictMode>,
)
