import { getAllCars, getCarById, deleteCar } from "../api.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const cars = await getAllCars();
    renderCarList(cars);
  } catch (err) {
    alert("Failed to load car list.");
    console.error(err);
  }
});

function renderCarList(cars) {
  const container = document.getElementById("cars-container");
  container.innerHTML = "";

  if (cars.length === 0) {
    container.textContent = "No cars to display.";
    return;
  }

  cars.forEach((car) => {
    const card = document.createElement("div");
    card.className = "car-card";
    card.innerHTML = `
      <h3>${car.brand} ${car.model}</h3>
      <p><strong>Owner:</strong> ${car.owner}</p>
      <p><strong>Fuel usage:</strong> ${car.fuelUse} l/100km</p>
      <button data-id="${car.id}" class="details-btn">Details</button>
      <button data-id="${car.id}" class="edit-btn">Edit</button>
      <button data-id="${car.id}" class="delete-btn">Delete</button>
    `;
    container.appendChild(card);
  });

  container.querySelectorAll(".details-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = parseInt(btn.dataset.id);
      const car = await getCarById(id);
      if (car) {
        alert(`
            Brand: ${car.brand}
            Model: ${car.model}
            Owner: ${car.owner}
            Fuel Usage: ${car.fuelUse} l/100km
            Electric: ${car.electric ? "Yes" : "No"}
            Commissioned: ${car.dayOfCommission}
        `);
      } else {
        alert("Failed to load car details.");
      }
    });
  });

  container.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      window.location.href = `edit.html?id=${id}`;
    });
  });

  container.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = parseInt(btn.dataset.id);
      if (confirm("Are you sure you want to delete this car?")) {
        try {
          await deleteCar(id);
          alert("Car deleted successfully.");
          const cars = await getAllCars();
          renderCarList(cars);
        } catch (err) {
          alert("Failed to delete car.");
          console.error(err);
        }
      }
    });
  });
}
