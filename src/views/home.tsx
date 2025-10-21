import { Button } from '@/components/ui/button';
import { useSessionStore } from '@/state/sessionStore';
import { Link, useNavigate } from 'react-router-dom';

export function Home() {
  const isLoadingSession = useSessionStore((state) => state.isLoadingSession);
  const session = useSessionStore((state) => state.session);
  const organizations = useSessionStore((state) => state.organizations);
  const defaultOrganization = useSessionStore(
    (state) => state.defaultOrganization
  );
  const navigate = useNavigate();

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
                <Button onClick={() => navigate('/organizations')}>
                  Ir a organizaciones
                </Button>
              </div>
            ) : defaultOrganization ? (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Estás en la organización:
                  </h3>
                  <p className="text-lg text-gray-700 font-medium">
                    {defaultOrganization.name}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-white rounded-2xl shadow-md flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-semibold mb-2">
                        Perfiles de clientes
                      </h4>
                      <p className="text-gray-600 mb-4 text-sm">
                        Gestiona y consulta los perfiles de tus pacientes o
                        clientes.
                      </p>
                    </div>
                    <Button onClick={() => navigate('/fisio-profiles')}>
                      Ir a perfiles
                    </Button>
                  </div>

                  <div className="p-6 bg-white rounded-2xl shadow-md flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-semibold mb-2">
                        Organización
                      </h4>
                      <p className="text-gray-600 mb-4 text-sm">
                        Administra miembros y configuraciones de la
                        organización.
                      </p>
                    </div>
                    <Button onClick={() => navigate('/organizations')}>
                      Ver organización
                    </Button>
                  </div>

                  <div className="p-6 bg-white rounded-2xl shadow-md flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-semibold mb-2">
                        Configuración
                      </h4>
                      <p className="text-gray-600 mb-4 text-sm">
                        Ajusta tus preferencias personales y de la app.
                      </p>
                    </div>
                    <Button onClick={() => navigate('/settings')}>
                      Ir a configuración
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </main>
    </div>
  );
}
