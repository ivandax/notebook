import { useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { setIsLoadingSession, setSession } from '@/state/sessionStore';

export function useSupabaseClient() {
    useEffect(() => {
        setIsLoadingSession(true);
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setIsLoadingSession(false);
        });
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
        return () => subscription.unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}
