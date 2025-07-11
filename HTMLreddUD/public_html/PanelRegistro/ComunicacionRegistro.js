import {showFieldError} from './RegistroJS.js';
import {clearFieldError} from './RegistroJS.js';
import {showSuccess} from './RegistroJS.js';
import {createConfetti} from './RegistroJS.js';

let botonRegistro = document.getElementById("submitBtn");

botonRegistro.addEventListener("click", evento => {
    evento.preventDefault(); 
    hacerRegistro();
});

let hacerRegistro = async() => {
    let campos = {};



    campos.correo = document.getElementById("email").value.trim();
    campos.nombreUsuario = document.getElementById("username").value.trim();
    campos.contrasena = document.getElementById("password").value;

    campos.genero = document.querySelector('input[name="gender"]:checked')?.value;

    // Obtener intereses seleccionados (checkboxes)
    campos.intereses = Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(cb => cb.value);


const peticion = await fetch("http://localhost:9000/api/user/signup",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campos)

        });

if (peticion.ok) {
    const data = await peticion.json();
    // Redirigir al usuario o actualizar la UI
    showSuccess();
    
    setTimeout(() => {
        window.location.href = "../PanelLogin/LoginHTML.html";
    }, 2500); 
} else {
    const errorData = await peticion.text(); // O .json() si el backend devuelve JSON de error
    showFieldError(this,"Error en el Registro. Intentalo nuevamente");
}
};


