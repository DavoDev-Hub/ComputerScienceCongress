import { Routes, Route, useNavigate } from 'react-router-dom'
import AdminLayout from '@/layouts/AdminLayout'
import ActivityPanel from '@/pages/admin/ActivityPanel'
import ConferencePanel from '@/pages/admin/ConferencePanel'
import StudentPanel from '@/pages/admin/StudentPanel'
import AttendancePanel from '@/pages/admin/AttendancePanel'
import DashboardPanel from '@/pages/admin/DashboardPanel'
import { PrivateRoute } from '@/components/adminComponents/auth/PrivateRoute'
import AdminLogin from '@/pages/admin/LoginPanel'
import WelcomePage from '@/pages/welcomePage'

function App() {
    const navigate = useNavigate()

    return (
        <Routes>
            <Route path="/" element={<WelcomePage onEnter={() => navigate("")} />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<PrivateRoute />}>
                <Route element={<AdminLayout />}>
                    <Route path="dashboard" element={<DashboardPanel />} />
                    <Route path="actividades" element={<ActivityPanel />} />
                    <Route path="conferencias" element={<ConferencePanel />} />
                    <Route path="asistencias" element={<StudentPanel />} />
                    <Route path="registro" element={<AttendancePanel />} />
                </Route>
            </Route>

        </Routes>
    )
}

export default App

