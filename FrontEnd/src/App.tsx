import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ActivityPanel from './pages/ActivityPanel'
import { Toaster } from 'sonner'

function App() {
    return (
        <BrowserRouter>
            <Toaster richColors position="bottom-right" />
            <Routes>
                <Route path="/admin" element={<ActivityPanel />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App

