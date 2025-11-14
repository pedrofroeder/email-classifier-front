export function ErrorMessage({ message }) {
  if (!message) return null;

  return (
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
      <p className="text-red-800 text-sm sm:text-sm">{message}</p>
    </div>
  );
}