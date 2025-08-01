import { jsx as _jsx } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
export default function StudentLayout() {
    return (_jsx("main", { className: "p-4 sm:p-6 min-h-screen", children: _jsx(Outlet, {}) }));
}
