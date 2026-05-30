function initMenu() {

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const closeMenu = document.getElementById("close-menu");

    // sicurezza
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

    // CLICK EVENTS MENU
    hamburger.addEventListener("click", toggleMenu);

    if (closeMenu) {
        closeMenu.addEventListener("click", closeMenuFn);
    }

    navMenu.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", closeMenuFn);
    });

    document.addEventListener("click", (e) => {
        if (
            navMenu.classList.contains("active") &&
            !navMenu.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            closeMenuFn();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeMenuFn();
        }
    });

    // FOCUS TRAP MENU
    navMenu.addEventListener("keydown", (e) => {

        if (!navMenu.classList.contains("active")) return;
        if (e.key !== "Tab") return;

        const focusable = navMenu.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (!e.shiftKey && active === last) {
            e.preventDefault();
            first.focus();
        }

        if (e.shiftKey && active === first) {
            e.preventDefault();
            last.focus();
        }
    });
}


// AVVIO MENU
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("hamburger")) {
        initMenu();
    }
});


// =========================
// MODAL EVENTI (ACCESSIBILE)
// =========================

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

        // ACCESSIBILITÀ
        modal.setAttribute("aria-hidden", "false");
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");

        const card = btn.closest(".evento-box");

        modalImg.src = card.querySelector(".evento-img").src;
        modalTitle.textContent = btn.dataset.title;
        modalDate.textContent = btn.dataset.date;

        const fullText = card.querySelector(".evento-desc").textContent;
        modalText.textContent = fullText;

        const location = card.querySelector(".evento-location");
        modalLocation.textContent = location ? location.textContent.trim() : "";

        document.body.classList.add("menu-open");

        document.querySelector(".modal-content").focus();
    }

    function closeModal() {
        modal.classList.add("hidden");

        // ACCESSIBILITÀ
        modal.setAttribute("aria-hidden", "true");

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