import { useEffect } from 'react';
import { supabase } from '../supabaseClient';
import {
  setIsLoadingSession,
  setSession,
  setUserProfile,
  setUserOrganizations,
  useSessionStore,
} from '@/state/sessionStore';
import { getUserProfile } from '@/services/user_profiles';
import { getUserOrganizations } from '@/services/organizations';

export function useSupabaseClient() {
  const userProfile = useSessionStore((state) => state.userProfile);
  const organizations = useSessionStore((state) => state.organizations);

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

        getUserOrganizations(session.user.id).then((orgs) => {
          setUserOrganizations(orgs);
        });
      } else {
        // Clear organizations when there is no session
        setUserOrganizations(null);
      }
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', _event, session);
      setSession(session);
      // When auth state changes, fetch profile + organizations if available
      if (session?.user.id) {
        if (!userProfile) {
          getUserProfile(session.user.id).then((profile) => {
            if (profile) setUserProfile(profile);
          });
        }
        if (!organizations) {
          getUserOrganizations(session.user.id).then((orgs) => {
            setUserOrganizations(orgs);
          });
        }
      } else {
        setUserProfile(null);
        setUserOrganizations(null);
      }
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
