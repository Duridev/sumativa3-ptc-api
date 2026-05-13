import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CardGrid from './components/CardGrid';
import DeckSidebar from './components/DeckSidebar';
import { fetchCards } from './services/api';
import { useDeck } from './hooks/useDeck';

export default function App() {
  const [allCards, setAllCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;

  // Hook del Mazo (Lógica de Negocio y LocalStorage)
  const { deck, totalCards, addCard, updateQuantity, removeCard, clearDeck } = useDeck();

  // Cargar cartas iniciales al montar el componente
  useEffect(() => {
    handleSearch('');
  }, []);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setCurrentPage(1); // Resetear página al buscar
    try {
      const data = await fetchCards(query);
      setAllCards(data);
    } catch (err) {
      setError(err.message);
      setAllCards([]);
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
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header Minimalista con acento Magenta */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur px-4 py-4 sm:px-6 lg:px-8 border-b border-slate-200 shadow-sm shadow-slate-200">
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
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        
        {/* Central Area: Buscador y Grilla de Cartas */}
        <section className="flex-1 flex flex-col gap-6 order-2 lg:order-1 min-h-0">
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
          />
        </section>

        {/* Sidebar/Bottom Area: Mazo Activo */}
        <aside className="w-full lg:w-80 xl:w-96 flex flex-col order-1 lg:order-2">
          <DeckSidebar 
            deck={deck} 
            totalCards={totalCards} 
            updateQuantity={updateQuantity} 
            removeCard={removeCard} 
            clearDeck={clearDeck} 
          />
        </aside>

      </main>
    </div>
  );
}
