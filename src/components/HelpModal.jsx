function HelpModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md sm:w-full p-6 sm:p-6 animate-slide-up sm:animate-scale-in max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5 sm:mb-4">
          <h3 className="text-xl sm:text-xl font-bold text-slate-800">
            Como Usar
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
          >
            <svg
              className="w-6 h-6 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4 sm:space-y-3 text-slate-600">
          <div className="flex gap-3 sm:gap-2">
            <div className="flex-shrink-0 w-8 h-8 sm:w-7 sm:h-7 bg-blue-100 rounded-xl sm:rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm sm:text-sm">
              1
            </div>
            <div>
              <p className="font-medium text-slate-800 text-sm sm:text-sm">
                Escolha o modo
              </p>
              <p className="text-sm sm:text-xs text-slate-600 mt-0.5">
                Digite o texto ou faça upload de arquivo
              </p>
            </div>
          </div>

          <div className="flex gap-3 sm:gap-2">
            <div className="flex-shrink-0 w-8 h-8 sm:w-7 sm:h-7 bg-blue-100 rounded-xl sm:rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm sm:text-sm">
              2
            </div>
            <div>
              <p className="font-medium text-slate-800 text-sm sm:text-sm">
                Insira o email
              </p>
              <p className="text-sm sm:text-xs text-slate-600 mt-0.5">
                Cole ou digite o conteúdo do email
              </p>
            </div>
          </div>

          <div className="flex gap-3 sm:gap-2">
            <div className="flex-shrink-0 w-8 h-8 sm:w-7 sm:h-7 bg-blue-100 rounded-xl sm:rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm sm:text-sm">
              3
            </div>
            <div>
              <p className="font-medium text-slate-800 text-sm sm:text-sm">
                Classifique
              </p>
              <p className="text-sm sm:text-xs text-slate-600 mt-0.5">
                Clique em "Classificar Email"
              </p>
            </div>
          </div>

          <div className="flex gap-3 sm:gap-2">
            <div className="flex-shrink-0 w-8 h-8 sm:w-7 sm:h-7 bg-blue-100 rounded-xl sm:rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm sm:text-sm">
              4
            </div>
            <div>
              <p className="font-medium text-slate-800 text-sm sm:text-sm">
                Veja o resultado
              </p>
              <p className="text-sm sm:text-xs text-slate-600 mt-0.5">
                Categoria e resposta aparecem automaticamente
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 sm:mt-4 p-4 sm:p-3 bg-blue-50 rounded-xl sm:rounded-lg border border-blue-100">
          <p className="text-sm sm:text-xs text-blue-800">
            <strong>💡 Dica:</strong> Emails produtivos requerem ação. Emails
            improdutivos são apenas informativos.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HelpModal;
