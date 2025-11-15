import { useRef, useEffect } from "react";
import CategoryBadge from "./CategoryBadge";
import CopyButton from "./CopyButton";

function ResultCard({ result, onClear }) {
  const resultRef = useRef(null);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [result]);

  if (!result) return null;

  return (
    <div
      ref={resultRef}
      className="mt-5 sm:mt-5 bg-white rounded-2xl sm:rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden animate-fade-in"
    >
      <div className="p-5 sm:p-5 lg:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-4">
          <h2 className="text-lg sm:text-lg lg:text-xl font-bold text-slate-800 flex items-center gap-2 sm:gap-2">
            <svg
              className="w-6 h-6 sm:w-6 sm:h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Resultado
          </h2>

          <button
            onClick={onClear}
            className="flex items-center gap-1.5 px-3 sm:px-2.5 py-2 sm:py-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all cursor-pointer text-sm sm:text-xs"
            title="Limpar resultado"
          >
            Limpar
          </button>
        </div>

        <div className="mb-4 sm:mb-4">
          <label className="block text-sm sm:text-xs font-medium text-slate-600 mb-2 sm:mb-1.5">
            Categoria
          </label>
          <CategoryBadge categoria={result.categoria} />
        </div>

        <div>
          <label className="block text-sm sm:text-xs font-medium text-slate-600 mb-2 sm:mb-1.5">
            Resposta Sugerida
          </label>
          <div className="bg-slate-50 border-2 border-slate-200 rounded-xl sm:rounded-lg p-4 sm:p-3 lg:p-4">
            <p className="text-sm sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
              {result.resposta_sugerida}
            </p>
          </div>
        </div>

        <CopyButton text={result.resposta_sugerida} />
      </div>
    </div>
  );
}

export default ResultCard;
