import { showBanner } from "./utils.js";

const socket = io()
let pendingAlerts = []

// Escuchar nuevos mensajes
socket.on("newMessage", (message) => {
const container = document.querySelector(".messages-container");

if (container) {
    const emptyMsg = container.querySelector(".empty");
    if (emptyMsg) emptyMsg.remove();
    const card = document.createElement("div");
    card.classList.add("message-card");
    card.innerHTML = `
        <h2>${message.user}</h2>
        <p>${message.text}</p>
        <small>${new Date(message.timestamp).toLocaleString()}</small>
    `;
    container.prepend(card);
}

if (document.visibilityState === "visible") {
    showBanner("Mensaje nuevo");
} else {
    pendingAlerts.push(message);
}
});

// Detectar cuando el usuario vuelve a la pestaña
document.addEventListener("visibilitychange", () => {
if (document.visibilityState === "visible" && pendingAlerts.length > 0) {
    pendingAlerts.forEach(() => showBanner("Mensaje nuevo"));
    pendingAlerts = [];
}
});

// Manejar envío del formulario de mensajes
document.addEventListener("DOMContentLoaded", () => {
const form = document.querySelector(".message-form");
if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {
        user: formData.get("user"),
        text: formData.get("text"),
    };
    await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    form.reset();
    });
}
});
