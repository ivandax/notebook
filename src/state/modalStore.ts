import { create } from 'zustand';

export type ModalName = 'create-organization' | null;

export type CreateOrganizationModalState = {
  modalName: 'create-organization';
};

interface SessionStore {
  modal: CreateOrganizationModalState | null;
}

export const useSessionStore = create<SessionStore>(() => ({
  modal: null,
}));

export const setModalState = (modal: CreateOrganizationModalState | null) => {
  const set = useSessionStore.setState;
  set({ modal });
};
