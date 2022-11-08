// Exercise 7
const formulario = document.getElementById("form");
const inputs = document.querySelectorAll("#form input");
const button = document.querySelector("#btn");

// Expresiones regulares:
const expressions = {
  telefono: /^[0-9]{9}$/,
  contraseña: /^[a-zA-Z0-9._-]{4,8}$/,
  mail: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
  direccion: /^[a-zA-Z0-9/ªº\.\.\-\s\,]{3,50}$/,
  nombre: /^[a-zA-ZÀ-ÿ\s]{3,20}$/,
  apellido: /^[a-zA-ZÀ-ÿ]{3,20}$/,
};

let campos = {
  telefono: false,
  contraseña: false,
  mail: false,
  direccion: false,
  nombre: false,
  apellido: false,
};

const validar = (expresion, id, campo) => {
  if (expresion.test(id.value)) {
    id.classList.remove("is-invalid");
    id.classList.add("is-valid");
    campos[campo] = true;
    console.log("--> CAMPOOS", campos);
  } else {
    id.classList.remove("is-valid");
    id.classList.add("is-invalid");
    campo = false;
  }
};

const validarFormulario = (e) => {
  switch (e.target.id) {
    case "fName":
      validar(expressions.nombre, fName, "nombre");
      break;
    case "fLastN":
      validar(expressions.apellido, fLastN, "apellido");
      break;
    case "fEmail":
      validar(expressions.mail, fEmail, "mail");
      break;
    case "fAddress":
      validar(expressions.direccion, fAddress, "direccion");
      break;
    case "fPhone":
      validar(expressions.telefono, fPhone, "telefono");
      break;
    case "fPassword":
      validar(expressions.contraseña, fPassword, "contraseña");
      break;
  }
  if (
    campos.nombre &&
    campos.apellido &&
    campos.direccion &&
    campos.mail &&
    campos.telefono &&
    campos.contraseña
  ) {
    button.removeAttribute("disabled");
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

// Bloquear botón:
/* formulario.addEventListener("button", (e) => {
  e.preventDefault(); */
