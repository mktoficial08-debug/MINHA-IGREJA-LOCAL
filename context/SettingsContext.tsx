import React, { createContext, useContext, useState, useEffect } from 'react';

// --- TYPE DEFINITIONS ---
interface ChurchInfo {
    name: string;
    address: string;
    phone: string;
    email: string;
    seniorPastor: string;
}

interface AppearanceSettings {
    theme: 'light' | 'dark' | 'system';
    primaryColor: 'blue' | 'green' | 'purple' | 'red' | 'orange';
}

interface Permissions {
    Membro: {
        viewOtherMembers: boolean;
        viewOwnCellGroup: boolean;
        viewDirectory: boolean;
    }
}

interface AppSettings {
    churchInfo: ChurchInfo;
    appearance: AppearanceSettings;
    permissions: Permissions;
}

// --- DEFAULT VALUES ---
const DEFAULT_SETTINGS: AppSettings = {
    churchInfo: {
        name: 'Minha Igreja',
        address: 'Av. Principal, 123, Centro',
        phone: '(11) 99999-9999',
        email: 'contato@minhaigreja.com',
        seniorPastor: 'Pr. Presidente'
    },
    appearance: {
        theme: 'system',
        primaryColor: 'blue',
    },
    permissions: {
        Membro: {
            viewOtherMembers: true,
            viewOwnCellGroup: true,
            viewDirectory: true,
        }
    }
};

// --- CONTEXT ---
interface SettingsContextType {
    settings: AppSettings;
    updateSettings: (newSettings: AppSettings) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// --- PROVIDER ---
export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<AppSettings>(() => {
        try {
            const storedSettings = localStorage.getItem('appSettings');
            if (storedSettings) {
                // Merge stored settings with defaults to avoid breakages if shape changes
                const parsed = JSON.parse(storedSettings);
                return {
                    churchInfo: { ...DEFAULT_SETTINGS.churchInfo, ...parsed.churchInfo },
                    appearance: { ...DEFAULT_SETTINGS.appearance, ...parsed.appearance },
                    permissions: { 
                        Membro: { ...DEFAULT_SETTINGS.permissions.Membro, ...parsed.permissions?.Membro }
                    },
                };
            }
        } catch (error) {
            console.error("Failed to parse settings from localStorage", error);
        }
        return DEFAULT_SETTINGS;
    });

    useEffect(() => {
        // Apply theme (light/dark)
        const root = window.document.documentElement;
        const isDark =
            settings.appearance.theme === 'dark' ||
            (settings.appearance.theme === 'system' &&
                window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        root.classList.toggle('dark', isDark);

        // Apply primary color
        root.setAttribute('data-color-theme', settings.appearance.primaryColor);
        
        // Save settings to localStorage on change
        try {
            localStorage.setItem('appSettings', JSON.stringify(settings));
        } catch (error) {
            console.error("Failed to save settings to localStorage", error);
        }
    }, [settings]);

    const updateSettings = (newSettings: AppSettings) => {
        setSettings(newSettings);
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

// --- HOOK ---
export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
