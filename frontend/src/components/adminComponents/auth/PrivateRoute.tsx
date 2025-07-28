import { Navigate, Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import { checkSession } from "@/services/adminServices/apiAuth"

export function PrivateRoute() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

    useEffect(() => {
        const verify = async () => {
            try {
                await checkSession()
                setIsAuthenticated(true)
            } catch (err) {
                setIsAuthenticated(false)
            }
        }

        verify()
    }, [])

    if (isAuthenticated === null) return <p>Cargando...</p>

    return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />
}

