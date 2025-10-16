import { CreateOrganizationDialog } from '@/components/create-organization-dialog/create-organization-dialog';
import { Sidebar } from '@/components/sidebar/sidebar';
import { useModalStore } from '@/state/modalStore';
import { Outlet } from 'react-router-dom';

export function AppLayout() {
  const modalState = useModalStore((state) => state.modal);
  return (
    <div className="flex h-screen overflow-hidden">
      {modalState?.modalName === 'create-organization' && (
        <CreateOrganizationDialog isModalOpen={true} />
      )}
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
        <Outlet />
      </main>
    </div>
  );
}
