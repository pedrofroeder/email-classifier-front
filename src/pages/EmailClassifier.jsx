import { useState, useRef } from "react";
import ModeToggle from "../components/ModeToggle";
import TextInput from "../components/TextInput";
import FileUpload from "../components/FileUpload";
import ErrorMessage from "../components/ErrorMessage";
import ClassifyButton from "../components/ClassifyButton";
import ResultCard from "../components/ResultCard";
import HelpButton from "../components/HelpButton";
import HelpModal from "../components/HelpModal";

function EmailClassifier() {
  const [inputMode, setInputMode] = useState("text");
  const [emailText, setEmailText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

  const fileInputRef = useRef(null);

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

  const handleFileSelect = (file) => {
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
          <ModeToggle inputMode={inputMode} onModeChange={handleModeChange} />

          <div className="p-5 sm:p-5 lg:p-6">
            {inputMode === "text" ? (
              <TextInput
                value={emailText}
                onChange={(e) => setEmailText(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <FileUpload
                selectedFile={selectedFile}
                onFileSelect={handleFileSelect}
                fileInputRef={fileInputRef}
              />
            )}

            <ErrorMessage message={error} />

            <div className="mt-5 sm:mt-4">
              <ClassifyButton loading={loading} onClick={handleClassify} />
            </div>
          </div>
        </div>
        <ResultCard result={result} onClear={handleClearResult} />
        <HelpButton onClick={() => setShowHelp(true)} />
        <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
      </div>
    </div>
  );
}

export default EmailClassifier;