import { useState } from 'react';
import { signOut } from '@/services/auth';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useSessionStore } from '@/state/sessionStore';

export function Settings() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userProfile = useSessionStore((state) => state.userProfile);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
    toast('Sesión cerrada');
    setTimeout(() => navigate('/'), 1000);
  };

  return (
    <div className="p-6">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Configuración
        </h1>

        {userProfile ? (
          <div className="mb-6">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Correo:</span> {userProfile.email}
            </p>
            {userProfile.display_name && (
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Nombre:</span>{' '}
                {userProfile.display_name}
              </p>
            )}
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
              <span className="font-semibold">Cuenta creada:</span>{' '}
              {new Date(userProfile.created_at).toLocaleString()}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 mb-6">
            No se pudo cargar el perfil de usuario.
          </p>
        )}

        <div className="flex flex-col gap-4">
          {/* Add other settings controls here */}
          <Button onClick={handleSignOut} disabled={loading}>
            {loading ? 'Cerrando...' : 'Cerrar sesión'}
          </Button>
        </div>
      </div>
    </div>
  );
}
