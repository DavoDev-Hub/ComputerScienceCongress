import { Routes, Route } from 'react-router-dom'
import ActivityPanel from './pages/ActivityPanel'
import ConferencePanel from './pages/ConferencePanel'
import NavbarAdmin from './components/nav/navAdmin'
import { Toaster } from 'sonner'

function App() {
    return (
        <>
            <NavbarAdmin />
            <Toaster richColors position="bottom-right" />
            <Routes>
                <Route path="/admin/actividades" element={<ActivityPanel />} />
                <Route path="/admin/conferencias" element={<ConferencePanel />} />
            </Routes>
        </>
    )
}

export default App

