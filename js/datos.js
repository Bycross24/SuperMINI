// ===================================
// SUPERMINI - DATOS Y UTILIDADES
// Base local compartida (Semana 2)
// ===================================

const CLAVE_PRODUCTOS = "supermini_productos_figma_v6";
const CLAVE_PEDIDOS = "supermini_pedidos_figma_v6";

let pedidoEnEdicionId = null;

const PRODUCTOS_INICIALES = [
    { id: "PRO-000001", nombre: "Arroz grano largo 1 kg", cantidad: 120, valor: 1490, estado: "Habilitado" },
    { id: "PRO-000002", nombre: "Aceite vegetal 1 L", cantidad: 85, valor: 2590, estado: "Habilitado" },
    { id: "PRO-000003", nombre: "Leche entera 1 L", cantidad: 96, valor: 1190, estado: "Habilitado" },
    { id: "PRO-000004", nombre: "Azúcar granulada 1 kg", cantidad: 0, valor: 1390, estado: "Deshabilitado" },
    { id: "PRO-000005", nombre: "Fideos espagueti 400 g", cantidad: 150, valor: 990, estado: "Habilitado" },
    { id: "PRO-000006", nombre: "Café instantáneo 170 g", cantidad: 0, valor: 4990, estado: "Deshabilitado" }
];

const PEDIDOS_INICIALES = [
    {
        id: "PED-001026",
        fecha: "16/10/2026",
        cliente: {
            nombre: "María González López",
            run: "12.345.678-5",
            telefono: "+56 9 6123 4587",
            correo: "maria.gonzalez@example.com",
            direccion: "Av. Los Pinos 245, Santiago"
        },
        items: [
            { productId: "PRO-000001", producto: "Arroz grano largo 1 kg", cantidad: 7, valorUnitario: 1490, valorVenta: 10430 },
            { productId: "PRO-000002", producto: "Aceite vegetal 1 L", cantidad: 8, valorUnitario: 2590, valorVenta: 20720 },
            { productId: "PRO-000003", producto: "Leche entera 1 L", cantidad: 10, valorUnitario: 1190, valorVenta: 11900 },
            { productId: "PRO-000005", producto: "Fideos espagueti 400 g", cantidad: 6, valorUnitario: 990, valorVenta: 5940 }
        ],
        total: 48990,
        estadoProceso: "Pendiente",
        vb: "",
        destino: ""
    },
    {
        id: "PED-001025",
        fecha: "17/10/2026",
        cliente: {
            nombre: "Carlos Muñoz Pérez",
            run: "15.876.432-1",
            telefono: "+56 9 7234 5698",
            correo: "carlos.munoz@example.com",
            direccion: "Calle 1 Norte 890, Talca"
        },
        items: [
            { productId: "PRO-000003", producto: "Leche entera 1 L", cantidad: 14, valorUnitario: 1190, valorVenta: 16660 },
            { productId: "PRO-000005", producto: "Fideos espagueti 400 g", cantidad: 16, valorUnitario: 990, valorVenta: 15840 }
        ],
        total: 32500,
        estadoProceso: "Pendiente",
        vb: "",
        destino: ""
    },
    {
        id: "PED-001024", fecha: "16/10/2026",
        cliente: { nombre: "Camila Rojas Silva", run: "12.345.678-5", telefono: "+56 9 8345 6709", correo: "camila.rojas@example.com", direccion: "Talca, Chile" },
        items: [
            { productId: "PRO-000002", producto: "Aceite vegetal 1 L", cantidad: 4, valorUnitario: 2590, valorVenta: 10360 },
            { productId: "PRO-000003", producto: "Leche entera 1 L", cantidad: 50, valorUnitario: 1190, valorVenta: 59500 },
            { productId: "PRO-000005", producto: "Fideos espagueti 400 g", cantidad: 6, valorUnitario: 990, valorVenta: 5940 }
        ], total: 75800, estadoProceso: "Pendiente", vb: "", destino: ""
    },
    {
        id: "PED-001023", fecha: "16/10/2026",
        cliente: { nombre: "Diego Fernández Soto", run: "12.345.678-5", telefono: "+56 9 9456 7810", correo: "diego.fernandez@example.com", direccion: "Talca, Chile" },
        items: [
            { productId: "PRO-000001", producto: "Arroz grano largo 1 kg", cantidad: 1, valorUnitario: 1490, valorVenta: 1490 },
            { productId: "PRO-000002", producto: "Aceite vegetal 1 L", cantidad: 5, valorUnitario: 2590, valorVenta: 12950 },
            { productId: "PRO-000003", producto: "Leche entera 1 L", cantidad: 3, valorUnitario: 1190, valorVenta: 3570 },
            { productId: "PRO-000005", producto: "Fideos espagueti 400 g", cantidad: 2, valorUnitario: 990, valorVenta: 1980 }
        ], total: 19990, estadoProceso: "Pendiente", vb: "", destino: ""
    },
    {
        id: "PED-001022", fecha: "16/10/2026",
        cliente: { nombre: "Valentina Torres Díaz", run: "12.345.678-5", telefono: "+56 9 5567 8921", correo: "valentina.torres@example.com", direccion: "Talca, Chile" },
        items: [
            { productId: "PRO-000003", producto: "Leche entera 1 L", cantidad: 10, valorUnitario: 1190, valorVenta: 11900 },
            { productId: "PRO-000005", producto: "Fideos espagueti 400 g", cantidad: 45, valorUnitario: 990, valorVenta: 44550 }
        ], total: 56450, estadoProceso: "Pendiente", vb: "", destino: ""
    },
    {
        id: "PED-001021", fecha: "16/10/2026",
        cliente: { nombre: "Javier Morales Castro", run: "12.345.678-5", telefono: "+56 9 6678 9032", correo: "javier.morales@example.com", direccion: "Talca, Chile" },
        items: [
            { productId: "PRO-000003", producto: "Leche entera 1 L", cantidad: 8, valorUnitario: 1190, valorVenta: 9520 },
            { productId: "PRO-000005", producto: "Fideos espagueti 400 g", cantidad: 32, valorUnitario: 990, valorVenta: 31680 }
        ], total: 41200, estadoProceso: "Pendiente", vb: "", destino: ""
    }
];

