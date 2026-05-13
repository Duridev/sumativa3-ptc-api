import { useState, useEffect } from 'react';

const DECK_STORAGE_KEY = 'pokemon_deck';
const MAX_DECK_SIZE = 60;
const MAX_COPIES = 4;

export const useDeck = () => {
  // Inicializamos el estado vacío para evitar problemas de hidratación,
  // y luego lo leemos del localStorage en el useEffect.
  const [deck, setDeck] = useState([]);

  // Read: Leer del LocalStorage al montar
  useEffect(() => {
    const storedDeck = localStorage.getItem(DECK_STORAGE_KEY);
    if (storedDeck) {
      try {
        setDeck(JSON.parse(storedDeck));
      } catch (error) {
        console.error("Error parsing deck from local storage:", error);
      }
    }
  }, []);

  // Write: Guardar en LocalStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(deck));
  }, [deck]);

  // Utilidad para contar el total de cartas
  const totalCards = deck.reduce((acc, card) => acc + card.quantity, 0);

  // Create: Agregar carta
  const addCard = (card) => {
    if (totalCards >= MAX_DECK_SIZE) {
      alert(`El mazo no puede tener más de ${MAX_DECK_SIZE} cartas.`);
      return;
    }

    setDeck(prevDeck => {
      const existingCardIndex = prevDeck.findIndex(c => c.id === card.id);
      
      if (existingCardIndex >= 0) {
        const existingCard = prevDeck[existingCardIndex];
        if (existingCard.quantity >= MAX_COPIES) {
          alert(`No puedes tener más de ${MAX_COPIES} copias de la misma carta.`);
          return prevDeck;
        }
        
        const newDeck = [...prevDeck];
        newDeck[existingCardIndex] = {
          ...existingCard,
          quantity: existingCard.quantity + 1
        };
        return newDeck;
      } else {
        return [...prevDeck, { ...card, quantity: 1 }];
      }
    });
  };

  // Update: Modificar cantidad
  const updateQuantity = (cardId, amount) => {
    setDeck(prevDeck => {
      return prevDeck.map(card => {
        if (card.id === cardId) {
          const newQuantity = card.quantity + amount;
          if (newQuantity > MAX_COPIES) {
            alert(`No puedes tener más de ${MAX_COPIES} copias de la misma carta.`);
            return card;
          }
          if (totalCards + amount > MAX_DECK_SIZE && amount > 0) {
            alert(`El mazo no puede tener más de ${MAX_DECK_SIZE} cartas.`);
            return card;
          }
          return { ...card, quantity: newQuantity };
        }
        return card;
      }).filter(card => card.quantity > 0); // Si baja a 0 o menos, se elimina automáticamente
    });
  };

  // Delete: Eliminar carta por completo
  const removeCard = (cardId) => {
    setDeck(prevDeck => prevDeck.filter(card => card.id !== cardId));
  };

  // Delete All: Limpiar mazo
  const clearDeck = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el mazo?')) {
      setDeck([]);
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
