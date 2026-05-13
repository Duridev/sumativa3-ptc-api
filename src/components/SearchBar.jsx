import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  // Función básica de sanitización para prevenir XSS simple
  const sanitizeInput = (input) => {
    return input.replace(/[<>]/g, '').trim();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanQuery = sanitizeInput(inputValue);
    onSearch(cleanQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-sm w-full">
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Buscar Pokémon por nombre..."
          className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 sm:text-sm transition-colors"
        />
      </div>
      <button
        type="submit"
        className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-sm"
      >
        Buscar
      </button>
    </form>
  );
}
