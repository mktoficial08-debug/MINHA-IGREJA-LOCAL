import React from 'react';

interface CallToActionProps {
    onNavigateToAuth: () => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ onNavigateToAuth }) => {
  return (
    <section className="bg-primary-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Pronto para transformar a gestão da sua igreja?
          </h2>
          <p className="text-lg text-primary-200 mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de igrejas que já estão otimizando seu tempo e focando em suas comunidades.
          </p>
          <button
            onClick={onNavigateToAuth}
            className="bg-white text-primary-600 px-8 py-4 rounded-lg shadow-lg hover:bg-gray-100 transition-transform hover:scale-105 font-semibold text-lg"
          >
            Comece seu teste grátis
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;