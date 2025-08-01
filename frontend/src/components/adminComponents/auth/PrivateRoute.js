import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkSession } from "@/services/adminServices/apiAuth";
export function PrivateRoute() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    useEffect(() => {
        const verify = async () => {
            try {
                await checkSession();
                setIsAuthenticated(true);
            }
            catch (err) {
                setIsAuthenticated(false);
            }
        };
        verify();
    }, []);
    if (isAuthenticated === null)
        return _jsx("p", { children: "Cargando..." });
    return isAuthenticated ? _jsx(Outlet, {}) : _jsx(Navigate, { to: "/admin/login" });
}
