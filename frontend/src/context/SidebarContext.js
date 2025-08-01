import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
const SidebarContext = createContext(undefined);
export const SidebarProvider = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleSidebar = () => setCollapsed((prev) => !prev);
    return (_jsx(SidebarContext.Provider, { value: { collapsed, toggleSidebar }, children: children }));
};
export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};
