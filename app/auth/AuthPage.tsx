import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import VerifyEmail from './VerifyEmail';
import ChurchIcon from '../../components/ui/icons/ChurchIcon';

type AuthView = 'login' | 'register' | 'verify';

const AuthPage: React.FC = () => {
    const [view, setView] = useState<AuthView>('login');
    const [emailToVerify, setEmailToVerify] = useState('');

    const handleSwitchView = (newView: AuthView) => {
        setView(newView);
    };
    
    const handleRegistrationSuccess = (email: string) => {
        setEmailToVerify(email);
        setView('verify');
    }

    const renderView = () => {
        switch (view) {
            case 'register':
                return <Register onSwitchView={handleSwitchView} onRegisterSuccess={handleRegistrationSuccess} />;
            case 'verify':
                return <VerifyEmail email={emailToVerify} onSwitchView={handleSwitchView} />;
            case 'login':
            default:
                return <Login onSwitchView={handleSwitchView} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center gap-3">
                         <ChurchIcon className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                         <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Minha Igreja</h1>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Acesse seu portal de membro ou o painel administrativo.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                    {renderView()}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
