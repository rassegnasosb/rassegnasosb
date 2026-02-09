// Carica header e footer dinamici
document.addEventListener("DOMContentLoaded", () => {
    // Header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;

            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            const closeMenu = document.getElementById('close-menu');

            // Apri/chiudi hamburger
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Chiudi menu al click sui link
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });

            // Chiudi menu al click sulla X
            if (closeMenu) {
                closeMenu.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            }

            // Chiudi menu cliccando fuori (su mobile / overlay)
            document.addEventListener('click', (e) => {
                if (
                    navMenu.classList.contains('active') &&
                    !navMenu.contains(e.target) &&
                    !hamburger.contains(e.target)
                ) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });

    // Footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
});