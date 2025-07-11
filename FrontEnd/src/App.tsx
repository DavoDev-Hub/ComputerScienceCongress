import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import { Toaster } from 'sonner'

function App() {
    return (
        <BrowserRouter>
            <Toaster richColors position="bottom-right" />
            <Routes>
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App

