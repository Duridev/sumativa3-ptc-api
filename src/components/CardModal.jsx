import { useState, useEffect } from 'react';
import { fetchCardDetails } from '../services/api';

export default function CardModal({ cardId, onClose, deck, updateQuantity, removeCard }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Encontrar la carta en el mazo para ver su cantidad actual
  const cardInDeck = deck.find(c => c.id === cardId);
  const quantity = cardInDeck ? cardInDeck.quantity : 0;

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchCardDetails(cardId);
        setDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (cardId) loadDetails();
  }, [cardId]);

  if (!cardId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden relative">
        
        {/* Botón Cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-full transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-600 mb-4"></div>
            <p className="text-slate-500 font-medium">Cargando detalles...</p>
          </div>
        ) : error ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 min-h-[400px]">
            <p className="text-red-500 font-bold text-lg mb-2">Error al cargar la carta</p>
            <p className="text-slate-500">{error}</p>
          </div>
        ) : details ? (
          <div className="flex flex-col md:flex-row flex-1 overflow-y-auto custom-scrollbar">
            
            {/* Izquierda: Imagen */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex items-center justify-center bg-slate-50 border-r border-slate-100">
              <img 
                src={details.image ? `${details.image}/high.png` : 'https://via.placeholder.com/350x500.png?text=Sin+Imagen'} 
                alt={details.name}
                className="max-w-full h-auto object-contain drop-shadow-xl rounded-lg max-h-[60vh]"
              />
            </div>

            {/* Derecha: Información y Controles */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
              <h2 className="text-3xl font-bold text-slate-800 mb-1">{details.name}</h2>
              <p className="text-fuchsia-600 font-semibold mb-6">
                {details.category} • {details.stage || 'Básico'}
              </p>

              <div className="space-y-4 flex-1">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-400 uppercase font-bold">Set</p>
                    <p className="text-sm font-medium text-slate-700">{details.set?.name || 'Desconocido'}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-400 uppercase font-bold">Rareza</p>
                    <p className="text-sm font-medium text-slate-700">{details.rarity || 'Desconocida'}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-400 uppercase font-bold">HP</p>
                    <p className="text-sm font-medium text-slate-700">{details.hp || 'N/A'}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-400 uppercase font-bold">Tipos</p>
                    <p className="text-sm font-medium text-slate-700">{details.types?.join(', ') || 'N/A'}</p>
                  </div>
                </div>

                {/* Ataques (Solo mostramos hasta 2 para no sobrecargar) */}
                {details.attacks && details.attacks.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs text-slate-400 uppercase font-bold mb-2">Ataques</p>
                    <div className="space-y-2">
                      {details.attacks.slice(0, 2).map((attack, i) => (
                        <div key={i} className="bg-white border border-slate-200 p-3 rounded-lg shadow-sm">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-slate-800">{attack.name}</span>
                            <span className="font-bold text-slate-600">{attack.damage ? `${attack.damage}` : ''}</span>
                          </div>
                          {attack.effect && <p className="text-xs text-slate-500 leading-tight">{attack.effect}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Controles del Mazo (Inferior) */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-500 font-medium mb-3 text-center">Gestión en tu Mazo Activo</p>
                
                {quantity === 0 ? (
                  <p className="text-center text-slate-400 text-sm mb-4">Esta carta no está en tu mazo actualmente.</p>
                ) : (
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <button 
                      onClick={() => updateQuantity(cardId, -1)}
                      className="w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors font-bold text-lg"
                    >
                      -
                    </button>
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-black text-slate-800">{quantity}</span>
                      <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Copias</span>
                    </div>
                    <button 
                      onClick={() => updateQuantity(cardId, 1)}
                      className="w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                )}

                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      removeCard(cardId);
                      onClose();
                    }}
                    disabled={quantity === 0}
                    className="flex-1 py-3 px-4 bg-white border-2 border-red-200 hover:bg-red-50 text-red-600 font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Eliminar del Mazo
                  </button>
                </div>
              </div>

            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
