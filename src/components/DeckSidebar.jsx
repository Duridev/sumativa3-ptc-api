export default function DeckSidebar({ deck, totalCards, clearDeck, onCardClick, onSave }) {
  const isFull = totalCards === 60;

  return (
    <div className="sticky top-24 bg-white border border-slate-200 rounded-xl p-5 shadow-lg shadow-slate-200/50 flex flex-col min-h-[300px] lg:min-h-[calc(100vh-8rem)] lg:max-h-[calc(100vh-8rem)]">
      
      {/* Header del Mazo */}
      <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center justify-between shrink-0">
        <span>Mazo Activo</span>
        <span className={`py-0.5 px-3 rounded-full text-xs font-bold border ${isFull ? 'bg-red-100 text-red-700 border-red-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}`}>
          {totalCards} / 60
        </span>
      </h2>
      
      {/* Grilla de Cartas del Mazo (Scrollable) */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pt-2 mb-4">
        {deck.length === 0 ? (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg p-6 bg-slate-50/50 h-full min-h-[200px]">
            <p className="text-slate-500 text-sm text-center font-medium">Tu mazo está vacío.</p>
            <p className="text-slate-400 text-xs text-center mt-2">Busca y añade cartas.</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-4 gap-2">
            {deck.map((card) => {
              const imageUrl = card.image 
                ? `${card.image}/low.png` 
                : 'https://via.placeholder.com/245x342.png?text=Sin+Imagen';

              return (
                <div 
                  key={card.id} 
                  onClick={() => onCardClick(card.id)}
                  className="relative group cursor-pointer transition-transform hover:scale-105"
                  title={`${card.name} (x${card.quantity})`}
                >
                  <img 
                    src={imageUrl} 
                    alt={card.name} 
                    className="w-full h-auto object-contain rounded drop-shadow-sm border border-slate-200"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/245x342.png?text=Error';
                    }}
                  />
                  {/* Badge de Cantidad (si es > 1) */}
                  {card.quantity > 1 && (
                    <div className="absolute -top-2 -right-2 bg-fuchsia-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10">
                      {card.quantity}
                    </div>
                  )}
                  {/* Overlay sutil al hover */}
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors rounded"></div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Acciones */}
      <div className="pt-4 border-t border-slate-100 space-y-3 shrink-0">
        <button 
          onClick={onSave}
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
