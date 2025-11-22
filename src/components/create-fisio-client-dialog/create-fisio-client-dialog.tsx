import { useState } from 'react';
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
import { useSessionStore } from '@/state/sessionStore';
import { setModalState } from '@/state/modalStore';
import { createFisioOrganizationClient } from '@/services/fisio-organization-clients';

interface CreateFisioClientDialogProps {
  isModalOpen: boolean;
  onSuccessCallback: () => void;
}

export function CreateFisioClientDialog({
  isModalOpen,
  onSuccessCallback,
}: CreateFisioClientDialogProps) {
  const defaultOrg = useSessionStore((state) => state.defaultOrganization);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateClient = async () => {
    if (
      !defaultOrg ||
      name.trim() === '' ||
      email.trim() === '' ||
      phone.trim() === ''
    )
      return;

    setLoading(true);

    const { error } = await createFisioOrganizationClient({
      name,
      email,
      phone,
      notes,
      organization_id: defaultOrg.id,
    });

    setLoading(false);

    if (error) {
      console.error('Error creating client:', error);
      return;
    }

    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setModalState(null);

    onSuccessCallback();
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => {
        if (!open) setModalState(null);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear cliente</DialogTitle>
          <DialogDescription>
            Añade un nuevo cliente para la organización "{defaultOrg?.name}".
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              placeholder="Juan Pérez"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              placeholder="+34 600 000 000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Notas</Label>
            <Input
              id="notes"
              placeholder="Notas adicionales"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setModalState(null);
              setName('');
              setEmail('');
              setPhone('');
              setNotes('');
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleCreateClient}
            disabled={!name.trim() || loading}
          >
            {loading ? 'Creando...' : 'Crear cliente'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
