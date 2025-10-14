import { Sidebar } from '@/components/sidebar/sidebar';
import { Outlet } from 'react-router-dom';

export function AppLayout() {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
                <Outlet />
            </main>
        </div>
    );
}
