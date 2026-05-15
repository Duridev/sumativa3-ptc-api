import { useState, useEffect } from 'react';

const DECK_STORAGE_KEY = 'pokemon_deck';
const MAX_DECK_SIZE = 60;
const MAX_COPIES = 4;

export const useDeck = (addToast) => {
  const [deck, setDeck] = useState(() => {
    // Read: Leer síncronamente del LocalStorage al inicializar el estado
    try {
      const storedDeck = localStorage.getItem(DECK_STORAGE_KEY);
      if (storedDeck) {
        const parsed = JSON.parse(storedDeck);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("Error parsing deck from local storage:", error);
    }
    return [];
  });

  // Write: Guardar en LocalStorage con Validación de Seguridad
  useEffect(() => {
    if (Array.isArray(deck)) {
      const validDeck = deck.filter(card => card && card.id && typeof card.quantity === 'number' && card.quantity > 0);
      localStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(validDeck));
    }
  }, [deck]);

  const totalCards = deck.reduce((acc, card) => acc + card.quantity, 0);

  const addCard = (card) => {
    if (totalCards >= MAX_DECK_SIZE) {
      addToast(`El mazo ha alcanzado el límite máximo de ${MAX_DECK_SIZE} cartas.`, 'warning');
      return;
    }

    // Buscamos si la carta ya existe en el estado actual (para disparar el Toast 1 sola vez fuera del setter)
    const existingCard = deck.find(c => c.id === card.id);

    if (existingCard) {
      if (existingCard.quantity >= MAX_COPIES) {
        addToast(`Ya tienes el máximo de ${MAX_COPIES} copias de ${card.name}.`, 'warning');
        return;
      }
      addToast(`Se añadió otra copia de ${card.name} al mazo.`, 'success');
      
      setDeck(prevDeck => prevDeck.map(c => 
        c.id === card.id ? { ...c, quantity: c.quantity + 1 } : c
      ));
    } else {
      addToast(`Se añadió ${card.name} al mazo.`, 'success');
      setDeck(prevDeck => [...prevDeck, { ...card, quantity: 1 }]);
    }
  };

  const updateQuantity = (cardId, amount) => {
    const cardToUpdate = deck.find(c => c.id === cardId);
    if (!cardToUpdate) return;

    const newQuantity = cardToUpdate.quantity + amount;

    if (newQuantity > MAX_COPIES) {
      addToast(`No puedes tener más de ${MAX_COPIES} copias.`, 'warning');
      return;
    }
    
    if (totalCards + amount > MAX_DECK_SIZE && amount > 0) {
      addToast(`El mazo está lleno (${MAX_DECK_SIZE} cartas).`, 'warning');
      return;
    }

    setDeck(prevDeck => {
      return prevDeck.map(card => {
        if (card.id === cardId) {
          return { ...card, quantity: newQuantity };
        }
        return card;
      }).filter(card => card.quantity > 0);
    });
  };

  const removeCard = (cardId) => {
    setDeck(prevDeck => prevDeck.filter(card => card.id !== cardId));
  };

  const clearDeck = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el mazo por completo?')) {
      setDeck([]);
      addToast('El mazo ha sido vaciado exitosamente.', 'success');
    }
  };

  return {
    deck,
    totalCards,
    addCard,
    updateQuantity,
    removeCard,
    clearDeck
  };
};
