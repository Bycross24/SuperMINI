
// ===================================
// SUPERMINI - SEMANA 1
// RIU 1, 2, 3, 8, 9 y 10
// ===================================

// Usuarios ficticios.
// No utilizar contraseñas reales.
// La seguridad definitiva requiere backend.

const usuarios = {
    admin: {
        contrasena: "AdminDemo123",
        nombre: "JuanPerez",
        perfil: "admin"
    },

    user: {
        contrasena: "UserDemo123",
        nombre: "MariaPerez",
        perfil: "user"
    }
};

// Menús permitidos por perfil.

const opcionesMenu = {
    admin: [
        { id: "home", texto: "Home" },
        { id: "productos", texto: "Productos" },
        {
            id: "procesamiento",
            texto: "Procesamiento de Pedido"
        }
    ],

    user: [
        { id: "home", texto: "Home" },
        { id: "pedidos", texto: "Pedidos" },
        {
            id: "pedidos-ingresados",
            texto: "Pedido Ingresado"
        }
    ]
};

// Elementos HTML.

const formLogin = document.getElementById("formLogin");
const campoUsuario = document.getElementById("usuario");
const campoContrasena = document.getElementById("contrasena");
const mensajeError = document.getElementById("mensajeError");

const vistaLogin = document.getElementById("vistaLogin");
const vistaSistema = document.getElementById("vistaSistema");
const contenidoSistema =
    document.getElementById("contenidoSistema");

const menuPrincipal =
    document.getElementById("menuPrincipal");
const menuFooter =
    document.getElementById("menuFooter");

const datosSesion =
    document.getElementById("datosSesion");
const nombreSesion =
    document.getElementById("nombreSesion");
const btnCerrarSesion =
    document.getElementById("btnCerrarSesion");

const modalBloqueo =
    document.getElementById("modalBloqueo");
const btnAceptarBloqueo =
    document.getElementById("btnAceptarBloqueo");

const MAX_INTENTOS = 3;

// ===================================
// CONTROL DE INTENTOS DE DEMOSTRACION
// ===================================

function obtenerIntentos(usuario) {
    return Number(
        localStorage.getItem("intentos_" + usuario) || 0
    );
}

function guardarIntentos(usuario, intentos) {
    localStorage.setItem(
        "intentos_" + usuario,
        String(intentos)
    );
}

function cuentaBloqueada(usuario) {
    return obtenerIntentos(usuario) >= MAX_INTENTOS;
}

// ===================================
// MENSAJES Y MODAL
// ===================================


function mostrarError(texto) {

    mensajeError.textContent = texto;
    mensajeError.hidden = false;

    // Colocar el error debajo del campo
    // correspondiente, como en Figma.
    let campoDestino;

    if (
        texto.includes("Contraseña incorrecta") ||
        texto.includes("Intentos restantes")
    ) {
        campoDestino = campoContrasena;
    } else if (
        texto.includes("Debe completar") &&
        campoUsuario.value.trim() !== ""
    ) {
        campoDestino = campoContrasena;
    } else {
        campoDestino = campoUsuario;
    }

    campoDestino.parentElement.appendChild(
        mensajeError
    );
}

function limpiarError() {
    mensajeError.textContent = "";
    mensajeError.hidden = true;

    campoUsuario.classList.remove("input-error");
    campoContrasena.classList.remove("input-error");
}

 function mostrarBloqueo() {
     modalBloqueo.hidden = false;
     document.getElementById("mensajeBloqueo").focus();
 }

// ===================================
// LOGIN
// ===================================

