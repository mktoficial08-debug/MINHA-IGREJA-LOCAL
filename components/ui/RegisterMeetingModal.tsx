import React, { useState } from 'react';
import XIcon from './icons/XIcon';
import PlusIcon from './icons/PlusIcon';
import type { CellMeeting } from '../../types';

interface RegisterMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterMeeting: (meetingData: Omit<CellMeeting, 'id'>) => void;
}

const RegisterMeetingModal: React.FC<RegisterMeetingModalProps> = ({ isOpen, onClose, onRegisterMeeting }) => {
    const initialFormState = {
        date: new Date().toISOString().substring(0, 10),
        totalPresent: '',
        visitors: '',
        studyTopic: '',
        offering: '',
    };
    const [formData, setFormData] = useState(initialFormState);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onRegisterMeeting({
            date: formData.date,
            totalPresent: Number(formData.totalPresent),
            visitors: Number(formData.visitors),
            studyTopic: formData.studyTopic,
            offering: formData.offering ? Number(formData.offering) : undefined,
        });
        setFormData(initialFormState);
    };

    return (
         <div className="fixed inset-0 bg-black bg-opacity-60 z-[60] flex justify-center items-center p-4" onClick={onClose}>
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Registrar Reunião da Célula</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Data da Reunião</label>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} required className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3"/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Total de Presentes</label>
                                <input type="number" name="totalPresent" value={formData.totalPresent} onChange={handleChange} required className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3"/>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Visitantes</label>
                                <input type="number" name="visitors" value={formData.visitors} onChange={handleChange} required className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3"/>
                            </div>
                        </div>
                         <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tema do Estudo</label>
                            <input type="text" name="studyTopic" value={formData.studyTopic} onChange={handleChange} required className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3"/>
                        </div>
                         <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Oferta (R$) (Opcional)</label>
                            <input type="number" step="0.01" name="offering" value={formData.offering} onChange={handleChange} className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3"/>
                        </div>
                    </div>
                     <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600">Cancelar</button>
                        <button type="submit" className="px-4 py-2 rounded-lg bg-primary-600 text-white shadow hover:bg-primary-700 flex items-center gap-2"><PlusIcon className="w-5 h-5" /> Registrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterMeetingModal;
