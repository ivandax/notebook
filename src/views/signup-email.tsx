import { useState } from 'react';
import { signUpNewUser } from '@/services/auth';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

export function SignUpEmail() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await signUpNewUser(email, password);

        if (error) {
            toast('Error', {
                description: 'Error al crear el usuario',
            });
        } else {
            toast('Cuenta creada con éxito', {
                description: 'Revise su correo para verificar la cuenta',
            });
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-sm bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                    Crear cuenta
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <Input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Creando...' : 'Registrarse'}
                    </Button>
                </form>
            </div>
        </div>
    );
}
