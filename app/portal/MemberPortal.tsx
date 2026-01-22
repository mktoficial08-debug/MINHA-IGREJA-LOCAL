import React from 'react';
import MemberHeader from './components/MemberHeader';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';
import MyIdCard from './components/MyIdCard';
import UpcomingEvents from '../admin/dashboard/components/UpcomingEvents'; // Re-using for consistency
import MyCellGroup from './components/MyCellGroup';
import UsersIcon from '../../components/ui/icons/UsersIcon';

// A placeholder for a future component
const MemberDirectoryPlaceholder: React.FC = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 h-full flex flex-col items-center justify-center text-center">
         <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full mb-4">
             <UsersIcon className="w-8 h-8 text-gray-400" />
         </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Diretório de Membros</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Em breve: um local para se conectar com outros membros da igreja.</p>
    </div>
);

const MemberPortal: React.FC = () => {
    const { currentUser } = useAuth();
    const { settings } = useSettings();
    const memberPermissions = settings.permissions.Membro;
    
    if (!currentUser) return null;

    return (
        <div className="flex flex-col min-h-screen">
            <MemberHeader user={currentUser} />
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
                <div className="space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Bem-vindo, {currentUser.name.split(' ')[0]}!</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Este é o seu portal de membro.</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        <div className="lg:col-span-1 space-y-8">
                            <MyIdCard user={currentUser} />
                             {memberPermissions.viewDirectory && <MemberDirectoryPlaceholder />}
                        </div>
                        <div className="lg:col-span-2 space-y-8">
                           <UpcomingEvents />
                           {memberPermissions.viewOwnCellGroup && <MyCellGroup />}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MemberPortal;