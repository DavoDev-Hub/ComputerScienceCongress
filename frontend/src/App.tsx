import { Routes, Route } from 'react-router-dom'

// admin routes
import AdminLayout from '@/layouts/AdminLayout'
import ActivityPanel from '@/pages/admin/ActivityPanel'
import ConferencePanel from '@/pages/admin/ConferencePanel'
import StudentPanel from '@/pages/admin/StudentPanel'
import AttendancePanel from '@/pages/admin/AttendancePanel'
import DashboardPanel from '@/pages/admin/DashboardPanel'
import { PrivateRoute } from '@/components/adminComponents/auth/PrivateRoute'
import AdminLogin from '@/pages/admin/LoginPanel'
import WelcomePage from '@/pages/welcomePage'

// user routes
import AuthPage from './pages/user/authPage'
import UserLayout from './layouts/userLayout'

function App() {

    return (
        <Routes>
            <Route path="/" element={<WelcomePage />} />

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

            <Route path="/user/auth" element={<AuthPage />} />

            <Route path="/user" element={<PrivateRoute />}>
                <Route element={<UserLayout />}>
                </Route>
            </Route>
        </Routes>
    )
}

export default App

