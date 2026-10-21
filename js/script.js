document.addEventListener('DOMContentLoaded', () => {

    /* 1. LÓGICA DEL TEMA (Oscuro / Claro) */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const rootElement = document.documentElement;

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = rootElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            rootElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    /* 2. MENÚ HAMBURGUESA */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    /* 3. EFECTO TYPING (Textos oficiales para PreuSync™) */
    const words = [
        "Sincroniza tu vida escolar preuniversitaria.",
        "Horario escolar dinámico en tiempo real.",
        "Noticias, eventos y comunidad estudiantil.",
        "Optimizada para redes móviles en Cuba."
    ];

    let i = 0;
    let j = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typing-text');
    const typingSpeed = 65;
    const deletingSpeed = 35;
    const pauseTime = 2200;

    function type() {
        if (!typingElement) return;
        const currentWord = words[i];
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, j - 1);
            j--;
        } else {
            typingElement.textContent = currentWord.substring(0, j + 1);
            j++;
        }
        let typeDelay = isDeleting ? deletingSpeed : typingSpeed;
        if (!isDeleting && j === currentWord.length) {
            typeDelay = pauseTime;
            isDeleting = true;
        } else if (isDeleting && j === 0) {
            isDeleting = false;
            i = (i + 1) % words.length;
            typeDelay = 500;
        }
        setTimeout(type, typeDelay);
    }
    type();

    /* 4. ANIMACIONES SCROLL */
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    fadeElements.forEach(el => observer.observe(el));
});
