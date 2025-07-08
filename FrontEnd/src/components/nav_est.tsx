import { useState } from "react";
import { Link } from "react-router-dom";

function NavbarEst() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md px-6 py-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-indigo-600">CS Congress</h1>

                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                <ul className="hidden md:flex space-x-6">
                    <li><Link to="/" className="text-gray-700 hover:text-indigo-600">Inicio</Link></li>
                    <li><Link to="/actividades" className="text-gray-700 hover:text-indigo-600">Actividades</Link></li>
                    <li><Link to="/conferencias" className="text-gray-700 hover:text-indigo-600">Conferencias</Link></li>
                    <li><Link to="/perfil" className="text-gray-700 hover:text-indigo-600">Perfil</Link></li>
                </ul>
            </div>

            {/* Menú mobile */}
            {isOpen && (
                <ul className="mt-4 space-y-3 md:hidden">
                    <li><Link to="/" className="block text-gray-700 hover:text-indigo-600">Inicio</Link></li>
                    <li><Link to="/actividades" className="block text-gray-700 hover:text-indigo-600">Actividades</Link></li>
                    <li><Link to="/conferencias" className="block text-gray-700 hover:text-indigo-600">Conferencias</Link></li>
                    <li><Link to="/perfil" className="block text-gray-700 hover:text-indigo-600">Perfil</Link></li>
                </ul>
            )}
        </nav>
    );
};

export default NavbarEst;
