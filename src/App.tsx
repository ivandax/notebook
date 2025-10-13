import './App.css'
import { useSupabaseClient } from './hooks/use-supabase-client'
import { Root } from './views/root'
import { Toaster } from 'sonner'

function App() {
    useSupabaseClient()
    return (
        <>
            <Root />
            <Toaster />
        </>
    )
}

export default App
