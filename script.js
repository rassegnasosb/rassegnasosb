// =============================
// MENU MOBILE
// =============================
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
}


// =============================
// INIT
// =============================
document.addEventListener("DOMContentLoaded", () => {

    if (document.getElementById("hamburger")) {
        initMenu();
    }

    initEventModal();
});

// =============================
// EVENTI
// =============================
function initEventModal() {

    const modal = document.getElementById("event-modal");
    const closeBtn = document.getElementById("modal-close");

    const modalTitle = document.getElementById("modal-title");
    const modalText = document.getElementById("modal-text");

    document.querySelectorAll(".evento-btn").forEach(btn => {

        btn.addEventListener("click", () => {

            const card = btn.closest(".evento-box");

            modalTitle.textContent = card.querySelector(".evento-titolo").textContent;
            modalText.textContent = card.querySelector(".evento-desc").textContent;

            modal.classList.add("active");
        });
    });

    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            modal.classList.remove("active");
        }
    });
}