import React, { useState } from 'react';
import XIcon from './icons/XIcon';
import PlusIcon from './icons/PlusIcon';
import type { Cell } from '../../types';

interface AddCellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCell: (cellData: Omit<Cell, 'id'>) => void;
}

const AddCellModal: React.FC<AddCellModalProps> = ({ isOpen, onClose, onAddCell }) => {
    const initialFormState = {
        name: '',
        leader: '',
        address: '',
        dayOfWeek: 'Segunda-feira',
        time: '',
        network: 'Geral',
        multiplicationTargetDate: '',
    };
  
    const [formData, setFormData] = useState(initialFormState);

  if (!isOpen) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCell(formData as Omit<Cell, 'id'>);
    setFormData(initialFormState); // Reset form
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Cadastrar Nova Célula</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <XIcon className="w-6 h-6" />
            </button>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                {/* Section 1: Dados Básicos */}
                <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-200">Dados Básicos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome da Célula</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Líder/Anfitrião</label>
                            <input type="text" name="leader" value={formData.leader} onChange={handleChange} required className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Endereço</label>
                        <textarea name="address" value={formData.address} onChange={handleChange} rows={2} required className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                             <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Dia e Horário</label>
                             <div className="flex gap-2 mt-1">
                                <select name="dayOfWeek" value={formData.dayOfWeek} onChange={handleChange} className="w-2/3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500">
                                    {['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'].map(day => <option key={day} value={day}>{day}</option>)}
                                </select>
                                <input type="time" name="time" value={formData.time} onChange={handleChange} required className="w-1/3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                             </div>
                        </div>
                        <div>
                             <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Rede de Células</label>
                             <select name="network" value={formData.network} onChange={handleChange} className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500">
                                <option value="Geral">Geral</option>
                                <option value="Jovens">Jovens</option>
                                <option value="Casais">Casais</option>
                                <option value="Crianças">Crianças</option>
                             </select>
                        </div>
                    </div>
                </div>
                {/* Section 2: Metas */}
                 <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-200">Metas de Acompanhamento</h3>
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Data Prevista para Multiplicação</label>
                        <input type="date" name="multiplicationTargetDate" value={formData.multiplicationTargetDate} onChange={handleChange} className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    </div>
                </div>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600">
                    Cancelar
                </button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-primary-600 text-white shadow hover:bg-primary-700 flex items-center gap-2">
                    <PlusIcon className="w-5 h-5" />
                    Salvar Célula
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AddCellModal;
