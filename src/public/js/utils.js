
export function showBanner(text) {
    const alertBox = document.createElement("div");
    alertBox.textContent = text;
    alertBox.style.background = "#ff6600";
    alertBox.style.color = "#fff";
    alertBox.style.padding = "10px";
    alertBox.style.position = "fixed";
    alertBox.style.top = "10px";
    alertBox.style.right = "10px";
    alertBox.style.borderRadius = "5px";
    alertBox.style.zIndex = "9999";
    document.body.appendChild(alertBox);

    setTimeout(() => alertBox.remove(), 3000);
}

