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
