import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';

// Mock Data
type UserWithPassword = User & { password?: string };

const MOCK_USERS: UserWithPassword[] = [
    { id: 1, email: 'admin@igreja.com', name: 'Pr. João Silva', photo: 'https://picsum.photos/seed/user/40/40', role: 'Admin', password: 'password123' },
    { id: 4, email: 'membro@igreja.com', name: 'Ana Paula', photo: 'https://picsum.photos/seed/user4/40/40', role: 'User', password: 'password123' },
];

interface AuthContextType {
    currentUser: User | null;
    login: (email: string, pass: string) => Promise<User | null>;
    logout: () => void;
    register: (email: string, pass: string, name: string) => Promise<'success' | 'email_exists'>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(() => {
        try {
            const userJson = localStorage.getItem('currentUser');
            return userJson ? JSON.parse(userJson) : null;
        } catch {
            return null;
        }
    });

    const [registeredUsers, setRegisteredUsers] = useState<UserWithPassword[]>(() => {
        try {
            const usersJson = localStorage.getItem('registeredUsers');
            const storedUsers: UserWithPassword[] = usersJson ? JSON.parse(usersJson) : [];
            
            const usersMap = new Map<string, UserWithPassword>();
            if (Array.isArray(storedUsers)) {
                for (const user of storedUsers) {
                    if (user && user.email) {
                        usersMap.set(user.email.toLowerCase(), user);
                    }
                }
            }
            for (const mockUser of MOCK_USERS) {
                usersMap.set(mockUser.email.toLowerCase(), mockUser);
            }
            return Array.from(usersMap.values());
        } catch {
            return MOCK_USERS;
        }
    });

    useEffect(() => {
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    }, [registeredUsers]);

    const login = async (email: string, pass: string): Promise<User | null> => {
        const trimmedEmail = email.trim().toLowerCase();

        // --- Definitive Fix ---
        // First, always check against the pristine MOCK_USERS array.
        // This ensures the demo accounts can never be corrupted by localStorage issues.
        const mockUser = MOCK_USERS.find(
            (u) => u.email.toLowerCase() === trimmedEmail && u.password === pass
        );

        if (mockUser) {
            const { password, ...userToStore } = mockUser;
            setCurrentUser(userToStore);
            localStorage.setItem('currentUser', JSON.stringify(userToStore));
            return userToStore;
        }

        // If it's not a demo account, check against the other registered users from state.
        const user = registeredUsers.find(
            (u) => u.email.toLowerCase() === trimmedEmail && u.password === pass
        );

        if (user) {
            const { password, ...userToStore } = user;
            setCurrentUser(userToStore);
            localStorage.setItem('currentUser', JSON.stringify(userToStore));
            return userToStore;
        }

        return null;
    };

    const register = async (email: string, pass: string, name: string) => {
        const trimmedEmail = email.trim().toLowerCase();
        if (registeredUsers.some((u) => u.email.toLowerCase() === trimmedEmail)) {
            return 'email_exists';
        }
        const newUser: UserWithPassword = {
            id: Date.now(),
            email: trimmedEmail,
            password: pass,
            name,
            photo: `https://picsum.photos/seed/user${Date.now()}/40/40`,
            role: 'User',
        };
        setRegisteredUsers([...registeredUsers, newUser]);
        return 'success';
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    };

    const value = { currentUser, login, logout, register };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
