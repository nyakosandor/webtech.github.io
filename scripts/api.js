const baseUrl = `https://iit-playground.arondev.hu/api/${NEPTUN}/`;

export async function getAllCars() {
  try {
      const response = await fetch(`${BASE_URL}/cars`);
      if (!response.ok) {
          throw new Error(`Hiba a lekérdezés során: ${response.status}`);
      }
      const cars = await response.json();
      return cars;
  } catch (error) {
      console.error('Hiba az autók lekérdezésekor:', error);
      return [];
  }
}

export async function getCarById(id) {
  try {
      const response = await fetch(`${BASE_URL}/cars/${id}`);
      if (!response.ok) {
          throw new Error(`Nem található autó ID=${id}`);
      }
      return await response.json();
  } catch (error) {
      console.error(`Hiba az autó (${id}) lekérdezésekor:`, error);
      return null;
  }
}