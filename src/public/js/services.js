import { showBanner } from "./utils.js";
const socket = io();

// Escuchar creación, actualización y eliminación de servicio
socket.on("serviceUpdated", (data) => {
if (data.action === "created") {
    showBanner("Servicio creado");
    const container = document.querySelector(".cards");
    if (container) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-id", data.service._id);
        card.innerHTML = `
        <h2>${data.service.name}</h2>
        <p>${data.service.description}</p>
        <p>Precio: $${data.service.price} | Duración: ${data.service.duration} min</p>
        <div class="actions">
            <a class="btn" href="/views/services/${data.service._id}">Ver detalle</a>
            <button class="btn update-btn" data-id="${data.service._id}">Actualizar</button>
            <button class="btn delete-btn" data-id="${data.service._id}">Eliminar</button>
        </div>
        <form class="service-edit-form" data-id="${data.service._id}" style="display:none;">
            <input type="text" name="name" value="${data.service.name}">
            <input type="text" name="description" value="${data.service.description}">
            <input type="number" name="price" value="${data.service.price}">
            <input type="number" name="duration" value="${data.service.duration}">
            <input type="text" name="category" value="${data.service.category}">
            <select name="available">
            <option value="true" ${data.service.available ? "selected" : ""}>Disponible</option>
            <option value="false" ${!data.service.available ? "selected" : ""}>No disponible</option>
            </select>
            <button type="submit">Guardar cambios</button>
        </form>
        `;
        container.appendChild(card);
    }
}

if (data.action === "updated") {
    showBanner("Servicio actualizado");
    const card = document.querySelector(`.card[data-id="${data.service._id}"]`);
    if (card) {
        card.querySelector("h2").textContent = data.service.name;
        card.querySelector("p").textContent = data.service.description;
    }
}
});

socket.on("serviceDeleted", (data) => {
    showBanner("Servicio eliminado");
    const card = document.querySelector(`.card[data-id="${data.id}"]`);
    if (card) card.remove();
});

// Manejar envío de formulario de creación
document.addEventListener("DOMContentLoaded", () => {
    const serviceForm = document.querySelector(".service-form");
    if (serviceForm) {
    serviceForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(serviceForm);
        const data = Object.fromEntries(formData.entries());
        await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    serviceForm.reset();
    });
}

  // Mostrar/ocultar formulario de edición
document.querySelectorAll(".update-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const form = document.querySelector(`.service-edit-form[data-id="${btn.dataset.id}"]`);
        form.style.display = form.style.display === "none" ? "block" : "none";
    });
});

  // Manejar envío de edición
document.querySelectorAll(".service-edit-form").forEach(form => {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = form.dataset.id;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        await fetch(`/api/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
      form.style.display = "none"; // ocultar después de guardar
    });
});

  // Manejar eliminación
document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        await fetch(`/api/services/${id}`, { method: "DELETE" });
    });
});
});
