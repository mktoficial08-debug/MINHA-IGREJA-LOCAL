import React, { useState, useEffect } from 'react';
import XIcon from './icons/XIcon';
import PlusIcon from './icons/PlusIcon';
import UserIcon from './icons/UserIcon';
import ClockIcon from './icons/ClockIcon';
import MapPinIcon from './icons/MapPinIcon';
import PhoneIcon from './icons/PhoneIcon';
import LayersIcon from './icons/LayersIcon';
import CalendarIcon from './icons/CalendarIcon';
import UsersIcon from './icons/UsersIcon';
import PencilIcon from './icons/PencilIcon';
import AddParticipantModal from './AddParticipantModal';
import RegisterMeetingModal from './RegisterMeetingModal';
import type { Cell, CellParticipant, CellMeeting } from '../../types';

interface CellDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  cell: Cell;
  participants: CellParticipant[];
  meetings: CellMeeting[];
  onAddParticipant: (participantData: Omit<CellParticipant, 'id'>) => void;
  onUpdateCell: (updatedData: Omit<Cell, 'id'>) => void;
}

const CellDetailsModal: React.FC<CellDetailsModalProps> = ({ isOpen, onClose, cell, participants, meetings, onAddParticipant, onUpdateCell }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'members' | 'meetings'>('info');
  const [isAddParticipantModalOpen, setIsAddParticipantModalOpen] = useState(false);
  const [isRegisterMeetingModalOpen, setIsRegisterMeetingModalOpen] = useState(false);

  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [editFormData, setEditFormData] = useState(cell);
  
  // Reset tab and edit state when modal is opened for a new cell
  useEffect(() => {
      if(isOpen) {
          setActiveTab('info');
          setIsEditingInfo(false);
          setEditFormData(cell);
      }
  }, [isOpen, cell]);

  if (!isOpen) {
    return null;
  }

  const handleInfoEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleInfoUpdate = () => {
      onUpdateCell(editFormData);
      setIsEditingInfo(false);
  };
  
  const TabButton: React.FC<{ tabName: 'info' | 'members' | 'meetings', label: string, count?: number }> = ({ tabName, label, count }) => (
    <button
        type="button"
        onClick={() => setActiveTab(tabName)}
        className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
            activeTab === tabName
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
    >
        {label} {count !== undefined && <span className="text-xs bg-gray-200 dark:bg-gray-600 rounded-full px-2 py-0.5 ml-1">{count}</span>}
    </button>
  );

  const statusColors: { [key in CellParticipant['status']]: string } = {
    Líder: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Auxiliar: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    Membro: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    Visitante: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  };

  const InfoDisplayRow: React.FC<{icon: React.ReactNode, title: string, value?: string}> = ({icon, title, value}) => (
      <div className="flex items-start gap-3"><div className="w-5 h-5 mt-1 text-primary-500">{icon}</div><div><h4 className="font-semibold">{title}</h4><p>{value}</p></div></div>
  );

  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-3xl transform transition-all flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{cell.name}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <XIcon className="w-6 h-6" />
            </button>
        </div>

        <div className="p-6 flex-grow overflow-y-auto max-h-[75vh]">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
                <div className="flex gap-2">
                    <TabButton tabName="info" label="Informações" />
                    <TabButton tabName="members" label="Membros" count={participants.length} />
                    <TabButton tabName="meetings" label="Reuniões" count={meetings.length} />
                </div>
                 {activeTab === 'info' && !isEditingInfo && (
                    <button onClick={() => setIsEditingInfo(true)} className="flex items-center gap-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                        <PencilIcon className="w-4 h-4" /> Editar
                    </button>
                )}
            </div>

            {/* INFO TAB */}
            {activeTab === 'info' && (
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        { isEditingInfo ? (
                             <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div><label className="text-xs font-bold">Líder/Anfitrião</label><input type="text" name="leader" value={editFormData.leader} onChange={handleInfoEditChange} className="mt-1 w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md py-1 px-2"/></div>
                                    <div><label className="text-xs font-bold">Rede</label><select name="network" value={editFormData.network} onChange={handleInfoEditChange} className="mt-1 w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md py-1.5 px-2"><option value="Geral">Geral</option><option value="Jovens">Jovens</option><option value="Casais">Casais</option><option value="Crianças">Crianças</option></select></div>
                                </div>
                                <div><label className="text-xs font-bold">Endereço</label><textarea name="address" value={editFormData.address} onChange={handleInfoEditChange} rows={2} className="mt-1 w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md py-1 px-2"></textarea></div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     <div><label className="text-xs font-bold">Dia/Horário</label><div className="flex gap-2"><select name="dayOfWeek" value={editFormData.dayOfWeek} onChange={handleInfoEditChange} className="w-2/3 mt-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md py-1.5 px-2">{['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'].map(day => <option key={day} value={day}>{day}</option>)}</select><input type="time" name="time" value={editFormData.time} onChange={handleInfoEditChange} className="w-1/3 mt-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md py-1 px-2"/></div></div>
                                     <div><label className="text-xs font-bold">Meta de Multiplicação</label><input type="date" name="multiplicationTargetDate" value={editFormData.multiplicationTargetDate} onChange={handleInfoEditChange} className="mt-1 w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md py-1 px-2"/></div>
                                </div>
                                <div className="flex justify-end gap-2 pt-2"><button onClick={() => setIsEditingInfo(false)} className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-600 text-sm">Cancelar</button><button onClick={handleInfoUpdate} className="px-3 py-1.5 rounded-lg bg-primary-600 text-white shadow hover:bg-primary-700 text-sm">Salvar</button></div>
                             </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InfoDisplayRow icon={<UserIcon/>} title="Líder/Anfitrião" value={cell.leader} />
                                <InfoDisplayRow icon={<ClockIcon/>} title="Dia e Horário" value={`${cell.dayOfWeek}, ${cell.time}`} />
                                <div className="col-span-2"><InfoDisplayRow icon={<MapPinIcon/>} title="Endereço" value={cell.address} /></div>
                                <InfoDisplayRow icon={<LayersIcon/>} title="Rede" value={cell.network} />
                                {cell.multiplicationTargetDate && <InfoDisplayRow icon={<CalendarIcon/>} title="Meta de Multiplicação" value={new Date(cell.multiplicationTargetDate + 'T00:00:00').toLocaleDateString('pt-BR')} />}
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            {/* MEMBERS TAB */}
            {activeTab === 'members' && (
                 <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Participantes</h3>
                        <button onClick={() => setIsAddParticipantModalOpen(true)} className="flex items-center gap-2 text-sm bg-primary-600 text-white px-3 py-1.5 rounded-lg shadow hover:bg-primary-700">
                            <PlusIcon className="w-4 h-4" /> Adicionar
                        </button>
                    </div>
                    <ul className="space-y-3">
                        {participants.map(p => (
                             <li key={p.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-gray-100">{p.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5"><PhoneIcon className="w-3 h-3" />{p.phone}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[p.status]}`}>
                                    {p.status}
                                </span>
                            </li>
                        ))}
                    </ul>
                 </div>
            )}

            {/* MEETINGS TAB */}
            {activeTab === 'meetings' && (
                 <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Histórico de Reuniões</h3>
                        <button onClick={() => setIsRegisterMeetingModalOpen(true)} className="flex items-center gap-2 text-sm bg-primary-600 text-white px-3 py-1.5 rounded-lg shadow hover:bg-primary-700">
                           <PlusIcon className="w-4 h-4"/> Registrar Reunião
                        </button>
                    </div>
                    <div className="space-y-4">
                        {meetings.map(m => (
                            <div key={m.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-bold text-primary-600 dark:text-primary-400">{new Date(m.date + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' })}</p>
                                    <div className="flex gap-4 text-sm">
                                        <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300"><UsersIcon className="w-4 h-4"/>{m.totalPresent} Presentes</span>
                                        <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300"><UserIcon className="w-4 h-4"/>{m.visitors} Visitante(s)</span>
                                    </div>
                                </div>
                                <p className="text-sm"><span className="font-semibold">Estudo:</span> {m.studyTopic}</p>
                                {m.offering !== undefined && <p className="text-sm text-green-600"><span className="font-semibold text-gray-600 dark:text-gray-300">Oferta:</span> R$ {m.offering.toFixed(2).replace('.', ',')}</p>}
                            </div>
                        ))}
                    </div>
                 </div>
            )}
        </div>
      </div>
    </div>
    
    <AddParticipantModal 
        isOpen={isAddParticipantModalOpen}
        onClose={() => setIsAddParticipantModalOpen(false)}
        onAddParticipant={onAddParticipant}
    />
    <RegisterMeetingModal 
        isOpen={isRegisterMeetingModalOpen}
        onClose={() => setIsRegisterMeetingModalOpen(false)}
        onRegisterMeeting={(data) => {
            // Placeholder: A real implementation would require the cell ID.
            // This is handled by the parent component's onRegisterMeeting prop.
            // For now, this button inside details modal can be considered a shortcut.
            console.log('Registering meeting from details modal:', data);
            setIsRegisterMeetingModalOpen(false);
        }}
    />
    </>
  );
};

export default CellDetailsModal;
