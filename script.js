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
// MODAL EVENTI
// =============================
function initEventModal() {

    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalText = document.getElementById("modal-text");
    const closeBtn = document.querySelector(".modal-close");

    if (!modal || !modalImg || !modalTitle || !modalText) {
        console.warn("Modal eventi non completo nel DOM");
        return;
    }

    function openModal(data) {
        modalImg.src = data.img || "";
        modalTitle.textContent = data.title || "";
        modalText.textContent = data.text || "";

        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modal.classList.add("hidden");
        document.body.style.overflow = "";
    }

    // click bottoni eventi
    document.querySelectorAll(".evento-btn").forEach(btn => {
        btn.addEventListener("click", () => {

            openModal({
                img: btn.dataset.img,
                title: btn.dataset.title,
                text: btn.dataset.text
            });
        });
    });

    // chiusura X
    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    // click fuori contenuto
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeModal();
        }
    });
}