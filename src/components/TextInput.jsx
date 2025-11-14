export function TextInput({ value, onChange, onKeyDown }) {
  return (
    <div>
      <label className="block text-sm sm:text-sm font-medium text-slate-700 mb-2 sm:mb-2">
        Cole ou digite o email abaixo:
      </label>
      <textarea
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Ex: Olá, gostaria de saber o status do processo..."
        className="w-full h-44 sm:h-36 lg:h-40 px-4 py-3 sm:px-3 sm:py-2 border-2 border-slate-200 rounded-xl sm:rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none text-sm sm:text-sm text-slate-700 placeholder:text-slate-400"
      />
      <div className="flex items-center justify-between mt-2 sm:mt-1">
        <span className="text-xs text-slate-400">
          {value.length} caracteres
        </span>
        <span className="text-xs text-slate-400 hidden sm:inline">
          Pressione Enter para enviar
        </span>
      </div>
    </div>
  );
}

