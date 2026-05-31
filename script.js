function initMenu() {

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const closeMenu = document.getElementById("close-menu");

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


// =========================
// AVVIO MENU
// =========================
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("hamburger")) {
        initMenu();
    }
});


// =========================
// MODAL EVENTI (ACCESSIBILE WCAG FIXED)
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

    let lastFocusedBtn = null;

    function openModal(btn) {

        lastFocusedBtn = btn;

        modal.classList.remove("hidden");

        modal.setAttribute("aria-hidden", "false");

        const card = btn.closest(".evento-box");

        modalImg.src = card.querySelector(".evento-img")?.src || "";
        modalImg.alt = btn.dataset.title || "";

        modalTitle.textContent = btn.dataset.title || "";
        modalDate.textContent = btn.dataset.date || "";

        const fullText = card.querySelector(".evento-desc")?.textContent || "";
        modalText.textContent = fullText;

        const location = card.querySelector(".evento-location");
        modalLocation.textContent = location ? location.textContent.trim() : "";

        document.body.classList.add("menu-open");

        // focus dentro modal
        setTimeout(() => {
            closeBtn.focus();
        }, 0);
    }

    function closeModal() {

        modal.classList.add("hidden");

        modal.setAttribute("aria-hidden", "true");

        document.body.classList.remove("menu-open");

        // ritorno focus al bottone che ha aperto
        if (lastFocusedBtn) {
            lastFocusedBtn.focus();
        }
    }

    buttons.forEach(btn => {
        btn.addEventListener("click", () => openModal(btn));
    });

    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !modal.classList.contains("hidden")) {
            closeModal();
        }
    });

    // =========================
    // FOCUS TRAP MODAL
    // =========================
    modal.addEventListener("keydown", (e) => {

        if (modal.classList.contains("hidden")) return;
        if (e.key !== "Tab") return;

        const focusable = modal.querySelectorAll(
            'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
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
});