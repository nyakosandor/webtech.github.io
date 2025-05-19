import { getAllCars, getCarById } from './api.js';
import { renderCarList, renderCarDetails } from './ui.js';

document.addEventListener('DOMContentLoaded', async () => {
    const cars = await getAllCars();
    renderCarList(cars, handleCarDetailsClick);
});


async function handleCarDetailsClick(id) {
    const car = await getCarById(id);
    if (car) {
        renderCarDetails(car);
    } else {
        alert('Nem sikerült betölteni az autó adatait.');
    }
}
