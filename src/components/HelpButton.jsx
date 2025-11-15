function HelpButton({ onClick }) {
  return (
    <button
      onClick={onClick}
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
  );
}

export default HelpButton;
