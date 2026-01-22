import React, { useState, useEffect } from 'react';
import XIcon from './icons/XIcon';
import PlusIcon from './icons/PlusIcon';
import LayersIcon from './icons/LayersIcon';
import type { Event } from '../../types';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventData: Omit<Event, 'id'>) => void;
  event: Event | null;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, onClose, onSave, event }) => {
    const getInitialFormState = () => ({
        name: event?.name || '',
        date: event?.date ? event.date.substring(0, 16) : '',
        location: event?.location || '',
        description: event?.description || '',
        imageUrl: event?.imageUrl || '',
    });

    const [formData, setFormData] = useState(getInitialFormState());

    useEffect(() => {
        if (isOpen) {
            setFormData(getInitialFormState());
        }
    }, [isOpen, event]);
    

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // In a real app, you might want to revoke the old URL to prevent memory leaks
            // if (formData.imageUrl && formData.imageUrl.startsWith('blob:')) {
            //   URL.revokeObjectURL(formData.imageUrl);
            // }
            const newImageUrl = URL.createObjectURL(file);
            setFormData(prev => ({ ...prev, imageUrl: newImageUrl }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...formData,
            date: new Date(formData.date).toISOString()
        });
    };

    const modalTitle = event ? "Editar Evento" : "Adicionar Novo Evento";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{modalTitle}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome do Evento</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Data e Horário</label>
                                <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} required className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                            </div>
                             <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Local</label>
                                <input type="text" name="location" value={formData.location} onChange={handleChange} required className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                            </div>
                        </div>
                        <div>
                             <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Descrição</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"></textarea>
                        </div>
                         <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Imagem do Evento</label>
                            <div className="mt-2 flex items-center gap-4">
                                <div className="w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                                    {formData.imageUrl ? (
                                        <img src={formData.imageUrl} alt="Prévia do evento" className="w-full h-full object-cover" />
                                    ) : (
                                        <LayersIcon className="w-12 h-12 text-gray-400" />
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="image-upload" className="cursor-pointer bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg shadow-sm border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 font-semibold text-sm">
                                        Carregar Imagem
                                    </label>
                                    <input id="image-upload" name="image-upload-input" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleImageChange} />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Recomendado: 1080x1080 pixels.<br/>PNG, JPG ou WEBP.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600">Cancelar</button>
                        <button type="submit" className="px-4 py-2 rounded-lg bg-primary-600 text-white shadow hover:bg-primary-700 flex items-center gap-2 font-semibold"><PlusIcon className="w-5 h-5" /> Salvar Evento</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEventModal;