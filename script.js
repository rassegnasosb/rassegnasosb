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