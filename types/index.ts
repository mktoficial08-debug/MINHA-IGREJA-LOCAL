export interface User {
    id: number;
    email: string;
    name: string;
    photo: string;
    role: 'Admin' | 'User';
}

export interface Role {
  id: number;
  name: string;
}

export interface Member {
    id: number;
    name: string;
    photo: string;
    roleId: number;
    status: 'Ativo' | 'Inativo';
}

export interface Cell {
    id: number;
    name: string;
    leader: string;
    address: string;
    dayOfWeek: string;
    time: string;
    network: 'Jovens' | 'Casais' | 'Crianças' | 'Geral';
    multiplicationTargetDate?: string;
}

export interface CellParticipant {
    id: number;
    name: string;
    phone: string;
    status: 'Líder' | 'Auxiliar' | 'Membro' | 'Visitante';
}

export interface CellMeeting {
    id: number;
    date: string;
    totalPresent: number;
    visitors: number;
    studyTopic: string;
    offering?: number;
}

export interface Event {
    id: number;
    name: string;
    date: string; // ISO string format
    location: string;
    description: string;
    imageUrl: string;
}


export type ViewName = 'Dashboard' | 'Membros' | 'Financeiro' | 'Células' | 'Eventos' | 'Visitantes' | 'Configurações';
