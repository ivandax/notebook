import './App.css'
import { TopBar } from './components/topbar/topbar'
import { useSupabaseClient } from './hooks/use-supabase-client'

function App() {
    useSupabaseClient()

    return (
        <div className="min-h-screen bg-gray-50">
            <TopBar />
            <main className="p-4">
                <h2 className="text-lg">Welcome!</h2>
            </main>
        </div>
    )
}

export default App
