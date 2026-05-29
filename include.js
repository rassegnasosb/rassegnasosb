document.addEventListener("DOMContentLoaded", async () => {

    const header = document.getElementById("header-placeholder");
    const footer = document.getElementById("footer-placeholder");

    if (header) {
        const response = await fetch("header.html");
        header.innerHTML = await response.text();
    }

    if (footer) {
        const response = await fetch("footer.html");
        footer.innerHTML = await response.text();
    }

    initMenu();
});