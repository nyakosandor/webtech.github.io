export function renderCarList(cars, onDetailsClick) {
    const container = document.getElementById('cars-container');
    container.innerHTML = '';

    if (cars.length === 0) {
        container.textContent = 'Nincs megjeleníthető autó.';
        return;
    }

    cars.forEach(car => {
        const card = document.createElement('div');
        card.className = 'car-card';
        card.innerHTML = `
            <h3>${car.brand} ${car.model}</h3>
            <p><strong>Tulajdonos:</strong> ${car.owner}</p>
            <p><strong>Üzemanyag fogyasztás:</strong> ${car.fuelUse} l/100km</p>
            <button data-id="${car.id}" class="details-btn">Részletek</button>
        `;
        container.appendChild(card);
    });

    const buttons = container.querySelectorAll('.details-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            onDetailsClick(parseInt(id));
        });
    });
}

export function renderCarDetails(car) {
    const section = document.getElementById('car-details');
    const container = document.getElementById('car-info');

    section.hidden = false;
    container.innerHTML = `
        <h3>${car.brand} ${car.model}</h3>
        <p><strong>Tulajdonos:</strong> ${car.owner}</p>
        <p><strong>Üzemanyag fogyasztás:</strong> ${car.fuelUse} l/100km</p>
        <p><strong>Forgalomba helyezés:</strong> ${car.dayOfCommission}</p>
        <p><strong>Elektromos:</strong> ${car.electric ? 'Igen' : 'Nem'}</p>
    `;
}
