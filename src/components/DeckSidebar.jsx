export default function DeckSidebar({ deck, totalCards, updateQuantity, removeCard, clearDeck }) {
  const isFull = totalCards === 60;

  return (
    <div className="sticky top-24 bg-white border border-slate-200 rounded-xl p-5 shadow-lg shadow-slate-200/50 flex flex-col min-h-[300px] lg:min-h-[calc(100vh-8rem)]">
      
      {/* Header del Mazo */}
      <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
        <span>Mazo Activo</span>
        <span className={`py-0.5 px-3 rounded-full text-xs font-bold border ${isFull ? 'bg-red-100 text-red-700 border-red-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}`}>
          {totalCards} / 60
        </span>
      </h2>
      
      {/* Lista de Cartas del Mazo */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 mb-4">
        {deck.length === 0 ? (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg p-6 bg-slate-50/50 h-full">
            <p className="text-slate-500 text-sm text-center font-medium">Tu mazo está vacío.</p>
            <p className="text-slate-400 text-xs text-center mt-2">Busca y añade cartas.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {deck.map((card) => (
              <li key={card.id} className="flex flex-col gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                
                {/* Nombre e info */}
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-semibold text-slate-800 line-clamp-2 leading-tight">
                    {card.name}
                  </span>
                  {/* Botón Eliminar Carta */}
                  <button 
                    onClick={() => removeCard(card.id)}
                    className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors"
                    title="Eliminar carta"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {/* Controles de Cantidad */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Cantidad:</span>
                  <div className="flex items-center bg-white border border-slate-200 rounded-md">
                    <button 
                      onClick={() => updateQuantity(card.id, -1)}
                      className="px-2 py-1 text-slate-600 hover:bg-slate-100 hover:text-fuchsia-600 transition-colors rounded-l-md font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-sm font-bold text-slate-800 min-w-[2rem] text-center border-x border-slate-200 bg-slate-50">
                      {card.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(card.id, 1)}
                      className="px-2 py-1 text-slate-600 hover:bg-slate-100 hover:text-fuchsia-600 transition-colors rounded-r-md font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Acciones */}
      <div className="pt-4 border-t border-slate-100 space-y-3 mt-auto">
        <button 
          disabled={deck.length === 0}
          className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors shadow-md shadow-fuchsia-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Guardar Mazo
        </button>
        <button 
          onClick={clearDeck}
          disabled={deck.length === 0}
          className="w-full bg-white border-2 border-yellow-400 hover:bg-yellow-50 text-yellow-600 font-bold py-2 px-4 rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-400 disabled:hover:bg-white"
        >
          Limpiar
        </button>
      </div>
    </div>
  );
}
