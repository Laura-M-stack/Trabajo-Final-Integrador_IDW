
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formPresupuesto");
  const listaServicios = document.getElementById("listaServicios");
  const valorTotal = document.getElementById("valorTotal");
  const tablaPresupuestos = document.getElementById("tablaPresupuestos");
  const salonSelect = document.getElementById("salon");

  let servicios = [];
  let presupuestos = [];
  let salones = [];

  function cargarDatosIniciales() {
    const servLS = localStorage.getItem("servicios");
    if (servLS) {
      servicios = JSON.parse(servLS);
      renderServiciosCheckbox();
    } else {
      fetch("../data/servicios.json")
        .then(r => r.json())
        .then(data => {
          servicios = data;
          localStorage.setItem("servicios", JSON.stringify(data));
          renderServiciosCheckbox();
        });
    }

    const presLS = localStorage.getItem("presupuestos");
    if (presLS) {
      presupuestos = JSON.parse(presLS);
    } else {
      fetch("../data/presupuestos.json")
        .then(r => r.json())
        .then(data => {
          presupuestos = data;
          localStorage.setItem("presupuestos", JSON.stringify(data));
          renderPresupuestos();
        });
    }

    const salLS = localStorage.getItem("salones");
    if (salLS) {
      salones = JSON.parse(salLS);
      renderSalones();
    } else {
      fetch("../data/salones.json")
        .then(r => r.json())
        .then(data => {
          salones = data.salones;
          localStorage.setItem("salones", JSON.stringify(salones));
          renderSalones();
        });
    }

    renderPresupuestos();
  }

  function renderSalones() {
    salonSelect.innerHTML = '<option value="" disabled selected>Seleccioná un salón</option>';
    salones.forEach((salon, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = `${salon.nombre} ($${salon.precio.toLocaleString("es-AR")})`;
      salonSelect.appendChild(option);
    });
  }

  function renderServiciosCheckbox() {
    listaServicios.innerHTML = "";
    servicios.forEach((servicio, index) => {
      const col = document.createElement("div");
      col.className = "col-md-4";
      col.innerHTML = `
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="${index}" id="servicio${index}">
          <label class="form-check-label" for="servicio${index}">
            ${servicio.descripcion} ($${servicio.valor.toLocaleString("es-AR")})
          </label>
        </div>`;
      listaServicios.appendChild(col);
    });
  }

  function calcularTotal() {
    let total = 0;

    servicios.forEach((servicio, index) => {
      const checkbox = document.getElementById("servicio" + index);
      if (checkbox && checkbox.checked) {
        total += servicio.valor;
      }
    });

    const selectedSalonIndex = salonSelect.value;
    if (selectedSalonIndex !== "") {
      total += salones[selectedSalonIndex].precio;
    }

    valorTotal.textContent = total.toLocaleString("es-AR");
    return total;
  }

  listaServicios.addEventListener("change", calcularTotal);
  salonSelect.addEventListener("change", calcularTotal);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const fecha = document.getElementById("fecha").value;
    const tematica = document.getElementById("tematica").value.trim();
    const salonIndex = salonSelect.value;
    const salon = salones[salonIndex];

    const serviciosSeleccionados = [];
    servicios.forEach((servicio, index) => {
      const checkbox = document.getElementById("servicio" + index);
      if (checkbox && checkbox.checked) {
        serviciosSeleccionados.push(servicio.descripcion);
      }
    });

    const total = calcularTotal();

    const presupuesto = {
      nombre,
      fecha,
      tematica,
      salon: salon.nombre,
      precioSalon: salon.precio,
      servicios: serviciosSeleccionados,
      total
    };

    presupuestos.push(presupuesto);
    localStorage.setItem("presupuestos", JSON.stringify(presupuestos));

    form.reset();
    renderServiciosCheckbox();
    renderPresupuestos();
    valorTotal.textContent = "0";
  });

  function renderPresupuestos() {
    tablaPresupuestos.innerHTML = "";
    if (presupuestos.length === 0) {
      tablaPresupuestos.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No hay presupuestos guardados</td></tr>';
      return;
    }

    presupuestos.forEach((p, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${i + 1}</td>
        <td>${p.nombre}</td>
        <td>${p.fecha}</td>
        <td>${p.tematica}</td>
        <td>${p.salon} - ${p.servicios.join(", ")}</td>
        <td>$${p.total.toLocaleString("es-AR")}</td>`;
      tablaPresupuestos.appendChild(row);
    });
  }

  cargarDatosIniciales();
});
