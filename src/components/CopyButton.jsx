import { useState, useRef, useEffect } from "react";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setCopied(true);
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null;
      }, 2000);
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      disabled={!text}
      className={`mt-4 flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer font-medium text-sm
        ${
          copied
            ? "text-green-600"
            : "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
        }`}
    >
      <svg
        className="w-5 h-5"
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
      {copied ? "Mensagem copiada!" : "Copiar resposta"}
    </button>
  );
}

export default CopyButton;