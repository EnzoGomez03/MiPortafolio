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

const carouselRequests = new WeakMap();
async function moverCarrusel(idCarrusel, direccion) {
    const carrusel = document.getElementById(idCarrusel);
    const imagenes = carrusel.querySelectorAll("img");
    const dotsContainer = carrusel.parentElement.querySelector(".carousel-dots");
    const dots = dotsContainer.querySelectorAll(".dot");

    const current = [...imagenes].findIndex(img => img.classList.contains("active"));
    const previousRequest = carouselRequests.get(carrusel);
    const next = ((previousRequest?.index ?? current) + direccion + imagenes.length) % imagenes.length;
    const request = { index: next };
    carouselRequests.set(carrusel, request);
    // Keep the current capture until its replacement is loaded and decoded.
    imagenes[next].loading = "eager";
    try {
        if (imagenes[next].decode) await imagenes[next].decode();
        else if (!imagenes[next].complete || !imagenes[next].naturalWidth) return;
    } catch {
        if (carouselRequests.get(carrusel) === request) carouselRequests.delete(carrusel);
        return;
    }
    if (carouselRequests.get(carrusel) !== request) return;
    imagenes.forEach((image, index) => {
        image.classList.toggle("active", index === next);
        image.setAttribute("aria-hidden", String(index !== next));
        dots[index].classList.toggle("active", index === next);
    });
    carouselRequests.delete(carrusel);
}

document.querySelectorAll(".carousel img").forEach(image => {
    image.setAttribute("aria-hidden", String(!image.classList.contains("active")));
});

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
const motionToggle = document.getElementById("techMotionToggle");
let pausedByUser = false;
let marqueeVisible = false;
function actualizarMovimiento() {
    marquee.classList.toggle("is-running", marqueeVisible && !document.hidden && !reducedMotion.matches && !pausedByUser);
    motionToggle.hidden = reducedMotion.matches || !("IntersectionObserver" in window);
    motionToggle.setAttribute("aria-pressed", String(pausedByUser));
    motionToggle.textContent = pausedByUser ? "Reanudar animación" : "Pausar animación";
}
motionToggle.addEventListener("click", () => {
    pausedByUser = !pausedByUser;
    actualizarMovimiento();
});
actualizarMovimiento();
document.addEventListener("visibilitychange", actualizarMovimiento);
reducedMotion.addEventListener("change", actualizarMovimiento);

// Una única secuencia de bienvenida; los controles están disponibles desde el inicio.
const heroAnimations = new Set();
if (!reducedMotion.matches) {
    document.querySelectorAll(".hero > .avatar, .hero .name-part, .hero > .role, .hero > .substudy, .hero > .quote, .hero > .cta-row").forEach((element, index) => {
        if (!element.animate) return;
        const isName = element.classList.contains("name-part");
        const animation = element.animate([
            { opacity: isName ? .15 : .4, transform: `translateY(${isName ? 18 : 8}px)` },
            { opacity: 1, transform: "translateY(0)" }
        ], { duration: isName ? 650 : 480, delay: index * 65, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "backwards" });
        heroAnimations.add(animation);
        animation.finished.then(() => heroAnimations.delete(animation));
    });
}
reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) heroAnimations.forEach(animation => animation.finish());
});

// Pointer input only: one scheduled write per frame, no continuous render loop.
const hero = document.querySelector(".hero");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
let lightFrame = 0;
let heroBounds;
let heroVisible = true;
let lightX = 0;
let lightY = 0;
function resetHeroLight() {
    cancelAnimationFrame(lightFrame);
    lightFrame = 0;
    hero.style.removeProperty("--light-x");
    hero.style.removeProperty("--light-y");
}
function measureHero() { heroBounds = hero.getBoundingClientRect(); }
function moveHeroLight(event) {
    if (event.pointerType !== "mouse" || !heroVisible || document.hidden) return;
    if (!heroBounds) measureHero();
    lightX = Math.max(-1, Math.min(1, (event.clientX - heroBounds.left) / heroBounds.width * 2 - 1)) * 28;
    lightY = Math.max(-1, Math.min(1, (event.clientY - heroBounds.top) / heroBounds.height * 2 - 1)) * 24;
    if (lightFrame) return;
    lightFrame = requestAnimationFrame(() => {
        lightFrame = 0;
        hero.style.setProperty("--light-x", `${lightX.toFixed(1)}px`);
        hero.style.setProperty("--light-y", `${lightY.toFixed(1)}px`);
    });
}
function configureHeroLight() {
    hero.removeEventListener("pointerenter", measureHero);
    hero.removeEventListener("pointermove", moveHeroLight);
    hero.removeEventListener("pointerleave", resetHeroLight);
    resetHeroLight();
    if (!finePointer.matches || reducedMotion.matches) return;
    measureHero();
    hero.addEventListener("pointerenter", measureHero, { passive: true });
    hero.addEventListener("pointermove", moveHeroLight, { passive: true });
    hero.addEventListener("pointerleave", resetHeroLight, { passive: true });
}
configureHeroLight();
finePointer.addEventListener("change", configureHeroLight);
reducedMotion.addEventListener("change", configureHeroLight);
window.addEventListener("resize", () => { heroBounds = undefined; resetHeroLight(); });
window.addEventListener("scroll", () => { heroBounds = undefined; }, { passive: true });
document.addEventListener("visibilitychange", resetHeroLight);
window.addEventListener("pagehide", resetHeroLight);

if ("IntersectionObserver" in window) {
    const heroObserver = new IntersectionObserver(entries => {
        heroVisible = entries[0].isIntersecting;
        if (!heroVisible) resetHeroLight();
    });
    heroObserver.observe(hero);
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
