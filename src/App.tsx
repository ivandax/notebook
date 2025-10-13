import './App.css'
import { useSupabaseClient } from './hooks/use-supabase-client'
import { Root } from './views/root'

function App() {
    useSupabaseClient()
    return <Root />
}

export default App
