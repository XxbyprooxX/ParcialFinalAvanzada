let boton = document.getElementById("loginButton");

boton.addEventListener("click", evento => {
    hacerLogin();
});

let hacerLogin = async() => {
    let campos = {};

    campos.nombreUsuario = document.getElementById("usuario").value;
    campos.contrasena = document.getElementById("password").value;

const peticion = await fetch("http://localhost:9000/api/login",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campos)

        });

if (peticion.ok) {
    // You can handle successful login here, e.g., redirect or store token
    setTimeout(() => {
        window.location.href = "../FeedPersonalizado/FeedPersonalizadoHTML.html";
    }, 2500); // 2000 milisegundos = 2 segundos// Example redirect after login
} else {
    // Handle login failure
    alert("Error en el login. Intenta nuevamente.");
}
};
