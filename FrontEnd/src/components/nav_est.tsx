import { useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar"

function NavbarEst() {

    return (
        <nav className="bg-white shadow-md px-6 py-4">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center space-x-4">
                    <img src="../assets/logo_uaa.svg" alt="Logo de la universidad autonoma" />
                    <h1 className="text-x1 font-bold text-blue">CONGRESO LITC</h1>
                </div>

                <div className="flex items-center space-x-4"></div>

            </div>
        </nav >
    );
};

export default NavbarEst;
