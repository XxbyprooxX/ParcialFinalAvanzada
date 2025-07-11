document.getElementById('crearComunidadForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const identificador = document.getElementById('identificador').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const bannerFile = document.getElementById('banner').files[0];
    const avatarFile = document.getElementById('avatar').files[0];

    if (!nombre || !identificador || !descripcion) {
        showMessage('Por favor, complete todos los campos obligatorios.');
        return;
    }

    // Convert images to base64 if provided
    const bannerBase64 = bannerFile ? await fileToBase64(bannerFile) : null;
    const avatarBase64 = avatarFile ? await fileToBase64(avatarFile) : null;

    const communityData = {
        nombre: nombre,
        identificador: identificador,
        descripcion: descripcion,
        banner: bannerBase64 ? base64ToByteArray(bannerBase64) : null,
        avatar: avatarBase64 ? base64ToByteArray(avatarBase64) : null,
        miembros: [],
        moderadores: []
    };

    console.log('Sending community data:', communityData);

    try {
        // Use consistent backend port 9000 to match feedPersonalizado API calls
        const response = await fetch('http://localhost:9000/api/community?creatorId=' + localStorage.getItem('userId'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(communityData)
        });

        console.log('Response status:', response.status);

        if (response.ok) {
            showMessage('Comunidad creada exitosamente!', true);
            // Optionally clear form
            document.getElementById('crearComunidadForm').reset();
            // Refresh feed in opener window if exists
            if (window.opener && typeof window.opener.refreshJoinedCommunities === 'function') {
                try {
                    const refreshResult = window.opener.refreshJoinedCommunities();
                    if (refreshResult instanceof Promise) {
                        await refreshResult;
                    }
                } catch (err) {
                    console.error('Error refreshing joined communities:', err);
                }
            } else {
                console.warn('Opener window or refreshJoinedCommunities function not found.');
            }
            // Delay closing the create community page to allow refresh to complete
            setTimeout(() => {
                window.close();
            }, 1000);
        } else {
            const errorData = await response.json();
            showMessage('Error al crear comunidad: ' + (errorData.message || response.statusText));
        }
    } catch (error) {
        showMessage('Error de red: ' + error.message);
    }
});

function showMessage(msg, success = false) {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.textContent = msg;
    mensajeDiv.style.color = success ? 'green' : '#d32f2f';
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
        };
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

function base64ToByteArray(base64) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return Array.from(bytes);
}
