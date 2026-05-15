import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CardGrid from './components/CardGrid';
import DeckSidebar from './components/DeckSidebar';
import CardModal from './components/CardModal';
import ToastContainer from './components/ToastContainer';
import { fetchCards } from './services/api';
import { useDeck } from './hooks/useDeck';

export default function App() {
  const [allCards, setAllCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);
  
  // Sistema de Notificaciones (Toasts)
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };
  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;

  // Hook del Mazo (Lógica de Negocio y LocalStorage) con inyección de Toasts
  const { deck, totalCards, addCard, updateQuantity, removeCard, clearDeck } = useDeck(addToast);

  // Cargar cartas iniciales al montar el componente
  useEffect(() => {
    handleSearch('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setCurrentPage(1);
    try {
      const data = await fetchCards(query);
      setAllCards(data);
      if (query && data.length === 0) {
        addToast(`No se encontraron resultados para "${query}".`, 'warning');
      }
    } catch (err) {
      setError(err.message);
      setAllCards([]);
      addToast('Error al conectar con el servidor de TCGdex.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Cálculo de paginación
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = allCards.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(allCards.length / cardsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleSaveDeck = () => {
    addToast('Mazo guardado correctamente en tu navegador.', 'success');
  };

  return (
    <div className="flex flex-col min-h-screen lg:h-screen lg:overflow-hidden bg-slate-50 text-slate-900 font-sans">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Header Minimalista con acento Magenta */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur px-4 py-4 sm:px-6 lg:px-8 border-b border-slate-200 shadow-sm shadow-slate-200 shrink-0">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-fuchsia-600 flex items-center gap-2">
            <span className="text-yellow-500">⚡</span> Pokémon Deck Builder
          </h1>
          <div className="text-sm font-medium text-slate-500">
            v1.0
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 min-h-0 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        
        {/* Central Area: Buscador y Grilla de Cartas */}
        {/* En móvil aparece primero (arriba), en desktop a la izquierda */}
        <section className="flex-1 flex flex-col gap-6 min-h-0 order-1">
          <SearchBar onSearch={handleSearch} />
          <CardGrid 
            cards={currentCards} 
            loading={loading} 
            error={error} 
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
            totalResults={allCards.length}
            addCard={addCard}
            onCardClick={setSelectedCardId}
          />
        </section>

        {/* Sidebar/Bottom Area: Mazo Activo */}
        {/* En móvil aparece segundo (abajo), en desktop a la derecha */}
        <aside className="w-full lg:w-80 xl:w-96 flex flex-col order-2">
          <DeckSidebar 
            deck={deck} 
            totalCards={totalCards} 
            updateQuantity={updateQuantity} 
            removeCard={removeCard} 
            clearDeck={clearDeck}
            onCardClick={setSelectedCardId} 
            onSave={handleSaveDeck}
          />
        </aside>

      </main>

      {/* Modal de Detalles de Carta */}
      {selectedCardId && (
        <CardModal 
          cardId={selectedCardId} 
          onClose={() => setSelectedCardId(null)} 
          deck={deck}
          addCard={addCard}
          updateQuantity={updateQuantity}
          removeCard={removeCard}
        />
      )}
    </div>
  );
}
