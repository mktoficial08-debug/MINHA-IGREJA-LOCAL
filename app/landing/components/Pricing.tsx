import React, { useState } from 'react';
import CheckCircleIcon from './CheckCircleIcon';

interface PricingProps {
    onNavigateToAuth: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onNavigateToAuth }) => {
    const [isAnnual, setIsAnnual] = useState(false);

    const plans = [
        {
            name: 'Crescer',
            price: { monthly: 49, annual: 490 },
            description: 'Perfeito para igrejas pequenas e em início de jornada.',
            features: [
                'Até 100 membros ativos',
                'Gestão de Membros',
                'Controle de Visitantes',
                'Agenda de Eventos',
            ],
            isPopular: false,
        },
        {
            name: 'Edificar',
            price: { monthly: 99, annual: 990 },
            description: 'Para igrejas em crescimento que precisam de mais ferramentas.',
            features: [
                'Até 500 membros ativos',
                'Tudo do plano Crescer',
                'Gestão de Células',
                'Portal do Membro',
            ],
            isPopular: true,
        },
        {
            name: 'Impactar',
            price: { monthly: 199, annual: 1990 },
            description: 'A solução completa para igrejas grandes e consolidadas.',
            features: [
                'Membros ilimitados',
                'Tudo do plano Edificar',
                'Controle Financeiro Completo',
                'Suporte Prioritário',
            ],
            isPopular: false,
        },
    ];

    return (
        <section id="pricing" className="py-20 md:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-100">Planos flexíveis para cada fase da sua igreja</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
                        Escolha o plano que melhor se adapta à sua realidade. Sem taxas de instalação ou contratos de fidelidade.
                    </p>
                </div>

                {/* Monthly/Annual Toggle */}
                <div className="flex justify-center items-center gap-4 mb-10">
                    <span className={`font-medium ${!isAnnual ? 'text-primary-600' : 'text-gray-500'}`}>Mensal</span>
                    <div className="relative inline-block w-12 h-7">
                        <input type="checkbox" id="pricing-toggle" className="absolute w-0 h-0 opacity-0" checked={isAnnual} onChange={() => setIsAnnual(!isAnnual)} />
                        <label htmlFor="pricing-toggle" className="block w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer">
                            <span className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${isAnnual ? 'translate-x-5' : 'translate-x-0'}`}></span>
                        </label>
                    </div>
                    <span className={`font-medium ${isAnnual ? 'text-primary-600' : 'text-gray-500'}`}>
                        Anual <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 rounded-full px-2 py-0.5 ml-1">Economize 2 meses</span>
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, index) => (
                        <div key={index} className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 flex flex-col ${plan.isPopular ? 'border-2 border-primary-500' : 'border border-gray-200 dark:border-gray-700'}`}>
                            {plan.isPopular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full">MAIS POPULAR</div>}
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{plan.name}</h3>
                            <p className="text-gray-500 dark:text-gray-400 mt-2 flex-grow">{plan.description}</p>
                            <div className="my-6">
                                <span className="text-5xl font-extrabold text-gray-800 dark:text-gray-100">
                                    R$ {isAnnual ? plan.price.annual / 12 : plan.price.monthly}
                                </span>
                                <span className="text-gray-500 dark:text-gray-400 font-medium">/mês</span>
                            </div>
                            <ul className="space-y-3">
                                {plan.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-center gap-3">
                                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8">
                                <button
                                    onClick={onNavigateToAuth}
                                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${plan.isPopular ? 'bg-primary-600 text-white shadow hover:bg-primary-700' : 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-900'}`}
                                >
                                    Escolher Plano
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;