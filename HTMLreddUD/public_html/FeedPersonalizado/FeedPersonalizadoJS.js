const userId = localStorage.getItem("userId");
const nombreUsuario = localStorage.getItem("nombreUsuario");

let appState = {
    currentFilter: 'all',
    currentSort: 'trending',
    currentPage: 1,
    isLoading: false,
    posts: [],
    trendingTopics: [],
    suggestedCommunities: [],
    userInteractions: {
        upvotes: new Set(),
        downvotes: new Set(),
        saves: new Set()
    }
};

async function fetchPostsFromBackend() {
    if (!userId) {
        alert("Usuario no autenticado. Por favor, inicie sesión.");
        window.location.href = "../PanelLogin/LoginHTML.html";
        return [];
    }
    try {
        const response = await fetch(`http://localhost:9000/api/posts/user/${userId}`, { mode: 'cors' });
        if (!response.ok) {
            console.error('Error fetching posts');
            return [];
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

async function fetchTrendingTopics() {
    try {
        const response = await fetch('http://localhost:9000/api/posts/trending', { mode: 'cors' });
        if (!response.ok) {
            console.error('Error fetching trending topics');
            return [];
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching trending topics:', error);
        return [];
    }
}

async function fetchSuggestedCommunities() {
    try {
        const response = await fetch('http://localhost:9000/api/community/suggested', { mode: 'cors' });
        if (!response.ok) {
            console.error('Error fetching suggested communities');
            return [];
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching suggested communities:', error);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    initializeApp();
    setupEventListeners();
    await loadInitialContent();

    // Update greeting dynamically with username
    const greetingText = document.querySelector('.greeting-text');
    if (greetingText && nombreUsuario) {
        greetingText.textContent = `Hola ${nombreUsuario}, esto es lo que está pasando ahora`;
    }

    // Add event listener for crear comunidad button
    const crearComunidadBtn = document.getElementById('createCommunityBtn');
    if (crearComunidadBtn) {
        crearComunidadBtn.addEventListener('click', () => {
            window.open('../Comunidad/CrearComunidadHTML.html', '_blank');
        });
    }

    // Refresh joined communities after page load
    await refreshJoinedCommunities();
});

function initializeApp() {
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000); // Update every minute

    fetchPostsFromBackend().then(posts => {
        appState.posts = posts;
        renderFeedPosts();
    });

    fetchTrendingTopics().then(trending => {
        appState.trendingTopics = trending;
        renderTrendingCarousel();
    });

    fetchSuggestedCommunities().then(communities => {
        appState.suggestedCommunities = communities;
        renderSuggestedCommunities();
    });

    setupInfiniteScroll();
    renderJoinedCommunities();
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
            carouselTrack.scrollBy({ left: -300, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            carouselTrack.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }
}

async function loadFilteredPosts() {
    if (appState.isLoading) return;
    appState.isLoading = true;
    try {
        const response = await fetch(`http://localhost:9000/api/posts?filter=${appState.currentFilter}&sort=${appState.currentSort}&userId=${userId}`, { mode: 'cors' });
        if (!response.ok) {
            console.error('Error fetching filtered posts');
            appState.isLoading = false;
            return;
        }
        const posts = await response.json();
        appState.posts = posts;
        renderFeedPosts();
    } catch (error) {
        console.error('Error fetching filtered posts:', error);
    }
    appState.isLoading = false;
}

function renderFeedPosts() {
    const feedGrid = document.getElementById('feedGrid');
    if (!feedGrid) return;
    feedGrid.innerHTML = '';
    appState.posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';

        const postHeader = document.createElement('div');
        postHeader.className = 'post-header';

        const avatar = document.createElement('div');
        avatar.className = 'post-avatar';
        avatar.textContent = post.authorInitials || 'U';

        const postInfo = document.createElement('div');
        postInfo.className = 'post-info';

        const authorName = document.createElement('h3');
        authorName.textContent = post.authorName || 'Usuario';

        const postDate = document.createElement('span');
        postDate.textContent = new Date(post.createdAt).toLocaleString();

        postInfo.appendChild(authorName);
        postInfo.appendChild(postDate);

        postHeader.appendChild(avatar);
        postHeader.appendChild(postInfo);

        const postContent = document.createElement('div');
        postContent.className = 'post-content';

        if (post.title) {
            const title = document.createElement('h4');
            title.textContent = post.title;
            postContent.appendChild(title);
        }

        if (post.content) {
            const content = document.createElement('p');
            content.textContent = post.content;
            postContent.appendChild(content);
        }

        if (post.imageUrl) {
            const image = document.createElement('img');
            image.className = 'post-image';
            image.src = post.imageUrl;
            image.alt = post.title || 'Post image';
            postContent.appendChild(image);
        }

        const postActions = document.createElement('div');
        postActions.className = 'post-actions';

        // Upvote button
        const upvoteBtn = document.createElement('button');
        upvoteBtn.className = 'action-btn upvote-btn';
        upvoteBtn.textContent = `▲ ${post.upvotes || 0}`;
        upvoteBtn.addEventListener('click', () => handleUpvote(post.id, upvoteBtn));

        // Downvote button
        const downvoteBtn = document.createElement('button');
        downvoteBtn.className = 'action-btn downvote-btn';
        downvoteBtn.textContent = `▼ ${post.downvotes || 0}`;
        downvoteBtn.addEventListener('click', () => handleDownvote(post.id, downvoteBtn));

        // Save button
        const saveBtn = document.createElement('button');
        saveBtn.className = 'action-btn save-btn';
        saveBtn.textContent = 'Guardar';
        saveBtn.addEventListener('click', () => handleSave(post.id, saveBtn));

        postActions.appendChild(upvoteBtn);
        postActions.appendChild(downvoteBtn);
        postActions.appendChild(saveBtn);

        postCard.appendChild(postHeader);
        postCard.appendChild(postContent);
        postCard.appendChild(postActions);

        feedGrid.appendChild(postCard);
    });
}

function renderTrendingCarousel() {
    const trendingTrack = document.getElementById('trendingTrack');
    if (!trendingTrack) return;
    trendingTrack.innerHTML = '';
    appState.trendingTopics.forEach(topic => {
        const item = document.createElement('div');
        item.className = 'trending-item';
        const title = document.createElement('h4');
        title.textContent = topic.title || topic.name || 'Tendencia';
        const category = document.createElement('p');
        category.textContent = topic.category || '';
        item.appendChild(title);
        item.appendChild(category);
        trendingTrack.appendChild(item);
    });
}

function renderSuggestedCommunities() {
    const suggestedContainer = document.getElementById('suggestedCommunities');
    if (!suggestedContainer) return;
    suggestedContainer.innerHTML = '';
    appState.suggestedCommunities.forEach(community => {
        const communityDiv = document.createElement('div');
        communityDiv.className = 'community-suggestion';
        const name = document.createElement('h4');
        name.textContent = community.name || 'Comunidad';
        const description = document.createElement('p');
        description.textContent = community.description || '';
        const members = document.createElement('div');
        members.className = 'members';
        members.textContent = `${community.members || community.memberCount || 0} miembros`;
        communityDiv.appendChild(name);
        communityDiv.appendChild(description);
        communityDiv.appendChild(members);
        suggestedContainer.appendChild(communityDiv);
    });
}

// Function to refresh joined communities list after creation
async function refreshJoinedCommunities() {
    const joinedContainer = document.getElementById('joinedCommunities');
    if (!joinedContainer) return;
    try {
        const response = await fetch(`http://localhost:9000/api/community/joined/user/${userId}`, { mode: 'cors' });
        if (!response.ok) {
            console.error('Error fetching joined communities');
            return;
        }
        const communities = await response.json();
        joinedContainer.innerHTML = '';
        communities.forEach(community => {
            const communityDiv = document.createElement('div');
            communityDiv.className = 'community';
            const name = document.createElement('h4');
            name.textContent = community.name || 'Comunidad';
            const description = document.createElement('p');
            description.textContent = community.description || '';
            communityDiv.appendChild(name);
            communityDiv.appendChild(description);
            joinedContainer.appendChild(communityDiv);
        });
    } catch (error) {
        console.error('Error fetching joined communities:', error);
    }
}

function renderJoinedCommunities() {
    const joinedContainer = document.getElementById('joinedCommunities');
    if (!joinedContainer) return;
    // Fetch joined communities from backend
    fetch(`http://localhost:9000/api/community/joined/user/${userId}`, { mode: 'cors' })
        .then(response => response.ok ? response.json() : [])
        .then(communities => {
            joinedContainer.innerHTML = '';
            communities.forEach(community => {
                const communityDiv = document.createElement('div');
                communityDiv.className = 'community';
                const name = document.createElement('h4');
                name.textContent = community.name || 'Comunidad';
                const description = document.createElement('p');
                description.textContent = community.description || '';
                communityDiv.appendChild(name);
                communityDiv.appendChild(description);
                joinedContainer.appendChild(communityDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching joined communities:', error);
        });
}

function setupInfiniteScroll() {
    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
            if (!appState.isLoading) {
                appState.currentPage++;
                loadMorePosts();
            }
        }
    });
}

async function loadMorePosts() {
    appState.isLoading = true;
    try {
        const response = await fetch(`http://localhost:9000/api/posts?filter=${appState.currentFilter}&sort=${appState.currentSort}&page=${appState.currentPage}&userId=${userId}`, { mode: 'cors' });
        if (!response.ok) {
            console.error('Error loading more posts');
            appState.isLoading = false;
            return;
        }
        const newPosts = await response.json();
        appState.posts = appState.posts.concat(newPosts);
        renderFeedPosts();
    } catch (error) {
        console.error('Error loading more posts:', error);
    }
    appState.isLoading = false;
}

function updateCurrentTime() {
    const currentTimeElem = document.getElementById('currentTime');
    if (!currentTimeElem) return;
    const now = new Date();
    currentTimeElem.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

async function loadInitialContent() {
    // Placeholder for any additional initial content loading if needed
}

// Handlers for post interactions
async function handleUpvote(postId, button) {
    try {
        const response = await fetch(`http://localhost:9000/api/posts/${postId}/upvote?userId=${userId}`, { method: 'POST', mode: 'cors' });
        if (!response.ok) {
            console.error('Error upvoting post');
            return;
        }
        const updatedPost = await response.json();
        updatePostInState(updatedPost);
        renderFeedPosts();
    } catch (error) {
        console.error('Error upvoting post:', error);
    }
}

async function handleDownvote(postId, button) {
    try {
        const response = await fetch(`http://localhost:9000/api/posts/${postId}/downvote?userId=${userId}`, { method: 'POST', mode: 'cors' });
        if (!response.ok) {
            console.error('Error downvoting post');
            return;
        }
        const updatedPost = await response.json();
        updatePostInState(updatedPost);
        renderFeedPosts();
    } catch (error) {
        console.error('Error downvoting post:', error);
    }
}

async function handleSave(postId, button) {
    try {
        const response = await fetch(`http://localhost:9000/api/posts/${postId}/save?userId=${userId}`, { method: 'POST', mode: 'cors' });
        if (!response.ok) {
            console.error('Error saving post');
            return;
        }
        const updatedPost = await response.json();
        updatePostInState(updatedPost);
        renderFeedPosts();
    } catch (error) {
        console.error('Error saving post:', error);
    }
}

function updatePostInState(updatedPost) {
    const index = appState.posts.findIndex(p => p.id === updatedPost.id);
    if (index !== -1) {
        appState.posts[index] = updatedPost;
    }
}