import { TopBar } from '@/components/topbar/topbar'

export function Home() {
    return (
        <div className="min-h-screen bg-gray-50">
            <TopBar />
            <main className="p-4">
                <h2 className="text-lg">Welcome!</h2>
            </main>
        </div>
    )
}
