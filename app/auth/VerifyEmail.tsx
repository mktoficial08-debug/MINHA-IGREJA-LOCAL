import React, { useState } from 'react';

interface VerifyEmailProps {
    email: string;
    onSwitchView: (view: 'login') => void;
}

const MOCK_CODE = '123456';

const VerifyEmail: React.FC<VerifyEmailProps> = ({ email, onSwitchView }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (code === MOCK_CODE) {
            setSuccess('Conta verificada com sucesso! Você já pode fazer o login.');
            setTimeout(() => {
                onSwitchView('login');
            }, 2000);
        } else {
            setError('Código de verificação inválido.');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">Verifique seu E-mail</h2>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                Enviamos um código de verificação para <span className="font-semibold">{email}</span>.
            </p>

            <div className="my-4 p-3 bg-yellow-50 dark:bg-yellow-900/50 border border-yellow-200 dark:border-yellow-800 rounded-lg text-center">
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    (Para fins de demonstração, o código é: <strong className="font-bold">{MOCK_CODE}</strong>)
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                {success && <p className="text-green-500 text-sm text-center">{success}</p>}
                <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Código de Verificação</label>
                    <input 
                        type="text" 
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required 
                        maxLength={6}
                        className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 text-center tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-primary-500" 
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-primary-600 text-white px-4 py-2.5 rounded-lg shadow hover:bg-primary-700 transition-colors flex items-center justify-center font-semibold"
                >
                    Verificar Conta
                </button>
            </form>
        </div>
    );
};

export default VerifyEmail;
