export const fetchCards = async (query = '') => {
  try {
    const url = query 
      ? `https://api.tcgdex.net/v2/es/cards?name=${encodeURIComponent(query)}`
      : `https://api.tcgdex.net/v2/es/cards`;
      
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener las cartas:", error);
    throw new Error(error.message || "Ocurrió un error al cargar las cartas.");
  }
};

export const fetchCardDetails = async (id) => {
  try {
    const url = `https://api.tcgdex.net/v2/es/cards/${id}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener detalles de la carta:", error);
    throw new Error("Ocurrió un error al cargar los detalles.");
  }
};
