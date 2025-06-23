
document.addEventListener("DOMContentLoaded", () => { 
  const tablaServicios = document.getElementById("tablaServicios");
  const btnNuevoServicio = document.getElementById("btnNuevoServicio");
  const modalServicio = new bootstrap.Modal(document.getElementById("modalServicio"));
  const formServicio = document.getElementById("formServicio");
  const descripcionInput = document.getElementById("descripcion");
  const valorInput = document.getElementById("valor");
  const servicioIdInput = document.getElementById("servicioId");

  let servicios = [];

  function cargarServicios() {
    const datosLS = localStorage.getItem("servicios");
    if (datosLS) {
      servicios = JSON.parse(datosLS);
      renderServicios();
    } else {
      fetch("../data/servicios.json")
        .then(response => response.json())
        .then(data => {
          servicios = data;
          localStorage.setItem("servicios", JSON.stringify(servicios));
          renderServicios();
        });
    }
  }

  let editIndex = null;

  function renderServicios() {
    tablaServicios.innerHTML = "";

    if (servicios.length === 0) {
      tablaServicios.innerHTML = '<tr><td colspan="4" class="text-center text-muted">No hay servicios registrados</td></tr>';
      return;
    }

    servicios.forEach((servicio, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${servicio.descripcion}</td>
        <td>$${servicio.valor.toLocaleString("es-AR")}</td>
        <td>
          <button class="btn btn-sm btn-warning me-1" onclick="editarServicio(${index})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarServicio(${index})">Eliminar</button>
        </td>`;
      tablaServicios.appendChild(row);
    });
  }

  btnNuevoServicio.addEventListener("click", () => {
    formServicio.reset();
    editIndex = null;
    modalServicio.show();
  });

  formServicio.addEventListener("submit", (e) => {
    e.preventDefault();
    const descripcion = descripcionInput.value.trim();
    const valor = parseFloat(valorInput.value);

    if (!descripcion || isNaN(valor)) return;

    const nuevoServicio = { descripcion, valor };

    if (editIndex !== null) {
      servicios[editIndex] = nuevoServicio;
    } else {
      servicios.push(nuevoServicio);
    }

    localStorage.setItem("servicios", JSON.stringify(servicios));
    renderServicios();
    modalServicio.hide();
  });

  window.editarServicio = (index) => {
    editIndex = index;
    const servicio = servicios[index];
    descripcionInput.value = servicio.descripcion;
    valorInput.value = servicio.valor;
    modalServicio.show();
  };

  window.eliminarServicio = (index) => {
    if (confirm("¿Estás seguro de eliminar este servicio?")) {
      servicios.splice(index, 1);
      localStorage.setItem("servicios", JSON.stringify(servicios));
      renderServicios();
    }
  };

  cargarServicios();
});
