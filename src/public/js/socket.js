const socket = io();
let pendingAlerts = []; // nombre consistente

socket.on("newMessage", (message) => {
    const container = document.querySelector(".messages-container");

    if (container) {
    const card = document.createElement("div");
    card.classList.add("message-card");
    card.innerHTML = `
        <h2>${message.user}</h2>
        <p>${message.text}</p>
        <small>${new Date(message.timestamp).toLocaleString()}</small>
    `;
    container.appendChild(card);
    }

  // Si la pestaña está visible, mostrar banner al instante
    if (document.visibilityState === "visible") {
    showBanner(message);
} else {
    // Si está oculta, guardar alerta pendiente
    pendingAlerts.push(message);
}
});

// Detectar cuando el usuario vuelve a la pestaña
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && pendingAlerts.length > 0) {
    pendingAlerts.forEach(msg => showBanner(msg));
    pendingAlerts = []; // limpiar
}
});

// Función para mostrar banner
function showBanner(message) {
    const alertBox = document.createElement("div");
    alertBox.textContent = `Nuevo mensaje de ${message.user}`;
    alertBox.style.background = "#ff6600";
    alertBox.style.color = "#fff";
    alertBox.style.padding = "10px";
    alertBox.style.position = "fixed";
    alertBox.style.top = "10px";
    alertBox.style.right = "10px";
    alertBox.style.borderRadius = "5px";
    alertBox.style.zIndex = "9999";
    document.body.appendChild(alertBox);


  // Se borra automáticamente después de 3 segundos
    setTimeout(() => alertBox.remove(), 3000);
}

// Manejar envío del formulario sin recargar
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

      form.reset(); // limpiar campos
    });
}
});
