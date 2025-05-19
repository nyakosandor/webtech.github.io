const neptun = 'PHRO7R';
const baseUrl = `https://iit-playground.arondev.hu/api/${neptun}`;

// GET all cars
export async function getAllCars() {
  const res = await fetch(`${baseUrl}/car`);
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return await res.json();
}

// GET one car by ID
export async function getCarById(id) {
  const res = await fetch(`${baseUrl}/car/${id}`);
  if (!res.ok) throw new Error(`Car not found (ID: ${id})`);
  return await res.json();
}

// POST new car
export async function createCar(car) {
  const res = await fetch(`${baseUrl}/car`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car)
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Create failed');
  }
  return await res.json();
}

// PUT update car
export async function updateCar(car) {
  const res = await fetch(`${baseUrl}/car`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car)
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Update failed');
  }
  return await res.json();
}

// DELETE car by ID
export async function deleteCar(id) {
  const res = await fetch(`${baseUrl}/car/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Delete failed');
  }
}
