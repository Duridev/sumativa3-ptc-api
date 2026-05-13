export default function CardGrid({ 
  cards, 
  loading, 
  error, 
  currentPage, 
  totalPages, 
  onNextPage, 
  onPrevPage,
  totalResults
}) {
  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl flex-1 p-6 flex flex-col items-center justify-center min-h-[400px] shadow-sm">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-600 mb-4"></div>
        <p className="text-slate-500 font-medium animate-pulse">Cargando cartas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl flex-1 p-6 flex flex-col items-center justify-center min-h-[400px] shadow-sm">
        <svg className="w-12 h-12 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="text-red-700 font-bold text-lg mb-2">Error</p>
        <p className="text-red-600 text-center max-w-md">{error}</p>
      </div>
    );
  }

  if (!cards || cards.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl flex-1 p-6 flex flex-col items-center justify-center min-h-[400px] shadow-sm">
        <div className="w-16 h-16 mb-4 rounded-full bg-slate-50 flex items-center justify-center">
          <svg className="w-8 h-8 text-fuchsia-500 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <p className="text-slate-800 text-lg font-bold">No se encontraron cartas</p>
        <p className="text-slate-500 text-sm mt-2 text-center max-w-sm">Intenta buscar con otro término.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/50 border border-slate-200 rounded-xl flex-1 flex flex-col shadow-sm overflow-hidden">
      
      {/* Header Info */}
      <div className="px-6 py-3 border-b border-slate-200 bg-white flex justify-between items-center">
        <p className="text-sm text-slate-500 font-medium">
          Resultados: <span className="text-slate-800 font-bold">{totalResults}</span> cartas encontradas
        </p>
        <p className="text-sm text-slate-500 font-medium">
          Página <span className="text-fuchsia-600 font-bold">{currentPage}</span> de <span className="text-slate-800 font-bold">{totalPages}</span>
        </p>
      </div>

      {/* Grid */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {cards.map((card) => {
            const imageUrl = card.image 
              ? `${card.image}/low.png` 
              : 'https://via.placeholder.com/245x342.png?text=Sin+Imagen';

            return (
              <div 
                key={card.id} 
                className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer group flex flex-col"
              >
                <div className="relative aspect-[63/88] w-full bg-slate-100 p-2 flex items-center justify-center">
                  <img 
                    src={imageUrl} 
                    alt={card.name} 
                    className="w-full h-full object-contain drop-shadow-sm group-hover:drop-shadow-md transition-all"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/245x342.png?text=Error+Imagen';
                    }}
                  />
                </div>
                <div className="p-3 text-center border-t border-slate-100 flex-1 flex items-center justify-center">
                  <p className="text-slate-800 font-medium text-sm line-clamp-2">{card.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="px-6 py-4 border-t border-slate-200 bg-white flex items-center justify-between">
        <button
          onClick={onPrevPage}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            currentPage === 1 
              ? 'text-slate-400 bg-slate-100 cursor-not-allowed' 
              : 'text-fuchsia-600 bg-fuchsia-50 hover:bg-fuchsia-100 border border-fuchsia-200'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Anterior
        </button>
        
        <div className="flex gap-1 hidden sm:flex">
          {/* Opcional: Podrías renderizar números de página aquí si quisieras */}
          <span className="px-3 py-1 bg-slate-100 rounded-md text-sm font-medium text-slate-600 border border-slate-200">
            {currentPage} / {totalPages}
          </span>
        </div>

        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            currentPage === totalPages 
              ? 'text-slate-400 bg-slate-100 cursor-not-allowed' 
              : 'text-fuchsia-600 bg-fuchsia-50 hover:bg-fuchsia-100 border border-fuchsia-200'
          }`}
        >
          Siguiente
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

    </div>
  );
}
