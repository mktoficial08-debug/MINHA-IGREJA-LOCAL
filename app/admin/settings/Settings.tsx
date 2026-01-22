import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useSettings } from '../../../context/SettingsContext';
import BuildingIcon from '../../../components/ui/icons/BuildingIcon';
import PaletteIcon from '../../../components/ui/icons/PaletteIcon';
import ShieldCheckIcon from '../../../components/ui/icons/ShieldCheckIcon';
import PlusIcon from '../../../components/ui/icons/PlusIcon';
import UserCheckIcon from '../../../components/ui/icons/UserCheckIcon';
import SettingsIcon from '../../../components/ui/icons/SettingsIcon';

type SettingsTab = 'geral' | 'aparencia' | 'permissoes';

const Settings: React.FC = () => {
    const { currentUser } = useAuth();
    const { settings, updateSettings } = useSettings();

    const [activeTab, setActiveTab] = useState<SettingsTab>('geral');
    const [draftSettings, setDraftSettings] = useState(settings);
    const [isDirty, setIsDirty] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // When global settings change (e.g., from another browser tab), update the draft if it's not dirty
    useEffect(() => {
        if (!isDirty) {
            setDraftSettings(settings);
        }
    }, [settings, isDirty]);

    // Check for changes between draft and saved settings
    useEffect(() => {
        const hasChanges = JSON.stringify(draftSettings) !== JSON.stringify(settings);
        setIsDirty(hasChanges);
    }, [draftSettings, settings]);

    const handleSaveAll = () => {
        updateSettings(draftSettings);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handlePermissionChange = (role: keyof typeof draftSettings.permissions, key: keyof typeof draftSettings.permissions['Membro']) => {
        setDraftSettings(prev => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [role]: {
                    ...prev.permissions[role],
                    [key]: !prev.permissions[role][key]
                }
            }
        }));
    };

    const handleChurchInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDraftSettings(prev => ({
            ...prev,
            churchInfo: { ...prev.churchInfo, [name]: value }
        }));
    };

    const handleAppearanceChange = (key: keyof typeof draftSettings.appearance, value: string) => {
         setDraftSettings(prev => ({
            ...prev,
            appearance: { ...prev.appearance, [key]: value }
        }));
    }
    
    const colors = [
        { name: 'blue', class: 'bg-blue-500' },
        { name: 'green', class: 'bg-green-500' },
        { name: 'purple', class: 'bg-purple-500' },
        { name: 'red', class: 'bg-red-500' },
        { name: 'orange', class: 'bg-orange-500' }
    ];

    const TabButton: React.FC<{ tab: SettingsTab, icon: React.ReactNode, label: string }> = ({ tab, icon, label }) => (
        <button onClick={() => setActiveTab(tab)} className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md ${activeTab === tab ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-600' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
            {icon} {label}
        </button>
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Configurações</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Gerencie as configurações gerais da sua igreja.</p>
                </div>
                <div className="flex items-center gap-2">
                     {showSuccess && <div className="text-sm text-green-600">Alterações salvas com sucesso!</div>}
                    <button onClick={handleSaveAll} disabled={!isDirty} className="bg-primary-600 text-white px-4 py-2 rounded-lg shadow hover:bg-primary-700 disabled:bg-primary-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed font-semibold transition-colors">
                        Salvar Alterações
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-700">
                <TabButton tab="geral" icon={<SettingsIcon className="w-5 h-5"/>} label="Geral" />
                <TabButton tab="aparencia" icon={<PaletteIcon className="w-5 h-5"/>} label="Aparência" />
                <TabButton tab="permissoes" icon={<UserCheckIcon className="w-5 h-5"/>} label="Permissões" />
            </div>

            {/* GERAL TAB */}
            {activeTab === 'geral' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4">
                            <BuildingIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                            Perfil da Igreja
                        </h2>
                        <div className="space-y-4">
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                               <div><label className="text-sm font-medium text-gray-500">Nome da Igreja</label><input type="text" name="name" value={draftSettings.churchInfo.name} onChange={handleChurchInfoChange} className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3"/></div>
                               <div><label className="text-sm font-medium text-gray-500">Pastor Presidente</label><input type="text" name="seniorPastor" value={draftSettings.churchInfo.seniorPastor} onChange={handleChurchInfoChange} className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3"/></div>
                           </div>
                            <div><label className="text-sm font-medium text-gray-500">Endereço</label><input type="text" name="address" value={draftSettings.churchInfo.address} onChange={handleChurchInfoChange} className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3"/></div>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                               <div><label className="text-sm font-medium text-gray-500">Telefone</label><input type="tel" name="phone" value={draftSettings.churchInfo.phone} onChange={handleChurchInfoChange} className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3"/></div>
                               <div><label className="text-sm font-medium text-gray-500">E-mail de Contato</label><input type="email" name="email" value={draftSettings.churchInfo.email} onChange={handleChurchInfoChange} className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3"/></div>
                           </div>
                        </div>
                    </div>
                     <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                         <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4">
                            <ShieldCheckIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                            Gestão de Usuários
                        </h2>
                        <div className="space-y-3">
                            {currentUser && (
                                <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                                    <div className="flex items-center gap-2">
                                        <img src={currentUser.photo} alt={currentUser.name} className="w-8 h-8 rounded-full" />
                                        <div><p className="font-semibold text-sm">{currentUser.name}</p><p className="text-xs text-gray-500">{currentUser.email}</p></div>
                                    </div>
                                    <span className="text-xs font-bold text-primary-600 dark:text-primary-400">Admin</span>
                                </div>
                            )}
                        </div>
                         <button className="w-full mt-4 bg-primary-600 text-white px-4 py-2.5 rounded-lg shadow hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 font-semibold text-sm">
                            <PlusIcon className="w-4 h-4" /> Convidar Administrador
                        </button>
                    </div>
                </div>
            )}

             {/* APARÊNCIA TAB */}
            {activeTab === 'aparencia' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 max-w-md">
                     <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4">
                        <PaletteIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                        Aparência do Sistema
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Tema</label>
                            <div className="flex gap-2 mt-2">
                                {['Claro', 'Escuro', 'Sistema'].map(t => (
                                    <button key={t} onClick={() => handleAppearanceChange('theme', t.toLowerCase())} className={`flex-1 py-2 text-sm rounded-md ${draftSettings.appearance.theme === t.toLowerCase() ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                                        {t.charAt(0).toUpperCase() + t.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Cor Principal</label>
                             <div className="flex gap-3 mt-2">
                                 {colors.map(color => (
                                     <button key={color.name} onClick={() => handleAppearanceChange('primaryColor', color.name)} className={`w-8 h-8 rounded-full ${color.class} transition-transform hover:scale-110 ${draftSettings.appearance.primaryColor === color.name ? 'ring-2 ring-offset-2 dark:ring-offset-gray-800 ring-primary-500' : ''}`} />
                                 ))}
                             </div>
                        </div>
                    </div>
                </div>
            )}

            {/* PERMISSÕES TAB */}
            {activeTab === 'permissoes' && (
                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 max-w-2xl">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4">
                        <UserCheckIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                        Permissões para Membros
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Controle o que os usuários com o cargo "Membro" podem ver e fazer no Portal do Membro.</p>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                           <div>
                             <label htmlFor="viewOtherMembers" className="font-medium text-gray-800 dark:text-gray-200">Ver lista de outros membros</label>
                             <p className="text-xs text-gray-500 dark:text-gray-400">Permite que membros vejam um diretório com nomes e fotos de outros membros.</p>
                           </div>
                           <input type="checkbox" id="viewOtherMembers" checked={draftSettings.permissions.Membro.viewOtherMembers} onChange={() => handlePermissionChange('Membro', 'viewOtherMembers')} className="h-5 w-5 rounded text-primary-600 focus:ring-primary-500 cursor-pointer" />
                        </div>
                         <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                           <div>
                             <label htmlFor="viewOwnCellGroup" className="font-medium text-gray-800 dark:text-gray-200">Ver detalhes da própria célula</label>
                             <p className="text-xs text-gray-500 dark:text-gray-400">Permite que membros vejam informações sobre a célula que participam.</p>
                           </div>
                           <input type="checkbox" id="viewOwnCellGroup" checked={draftSettings.permissions.Membro.viewOwnCellGroup} onChange={() => handlePermissionChange('Membro', 'viewOwnCellGroup')} className="h-5 w-5 rounded text-primary-600 focus:ring-primary-500 cursor-pointer" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                           <div>
                             <label htmlFor="viewDirectory" className="font-medium text-gray-800 dark:text-gray-200">Acessar o Guia da Igreja</label>
                             <p className="text-xs text-gray-500 dark:text-gray-400">Permite o acesso a contatos úteis da liderança e departamentos.</p>
                           </div>
                           <input type="checkbox" id="viewDirectory" checked={draftSettings.permissions.Membro.viewDirectory} onChange={() => handlePermissionChange('Membro', 'viewDirectory')} className="h-5 w-5 rounded text-primary-600 focus:ring-primary-500 cursor-pointer" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;