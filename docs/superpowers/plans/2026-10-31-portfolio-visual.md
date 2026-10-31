# Portfolio: refinamiento visual y movimiento

## Alcance autorizado
Etapas 1, 2, 3, 4 y 6: composici?n responsive, entrada del Hero, continuidad al hacer scroll, protagonismo de Fatu, microinteracciones, iluminaci?n est?tica y control accesible de pausa. CSS, JavaScript y APIs nativas. Sin cambios de textos personales, dependencias nuevas, commits ni push.

## Implementaci?n
- Hero con secuencia nativa de 480 ms y separaci?n de 45 ms entre elementos; contenido visible por defecto y finalizaci?n inmediata al activar movimiento reducido.
- Fatu con dos columnas desde 1000 px y una columna en dispositivos angostos; conserva capturas y descripci?n completa.
- Estados de hover, foco y presi?n; iluminaci?n est?tica celeste/violeta detr?s del retrato.
- Pausa expl?cita de la cinta, adem?s de pausa fuera de pantalla y con pesta?a oculta; preferencia del usuario conservada durante la sesi?n de p?gina.
- Cinco versiones WebP con originales como fallback mediante picture. Dimensiones expl?citas, decodificaci?n as?ncrona y carga diferida debajo del Hero.

## Verificaci?n realizada
- JavaScript: node --check js/main.js, sin errores.
- git diff --check, sin errores.
- Comparaci?n autom?tica de textos y enlaces: originales conservados; ?nico texto nuevo corresponde al control autorizado.
- Hashes de los cinco archivos de imagen originales: id?nticos.
- Recursos locales referenciados: presentes.
- Chrome mediante CDP: 1440, 768, 390 y 320 px sin desbordamiento horizontal; las cinco im?genes WebP cargadas.
- Men? m?vil y Escape, carrusel anterior/siguiente, pausa/reanudaci?n y cambio din?mico de prefers-reduced-motion: comprobados.
- Capturas inspeccionadas: Hero de escritorio y Fatu en escritorio y celular; artefactos temporales fuera del repositorio.

## Limitaciones
Playwright Interactive no pudo ejecutarse: js_repl no est? disponible. Se utiliz? Chrome mediante CDP sin instalar dependencias. No se prob? en tel?fonos f?sicos ni en otros motores de navegador. No se midieron Core Web Vitals ni se comprob? disponibilidad remota de enlaces externos; sus destinos permanecen intactos.


## Segunda mejora autorizada: siete propuestas
- CSS consolidado por componente y media query; Chrome comprueba ausencia de selectores duplicados en un mismo ambito.
- Luz del Hero con desplazamiento maximo de 28 px horizontal y 24 px vertical; solamente mouse fino, una escritura por frame y transicion CSS. Sin render loop permanente. Se restablece con movimiento reducido, salida del Hero o pestana oculta.
- Entrada del nombre en dos partes con 65 ms de separacion y 650 ms de duracion. Encabezado y contenido accesible conservados.
- Rol de 16 a 20 px y mayor peso; mismo texto original.
- Ritmo vertical reducido: Tecnologias/Proyectos suma ahora 120 px de padding en escritorio frente a 208 px anteriores; Hero sin altura minima forzada.
- Tarjeta con elevacion moderada y borde de foco. Sin inclinacion.
- Enlace al sitio reubicado debajo de las tecnologias de Fatu, estilo primario celeste y minimo 48 px de alto; href, target y rel intactos.
- Carrusel con fundido de 320 ms, espera de decodificacion antes de reemplazar una captura, ultima solicitud prioritaria y recuperacion si falla la imagen. Sin autoplay.
- Corregida la codificacion de la etiqueta inicial del control de pausa; informacion personal sin cambios.

Verificacion de esta etapa: node --check y git diff --check correctos. Comparacion de encabezados, parrafos, etiquetas y destinos de enlaces con el original: intactos. Chrome/CDP en 1440, 1024, 768, 390 y 320 px: sin overflow y con imagenes cargadas. Revisadas capturas de Hero y Fatu en escritorio y celular. Comprobados menu/Escape, navegacion con mouse, destinos internos, archivo del CV, pausa/reanudacion, carrusel anterior/siguiente, clics rapidos, vuelta al inicio, fallo simulado de decodificacion, luz con mouse y ausencia de reaccion a entrada tactil, cambio dinamico de movimiento reducido. Sin excepciones JavaScript sin capturar. Capturas en el directorio temporal, fuera del repositorio. Playwright Interactive no disponible; no se probo en telefonos fisicos ni otros motores. Sin dependencias nuevas, commits ni push.
