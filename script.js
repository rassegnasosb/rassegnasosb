function initMenu() {

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const closeMenu = document.getElementById("close-menu");

    // sicurezza: se manca qualcosa, esce
    if (!hamburger || !navMenu) {
        console.error("Hamburger o navMenu non trovati nel DOM");
        return;
    }

    const firstLink = () => navMenu.querySelector("a");

    function openMenu() {
        navMenu.classList.add("active");
        document.body.classList.add("menu-open");

        hamburger.setAttribute("aria-expanded", "true");
        navMenu.setAttribute("aria-hidden", "false");

        const link = firstLink();
        if (link) link.focus();
    }

    function closeMenuFn() {
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");

        hamburger.setAttribute("aria-expanded", "false");
        navMenu.setAttribute("aria-hidden", "true");

        hamburger.focus();
    }

    function toggleMenu() {
        if (navMenu.classList.contains("active")) {
            closeMenuFn();
        } else {
            openMenu();
        }
    }

    // click hamburger
    hamburger.addEventListener("click", toggleMenu);

    // close button
    if (closeMenu) {
        closeMenu.addEventListener("click", closeMenuFn);
    }

    // click link
    navMenu.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", closeMenuFn);
    });

    // click fuori
    document.addEventListener("click", (e) => {
        if (
            navMenu.classList.contains("active") &&
            !navMenu.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            closeMenuFn();
        }
    });

    // ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeMenuFn();
        }
    });
}


// Avvio automatico SOLO se l'header è già presente (home)
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("hamburger")) {
        initMenu();
    }
});

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalText = document.getElementById("modal-text");
    const modalDate = document.getElementById("modal-date");
    const modalLocation = document.getElementById("modal-location");
    const closeBtn = document.getElementById("modal-close");
    const buttons = document.querySelectorAll(".evento-btn");

    function openModal(btn) {
        modal.classList.remove("hidden");

        const card = btn.closest(".evento-box");

        modalImg.src = card.querySelector(".evento-img").src;
        modalTitle.textContent = btn.dataset.title;
        modalDate.textContent = btn.dataset.date;

        // TESTO COMPLETO
        const fullText = card.querySelector(".evento-desc").textContent;
        modalText.textContent = fullText;

        // LUOGO (NUOVO)
        const location = card.querySelector(".evento-location");
        modalLocation.textContent = location ? location.textContent.trim() : "";

        document.body.classList.add("menu-open");
        
        document.querySelector(".modal-content").focus();
    }

    function closeModal() {
        modal.classList.add("hidden");
        document.body.classList.remove("menu-open");
    }

    buttons.forEach(btn => {
        btn.addEventListener("click", () => openModal(btn));
    });

    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });

});