import { Routes, Route } from 'react-router-dom'
import AdminLayout from '@/layouts/AdminLayout'
import StudentLayout from '@/layouts/StudentLayout'
import ActivityPanel from '@/pages/admin/ActivityPanel'
import ConferencePanel from '@/pages/admin/ConferencePanel'
import StudentPanel from '@/pages/admin/StudentPanel'
import AttendancePanel from '@/pages/admin/AttendancePanel'
import DashboardPanel from './pages/admin/DashboardPanel'
import { PrivateRoute } from './components/adminComponents/auth/PrivateRoute'
import AdminLogin from './pages/admin/LoginPanel'

function App() {
    return (
        <Routes>
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

            <Route path="/alumno" element={<StudentLayout />}>
            </Route>
        </Routes>
    )
}

export default App

