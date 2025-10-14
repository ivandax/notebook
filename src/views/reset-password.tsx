import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useSessionStore } from '@/state/sessionStore';
import { resetPasswordForEmail } from '@/services/auth';
import { useNavigate } from 'react-router-dom';

export function ResetPassword() {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const navigate = useNavigate();

    const session = useSessionStore((state) => state.session);
    console.log(session);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await resetPasswordForEmail(password);

        if (error) {
            toast.error('Error', {
                description: 'No se pudo actualizar la contraseña.',
            });
        } else {
            toast.success('Contraseña actualizada', {
                description:
                    'Ya puedes iniciar sesión con tu nueva contraseña.',
            });
            setDone(true);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-sm bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                    Nueva contraseña
                </h1>

                {!done ? (
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-3"
                    >
                        <Input
                            type="password"
                            placeholder="Nueva contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Guardando...' : 'Actualizar contraseña'}
                        </Button>
                    </form>
                ) : (
                    <Button onClick={() => navigate('/sign-in-email')}>
                        Ir a iniciar sesión
                    </Button>
                )}
            </div>
        </div>
    );
}
