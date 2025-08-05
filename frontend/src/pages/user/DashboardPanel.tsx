import UserLayout from "@/layouts/userLayout"

function DashboardAlumno() {
    const nombre = "Juan Pablo"
    const handleLogout = () => {
    }

    return (
        <UserLayout nombre={nombre} onLogout={handleLogout}>
            <h1 className="text-3xl font-bold text-[#002E5D] mb-4">Bienvenido a tu panel</h1>
        </UserLayout>
    )
}

export default DashboardAlumno
