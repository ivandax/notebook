import { create } from 'zustand';
import type { Session } from '@supabase/supabase-js';
import type { UserProfile } from '@/domain/users';

interface SessionStore {
  session: Session | null;
  isLoadingSession: boolean;
  userProfile: UserProfile | null;
}
export const useSessionStore = create<SessionStore>(() => ({
  session: null,
  isLoadingSession: false,
  userProfile: null,
}));

export const setSession = (session: Session | null) => {
  const set = useSessionStore.setState;
  set({ session });
};

export const setIsLoadingSession = (isLoading: boolean) => {
  const set = useSessionStore.setState;
  set({ isLoadingSession: isLoading });
};

export const setUserProfile = (userProfile: UserProfile | null) => {
  const set = useSessionStore.setState;
  set({ userProfile });
};
