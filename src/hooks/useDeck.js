import { useState, useEffect } from 'react';

const DECK_STORAGE_KEY = 'pokemon_deck';
const MAX_DECK_SIZE = 60;
const MAX_COPIES = 4;

export const useDeck = (addToast) => {
  const [deck, setDeck] = useState([]);

  // Read: Leer del LocalStorage al montar
  useEffect(() => {
    const storedDeck = localStorage.getItem(DECK_STORAGE_KEY);
    if (storedDeck) {
      try {
        const parsed = JSON.parse(storedDeck);
        if (Array.isArray(parsed)) {
          setDeck(parsed);
        }
      } catch (error) {
        console.error("Error parsing deck from local storage:", error);
      }
    }
  }, []);

  // Write: Guardar en LocalStorage con Validación de Seguridad
  useEffect(() => {
    // Sanitización y Validación: Solo guardar si es un array válido y los elementos tienen id
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

    setDeck(prevDeck => {
      const existingCardIndex = prevDeck.findIndex(c => c.id === card.id);
      
      if (existingCardIndex >= 0) {
        const existingCard = prevDeck[existingCardIndex];
        if (existingCard.quantity >= MAX_COPIES) {
          addToast(`Ya tienes el máximo de ${MAX_COPIES} copias de ${card.name}.`, 'warning');
          return prevDeck;
        }
        
        const newDeck = [...prevDeck];
        newDeck[existingCardIndex] = {
          ...existingCard,
          quantity: existingCard.quantity + 1
        };
        addToast(`Se añadió otra copia de ${card.name} al mazo.`, 'success');
        return newDeck;
      } else {
        addToast(`Se añadió ${card.name} al mazo.`, 'success');
        return [...prevDeck, { ...card, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (cardId, amount) => {
    setDeck(prevDeck => {
      let cardName = '';
      const updated = prevDeck.map(card => {
        if (card.id === cardId) {
          cardName = card.name;
          const newQuantity = card.quantity + amount;
          if (newQuantity > MAX_COPIES) {
            addToast(`No puedes tener más de ${MAX_COPIES} copias.`, 'warning');
            return card;
          }
          if (totalCards + amount > MAX_DECK_SIZE && amount > 0) {
            addToast(`El mazo está lleno (${MAX_DECK_SIZE} cartas).`, 'warning');
            return card;
          }
          return { ...card, quantity: newQuantity };
        }
        return card;
      }).filter(card => card.quantity > 0);
      
      return updated;
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
