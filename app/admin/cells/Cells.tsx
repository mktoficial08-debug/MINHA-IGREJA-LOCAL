import React, { useState } from 'react';
import PlusIcon from '../../../components/ui/icons/PlusIcon';
import AddCellModal from '../../../components/ui/AddCellModal';
import CellDetailsModal from '../../../components/ui/CellDetailsModal';
import RegisterMeetingModal from '../../../components/ui/RegisterMeetingModal';
import CellCard from './components/CellCard';
import type { Cell, CellParticipant, CellMeeting } from '../../../types';

const initialCellsData: Cell[] = [
    { id: 1, name: 'Célula Gênesis', leader: 'João e Maria Silva', address: 'Rua das Flores, 123, Bairro Feliz, São Paulo - SP', dayOfWeek: 'Quinta-feira', time: '20:00', network: 'Casais', multiplicationTargetDate: '2024-12-31' },
    { id: 2, name: 'Conectados', leader: 'Pedro Henrique', address: 'Av. Principal, 456, Centro, Rio de Janeiro - RJ', dayOfWeek: 'Sexta-feira', time: '19:30', network: 'Jovens' },
    { id: 3, name: 'Sementinhas', leader: 'Ana Paula', address: 'Anexo da Igreja', dayOfWeek: 'Sábado', time: '10:00', network: 'Crianças' },
];

const initialParticipantsData: { [key: number]: CellParticipant[] } = {
    1: [
        { id: 1, name: 'João Silva', phone: '(11) 98888-1111', status: 'Líder' },
        { id: 2, name: 'Maria Silva', phone: '(11) 98888-2222', status: 'Líder' },
        { id: 3, name: 'Carlos Pereira', phone: '(11) 98888-3333', status: 'Membro' },
        { id: 4, name: 'Ana Souza', phone: '(11) 98888-4444', status: 'Membro' },
        { id: 5, name: 'Lucas Costa (Visitante)', phone: '(11) 98888-5555', status: 'Visitante' },
    ],
    2: [{ id: 6, name: 'Pedro Henrique', phone: '(21) 91111-2222', status: 'Líder' }],
    3: [{ id: 7, name: 'Ana Paula', phone: '(31) 93333-4444', status: 'Líder' }],
};

const initialMeetingsData: { [key: number]: CellMeeting[] } = {
    1: [
        { id: 1, date: '2024-07-25', totalPresent: 5, visitors: 1, studyTopic: 'O Fruto do Espírito', offering: 50.00 },
        { id: 2, date: '2024-07-18', totalPresent: 4, visitors: 0, studyTopic: 'A Armadura de Deus' },
        { id: 3, date: '2024-07-11', totalPresent: 4, visitors: 0, studyTopic: 'As Bem-Aventuranças' },
    ],
    2: [{ id: 4, date: '2024-07-26', totalPresent: 10, visitors: 3, studyTopic: 'Identidade em Cristo' }],
    3: [],
};

const Cells: React.FC = () => {
    const [cells, setCells] = useState<Cell[]>(initialCellsData);
    const [participants, setParticipants] = useState(initialParticipantsData);
    const [meetings, setMeetings] = useState(initialMeetingsData);

    const [isAddCellModalOpen, setIsAddCellModalOpen] = useState(false);
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
    const [cellToRegisterMeeting, setCellToRegisterMeeting] = useState<Cell | null>(null);

    const handleAddCell = (cellData: Omit<Cell, 'id'>) => {
        const newCell: Cell = {
            id: Date.now(),
            ...cellData,
        };
        setCells(prev => [...prev, newCell]);
        setIsAddCellModalOpen(false);
    };

    const handleUpdateCell = (cellId: number, updatedData: Omit<Cell, 'id'>) => {
        setCells(prev => prev.map(c => c.id === cellId ? { ...c, ...updatedData } : c));
        setSelectedCell(prev => prev ? { ...prev, ...updatedData } : null);
    };

    const handleAddParticipant = (cellId: number, participantData: Omit<CellParticipant, 'id'>) => {
        const newParticipant: CellParticipant = {
            id: Date.now(),
            ...participantData,
        };
        setParticipants(prev => ({
            ...prev,
            [cellId]: [...(prev[cellId] || []), newParticipant]
        }));
    };

    const handleRegisterMeeting = (cellId: number, meetingData: Omit<CellMeeting, 'id'>) => {
        const newMeeting: CellMeeting = {
            id: Date.now(),
            ...meetingData,
        };
        setMeetings(prev => {
            const sortedMeetings = [...(prev[cellId] || []), newMeeting]
                .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            return { ...prev, [cellId]: sortedMeetings };
        });
        setCellToRegisterMeeting(null);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Gerenciamento de Células</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Cadastre, visualize e acompanhe os pequenos grupos.</p>
                </div>
                <button 
                    onClick={() => setIsAddCellModalOpen(true)}
                    className="w-full sm:w-auto bg-primary-600 text-white px-4 py-2 rounded-lg shadow hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 font-semibold">
                    <PlusIcon className="w-5 h-5" />
                    Cadastrar Nova Célula
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cells.map(cell => (
                    <CellCard 
                        key={cell.id} 
                        cell={cell} 
                        onViewDetails={() => setSelectedCell(cell)}
                        onRegisterMeeting={() => setCellToRegisterMeeting(cell)}
                    />
                ))}
            </div>

            <AddCellModal 
                isOpen={isAddCellModalOpen}
                onClose={() => setIsAddCellModalOpen(false)}
                onAddCell={handleAddCell}
            />

            {selectedCell && (
                 <CellDetailsModal 
                    isOpen={!!selectedCell}
                    onClose={() => setSelectedCell(null)}
                    cell={selectedCell}
                    participants={participants[selectedCell.id] || []}
                    meetings={meetings[selectedCell.id] || []}
                    onAddParticipant={(participantData) => handleAddParticipant(selectedCell.id, participantData)}
                    onUpdateCell={(updatedData) => handleUpdateCell(selectedCell.id, updatedData)}
                />
            )}

            {cellToRegisterMeeting && (
                <RegisterMeetingModal
                    isOpen={!!cellToRegisterMeeting}
                    onClose={() => setCellToRegisterMeeting(null)}
                    onRegisterMeeting={(meetingData) => handleRegisterMeeting(cellToRegisterMeeting.id, meetingData)}
                />
            )}
        </div>
    );
};

export default Cells;
