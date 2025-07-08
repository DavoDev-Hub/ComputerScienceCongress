import { BrowserRouter, Routes } from "react-router-dom";
import NavbarEst from './components/nav_est';
import './index.css'


function App() {
    return (
        <BrowserRouter>
            <NavbarEst />
            <Routes>
                {/* tus rutas */}
            </Routes>
        </BrowserRouter>
    );
}
export default App
