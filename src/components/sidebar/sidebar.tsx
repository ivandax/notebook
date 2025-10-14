import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSessionStore } from '@/state/sessionStore'

export function Sidebar() {
    const session = useSessionStore((state) => state.session);
    return (
        <aside className="h-screen w-60 border-r bg-white shadow-sm p-4 flex flex-col justify-between">
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
                        <Link to="/">
                            <Button variant="outline" className="w-full">
                                Home
                            </Button>
                        </Link>
                    )}
                </nav>
            </div>
        </aside>
    )
}
