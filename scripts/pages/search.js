import { getAllCars } from '../api.js';

const searchInput = document.getElementById('search-input');
const container = document.getElementById('cars-container');

let allCars = [];

document.addEventListener('DOMContentLoaded', async () => {
  try {
    allCars = await getAllCars();
    renderCarList(allCars);
  } catch (err) {
    alert('Failed to load cars.');
    console.error(err);
  }
});

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = allCars.filter(car =>
    car.brand.toLowerCase().includes(query) ||
    car.model.toLowerCase().includes(query) ||
    car.owner.toLowerCase().includes(query)
  );
  renderCarList(filtered);
});

function renderCarList(cars) {
  container.innerHTML = '';

  if (cars.length === 0) {
    container.textContent = 'No matching cars found.';
    return;
  }

  cars.forEach(car => {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.innerHTML = `
      <h3>${car.brand} ${car.model}</h3>
      <p><strong>Owner:</strong> ${car.owner}</p>
      <p><strong>Fuel usage:</strong> ${car.fuelUse} l/100km</p>
      <p><strong>Electric:</strong> ${car.electric ? 'Yes' : 'No'}</p>
    `;
    container.appendChild(card);
  });
}
