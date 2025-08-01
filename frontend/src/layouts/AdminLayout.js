import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSidebar } from '@/context/SidebarContext';
import Sidebar from '@/components/nav/navAdmin';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
export default function AdminLayout() {
    const { collapsed } = useSidebar();
    return (_jsxs("div", { className: "flex min-h-screen", children: [_jsx(Sidebar, {}), _jsxs("div", { className: `transition-all duration-300 min-h-screen w-full
                ${collapsed ? 'lg:ml-20' : 'lg:ml-72'}`, children: [_jsx("header", { className: "h-20 w-full bg-uaa-blue fixed" }), _jsxs("main", { className: "px-0 sm:px-6 py-6 pt-32", children: [_jsx(Toaster, { richColors: true, position: "bottom-right" }), _jsx(Outlet, {})] })] })] }));
}
