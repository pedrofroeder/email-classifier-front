import { useState } from "react";

export function FileUpload({ selectedFile, onFileSelect, fileInputRef }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div>
      <label className="block text-sm sm:text-sm font-medium text-slate-700 mb-2 sm:mb-2">
        Selecione um arquivo (.txt ou .pdf):
      </label>

      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.pdf"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) onFileSelect(file);
        }}
        className="hidden"
        id="file-upload"
      />

      <label
        htmlFor="file-upload"
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center w-full h-44 sm:h-36 lg:h-40 border-2 border-dashed rounded-xl sm:rounded-lg transition-all cursor-pointer group ${
          isDragging
            ? "border-blue-500 bg-blue-50 scale-[1.01]"
            : "border-slate-300 hover:border-blue-400 hover:bg-blue-50/50"
        }`}
      >
        {!selectedFile ? (
          <>
            <svg
              className="w-12 h-12 sm:w-10 sm:h-10 text-slate-400 group-hover:text-blue-500 transition-colors mb-3 sm:mb-2"
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
            <span className="text-sm sm:text-sm text-slate-600 font-medium mb-1 sm:mb-0.5">
              Clique para selecionar
            </span>
            <span className="text-sm sm:text-xs text-slate-400 px-4 text-center">
              Ou arraste o arquivo aqui
            </span>
            <span className="text-xs text-slate-400 mt-2 sm:mt-1.5">
              Máximo 5MB • .txt ou .pdf
            </span>
          </>
        ) : (
          <div className="text-center px-4">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-12 sm:h-12 bg-blue-100 rounded-xl sm:rounded-lg mb-3 sm:mb-2">
              <svg
                className="w-7 h-7 sm:w-6 sm:h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-sm sm:text-sm text-slate-700 font-medium break-all">
              {selectedFile.name}
            </p>
            <p className="text-sm sm:text-xs text-slate-500 mt-1 sm:mt-0.5">
              {(selectedFile.size / 1024).toFixed(1)} KB
            </p>
            <p className="text-sm sm:text-xs text-blue-600 mt-2 sm:mt-1.5">
              Clique para trocar
            </p>
          </div>
        )}
      </label>
    </div>
  );
}

