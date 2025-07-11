document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("loginButton");
    boton.addEventListener("click", hacerLogin);
});

const hacerLogin = async () => {
    const nombreUsuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("password").value;

    const campos = {
        nombreUsuario,
        contrasena
    };

    try {
        const peticion = await fetch("http://localhost:9000/api/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campos)
        });

        if (!peticion.ok) {
            alert("Error en el login. Intenta nuevamente.");
            return;
        }

        const usuario = await obtenerUsuario(nombreUsuario);
        if (usuario) {
            alert(`ID del usuario: ${usuario.id}`);

            setTimeout(() => {
                window.location.href = "../FeedPersonalizado/FeedPersonalizadoHTML.html";
            }, 2500);
        }

    } catch (error) {
        console.error("Hubo un error durante el login:", error);
        alert("Ocurrió un error inesperado. Intenta más tarde.");
    }
};

const obtenerUsuario = async (nombreUsuario) => {
    try {
        const response = await fetch(`http://localhost:9000/api/user/${nombreUsuario}`);
        if (!response.ok) {
            throw new Error("Error al obtener los datos del usuario");
        }

        const data = await response.json();
        console.log("Datos recibidos:", data);
        return data;
    } catch (error) {
        console.error("Hubo un problema con la petición GET:", error);
        alert("No se pudo obtener la información del usuario.");
        return null;
    }
};