formLogin.addEventListener("submit", function (event) {

    event.preventDefault();
    limpiarError();

    const usuario = campoUsuario.value.trim();
    const contrasena = campoContrasena.value;

    // Campos obligatorios.
    if (usuario === "" || contrasena === "") {

        mostrarError(
            "Debe completar usuario y contraseña."
        );

        if (usuario === "") {
            campoUsuario.classList.add("input-error");
        }

        if (contrasena === "") {
            campoContrasena.classList.add("input-error");
        }

        return;
    }

    // Usuario inexistente.
    if (!Object.hasOwn(usuarios, usuario)) {
        mostrarError(
            "El usuario ingresado no existe " +
            "en la base de datos del sistema."
        );

        campoUsuario.classList.add("input-error");
        campoContrasena.value = "";
        return;
    }

    // Cuenta bloqueada.
    if (cuentaBloqueada(usuario)) {
        mostrarBloqueo();
        return;
    }

    const datos = usuarios[usuario];

    // Contraseña incorrecta.
    if (datos.contrasena !== contrasena) {

        const intentos = obtenerIntentos(usuario) + 1;
        guardarIntentos(usuario, intentos);

        campoContrasena.value = "";
        campoContrasena.classList.add("input-error");

        if (intentos >= MAX_INTENTOS) {
            mostrarBloqueo();
            return;
        }

        mostrarError(
            "Contraseña incorrecta. Intentos restantes: " +
            (MAX_INTENTOS - intentos)
        );

        return;
    }

    // Inicio de sesión correcto.
    guardarIntentos(usuario, 0);

    sessionStorage.setItem("supermini_usuario", usuario);
    sessionStorage.setItem("supermini_perfil", datos.perfil);

    formLogin.reset();
    location.hash = "home";
    mostrarSistema();
});

// ===================================
// NAVEGACION
// ===================================


function crearEnlaces(perfil) {

    const opciones = opcionesMenu[perfil];

    menuPrincipal.replaceChildren();
    menuFooter.replaceChildren();

    opciones.forEach(opcion => {

        const enlaceHeader = document.createElement("a");
        enlaceHeader.href = "#" + opcion.id;
        enlaceHeader.textContent = opcion.texto;
        enlaceHeader.dataset.vista = opcion.id;

        const enlaceFooter = document.createElement("a");
        enlaceFooter.href = "#" + opcion.id;
        enlaceFooter.textContent = opcion.texto;

        menuPrincipal.appendChild(enlaceHeader);
        menuFooter.appendChild(enlaceFooter);
    });

    agregarEnlacesFooter();
}

// Enlaces adicionales del footer
function agregarEnlacesFooter() {

    const enlacesExtra = [
        {
            texto: "Contacto/Soporte",
            url: "mailto:soporte@ejemplo.com"
        },
        {
            texto: "Instagram",
            url: "https://www.instagram.com/"
        },
        {
            texto: "Facebook",
            url: "https://www.facebook.com/"
        }
    ];

    enlacesExtra.forEach(enlace => {

        const a = document.createElement("a");

        a.textContent = enlace.texto;
        a.href = enlace.url;

        if (enlace.url.startsWith("https://")) {
            a.target = "_blank";
            a.rel = "noopener noreferrer";
        }

        menuFooter.appendChild(a);
    });
}


function crearTarjeta(titulo, boton, destino) {
    return `
        <article class="tarjeta">
            <h3>${titulo}</h3>
            <a class="btn-tarjeta" href="#${destino}">
                ${boton}
            </a>
        </article>
    `;
}

function mostrarDashboard(perfil, nombre) {

    let tarjetas = "";

    if (perfil === "admin") {

        tarjetas += crearTarjeta(
            "Gestionar productos",
            "Ingresar",
            "productos"
        );

        tarjetas += crearTarjeta(
            "Procesamiento de pedido",
            "Ver",
            "procesamiento"
        );

    } else {

        tarjetas += crearTarjeta(
            "Ingresar pedido",
            "Ingresar",
            "pedidos"
        );

        tarjetas += crearTarjeta(
            "Pedido Ingresado",
            "Ver",
            "pedidos-ingresados"
        );
    }

    contenidoSistema.innerHTML = `
        <h2 class="bienvenida">
            ¡Bienvenido, ${nombre}!
        </h2>

        <div class="tarjetas">
            ${tarjetas}
        </div>
    `;
}



