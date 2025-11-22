import { Button } from '@/components/ui/button';
import { setModalState } from '@/state/modalStore';
import { useSessionStore } from '@/state/sessionStore';
import { Link } from 'react-router-dom';

export function Organizations() {
  const isLoadingSession = useSessionStore((state) => state.isLoadingSession);
  const session = useSessionStore((state) => state.session);
  const organizations = useSessionStore((state) => state.organizations);

  if (isLoadingSession) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-6 py-8">
        {!session ? (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
            <h2 className="text-xl font-semibold mb-3">Sesión no iniciada</h2>
            <Link to="/sign-in">
              <Button>Iniciar sesión</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                Bienvenido, {session.user.email}
              </h2>
            </div>

            {organizations?.length === 0 ? (
              <div className="flex flex-col items-center min-h-[calc(100vh-4rem)]">
                <h2 className="text-xl font-semibold mb-3">
                  Comienza creando una organización
                </h2>
                <p className="text-gray-600 mb-6 text-center max-w-md">
                  Las organizaciones te permiten colaborar con tu equipo y
                  gestionar proyectos.
                </p>
                <Button
                  onClick={() =>
                    setModalState({ modalName: 'create-organization' })
                  }
                >
                  Crear organización
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {organizations?.map((org) => (
                    <div
                      key={org.id}
                      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-lg font-semibold mb-2">{org.name}</h3>
                      <p className="text-sm text-gray-500">
                        Creada el{' '}
                        {new Date(org.created_at).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
