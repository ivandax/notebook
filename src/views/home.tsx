import { Sidebar } from '@/components/sidebar/sidebar';

export function Home() {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />

            <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
                <h2 className="text-lg font-semibold mb-4">Welcome!</h2>
                <p className="text-gray-700">
                    This is the main content area. Add your app content here.
                </p>
                <div className="h-[2000px]" />
            </main>
        </div>
    );
}
