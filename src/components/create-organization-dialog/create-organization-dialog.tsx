import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createOrganization } from '@/services/organizations';
import { setModalState } from '@/state/modalStore';
import { setDefaultOrganization, useSessionStore } from '@/state/sessionStore';
import { textToSlug } from '@/utils/text';
import { useState } from 'react';

interface CreateOrganizationDialogProps {
  isModalOpen: boolean;
}

export function CreateOrganizationDialog({
  isModalOpen,
}: CreateOrganizationDialogProps) {
  const userProfile = useSessionStore((state) => state.userProfile);
  const [organizationName, setOrganizationName] = useState('');

  const handleCreateOrganization = async () => {
    if (!userProfile || organizationName.trim() === '') return;
    // Call the createOrganization function from the organizations service
    const { error, data } = await createOrganization(
      {
        name: organizationName,
        slug: textToSlug(organizationName),
        type: 'fisio',
        created_by: userProfile.id,
      },
      userProfile.id
    );

    if (error) {
      console.error('Error creating organization:', error);
      return;
    }

    setModalState(null);
    setOrganizationName('');
    setDefaultOrganization(data);
  };
  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => {
        if (!open) {
          setModalState(null);
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear organización</DialogTitle>
          <DialogDescription>
            Añade una nueva organización para gestionar tus proyectos y equipo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nombre de la organización</Label>
            <Input
              id="name"
              placeholder="Mi empresa"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setModalState(null);
              setOrganizationName('');
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleCreateOrganization}
            disabled={!organizationName.trim()}
          >
            Crear organización
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
