import { create } from 'zustand';
import type { Session } from '@supabase/supabase-js';

interface SessionStore {
    session: Session | null;
}
export const useSessionStore = create<SessionStore>(() => ({
    session: null,
}));

export const setSession = (session: Session | null) => {
    const set = useSessionStore.setState;
    set({ session });
};
