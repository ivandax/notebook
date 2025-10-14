import { Button } from '@/components/ui/button';
import { useSessionStore } from '@/state/sessionStore';
import { Link } from 'react-router-dom';

export function Home() {
    const isLoadingSession = useSessionStore((state) => state.isLoadingSession);
    const session = useSessionStore((state) => state.session);

    if (isLoadingSession) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
                {!session ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <h2 className="text-xl font-semibold mb-3">
                            Sesión no iniciada
                        </h2>
                        <Link to="/sign-in">
                            <Button>Iniciar sesión</Button>
                        </Link>
                    </div>
                ) : (
                    <>
                        <h2 className="text-lg font-semibold mb-4">
                            Bienvenido, {session.user.email}
                        </h2>
                        <p className="text-gray-700">
                            Aquí irá el contenido principal de la app.
                        </p>
                        <div className="h-[2000px]" />
                    </>
                )}
            </main>
        </div>
    );
}
