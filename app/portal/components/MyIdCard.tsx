import React from 'react';
import type { User } from '../../../types';
import ChurchIcon from '../../../components/ui/icons/ChurchIcon';

interface MyIdCardProps {
    user: User;
}

const MyIdCard: React.FC<MyIdCardProps> = ({ user }) => {
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MemberID:${user.id}`;
    
    // In a real app, role would come from a more detailed user profile
    const userRole = user.role === 'Admin' ? 'Administrador' : 'Membro';

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-center">
             <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6">Minha Carteirinha</h3>
             <div className="relative mb-4 inline-block">
                <img src={user.photo} alt={user.name} className="w-24 h-24 rounded-full mx-auto ring-4 ring-primary-500/50 p-1" />
                <div className="absolute -bottom-2 -right-1 bg-primary-600 text-white p-1.5 rounded-full">
                    <ChurchIcon className="w-4 h-4" />
                </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{user.name}</h2>
            <p className="text-primary-600 dark:text-primary-400 font-medium mt-1 text-sm">{userRole}</p>

            <div className="my-6 flex justify-center">
                <img src={qrCodeUrl} alt="QR Code" className="rounded-lg" />
            </div>

            <p className="text-xs text-gray-400 dark:text-gray-500">Apresente este QR Code para check-in em eventos.</p>
        </div>
    );
};

export default MyIdCard;
