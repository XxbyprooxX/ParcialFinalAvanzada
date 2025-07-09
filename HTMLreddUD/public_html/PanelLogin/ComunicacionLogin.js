/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

let boton = document.getElementById("loginButton");

boton.addEventListener("click", evento => {
    hacerLogin();
});

let hacerLogin = async() => {
    let campos = {};

    campos.nombreUsuario = document.getElementById("email").value;
    campos.contrasena = document.getElementById("password").value;

    const peticion = await fetch("http://localhost:8080/api/login",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(campos)

            });
};
