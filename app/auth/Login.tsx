import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface LoginProps {
    onSwitchView: (view: 'register') => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchView }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const user = await login(email, password);
            if (!user) {
                setError('E-mail ou senha inválidos.');
            }
        } catch (err) {
            setError('Falha ao fazer login. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">Acessar sua conta</h2>
            
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 my-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700">
                Use as contas de demonstração: <br/>
                <strong className="font-semibold">admin@igreja.com</strong> (senha: password123) <br/>
                <strong className="font-semibold">membro@igreja.com</strong> (senha: password123)
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                 {error && <p className="text-red-500 text-sm text-center">{error}</p>}
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
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
                        <button type="button" onClick={() => alert('Função de recuperação de senha a ser implementada.')} className="text-xs font-semibold text-primary-600 hover:underline">
                            Esqueci minha senha
                        </button>
                    </div>
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
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                Não tem uma conta?{' '}
                <button onClick={() => onSwitchView('register')} className="font-semibold text-primary-600 hover:underline">
                    Cadastre-se
                </button>
            </p>
        </div>
    );
};

export default Login;
