const API_BASE_URL = 'http://localhost:9000/api/community';

function getUserId() {
    return localStorage.getItem('userId');
}

let communityId = 1;
let userId = getUserId();

// Convert ArrayBuffer to Base64 string
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

// Fetch community info from backend using async/await
async function fetchCommunityInfo() {
    try {
        const response = await fetch(`${API_BASE_URL}/${communityId}`);
        const data = await response.json();

        // Process banner and avatar images if available
        if (data.banner) {
            data.bannerUrl = `data:image/png;base64,${arrayBufferToBase64(data.banner.data)}`;
        }
        if (data.avatar) {
            data.avatarUrl = `data:image/png;base64,${arrayBufferToBase64(data.avatar.data)}`;
        }
        return data;
    } catch (error) {
        console.error('Error fetching community info:', error);
        throw error;
    }
}

// Join community API call using async/await
async function joinCommunity() {
    userId = getUserId();
    try {
        const response = await fetch(`${API_BASE_URL}/join/${communityId}/user/${userId}`, {
            method: 'POST'
        });
        const text = await response.text();
        
        return text;
    } catch (error) {
        console.error('Error joining community:', error);
        throw error;
    }
}

async function leaveCommunity() {
    userId = getUserId();
    try {
        const response = await fetch(`${API_BASE_URL}/leave/${communityId}/user/${userId}`, {
            method: 'POST'
        });
        const text = await response.text();
        return text;
    } catch (error) {
        console.error('Error leaving community:', error);
        throw error;
    }
}

import { crearComunidad } from './ComunicacionFeedPersonalizado.js';

document.addEventListener('DOMContentLoaded', () => {
    const createBtn = document.getElementById('createCommunitySidebarBtn');
    if (createBtn) {
        createBtn.addEventListener('click', showCreateCommunityForm);
    }
});

function showCreateCommunityForm() {
    const formHtml = `
        <div class="create-community-modal">
            <h3>Crear Nueva Comunidad</h3>
            <input type="text" id="communityName" placeholder="Nombre de la comunidad" />
            <textarea id="communityDescription" placeholder="Descripción"></textarea>
            <input type="file" id="communityAvatar" />
            <input type="file" id="communityBanner" />
            <button id="submitCommunity">Crear</button>
            <button id="cancelCreateCommunity">Cancelar</button>
        </div>
    `;

    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-overlay';
    modalContainer.innerHTML = formHtml;
    document.body.appendChild(modalContainer);

    document.getElementById('cancelCreateCommunity').addEventListener('click', () => {
        document.body.removeChild(modalContainer);
    });

    document.getElementById('submitCommunity').addEventListener('click', async () => {
        const name = document.getElementById('communityName').value.trim();
        const description = document.getElementById('communityDescription').value.trim();
        const avatar = document.getElementById('communityAvatar').files[0];
        const banner = document.getElementById('communityBanner').files[0];

        if (!name || !description) {
            alert("Nombre y descripción son obligatorios.");
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        if (avatar)
            formData.append('avatar', avatar);
        if (banner)
            formData.append('banner', banner);

        try {
            await crearComunidad(formData);
            alert('Comunidad creada exitosamente');
            document.body.removeChild(modalContainer);
        } catch (error) {
            console.error('Error creando comunidad:', error);
            alert('Error al crear comunidad');
        }
    });
}
