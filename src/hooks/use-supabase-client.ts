import { useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { setIsLoadingSession, setSession, setUserProfile } from '@/state/sessionStore';
import { getUserProfile } from '@/services/user_profiles';

export function useSupabaseClient() {
  useEffect(() => {
    setIsLoadingSession(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoadingSession(false);
      if (session?.user.id) {
        getUserProfile(session.user.id).then((profile) => {
          if (profile) {
            setUserProfile(profile);
          }
        });
      }
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', _event, session);
      setSession(session);
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
