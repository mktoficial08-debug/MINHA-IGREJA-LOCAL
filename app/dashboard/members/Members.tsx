import React, { useState } from 'react';
import PlusIcon from '../../../components/ui/icons/PlusIcon';
import SearchIcon from '../../../components/ui/icons/SearchIcon';
import QrCodeIcon from '../../../components/ui/icons/QrCodeIcon';
import Settings2Icon from '../../../components/ui/icons/Settings2Icon';
import MemberCardModal from '../../../components/ui/MemberCardModal';
import RolesManagerModal from '../../../components/ui/RolesManagerModal';
import AddMemberModal from '../../../components/ui/AddMemberModal';
import type { Role, Member } from '../../../types';

const initialRoles: Role[] = [
    { id: 1, name: 'Pastor Presidente' },
    { id: 6, name: 'Pastor' },
    { id: 7, name: 'Bispo' },
    { id: 8, name: 'Presbítero' },
    { id: 9, name: 'Evangelista' },
    { id: 10, name: 'Missionário' },
    { id: 11, name: 'Mestre' },
    { id: 12, name: 'Diácono' },
    { id: 2, name: 'Diaconisa' },
    { id: 13, name: 'Secretário(a)' },
    { id: 14, name: 'Tesoureiro(a)' },
    { id: 3, name: 'Líder de Célula' },
    { id: 15, name: 'Coordenador de Louvor' },
    { id: 16, name: 'Coordenador de Mocidade' },
    { id: 17, name: 'Coordenador de Escola Dominical' },
    { id: 5, name: 'Obreiro' },
    { id: 4, name: 'Membro' },
];

const initialMembersData: Member[] = [
  { id: 1, name: 'Carlos Alberto', photo: 'https://picsum.photos/seed/user1/40/40', roleId: 1, status: 'Ativo' },
  { id: 2, name: 'Maria Oliveira', photo: 'https://picsum.photos/seed/user2/40/40', roleId: 2, status: 'Ativo' },
  { id: 3, name: 'José Pereira', photo: 'https://picsum.photos/seed/user3/40/40', roleId: 3, status: 'Ativo' },
  { id: 4, name: 'Ana Paula', photo: 'https://picsum.photos/seed/user4/40/40', roleId: 4, status: 'Ativo' },
  { id: 5, name: 'Ricardo Souza', photo: 'https://picsum.photos/seed/user5/40/40', roleId: 4, status: 'Inativo' },
];


const Members: React.FC = () => {
    const [selectedMember, setSelectedMember] = useState<(Member & { role: string }) | null>(null);
    const [isRolesModalOpen, setIsRolesModalOpen] = useState(false);
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
    
    const [roles, setRoles] = useState<Role[]>(initialRoles);
    const [members, setMembers] = useState<Member[]>(initialMembersData);

    const getRoleNameById = (roleId: number) => {
        return roles.find(role => role.id === roleId)?.name || 'Não definido';
    }

    const handleAddRole = (name: string) => {
        const newRole: Role = {
            id: Date.now(), // simple unique id generation
            name: name,
        };
        setRoles([...roles, newRole]);
    };

    const handleUpdateRole = (id: number, newName: string) => {
        setRoles(roles.map(role => role.id === id ? { ...role, name: newName } : role));
    };

    const handleDeleteRole = (id: number) => {
        setRoles(roles.filter(role => role.id !== id));
    };

    const handleAddMember = (newMemberData: Omit<Member, 'id' | 'photo'>) => {
        const newMember: Member = {
            id: Date.now(),
            photo: `https://picsum.photos/seed/user${Date.now()}/40/40`, // placeholder photo
            ...newMemberData,
        };
        setMembers([...members, newMember]);
        setIsAddMemberModalOpen(false);
    }

    const getStatusClass = (status: string) => {
        return status === 'Ativo' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    }
    
    const handleSelectMember = (member: Member) => {
        setSelectedMember({
            ...member,
            role: getRoleNameById(member.roleId),
        });
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Membros</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Gerencie os membros e cargos da sua igreja.</p>
                </div>
                <div className="flex w-full sm:w-auto gap-2">
                    <button onClick={() => setIsRolesModalOpen(true)} className="w-1/2 sm:w-auto bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
                        <Settings2Icon className="w-5 h-5" />
                        Gerenciar Cargos
                    </button>
                    <button onClick={() => setIsAddMemberModalOpen(true)} className="w-1/2 sm:w-auto bg-primary-600 text-white px-4 py-2 rounded-lg shadow hover:bg-primary-700 transition-colors flex items-center justify-center gap-2">
                        <PlusIcon className="w-5 h-5" />
                        Adicionar Membro
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
                <div className="relative mb-4">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" placeholder="Buscar por nome ou CPF..." className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Nome</th>
                                <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Cargo</th>
                                <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                                <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map(member => (
                                <tr key={member.id} className="border-b border-gray-100 dark:border-gray-700">
                                    <td className="p-3 flex items-center gap-3">
                                        <img src={member.photo} alt={member.name} className="w-10 h-10 rounded-full" />
                                        <span className="font-medium text-gray-800 dark:text-gray-100">{member.name}</span>
                                    </td>
                                    <td className="p-3 text-gray-600 dark:text-gray-300">{getRoleNameById(member.roleId)}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(member.status)}`}>
                                            {member.status}
                                        </span>
                                    </td>
                                    <td className="p-3 text-right">
                                        <button onClick={() => handleSelectMember(member)} className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <QrCodeIcon className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {selectedMember && <MemberCardModal member={selectedMember} onClose={() => setSelectedMember(null)} />}
            <RolesManagerModal 
                isOpen={isRolesModalOpen}
                onClose={() => setIsRolesModalOpen(false)}
                roles={roles}
                onAddRole={handleAddRole}
                onUpdateRole={handleUpdateRole}
                onDeleteRole={handleDeleteRole}
            />
            <AddMemberModal
                isOpen={isAddMemberModalOpen}
                onClose={() => setIsAddMemberModalOpen(false)}
                onAddMember={handleAddMember}
                roles={roles}
            />
        </div>
    );
};

export default Members;