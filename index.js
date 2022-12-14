//clase cuota
class Cuota {
  constructor(numeroCuota, fecha, mensualidad, pagocapital, pagointeres, credito) {
    this.numeroCuota = numeroCuota;
    this.fecha = fecha;
    this.mensualidad = mensualidad;
    this.pagocapital = pagocapital;
    this.pagointeres = pagointeres;
    this.credito = credito;
  }
}

//Array de almacenacimiento de objetos clase Cuota
let totalCuotas = [];

//funcion calcularCredito
function calcularCredito(credito, cuotas, interes) {
  let numeroCuota = 1;
  let pagocapital = 0;
  let pagointeres = 0;
  let mensualidad = 0;
  let fecha = new Date();
//variables para calcular el total a pagar
  let tcuota = 0;
  let tcapital = 0;
  let tinteres = 0;

  mensualidad =(credito * ((Math.pow(1 + interes / 100, cuotas) * interes) / 100)) / (Math.pow(1 + interes / 100, cuotas) - 1);

  for (let i = 1; i <= cuotas; i++) {
    // Calcula la fecha de pago de la cuota
    fecha.setMonth(fecha.getMonth() + 1);
    fecha.setDate(1);

    pagointeres = parseFloat(credito * (interes / 100));
    pagocapital = mensualidad - pagointeres;
    credito = parseFloat(credito - pagocapital);

    let cuota = new Cuota(
      numeroCuota,
      fecha,
      mensualidad,
      pagocapital,
      pagointeres,
      credito
    );
    totalCuotas.push(cuota);

    let row = document.createElement("tr");
    row.innerHTML = `<td>${numeroCuota}</td>
                   <td>${fecha.toDateString()}</td>
                   <td>${mensualidad.toFixed(2)}</td>
                   <td>${pagocapital.toFixed(2)}</td>
                   <td>${pagointeres.toFixed(2)}</td>
                   <td>${credito.toFixed(2)}</td>
                  `;
    let tabla = document.getElementById("tbody");
    tabla.append(row);

    numeroCuota++;
  }

  //calcular el total pagado en interes, capital y cuotas
  for (let i = 0; i < totalCuotas.length; i++) {
    tcuota += totalCuotas[i].mensualidad;
    tcapital += totalCuotas[i].pagocapital;
    tinteres += totalCuotas[i].pagointeres;
  }

  let totalCuota = document.getElementById("totalCuota");
  totalCuota.innerHTML = tcuota.toFixed(2);

  let totalCapital = document.getElementById("totalCapital");
  totalCapital.innerHTML = tcapital.toFixed(2);

  let totalInteres = document.getElementById("totalInteres");
  totalInteres.innerHTML = tinteres.toFixed(2);

  // Convertir el array de objetos 'totalCuotas' a una cadena de texto JSON
  let totalCuotasJSONString = JSON.stringify(totalCuotas);

  // Almacenar la cadena JSON en el almacenamiento local
  localStorage.setItem("totalCuotas", totalCuotasJSONString);

  // Recuperar la cadena JSON del almacenamiento local
  let totalCuotasJSONFromStorage = localStorage.getItem("totalCuotas");

  // Convertir la cadena JSON a un array de objetos
  let totalCuotasArray = JSON.parse(totalCuotasJSONFromStorage);

  console.log("totalCuotasJSONString");
  console.log(totalCuotasJSONString);
  console.log("totalCuotasJSONFromStorage");
  console.log(totalCuotasJSONFromStorage);
  console.log("totalCuotasArray");
  console.log(totalCuotasArray);
}

//funcion limpiar la tabla - borrar
function limpiarTabla() {
  let tabla = document.getElementById("tbody");
  tabla.innerHTML = "";
  let filaTotales = document.getElementById("filaTotales");
  filaTotales.parentNode.removeChild(filaTotales);
  }
  
let credito = document.getElementById("credito");
let cuotas = document.getElementById("cuotas");
let interes = document.getElementById("interes");
let btnSimular = document.getElementById("btnSimular");
let tabla = document.getElementById("tbody");

let nombre = document.getElementById("nombre");
let fecha = document.getElementById("fecha");

//boton simular - llamado a funcion calcularCredito
let simulationDone = false;
btnSimular.addEventListener("click", () => {
  if (!simulationDone) {
    calcularCredito(credito.value, cuotas.value, interes.value);
    simulationDone = true;
  }
});

// manejador de evento para el bot??n Borrar - llama a la funci??n para limpiar la tabla
document.getElementById("btnBorrar").addEventListener("click", function () {
  limpiarTabla();
});

// localStorage
nombre.addEventListener("input", () => {
  localStorage.setItem("nombre", nombre.value);
});
fecha.addEventListener("input", () => {
  localStorage.setItem("fecha", fecha.value);
});
credito.addEventListener("input", () => {
  localStorage.setItem("credito", credito.value);
});
cuotas.addEventListener("input", () => {
  localStorage.setItem("cuotas", cuotas.value);
});
interes.addEventListener("input", () => {
  localStorage.setItem("interes", interes.value);
});

window.addEventListener("load", () => {
  nombre.value = localStorage.getItem("nombre");
  fecha.value = localStorage.getItem("fecha");
  credito.value = localStorage.getItem("credito");
  cuotas.value = localStorage.getItem("cuotas");
  interes.value = localStorage.getItem("interes");
  // localStorage.clear();
});
