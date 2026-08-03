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

hamburgerBtn.addEventListener("click", () => {
    hamburgerBtn.classList.toggle("active");
    navLinks.classList.toggle("active");
});

// Cierra el menú automáticamente al tocar un link
navLinks.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        hamburgerBtn.classList.remove("active");
        navLinks.classList.remove("active");
    });
});