import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '@/layouts/AdminLayout';
import StudentLayout from '@/layouts/StudentLayout';
import ActivityPanel from '@/pages/admin/ActivityPanel';
import ConferencePanel from '@/pages/admin/ConferencePanel';
import StudentPanel from '@/pages/admin/StudentPanel';
import AttendancePanel from '@/pages/admin/AttendancePanel';
import DashboardPanel from './pages/admin/DashboardPanel';
import { PrivateRoute } from './components/adminComponents/auth/PrivateRoute';
import AdminLogin from './pages/admin/LoginPanel';
function App() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/admin/login", element: _jsx(AdminLogin, {}) }), _jsx(Route, { path: "/admin", element: _jsx(PrivateRoute, {}), children: _jsxs(Route, { element: _jsx(AdminLayout, {}), children: [_jsx(Route, { path: "dashboard", element: _jsx(DashboardPanel, {}) }), _jsx(Route, { path: "actividades", element: _jsx(ActivityPanel, {}) }), _jsx(Route, { path: "conferencias", element: _jsx(ConferencePanel, {}) }), _jsx(Route, { path: "asistencias", element: _jsx(StudentPanel, {}) }), _jsx(Route, { path: "registro", element: _jsx(AttendancePanel, {}) })] }) }), _jsx(Route, { path: "/alumno", element: _jsx(StudentLayout, {}) })] }));
}
export default App;
