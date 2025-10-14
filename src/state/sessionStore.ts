import { create } from 'zustand';
import type { Session } from '@supabase/supabase-js';

interface SessionStore {
    session: Session | null;
    isLoadingSession: boolean;
}
export const useSessionStore = create<SessionStore>(() => ({
    session: null,
    isLoadingSession: false,
}));

export const setSession = (session: Session | null) => {
    const set = useSessionStore.setState;
    set({ session });
};

export const setIsLoadingSession = (isLoading: boolean) => {
    const set = useSessionStore.setState;
    set({ isLoadingSession: isLoading });
};
