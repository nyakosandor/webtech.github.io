export function renderCarList(cars, onDetailsClick, onEditClick, onDeleteClick) {
    const container = document.getElementById('cars-container');
    container.innerHTML = '';
  
    if (cars.length === 0) {
      container.textContent = 'No cars to display.';
      return;
    }
  
    cars.forEach((car) => {
      const card = document.createElement('div');
      card.className = 'car-card';
      card.innerHTML = `
        <h3>${car.brand} ${car.model}</h3>
        <p><strong>Owner:</strong> ${car.owner}</p>
        <p><strong>Fuel usage:</strong> ${car.fuelUse} l/100km</p>
        <p><strong>Electric:</strong> ${car.electric ? 'Yes' : 'No'}</p>
        <button class="details-btn" data-id="${car.id}">Details</button>
        <button class="edit-btn" data-id="${car.id}">Edit</button>
        <button class="delete-btn" data-id="${car.id}">Delete</button>
      `;
      container.appendChild(card);
    });
  
    container.querySelectorAll('.details-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        onDetailsClick(id);
      });
    });
  
    container.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        onEditClick(id);
      });
    });
  
    container.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        onDeleteClick(id);
      });
    });
  }
  
  export function renderCarDetails(car) {
    const section = document.getElementById('car-details');
    const container = document.getElementById('car-info');
  
    if (!section || !container) return; // In case the section is missing
  
    section.hidden = false;
    container.innerHTML = `
      <h3>${car.brand} ${car.model}</h3>
      <p><strong>Owner:</strong> ${car.owner}</p>
      <p><strong>Fuel usage:</strong> ${car.fuelUse} l/100km</p>
      <p><strong>Electric:</strong> ${car.electric ? 'Yes' : 'No'}</p>
      <p><strong>Commissioned:</strong> ${car.dayOfCommission}</p>
    `;
  }
  