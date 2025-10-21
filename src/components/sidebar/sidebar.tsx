import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { useSessionStore } from '@/state/sessionStore';

export function Sidebar() {
  const session = useSessionStore((state) => state.session);

  return (
    <aside className="h-screen w-60 border-r bg-white shadow-sm p-4 flex flex-col justify-between">
      {/* Top buttons */}
      <div>
        <h1 className="text-xl font-semibold mb-6">Notebook</h1>
        <nav className="flex flex-col space-y-2">
          {!session ? (
            <>
              <Link to="/sign-up">
                <Button variant="outline" className="w-full">
                  Crear cuenta
                </Button>
              </Link>
              <Link to="/sign-in">
                <Button variant="outline" className="w-full">
                  Iniciar sesión
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/">
                <Button variant="outline" className="w-full">
                  Inicio
                </Button>
              </Link>
              <Link to="/fisio-profiles">
                <Button variant="outline" className="w-full">
                  Perfiles Fisio
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Bottom buttons */}
      {session && (
        <nav className="flex flex-col space-y-2">
          <>
            <Link to="/organizations">
              <Button variant="outline" className="w-full">
                Organizaciones
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="outline" className="w-full">
                Configuración
              </Button>
            </Link>
          </>
        </nav>
      )}
    </aside>
  );
}
