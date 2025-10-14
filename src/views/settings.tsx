import { useState } from 'react';
import { signOut } from '@/services/auth';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export function Settings() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

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
