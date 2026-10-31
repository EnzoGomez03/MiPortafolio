const tecnologias = [
    { icon: "python", nombre: "Python" },
    { icon: "java", nombre: "Java" },
    { icon: "html5", nombre: "HTML" },
    { icon: "css3", nombre: "CSS" },
    { icon: "javascript", nombre: "JavaScript" },
    { icon: "mongodb", nombre: "MongoDB" },
    { icon: "mysql", nombre: "MySQL" },
    { icon: "postgresql", nombre: "PostgreSQL" },
    { icon: "nodejs", nombre: "Node.js", badge: "Aprendiendo" }
];


function cargarTecnologias(){
    const track = document.getElementById("techTrack");
    let html = "";

    tecnologias.forEach(tech => {
        html += crearTarjeta(tech);
    });

    track.innerHTML = html + html;
    [...track.children].slice(tecnologias.length).forEach(card => card.setAttribute("aria-hidden", "true"));
}


function crearTarjeta(techAUsar){
    return `
            <div class = "tech-card">
                <i class="devicon-${techAUsar.icon}-plain colored"></i>
                <span> ${techAUsar.nombre}</span>
                ${techAUsar.badge ? `<span class="badge">${techAUsar.badge}</span>` : "" }
            </div>
        `;
}

cargarTecnologias();

function moverCarrusel(idCarrusel, direccion) {
    const carrusel = document.getElementById(idCarrusel);
    const imagenes = carrusel.querySelectorAll("img");
    const dotsContainer = carrusel.parentElement.querySelector(".carousel-dots");
    const dots = dotsContainer.querySelectorAll(".dot");

    let indiceActual = [...imagenes].findIndex(img => img.classList.contains("active"));
    imagenes[indiceActual].classList.remove("active");
    dots[indiceActual].classList.remove("active");

    let nuevoIndice = (indiceActual + direccion + imagenes.length) % imagenes.length;

    imagenes[nuevoIndice].classList.add("active");
    dots[nuevoIndice].classList.add("active");
}

const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

function cambiarMenu(abierto) {
    hamburgerBtn.classList.toggle("active", abierto);
    navLinks.classList.toggle("active", abierto);
    hamburgerBtn.setAttribute("aria-expanded", String(abierto));
    hamburgerBtn.setAttribute("aria-label", abierto ? "Cerrar menú de navegación" : "Abrir menú de navegación");
}

hamburgerBtn.addEventListener("click", () => cambiarMenu(!navLinks.classList.contains("active")));
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && navLinks.classList.contains("active")) {
        cambiarMenu(false);
        hamburgerBtn.focus();
    }
});
document.addEventListener("click", event => {
    if (!event.target.closest(".navbar")) cambiarMenu(false);
});
window.matchMedia("(max-width: 768px)").addEventListener("change", () => cambiarMenu(false));

// Cierra el menú automáticamente al tocar un link
navLinks.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        cambiarMenu(false);
    });
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const marquee = document.querySelector(".marquee");
let marqueeVisible = false;
function actualizarMovimiento() {
    marquee.classList.toggle("is-running", marqueeVisible && !document.hidden && !reducedMotion.matches);
}
document.addEventListener("visibilitychange", actualizarMovimiento);
reducedMotion.addEventListener("change", actualizarMovimiento);

if ("IntersectionObserver" in window) {
    const marqueeObserver = new IntersectionObserver(entries => {
        marqueeVisible = entries[0].isIntersecting;
        actualizarMovimiento();
    });
    marqueeObserver.observe(marquee);

    // El contenido permanece visible por defecto; la animación es una mejora opcional.
    const entranceAnimations = new Set();
    reducedMotion.addEventListener("change", () => {
        if (reducedMotion.matches) entranceAnimations.forEach(animation => animation.finish());
    });
    const entrances = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entrances.unobserve(entry.target);
            if (reducedMotion.matches || !entry.target.animate) return;
            const isProject = entry.target.classList.contains("project-card");
            const animation = entry.target.animate([
                { opacity: .35, transform: `translateY(${isProject ? 24 : 12}px)` },
                { opacity: 1, transform: "translateY(0)" }
            ], { duration: isProject ? 600 : 420, easing: "cubic-bezier(0.16, 1, 0.3, 1)" });
            entranceAnimations.add(animation);
            animation.finished.then(() => entranceAnimations.delete(animation));
        });
    }, { threshold: .08 });
    document.querySelectorAll(".sobre-texto, .project-card, .contacto-content").forEach(element => entrances.observe(element));

    const links = [...navLinks.querySelectorAll(".nav-link")];
    const sections = [...document.querySelectorAll("section[id]")];
    function actualizarNavegacion() {
        const marker = window.innerHeight * .35;
        const current = sections.filter(section => section.getBoundingClientRect().top <= marker).pop();
        links.forEach(link => {
            const active = !!current && link.hash === `#${current.id}`;
            link.classList.toggle("is-current", active);
            if (active) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
        });
    }
    // Una franja de lectura activa las secciones sin cálculos en cada evento de scroll.
    const navigationObserver = new IntersectionObserver(actualizarNavegacion, { rootMargin: "-34% 0px -65% 0px" });
    sections.forEach(section => navigationObserver.observe(section));
    actualizarNavegacion();
}
