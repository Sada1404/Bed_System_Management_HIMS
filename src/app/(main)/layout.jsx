"use client"
import Sidebar from "../../components/Sidebar"
import TopBar from "../../components/TopBar"

export default function DashboardLayout({ children }) {
    return (
        <div className="h-screen overflow-hidden flex flex-col">
            <TopBar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 bg-gray-50 overflow-y-auto"> 
                    {/* //overflow-y-auto */}
                    {children}
                </main>
            </div>
        </div>
    );
}