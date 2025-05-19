import { render } from "../utils/render.js";
import { api } from "../utils/api.js";
import { Router } from "../utils/router.js";

export async function homePage(html) {
  render(document.getElementById("root"), html);

  const listEl = document.getElementById("car-list");

  try {
    const res = await api("car");
    const cars = await res.json();

    listEl.innerHTML = cars.length === 0
      ? "<p>No cars found.</p>"
      : "<ul>" + cars.map(car => `
          <li>
            <strong>${car.brand}</strong> – ${car.model} (${car.year || "N/A"})
            <button data-id="${car.id}" class="btn-edit">Edit</button>
            <button data-id="${car.id}" class="btn-delete">Delete</button>
          </li>
        `).join("") + "</ul>";

    document.querySelectorAll(".btn-delete").forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Delete this car?")) {
          await api(`car/${id}`, { method: "DELETE" });
          Router.navigate({ page: "home" });
        }
      };
    });

    document.querySelectorAll(".btn-edit").forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute("data-id");
        const res = await api(`car/${id}`);
        const car = await res.json();
        Router.navigate({ page: "edit", data: car });
      };
    });

  } catch (err) {
    listEl.innerHTML = "<p style='color:red;'>Error loading cars.</p>";
    console.error(err);
  }
}
