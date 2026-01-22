import React, { useState } from 'react';
import XIcon from './icons/XIcon';
import PlusIcon from './icons/PlusIcon';

interface Role {
  id: number;
  name: string;
}

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (memberData: any) => void;
  roles: Role[];
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ isOpen, onClose, onAddMember, roles }) => {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    birthDate: '',
    roleId: roles.length > 0 ? roles[0].id : '',
    status: 'Ativo',
    baptismDate: '',
  });

  if (!isOpen) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMember({
        ...formData,
        roleId: Number(formData.roleId),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Adicionar Novo Membro</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <XIcon className="w-6 h-6" />
            </button>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome Completo</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">CPF</label>
                        <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Data de Nascimento</label>
                        <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Cargo</label>
                        <select name="roleId" value={formData.roleId} onChange={handleChange} className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500">
                           {roles.map(role => (
                               <option key={role.id} value={role.id}>{role.name}</option>
                           ))}
                        </select>
                    </div>
                     <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500">
                           <option value="Ativo">Ativo</option>
                           <option value="Inativo">Inativo</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Data de Batismo</label>
                    <input type="date" name="baptismDate" value={formData.baptismDate} onChange={handleChange} className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>

                 <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Foto</label>
                    <div className="mt-1 flex items-center gap-4">
                        <span className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                            {/* Placeholder for image preview */}
                        </span>
                        <button type="button" className="text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                            Carregar foto
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600">
                    Cancelar
                </button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-primary-600 text-white shadow hover:bg-primary-700 flex items-center gap-2">
                    <PlusIcon className="w-5 h-5" />
                    Salvar Membro
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;