function mostrarModulo(vista, perfil) {

    const titulos = {
        productos: "Productos",
        procesamiento: "Procesamiento de Pedido",
        pedidos: "Pedidos",
        "pedidos-ingresados": "Pedido Ingresado"
    };

    const titulo = titulos[vista];

    // Estas funcionalidades corresponden
    // a la programación de la semana 2.

    contenidoSistema.innerHTML = `
        <h2>${titulo}</h2>
        <div class="aviso-modulo">
            <h3>Módulo en desarrollo</h3>
            <p>
                Esta interfaz se implementará
                en el siguiente avance,
                de acuerdo con los RIU del
                perfil ${perfil}.
            </p>
            <a href="#home" class="btn-tarjeta">
                Volver a Home
            </a>
        </div>
    `;
}

function actualizarMenuActivo(vista) {

    menuPrincipal.querySelectorAll("a").forEach(enlace => {

        const activo = enlace.dataset.vista === vista;

        enlace.classList.toggle("activo", activo);

        if (activo) {
            enlace.setAttribute("aria-current", "page");
        } else {
            enlace.removeAttribute("aria-current");
        }
    });
}

function mostrarVista() {

    const usuario = sessionStorage.getItem("supermini_usuario");
    const perfil = sessionStorage.getItem("supermini_perfil");

    // Verificación de la sesión demostrativa.
    if (
        !usuario ||
        !Object.hasOwn(usuarios, usuario) ||
        usuarios[usuario].perfil !== perfil
    ) {
        cerrarSesion();
        return;
    }

    const vista = location.hash.slice(1) || "home";

    // Evita navegación entre los perfiles.
    const permitido = opcionesMenu[perfil].some(
        opcion => opcion.id === vista
    );

    if (!permitido) {
        location.hash = "home";
        return;
    }

    actualizarMenuActivo(vista);

    if (vista === "home") {
        mostrarDashboard(perfil, usuarios[usuario].nombre);
    } else {
        mostrarModulo(vista, perfil);
    }
}

function mostrarSistema() {

    const usuario = sessionStorage.getItem("supermini_usuario");
    const perfil = sessionStorage.getItem("supermini_perfil");

    if (
        !usuario ||
        !Object.hasOwn(usuarios, usuario) ||
        usuarios[usuario].perfil !== perfil
    ) {
        cerrarSesion();
        return;
    }

    vistaLogin.hidden = true;
    vistaSistema.hidden = false;
    datosSesion.hidden = false;

    nombreSesion.textContent = usuarios[usuario].nombre;

    crearEnlaces(perfil);
    mostrarVista();
}

// ===================================
// CERRAR SESION
// ===================================

function cerrarSesion() {

    sessionStorage.removeItem("supermini_usuario");
    sessionStorage.removeItem("supermini_perfil");

    vistaSistema.hidden = true;
    vistaLogin.hidden = false;
    datosSesion.hidden = true;

    menuPrincipal.innerHTML = '<a href="#home">Home</a>';
    menuFooter.replaceChildren();

    const enlaceHome = document.createElement("a");
    enlaceHome.href = "#home";
    enlaceHome.textContent = "Home";

    menuFooter.appendChild(enlaceHome);
    agregarEnlacesFooter();

    contenidoSistema.replaceChildren();

    limpiarError();
    formLogin.reset();

    history.replaceState(
        null,
        "",
        location.pathname + location.search
    );
}

btnCerrarSesion.addEventListener("click", cerrarSesion);

// Verificar cada cambio de vista.
window.addEventListener("hashchange", function () {

    if (sessionStorage.getItem("supermini_usuario")) {
        mostrarVista();
    }
});

// Restaurar sesión en la misma pestaña.
if (sessionStorage.getItem("supermini_usuario")) {
    mostrarSistema();
} else {
    cerrarSesion();
}
