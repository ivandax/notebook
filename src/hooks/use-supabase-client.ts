import type { Session } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export function useSupabaseClient() {
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

    return { session, supabase }
}
