import { getAllCars, getCarById, createCar, updateCar, deleteCar } from './api.js';
import { renderCarList, renderCarDetails } from './ui.js';

document.addEventListener('DOMContentLoaded', async () => {
    const carContainer = document.getElementById('cars-container');
    if (carContainer) {
      try {
        const cars = await getAllCars();
        renderCarList(cars, handleDetailsClick, handleEditClick, handleDeleteClick);
      } catch (err) {
        alert('Failed to load car list: ' + err.message);
        console.error(err);
      }
    }
  });
document.getElementById('create-car-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const editingId = form.dataset.editingId;

  const car = {
    brand: form.brand.value.trim(),
    model: form.model.value.trim(),
    fuelUse: parseFloat(form.fuelUse.value),
    owner: form.owner.value.trim(),
    dayOfCommission: form.dayOfCommission.value,
    electric: form.electric.checked
  };

  if (car.electric) {
    car.fuelUse = 0;
  } else if (car.fuelUse <= 0) {
    alert('Fuel usage must be greater than 0 for non-electric cars.');
    return;
  }

  if (!car.owner.includes(' ')) {
    alert('Owner name must contain a space.');
    return;
  }

  try {
    if (editingId) {
      car.id = parseInt(editingId);
      await updateCar(car);
      alert('Car updated successfully.');
      delete form.dataset.editingId;
      form.querySelector('button[type="submit"]').textContent = 'Add Car';
    } else {
      await createCar(car);
      alert('Car added successfully.');
    }

    form.reset();
    const cars = await getAllCars();
    renderCarList(cars, handleDetailsClick, handleEditClick, handleDeleteClick);
  } catch (err) {
    alert('An error occurred: ' + err.message);
    console.error(err);
  }
});

async function handleDetailsClick(id) {
  const car = await getCarById(id);
  if (car) {
    renderCarDetails(car);
  } else {
    alert('Failed to load car details.');
  }
}

async function handleEditClick(id) {
  const car = await getCarById(id);
  if (!car) {
    alert('Car not found.');
    return;
  }

  const form = document.getElementById('create-car-form');
  form.brand.value = car.brand;
  form.model.value = car.model;
  form.fuelUse.value = car.fuelUse;
  form.owner.value = car.owner;
  form.dayOfCommission.value = car.dayOfCommission;
  form.electric.checked = car.electric;

  form.querySelector('button[type="submit"]').textContent = 'Save';
  form.dataset.editingId = car.id;
}

async function handleDeleteClick(id) {
  if (!confirm('Are you sure you want to delete this car?')) return;

  try {
    await deleteCar(id);
    alert('Car deleted successfully.');
    const cars = await getAllCars();
    renderCarList(cars, handleDetailsClick, handleEditClick, handleDeleteClick);
  } catch (err) {
    alert('Failed to delete the car: ' + err.message);
    console.error(err);
  }
}
