const API_COMMUNITY_BASE = 'http://localhost:9000/api/community';
const API_POST_BASE = 'http://localhost:9000/api/posts';

function getUserId() {
    return localStorage.getItem('userId');
}

async function fetchJoinedCommunities(userId) {
    if (!userId)
        userId = getUserId();
    try {
        const response = await fetch(`${API_COMMUNITY_BASE}/joined/user/${userId}`, {mode: 'cors'});
        if (!response.ok)
            return [];
        return await response.json();
    } catch (error) {
        console.error("Error fetching joined communities:", error);
        return [];
    }
}

async function crearComunidad(data) {
    const response = await fetch('http://localhost:9000/api/community', {
        method: 'POST',
        mode: 'cors',
        body: data
    });
    if (!response.ok) {
        throw new Error('Error creando la comunidad');
    }
    return await response.json();
}

async function obtenerComunidades() {
    const response = await fetch('http://localhost:9000/api/community/all', {mode: 'cors'});
    if (!response.ok) {
        return [];
    }
    return await response.json();
}

// New functions for posts API

async function fetchPosts(filter = '', sort = '', userId = null) {
    if (!userId)
        userId = getUserId();
    let url = `${API_POST_BASE}`;
    const params = new URLSearchParams();
    if (filter)
        params.append('filter', filter);
    if (sort)
        params.append('sort', sort);
    if ([...params].length > 0) {
        url += `?${params.toString()}`;
    }
    const response = await fetch(url, {mode: 'cors'});
    if (!response.ok) {
        console.error('Error fetching posts');
        return [];
    }
    return await response.json();
}

async function upvotePost(postId, userId = null) {
    if (!userId)
        userId = getUserId();
    const response = await fetch(`${API_POST_BASE}/${postId}/upvote?userId=${userId}`, {
        method: 'POST',
        mode: 'cors'
    });
    if (!response.ok) {
        console.error('Error upvoting post');
        return null;
    }
    return await response.json();
}

async function downvotePost(postId, userId = null) {
    if (!userId)
        userId = getUserId();
    const response = await fetch(`${API_POST_BASE}/${postId}/downvote?userId=${userId}`, {
        method: 'POST',
        mode: 'cors'
    });
    if (!response.ok) {
        console.error('Error downvoting post');
        return null;
    }
    return await response.json();
}

async function savePost(postId, userId = null) {
    if (!userId)
        userId = getUserId();
    const response = await fetch(`${API_POST_BASE}/${postId}/save?userId=${userId}`, {
        method: 'POST',
        mode: 'cors'
    });
    if (!response.ok) {
        console.error('Error saving post');
        return null;
    }
    return await response.json();
}

function setupEventListeners() {
    // User menu toggle
    const userButton = document.getElementById('userButton');
    const userMenu = document.getElementById('userMenu');
    if (userButton && userMenu) {
        userButton.addEventListener('click', () => {
            const isExpanded = userButton.getAttribute('aria-expanded') === 'true';
            userButton.setAttribute('aria-expanded', !isExpanded);
            userMenu.style.display = isExpanded ? 'none' : 'flex';
        });
    }

    // Create community button
    const createCommunityBtn = document.getElementById('createCommunityBtn');
    const createCommunityModal = document.getElementById('createCommunityModal');
    const cancelCreateCommunity = document.getElementById('cancelCreateCommunity');
    const createCommunityForm = document.getElementById('createCommunityForm');

    if (createCommunityBtn && createCommunityModal) {
        createCommunityBtn.addEventListener('click', () => {
            createCommunityModal.style.display = 'flex';
        });
    }

    if (cancelCreateCommunity && createCommunityModal) {
        cancelCreateCommunity.addEventListener('click', () => {
            createCommunityModal.style.display = 'none';
            createCommunityForm.reset();
        });
    }

    // Close modal when clicking outside
    if (createCommunityModal) {
        createCommunityModal.addEventListener('click', (e) => {
            if (e.target === createCommunityModal) {
                createCommunityModal.style.display = 'none';
                createCommunityForm.reset();
            }
        });
    }

    // Handle create community form submission
    if (createCommunityForm) {
        createCommunityForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await handleCreateCommunity(e);
        });
    }

    // Filter chips
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            appState.currentFilter = chip.getAttribute('data-filter');
            loadFilteredPosts();
        });
    });

    // Sort select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            appState.currentSort = sortSelect.value;
            loadFilteredPosts();
        });
    }

    // Carousel buttons
    const prevBtn = document.getElementById('prevTrending');
    const nextBtn = document.getElementById('nextTrending');
    const carouselTrack = document.getElementById('trendingTrack');
    if (prevBtn && nextBtn && carouselTrack) {
        prevBtn.addEventListener('click', () => {
            carouselTrack.scrollBy({left: -300, behavior: 'smooth'});
        });
        nextBtn.addEventListener('click', () => {
            carouselTrack.scrollBy({left: 300, behavior: 'smooth'});
        });
    }
}