function inicializarDatos() {
    if (!localStorage.getItem(CLAVE_PRODUCTOS)) {
        localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(PRODUCTOS_INICIALES));
    }
    if (!localStorage.getItem(CLAVE_PEDIDOS)) {
        localStorage.setItem(CLAVE_PEDIDOS, JSON.stringify(PEDIDOS_INICIALES));
    }
}

function obtenerProductos() {
    inicializarDatos();
    return JSON.parse(localStorage.getItem(CLAVE_PRODUCTOS));
}

function guardarProductos(lista) {
    localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(lista));
}

function obtenerPedidos() {
    inicializarDatos();
    return JSON.parse(localStorage.getItem(CLAVE_PEDIDOS));
}

function guardarPedidos(lista) {
    localStorage.setItem(CLAVE_PEDIDOS, JSON.stringify(lista));
}

function productoEnUsoEnPedidos(productId) {
    const pedidos = obtenerPedidos();
    return pedidos.some(pedido =>
        pedido.items.some(item => item.productId === productId)
    );
}

function escaparHTML(valor) {
    return String(valor ?? "").replace(/[&<>"']+/g, texto => Array.from(texto).map(caracter => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[caracter]).join(""));
}

function formatearCLP(monto) {
    const numero = Number(monto) || 0;
    return "$ " + numero.toLocaleString("es-CL");
}

function abrirModalAviso(titulo, mensaje, tipo = "alerta", alAceptar = null) {
    const modal = document.getElementById("modalSistema");
    const icono = document.getElementById("iconoModalSistema");
    const tituloEl = document.getElementById("tituloModalSistema");
    const textoEl = document.getElementById("textoModalSistema");
    const accionesEl = document.getElementById("accionesModalSistema");

    tituloEl.textContent = titulo;
    textoEl.textContent = mensaje;
    // Los mockups presentan alertas diferentes según su contexto.
    modal.className = 'modal';
    modal.classList.toggle('modal-error', tipo === 'alerta');
    if (titulo === 'Selección requerida') modal.classList.add('modal-seleccion');
    if (mensaje.startsWith('No se puede deshabilitar') || mensaje.startsWith('No se puede eliminar')) modal.classList.add('modal-restriccion');

    if (tipo === "exito") {
        icono.textContent = "✓";
        icono.style.color = "#15803d";
    } else {
        icono.textContent = "!";
        icono.style.color = "#d92d20";
    }

    accionesEl.innerHTML = `
        <button type="button" id="btnModalOk" class="btn-accion btn-amarillo">
            Aceptar
        </button>
    `;

    modal.hidden = false;
    document.getElementById("btnModalOk").onclick = function () {
        modal.hidden = true;
        if (typeof alAceptar === "function") alAceptar();
    };
}

function abrirModalConfirmacion(titulo, mensaje, alConfirmar) {
    const modal = document.getElementById("modalSistema");
    const icono = document.getElementById("iconoModalSistema");
    const tituloEl = document.getElementById("tituloModalSistema");
    const textoEl = document.getElementById("textoModalSistema");
    const accionesEl = document.getElementById("accionesModalSistema");

    icono.textContent = "?";
    icono.style.color = "#3f4e5f";
    tituloEl.textContent = titulo;
    textoEl.textContent = mensaje;
    modal.className = 'modal modal-confirmacion';
    if (titulo === 'Eliminar producto') modal.classList.add('modal-producto-eliminar');
    if (titulo === 'Volver') modal.classList.add('modal-producto-volver');
    if (titulo === 'Borrar producto nuevo') modal.classList.add('modal-producto-borrar-nuevo');
    if (titulo === 'Borrar producto editado') modal.classList.add('modal-producto-borrar-editar');
    if (titulo === 'Eliminar pedido') modal.classList.add('modal-pedido-eliminar');
    if (titulo === 'Confirmar acción') modal.classList.add('modal-pedido-borrar');

    accionesEl.innerHTML = `
        <button type="button" id="btnModalCancelar" class="btn-accion btn-gris">
            Cancelar
        </button>
        <button type="button" id="btnModalConfirmar" class="btn-accion btn-rojo">
            Confirmar
        </button>
    `;

    modal.hidden = false;

    document.getElementById("btnModalCancelar").onclick = function () {
        modal.hidden = true;
    };

    document.getElementById("btnModalConfirmar").onclick = function () {
        modal.hidden = true;
        if (typeof alConfirmar === "function") alConfirmar();
    };
}