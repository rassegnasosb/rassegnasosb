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

    const img = document.getElementById("modal-img");
    const title = document.getElementById("modal-title");
    const date = document.getElementById("modal-date");
    const text = document.getElementById("modal-text");

    const closeBtn = modal.querySelector(".modal-close");
    const backdrop = modal.querySelector(".modal-backdrop");

    const events = {
        event1: {
            title: "Il viaggio intorno al mondo",
            date: "1 Settembre",
            text: "Il giro del mondo a piedi e in solitaria per 36.000 km attraversando 4 continenti...",
            img: "img/pieroad-viaggio-intorno-mondo.jpg"
        }
    };

    document.querySelectorAll(".evento-link").forEach(btn => {
        btn.addEventListener("click", () => {
            const ev = events[btn.dataset.event];

            img.src = ev.img;
            title.textContent = ev.title;
            date.textContent = ev.date;
            text.textContent = ev.text;

            modal.classList.add("active");
        });
    });

    function closeModal() {
        modal.classList.remove("active");
    }

    closeBtn.addEventListener("click", closeModal);
    backdrop.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });
}

