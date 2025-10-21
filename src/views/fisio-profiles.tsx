import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSessionStore } from '@/state/sessionStore';
import { getFisioOrganizationClients } from '@/services/fisio-organization-clients';
import type { FisioOrganizationClient } from '@/domain/fisio-organization-client';

export function FisioProfiles() {
  const defaultOrg = useSessionStore((state) => state.defaultOrganization);
  const [clients, setClients] = useState<FisioOrganizationClient[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      if (!defaultOrg) return;
      setLoading(true);

      const data = await getFisioOrganizationClients(defaultOrg.id);
      setClients(data);
      setLoading(false);
    };

    fetchClients();
  }, [defaultOrg]);

  if (!defaultOrg) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-gray-600 text-center">
          No organization selected. Please create or select an organization
          first.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          Clientes de {defaultOrg.name}
        </h2>
        <Button onClick={() => void 0}>Añadir cliente</Button>
      </div>

      {!clients || clients.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10 text-gray-600">
          <p className="text-lg font-medium mb-2">No hay clientes aún</p>
          <p className="text-sm">Empieza añadiendo un nuevo cliente</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow p-4">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 font-semibold text-sm text-gray-700">
                  Nombre
                </th>
                <th className="py-2 px-4 font-semibold text-sm text-gray-700">
                  Email
                </th>
                <th className="py-2 px-4 font-semibold text-sm text-gray-700">
                  Teléfono
                </th>
                <th className="py-2 px-4 font-semibold text-sm text-gray-700">
                  Notas
                </th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-t">
                  <td className="py-2 px-4">{client.name}</td>
                  <td className="py-2 px-4">{client.email || '-'}</td>
                  <td className="py-2 px-4">{client.phone || '-'}</td>
                  <td className="py-2 px-4 text-gray-600 text-sm">
                    {client.notes || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
