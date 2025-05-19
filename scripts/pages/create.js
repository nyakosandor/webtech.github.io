import { createCar } from '../api.js';
import { validateCar } from '../logic.js';

document.getElementById('create-car-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;

  const car = {
    brand: form.brand.value.trim(),
    model: form.model.value.trim(),
    fuelUse: parseFloat(form.fuelUse.value),
    owner: form.owner.value.trim(),
    dayOfCommission: form.dayOfCommission.value,
    electric: form.electric.checked
  };

  // Business logic adjustment
  if (car.electric) {
    car.fuelUse = 0;
  }

  // Validate business rules
  const error = validateCar(car);
  if (error) {
    alert(`Validation error: ${error}`);
    return;
  }

  try {
    await createCar(car);
    alert('Car successfully created.');
    form.reset();
  } catch (err) {
    alert(`Server error: ${err.message}`);
    console.error('Car creation failed:', err);
  }
});
