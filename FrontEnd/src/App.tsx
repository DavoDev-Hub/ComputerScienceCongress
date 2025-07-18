import { Routes, Route } from 'react-router-dom'
import ActivityPanel from './pages/ActivityPanel'
import ConferencePanel from './pages/ConferencePanel'
import NavbarAdmin from './components/nav/navAdmin'
import StudentPanel from './pages/StudentPanel'
import AttendancePanel from './pages/AttendancePanel'
import { Toaster } from 'sonner'

function App() {
    return (
        <>
            <NavbarAdmin />
            <Toaster richColors position="bottom-right" />
            <Routes>
                <Route path="/admin/actividades" element={<ActivityPanel />} />
                <Route path="/admin/conferencias" element={<ConferencePanel />} />
                <Route path="/admin/asistencias" element={<StudentPanel />} />
                <Route path="/admin/registro" element={<AttendancePanel />} />
            </Routes>
        </>
    )
}

export default App

