import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface RegisterProps {
    onSwitchView: (view: 'login') => void;
    onRegisterSuccess: (email: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onSwitchView, onRegisterSuccess }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const result = await register(email, password, name);
            if (result === 'success') {
                onRegisterSuccess(email);
            } else {
                 setError('Este e-mail já está em uso.');
            }
        } catch (err) {
            setError('Falha ao registrar. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div>
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">Criar nova conta</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                 {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome Completo</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                        className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500" 
                    />
                </div>
                 <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">E-mail</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500" 
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500" 
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-primary-600 text-white px-4 py-2.5 rounded-lg shadow hover:bg-primary-700 transition-colors flex items-center justify-center font-semibold disabled:bg-primary-400"
                >
                    {loading ? 'Registrando...' : 'Registrar'}
                </button>
            </form>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                Já tem uma conta?{' '}
                <button onClick={() => onSwitchView('login')} className="font-semibold text-primary-600 hover:underline">
                    Acesse aqui
                </button>
            </p>
        </div>
    );
};

export default Register;
