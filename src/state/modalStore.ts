import { create } from 'zustand';

export type ModalName = 'create-organization' | 'create-fisio-client' | null;

export type CreateOrganizationModalState = {
  modalName: 'create-organization';
};

export type CreateFisioClientModalState = {
  modalName: 'create-fisio-client';
  onSuccessCallback: () => void;
};

interface ModalStore {
  modal: CreateOrganizationModalState | CreateFisioClientModalState | null;
}

export const useModalStore = create<ModalStore>(() => ({
  modal: null,
}));

export const setModalState = (
  modal: CreateOrganizationModalState | CreateFisioClientModalState | null
) => {
  const set = useModalStore.setState;
  set({ modal });
};
