import { getCarById, updateCar } from '../api.js';
import { validateCar } from '../logic.js';

const form = document.getElementById('edit-car-form');
const urlParams = new URLSearchParams(window.location.search);
const carId = urlParams.get('id');

if (!carId) {
  alert('Missing car ID.');
  window.location.href = 'list.html';
}

async function loadCarData() {
  try {
    const car = await getCarById(carId);
    if (!car) {
      alert('Car not found.');
      window.location.href = 'list.html';
      return;
    }

    form.brand.value = car.brand;
    form.model.value = car.model;
    form.fuelUse.value = car.fuelUse;
    form.owner.value = car.owner;
    form.dayOfCommission.value = car.dayOfCommission;
    form.electric.checked = car.electric;
  } catch (err) {
    alert('Error loading car data.');
    console.error(err);
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const car = {
    id: parseInt(carId),
    brand: form.brand.value.trim(),
    model: form.model.value.trim(),
    fuelUse: parseFloat(form.fuelUse.value),
    owner: form.owner.value.trim(),
    dayOfCommission: form.dayOfCommission.value,
    electric: form.electric.checked
  };

  if (car.electric) {
    car.fuelUse = 0;
  }

  const error = validateCar(car);
  if (error) {
    alert(`Validation error: ${error}`);
    return;
  }

  try {
    await updateCar(car);
    alert('Car updated successfully.');
    window.location.href = 'list.html';
  } catch (err) {
    alert(`Failed to update car: ${err.message}`);
    console.error(err);
  }
});

loadCarData();
