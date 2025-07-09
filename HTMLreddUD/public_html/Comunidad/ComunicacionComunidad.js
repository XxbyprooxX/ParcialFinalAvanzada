const API_BASE_URL = 'http://localhost:9000/api/community'; 

const communityId = 1; 
const userId = 1; 

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

// Leave community API call using async/await
async function leaveCommunity() {
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