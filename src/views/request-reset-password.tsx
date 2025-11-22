import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { requestResetPasswordForEmail } from '@/services/auth';
import { toast } from 'sonner';

export function RequestResetPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await requestResetPasswordForEmail(email);
    if (error) {
      toast.error('Error', {
        description: 'No se pudo enviar el correo de restablecimiento.',
      });
    } else {
      toast.success('Correo enviado', {
        description:
          'Revise su bandeja de entrada para restablecer su contraseña.',
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Restablecer contraseña
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Reestablecer contraseña'}
          </Button>
        </form>
      </div>
    </div>
  );
}
