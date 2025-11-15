function CategoryBadge({ categoria }) {
  const isProdutivo = categoria === "Produtivo";

  return (
    <div
      className={`inline-flex items-center gap-2 sm:gap-1.5 px-5 sm:px-4 py-2.5 sm:py-2 rounded-xl sm:rounded-lg font-semibold text-base sm:text-base ${
        isProdutivo
          ? "bg-green-100 text-green-800 border-2 border-green-200"
          : "bg-amber-100 text-amber-800 border-2 border-amber-200"
      }`}
    >
      {isProdutivo ? (
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
      {categoria}
    </div>
  );
}

export default CategoryBadge;
