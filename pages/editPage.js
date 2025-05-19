import { render } from "../utils/render.js";
import { api } from "../utils/api.js";
import { Router } from "../utils/router.js";

const validBrands = [
  "Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "BMW", "Mercedes-Benz", "Volkswagen",
  "Audi", "Hyundai", "Kia", "Subaru", "Lexus", "Mazda", "Tesla", "Jeep", "Porsche",
  "Volvo", "Jaguar", "Land Rover", "Mitsubishi", "Ferrari", "Lamborghini"
];

export async function editPage(html, { data }) {
  render(document.getElementById("root"), html);

  const form = document.getElementById("car-form");
  const message = document.getElementById("form-message");

  // Pre-fill form
  document.getElementById("brand").value = data.brand;
  document.getElementById("model").value = data.model;
  document.getElementById("owner").value = data.owner;
  document.getElementById("dayOfCommission").value = data.dayOfCommission;
  document.getElementById("electric").checked = data.electric;
  document.getElementById("fuelUse").value = data.fuelUse;
  document.getElementById("btn-save").textContent = "Update";

  form.onsubmit = async (e) => {
    e.preventDefault();

    const brand = document.getElementById("brand").value.trim();
    const model = document.getElementById("model").value.trim();
    const owner = document.getElementById("owner").value.trim();
    const dayOfCommission = document.getElementById("dayOfCommission").value;
    const electric = document.getElementById("electric").checked;
    const fuelUseRaw = document.getElementById("fuelUse").value.trim();

    // Validation
    if (!brand || !model) {
      message.textContent = "Brand and model are required.";
      return;
    }

    const isValidBrand = validBrands.some(b => b.toLowerCase() === brand.toLowerCase());
    if (!isValidBrand) {
      message.textContent = `Invalid brand. Try: ${validBrands.slice(0, 5).join(", ")}...`;
      return;
    }

    if (!owner || !/.*\s.+/.test(owner)) {
      message.textContent = "Owner must contain at least first and last name.";
      return;
    }

    if (!dayOfCommission) {
      message.textContent = "Commission date is required.";
      return;
    }

    let fuelUse = electric ? 0 : parseFloat(fuelUseRaw);
    if (!electric && (isNaN(fuelUse) || fuelUse <= 0)) {
      message.textContent = "Fuel use must be a number greater than 0.";
      return;
    }

    const updatedCar = {
      brand,
      model,
      owner,
      dayOfCommission,
      electric,
      fuelUse
    };

    try {
      const res = await api(`car/${data.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedCar)
      });

      if (res.ok) {
        message.textContent = "Car updated successfully!";
        form.reset();
        Router.navigate({ page: "home" });
      } else {
        const error = await res.text();
        message.textContent = "Error: " + error;
      }
    } catch (err) {
      message.textContent = "Server error: " + err.message;
    }
  };
}
