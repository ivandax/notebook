import { create } from 'zustand';

export type ModalName = 'create-organization' | null;

export type CreateOrganizationModalState = {
  modalName: 'create-organization';
};

interface ModalStore {
  modal: CreateOrganizationModalState | null;
}

export const useModalStore = create<ModalStore>(() => ({
  modal: null,
}));

export const setModalState = (modal: CreateOrganizationModalState | null) => {
  const set = useModalStore.setState;
  set({ modal });
};
