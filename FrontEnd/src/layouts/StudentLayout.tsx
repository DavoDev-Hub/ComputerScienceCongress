import { Outlet } from 'react-router-dom'

export default function StudentLayout() {
    return (
        <main className="p-4 sm:p-6 min-h-screen">
            <Outlet />
        </main>
    )
}

