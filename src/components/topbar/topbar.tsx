import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

export function TopBar() {
    return (
        <header className="w-full h-14 border-b bg-white shadow-sm flex items-center justify-between px-4">
            <h1 className="text-xl font-semibold text-gray-800">Notebook</h1>
            <div className="flex space-x-2">
                <Link to="/sign-up">
                    <Button variant="outline" size="sm">
                        Crear cuenta
                    </Button>
                </Link>
                <Link to="/sign-in">
                    <Button variant="outline" size="sm">
                        Iniciar sesión
                    </Button>
                </Link>
            </div>
        </header>
    )
}
