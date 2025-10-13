import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export function SignUp() {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-sm bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100 text-center">
                    Crear cuenta
                </h1>

                <div className="flex flex-col gap-3">
                    <Button
                        variant="outline"
                        onClick={() => navigate('/sign-up-email')}
                    >
                        Con correo y contraseña
                    </Button>

                    <Button variant="outline" disabled>
                        Con Google (próximamente)
                    </Button>
                </div>
            </div>
        </div>
    )
}
