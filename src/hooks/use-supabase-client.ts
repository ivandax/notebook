import { useState, useEffect } from 'react'
import { createClient, type Session } from '@supabase/supabase-js'
const apiKey = import.meta.env.VITE_API_KEY
const supabaseProjectId = import.meta.env.VITE_SUPABASE_PROJECT_ID

export function useSupabaseClient() {
    const supabase = createClient(
        `https://${supabaseProjectId}.supabase.co`,
        apiKey
    )

    const [session, setSession] = useState<Session | null>(null)
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
        return () => subscription.unsubscribe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log('Supabase session:', session)

    return { session }
}
