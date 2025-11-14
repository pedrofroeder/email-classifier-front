import { useState, useRef, useEffect } from "react";

function App() {
  const [inputMode, setInputMode] = useState("text");
  const [emailText, setEmailText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

  const resultRef = useRef(null);
  const fileInputRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [result]);

  const handleClearResult = () => {
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleModeChange = (mode) => {
    setInputMode(mode);
    setEmailText("");
    setSelectedFile(null);
    setError(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["text/plain", "application/pdf"];
      if (!validTypes.includes(file.type)) {
        setError("Formato inválido. Use apenas .txt ou .pdf");
        setSelectedFile(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Arquivo muito grande. Máximo 5MB");
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setError(null);
    }
  };

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
      const validTypes = ["text/plain", "application/pdf"];
      if (!validTypes.includes(file.type)) {
        setError("Formato inválido. Use apenas .txt ou .pdf");
        setSelectedFile(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Arquivo muito grande. Máximo 5MB");
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleClassify = async () => {
    setError(null);
    setResult(null);

    if (inputMode === "text") {
      if (!emailText.trim()) {
        setError("Digite ou cole um email para classificar");
        return;
      }
      if (emailText.trim().length < 10) {
        setError("Email muito curto. Mínimo de 10 caracteres");
        return;
      }
    } else {
      if (!selectedFile) {
        setError("Selecione um arquivo para classificar");
        return;
      }
    }

    setLoading(true);

    try {
      const API_URL = "https://email-classifier-api-h7rv.onrender.com";

      if (inputMode === "file") {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await fetch(`${API_URL}/api/classify`, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Erro ao classificar email");
        }

        setResult(data);
      } else {
        const response = await fetch(`${API_URL}/api/classify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: emailText }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Erro ao classificar email");
        }

        setResult(data);
      }
    } catch (err) {
      setError(err.message || "Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && inputMode === "text") {
      e.preventDefault();
      handleClassify();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-6 sm:pb-0">
      <div className="max-w-3xl mx-auto px-4 sm:px-4 py-6 sm:py-6 lg:py-8">
        <div className="text-center mb-6 sm:mb-6 lg:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-blue-600 rounded-xl mb-3 sm:mb-3">
            <svg
              className="w-7 h-7 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-2 sm:mb-1">
            Classificador de Emails
          </h1>
          <p className="text-sm sm:text-sm text-slate-600 px-4">
            Classifique emails automaticamente com IA
          </p>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden">
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => handleModeChange("text")}
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
              onClick={() => handleModeChange("file")}
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

          <div className="p-5 sm:p-5 lg:p-6">
            {inputMode === "text" && (
              <div>
                <label className="block text-sm sm:text-sm font-medium text-slate-700 mb-2 sm:mb-2">
                  Cole ou digite o email abaixo:
                </label>
                <textarea
                  value={emailText}
                  onChange={(e) => setEmailText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ex: Olá, gostaria de saber o status do processo..."
                  className="w-full h-44 sm:h-36 lg:h-40 px-4 py-3 sm:px-3 sm:py-2 border-2 border-slate-200 rounded-xl sm:rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none text-sm sm:text-sm text-slate-700 placeholder:text-slate-400"
                />
                <div className="flex items-center justify-between mt-2 sm:mt-1">
                  <span className="text-xs text-slate-400">
                    {emailText.length} caracteres
                  </span>
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    Pressione Enter para enviar
                  </span>
                </div>
              </div>
            )}

            {inputMode === "file" && (
              <div>
                <label className="block text-sm sm:text-sm font-medium text-slate-700 mb-2 sm:mb-2">
                  Selecione um arquivo (.txt ou .pdf):
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.pdf"
                  onChange={handleFileSelect}
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
            )}

            {error && (
              <div className="mt-4 sm:mt-3 p-3.5 sm:p-3 bg-red-50 border border-red-200 rounded-xl sm:rounded-lg flex items-start gap-2.5 sm:gap-2">
                <svg
                  className="w-5 h-5 sm:w-4 sm:h-4 text-red-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-red-800 text-sm sm:text-sm">{error}</p>
              </div>
            )}

            <div className="mt-5 sm:mt-4">
              <button
                onClick={handleClassify}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold py-3.5 sm:py-3 px-4 rounded-xl sm:rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 disabled:shadow-none cursor-pointer disabled:cursor-not-allowed text-base sm:text-sm"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 sm:h-4 sm:w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Classificando...
                  </>
                ) : (
                  <>
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
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                    Classificar Email
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {result && (
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
                  onClick={handleClearResult}
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
                <div
                  className={`inline-flex items-center gap-2 sm:gap-1.5 px-5 sm:px-4 py-2.5 sm:py-2 rounded-xl sm:rounded-lg font-semibold text-base sm:text-base ${
                    result.categoria === "Produtivo"
                      ? "bg-green-100 text-green-800 border-2 border-green-200"
                      : "bg-amber-100 text-amber-800 border-2 border-amber-200"
                  }`}
                >
                  {result.categoria === "Produtivo" ? (
                    <svg
                      className="w-5 h-5 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                  {result.categoria}
                </div>
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

              <button
                onClick={() => {
                  navigator.clipboard.writeText(result.resposta_sugerida);
                  alert("Resposta copiada!");
                }}
                className="mt-4 sm:mt-3 flex items-center gap-2 sm:gap-1.5 px-4 py-2.5 sm:py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl sm:rounded-lg transition-all cursor-pointer font-medium text-sm sm:text-sm"
              >
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
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copiar Resposta
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setShowHelp(!showHelp)}
          className="fixed bottom-5 right-5 sm:bottom-4 sm:right-4 w-14 h-14 sm:w-12 sm:h-12 bg-slate-800 hover:bg-slate-700 text-white rounded-full shadow-xl flex items-center justify-center transition-all cursor-pointer hover:scale-105 z-50"
          title="Como usar"
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
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>

        {showHelp && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50 animate-fade-in"
            onClick={() => setShowHelp(false)}
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
                  onClick={() => setShowHelp(false)}
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
                  <strong>💡 Dica:</strong> Emails produtivos requerem ação.
                  Emails improdutivos são apenas informativos.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
