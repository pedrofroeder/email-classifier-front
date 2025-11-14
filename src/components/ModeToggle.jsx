export function ModeToggle({ inputMode, onModeChange }) {
  return (
    <div className="flex border-b border-slate-200">
      <button
        onClick={() => onModeChange("text")}
        className={`flex-1 px-4 sm:px-4 py-3.5 sm:py-3 font-medium transition-all text-sm sm:text-sm ${
          inputMode === "text"
            ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
            : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
        }`}
      >
        <div className="flex items-center justify-center gap-2 sm:gap-1.5">
          <svg
            className="w-5 h-5 sm:w-4 sm:h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <span>Texto</span>
        </div>
      </button>
      <button
        onClick={() => onModeChange("file")}
        className={`flex-1 px-4 sm:px-4 py-3.5 sm:py-3 font-medium transition-all text-sm sm:text-sm ${
          inputMode === "file"
            ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
            : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
        }`}
      >
        <div className="flex items-center justify-center gap-2 sm:gap-1.5">
          <svg
            className="w-5 h-5 sm:w-4 sm:h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <span>Arquivo</span>
        </div>
      </button>
    </div>
  );
}
