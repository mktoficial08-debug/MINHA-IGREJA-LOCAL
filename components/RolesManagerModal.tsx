import React, { useState, useEffect } from 'react';
import XIcon from './icons/XIcon';
import PlusIcon from './icons/PlusIcon';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';

interface Role {
  id: number;
  name: string;
}

interface RolesManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  roles: Role[];
  onAddRole: (name: string) => void;
  onUpdateRole: (id: number, newName: string) => void;
  onDeleteRole: (id: number) => void;
}

const RolesManagerModal: React.FC<RolesManagerModalProps> = ({ isOpen, onClose, roles, onAddRole, onUpdateRole, onDeleteRole }) => {
  const [newRoleName, setNewRoleName] = useState('');
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [editingRoleName, setEditingRoleName] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setNewRoleName('');
      setEditingRole(null);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRoleName.trim()) {
      onAddRole(newRoleName.trim());
      setNewRoleName('');
    }
  };

  const handleEditClick = (role: Role) => {
    setEditingRole(role);
    setEditingRoleName(role.name);
  };
  
  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRole && editingRoleName.trim()) {
      onUpdateRole(editingRole.id, editingRoleName.trim());
      setEditingRole(null);
      setEditingRoleName('');
    }
  };

  const handleDeleteClick = (roleId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este cargo?')) {
        onDeleteRole(roleId);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Gerenciar Cargos</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <XIcon className="w-6 h-6" />
            </button>
        </div>

        <div className="p-6">
            <form onSubmit={handleAddSubmit} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    placeholder="Nome do novo cargo"
                    className="flex-grow bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-lg shadow hover:bg-primary-700 transition-colors flex items-center justify-center gap-2">
                    <PlusIcon className="w-5 h-5" />
                </button>
            </form>
            
            <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
                {roles.map(role => (
                    <div key={role.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                        {editingRole?.id === role.id ? (
                           <form onSubmit={handleUpdateSubmit} className="flex-grow flex gap-2">
                               <input
                                   type="text"
                                   value={editingRoleName}
                                   onChange={(e) => setEditingRoleName(e.target.value)}
                                   className="flex-grow bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md py-1 px-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                                   autoFocus
                                />
                                <button type="submit" className="text-green-600 hover:text-green-800 font-semibold text-sm">Salvar</button>
                                <button type="button" onClick={() => setEditingRole(null)} className="text-gray-500 hover:text-gray-700 font-semibold text-sm">Cancelar</button>
                           </form>
                        ) : (
                           <>
                            <span className="text-gray-800 dark:text-gray-200">{role.name}</span>
                            <div className="flex gap-2">
                                <button onClick={() => handleEditClick(role)} className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                                    <PencilIcon className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDeleteClick(role.id)} className="text-gray-400 hover:text-red-600 dark:hover:text-red-500">
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                           </>
                        )}
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default RolesManagerModal;
