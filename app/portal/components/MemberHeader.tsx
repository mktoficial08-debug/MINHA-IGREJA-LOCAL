import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useSettings } from '../../../context/SettingsContext';
import type { User } from '../../../types';
import LogOutIcon from '../../../components/ui/icons/LogOutIcon';
import ChurchIcon from '../../../components/ui/icons/ChurchIcon';

interface MemberHeaderProps {
    user: User;
}

const MemberHeader: React.FC<MemberHeaderProps> = ({ user }) => {
    const { logout } = useAuth();
    const { settings } = useSettings();

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm h-20 flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0">
            <div className="flex items-center gap-3">
                 <ChurchIcon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                 <span className="text-xl font-bold text-gray-800 dark:text-gray-200 whitespace-nowrap">{settings.churchInfo.name}</span>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                    <img
                        src={user.photo}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full"
                    />
                    <div className='hidden md:block'>
                        <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Membro</p>
                    </div>
                </div>
                <button 
                    onClick={logout}
                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200"
                    title="Sair"
                >
                    <LogOutIcon className="w-6 h-6" />
                </button>
            </div>
        </header>
    );
};

export default MemberHeader;