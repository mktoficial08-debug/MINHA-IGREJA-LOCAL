import React from 'react';
import XIcon from './icons/XIcon';
import ChurchIcon from './icons/ChurchIcon';

interface MemberCard {
    id: number;
    name: string;
    photo: string;
    role: string;
}

interface MemberCardModalProps {
    member: MemberCard;
    onClose: () => void;
}

const MemberCardModal: React.FC<MemberCardModalProps> = ({ member, onClose }) => {
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MemberID:${member.id}`;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center p-4"
            onClick={onClose}
        >
            <div 
                className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-sm transform transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute -top-3 -right-3 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full p-1.5 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-500"
                    aria-label="Fechar"
                >
                    <XIcon className="w-5 h-5" />
                </button>
                
                <div className="p-8 text-center">
                    <div className="relative mb-6 inline-block">
                       <img src={member.photo} alt={member.name} className="w-32 h-32 rounded-full mx-auto ring-4 ring-primary-500/50 p-1" />
                       <div className="absolute -bottom-2 -right-2 bg-primary-600 text-white p-2 rounded-full">
                           <ChurchIcon className="w-5 h-5" />
                       </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{member.name}</h2>
                    <p className="text-primary-600 dark:text-primary-400 font-medium mt-1">{member.role}</p>

                    <div className="my-8 flex justify-center">
                        <img src={qrCodeUrl} alt="QR Code" className="rounded-lg" />
                    </div>

                    <p className="text-xs text-gray-400 dark:text-gray-500">Apresente este QR Code para check-in em eventos.</p>
                </div>
            </div>
        </div>
    );
};

export default MemberCardModal;
