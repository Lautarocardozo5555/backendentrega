import { showBanner } from "./utils.js";
const socket = io();

// Escuchar creación, actualización y eliminación
socket.on("bookingUpdated", (data) => {
if (data.action === "created") {
    showBanner("Reserva creada");
    const container = document.querySelector(".cards");
    if (container) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-id", data.booking._id);
        card.innerHTML = `
        <h2>${data.booking.clientName}</h2>
        <p>Fecha: ${data.booking.date} | Hora: ${data.booking.time}</p>
        <div class="actions">
            <a class="btn" href="/views/bookings/${data.booking._id}">Ver detalle</a>
            <button class="btn update-btn" data-id="${data.booking._id}">Actualizar</button>
            <button class="btn delete-btn" data-id="${data.booking._id}">Eliminar</button>
        </div>
        <form class="booking-edit-form" data-id="${data.booking._id}" style="display:none;">
            <input type="text" name="clientName" value="${data.booking.clientName}">
            <input type="email" name="clientEmail" value="${data.booking.clientEmail}">
            <input type="date" name="date" value="${data.booking.date}">
            <input type="time" name="time" value="${data.booking.time}">
        <select name="status">
            <option value="pendiente" ${data.booking.status === "pendiente" ? "selected" : ""}>Pendiente</option>
            <option value="confirmada" ${data.booking.status === "confirmada" ? "selected" : ""}>Confirmada</option>
            <option value="cancelada" ${data.booking.status === "cancelada" ? "selected" : ""}>Cancelada</option>
        </select>
        <button type="submit">Guardar cambios</button>
        </form>
    `;
    container.appendChild(card);
    }
}

if (data.action === "updated") {
    showBanner("Reserva actualizada");
    const card = document.querySelector(`.card[data-id="${data.booking._id}"]`);
    if (card) {
        card.querySelector("h2").textContent = data.booking.clientName;
        card.querySelector("p").textContent = `Fecha: ${data.booking.date} | Hora: ${data.booking.time}`;
    }
}
});

socket.on("bookingDeleted", (data) => {
    showBanner("Reserva eliminada");
    const card = document.querySelector(`.card[data-id="${data.id}"]`);
    if (card) card.remove();
});

// Lógica de botones
document.addEventListener("DOMContentLoaded", () => {
  // Mostrar/ocultar formulario de edición
document.querySelectorAll(".update-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const form = document.querySelector(`.booking-edit-form[data-id="${btn.dataset.id}"]`);
        form.style.display = form.style.display === "none" ? "block" : "none";
    });
});

  // Enviar edición
document.querySelectorAll(".booking-edit-form").forEach(form => {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = form.dataset.id;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    form.style.display = "none";
    });
});

  // Eliminar reserva
document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    });
});
});
