// Estado global de la aplicación
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

// Datos de ejemplo para simular el contenido
const mockPosts = [
    {
        id: 1,
        type: 'text',
        author: 'TechGuru',
        community: 'r/tecnologia',
        time: '2h',
        title: '¿Cuál es el mejor framework para desarrollo web en 2025?',
        content: 'He estado investigando sobre los frameworks más populares y me gustaría conocer sus opiniones sobre cuál consideran el mejor para proyectos nuevos.',
        upvotes: 234,
        downvotes: 12,
        comments: 67,
        image: null
    },
    {
        id: 2,
        type: 'image',
        author: 'NatureLover',
        community: 'r/naturaleza',
        time: '4h',
        title: 'Amanecer en los Andes colombianos',
        content: 'Capturé esta foto durante mi última aventura de senderismo. La vista era absolutamente espectacular.',
        upvotes: 1567,
        downvotes: 23,
        comments: 89,
        image: 'https://picsum.photos/400/300?random=1'
    },
    {
        id: 3,
        type: 'poll',
        author: 'GameMaster',
        community: 'r/gaming',
        time: '1h',
        title: '¿Cuál es tu género de videojuegos favorito?',
        content: 'Estoy haciendo una encuesta para entender mejor las preferencias de la comunidad gaming.',
        upvotes: 456,
        downvotes: 34,
        comments: 123,
        image: null
    },
    {
        id: 4,
        type: 'video',
        author: 'CookingChef',
        community: 'r/cocina',
        time: '6h',
        title: 'Receta fácil de arepa con queso',
        content: 'Tutorial paso a paso para hacer las mejores arepas caseras. ¡Perfectas para el desayuno!',
        upvotes: 892,
        downvotes: 45,
        comments: 156,
        image: 'https://picsum.photos/400/300?random=2'
    },
    {
        id: 5,
        type: 'text',
        author: 'BookWorm',
        community: 'r/libros',
        time: '3h',
        title: 'Recomendaciones de literatura latinoamericana',
        content: 'Acabo de terminar "Cien años de soledad" y me encantó. ¿Qué otros libros de autores latinoamericanos recomiendan?',
        upvotes: 678,
        downvotes: 19,
        comments: 234,
        image: null
    },
    {
        id: 6,
        type: 'image',
        author: 'ArtisticSoul',
        community: 'r/arte',
        time: '8h',
        title: 'Mi último trabajo en acuarela',
        content: 'Después de meses de práctica, finalmente me siento cómodo compartiendo mi arte. ¿Qué opinan?',
        upvotes: 1234,
        downvotes: 67,
        comments: 189,
        image: 'https://picsum.photos/400/300?random=3'
    }
];

const mockTrending = [
    {
        id: 1,
        title: 'Nuevo descubrimiento en arqueología',
        category: 'Ciencia',
        engagement: '2.3k'
    },
    {
        id: 2,
        title: 'Festival de música en Medellín',
        category: 'Entretenimiento',
        engagement: '1.8k'
    },
    {
        id: 3,
        title: 'Innovación en energía renovable',
        category: 'Tecnología',
        engagement: '3.1k'
    },
    {
        id: 4,
        title: 'Nuevas rutas de senderismo',
        category: 'Deportes',
        engagement: '756'
    },
    {
        id: 5,
        title: 'Tendencias gastronómicas 2025',
        category: 'Cocina',
        engagement: '1.2k'
    }
];

const mockCommunities = [
    {
        id: 1,
        name: 'r/programacion',
        description: 'Comunidad de desarrolladores en español',
        members: '45.2k',
        category: 'Tecnología'
    },
    {
        id: 2,
        name: 'r/colombia',
        description: 'Todo sobre nuestro hermoso país',
        members: '128.7k',
        category: 'General'
    },
    {
        id: 3,
        name: 'r/fotografia',
        description: 'Comparte y aprende sobre fotografía',
        members: '67.3k',
        category: 'Arte'
    },
    {
        id: 4,
        name: 'r/emprendimiento',
        description: 'Para emprendedores y startups',
        members: '34.5k',
        category: 'Negocios'
    }
];

document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
    setupEventListeners();
    loadInitialContent();

    // User button toggle and outside click close
    const userButton = document.getElementById('userButton');
    const userMenu = document.getElementById('userMenu');

    if (userButton && userMenu) {
        userButton.addEventListener('click', function (e) {
            e.stopPropagation();
            if (userMenu.style.display === 'flex') {
                userMenu.style.display = 'none';
                userButton.setAttribute('aria-expanded', 'false');
            } else {
                userMenu.style.display = 'flex';
                userButton.setAttribute('aria-expanded', 'true');
            }
        });

        document.addEventListener('click', function (e) {
            if (userMenu.style.display === 'flex' && !userMenu.contains(e.target) && e.target !== userButton) {
                userMenu.style.display = 'none';
                userButton.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Add explicit logout redirect handler
    const logoutLink = userMenu.querySelector('a[role="menuitem"][tabindex="0"]:last-child');
    if (logoutLink) {
        logoutLink.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = '../PanelInicioPagina/InicioPaginaHTML.html';
        });
    }
});


document.addEventListener('click', function (e) {
    if (userMenu.style.display === 'flex' && !userMenu.contains(e.target) && e.target !== userButton) {
        userMenu.style.display = 'none';
        userButton.setAttribute('aria-expanded', 'false');
    }
});
;

function initializeApp() {
    // Configurar el tiempo actual
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000); // Actualizar cada minuto

    // Cargar estado inicial
    appState.posts = [...mockPosts];
    appState.trendingTopics = [...mockTrending];
    appState.suggestedCommunities = [...mockCommunities];

    // Renderizar contenido inicial
    renderTrendingCarousel();
    renderSuggestedCommunities();
    renderFeedPosts();

    // Configurar infinite scroll
    setupInfiniteScroll();
}

function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleString('es-CO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('currentTime').textContent = timeString;
}

function setupEventListeners() {
    // Filtros de contenido
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', function () {
            const filter = this.dataset.filter;
            setActiveFilter(filter);
            filterPosts(filter);
        });
    });

    // Ordenación
    document.getElementById('sortSelect').addEventListener('change', function () {
        const sortBy = this.value;
        appState.currentSort = sortBy;
        sortPosts(sortBy);
    });

    // Carrusel de tendencias
    document.getElementById('prevTrending').addEventListener('click', () => {
        scrollCarousel('prev');
    });

    document.getElementById('nextTrending').addEventListener('click', () => {
        scrollCarousel('next');
    });

    // Configurar auto-scroll del carrusel
    setupCarouselAutoScroll();
}

function setActiveFilter(filter) {
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.classList.remove('active');
    });
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    appState.currentFilter = filter;
}

function filterPosts(filter) {
    const filteredPosts = filter === 'all'
            ? [...mockPosts]
            : mockPosts.filter(post => post.type === filter);

    appState.posts = filteredPosts;
    renderFeedPosts();
    showNotification(`Filtro aplicado: ${getFilterName(filter)}`);
}

function getFilterName(filter) {
    const filterNames = {
        'all': 'Todo el contenido',
        'text': 'Solo texto',
        'image': 'Solo imágenes',
        'poll': 'Solo encuestas',
        'video': 'Solo videos'
    };
    return filterNames[filter] || 'Filtro desconocido';
}

function sortPosts(sortBy) {
    let sortedPosts = [...appState.posts];

    switch (sortBy) {
        case 'trending':
            sortedPosts.sort((a, b) => {
                const aEngagement = a.upvotes + a.comments;
                const bEngagement = b.upvotes + b.comments;
                return bEngagement - aEngagement;
            });
            break;
        case 'top':
            sortedPosts.sort((a, b) => b.upvotes - a.upvotes);
            break;
        case 'new':
            sortedPosts.sort((a, b) => {
                const aTime = parseInt(a.time);
                const bTime = parseInt(b.time);
                return aTime - bTime;
            });
            break;
    }

    appState.posts = sortedPosts;
    renderFeedPosts();
    showNotification(`Ordenado por: ${getSortName(sortBy)}`);
}

function getSortName(sortBy) {
    const sortNames = {
        'trending': 'Tendencias',
        'top': 'Más votados',
        'new': 'Más recientes'
    };
    return sortNames[sortBy] || 'Ordenamiento desconocido';
}

function renderTrendingCarousel() {
    const track = document.getElementById('trendingTrack');
    track.innerHTML = '';

    appState.trendingTopics.forEach(topic => {
        const item = document.createElement('div');
        item.className = 'trending-item';
        item.innerHTML = `
            <h4>${topic.title}</h4>
            <p>${topic.category} • ${topic.engagement} interacciones</p>
        `;

        item.addEventListener('click', () => {
            showNotification(`Explorando: ${topic.title}`);
        });

        track.appendChild(item);
    });
}

function scrollCarousel(direction) {
    const track = document.getElementById('trendingTrack');
    const itemWidth = 295; // 280px + 15px gap
    const currentTransform = track.style.transform || 'translateX(0px)';
    const currentX = parseInt(currentTransform.match(/-?\d+/) || [0]);

    let newX;
    if (direction === 'prev') {
        newX = Math.min(currentX + itemWidth, 0);
    } else {
        const maxScroll = -(itemWidth * (appState.trendingTopics.length - 3));
        newX = Math.max(currentX - itemWidth, maxScroll);
    }

    track.style.transform = `translateX(${newX}px)`;
}

function setupCarouselAutoScroll() {
    let autoScrollInterval;

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            scrollCarousel('next');
        }, 5000);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    const carousel = document.querySelector('.carousel-container');
    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('mouseleave', startAutoScroll);

    startAutoScroll();
}

function renderFeedPosts() {
    const feedGrid = document.getElementById('feedGrid');
    feedGrid.innerHTML = '';

    appState.posts.forEach(post => {
        const postCard = createPostCard(post);
        feedGrid.appendChild(postCard);
    });
}

function createPostCard(post) {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.dataset.type = post.type;

    const isUpvoted = appState.userInteractions.upvotes.has(post.id);
    const isDownvoted = appState.userInteractions.downvotes.has(post.id);
    const isSaved = appState.userInteractions.saves.has(post.id);

    card.innerHTML = `
        <div class="post-header">
            <div class="post-avatar">
                ${post.author.charAt(0).toUpperCase()}
            </div>
            <div class="post-info">
                <h3>${post.author}</h3>
                <span>${post.community} • ${post.time}</span>
            </div>
        </div>
        
        <div class="post-content">
            <h4>${post.title}</h4>
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
            ${post.type === 'poll' ? createPollContent() : ''}
            ${post.type === 'video' ? '<div class="video-placeholder"><i class="fas fa-play-circle"></i> Video</div>' : ''}
        </div>
        
        <div class="post-actions">
            <div class="action-group">
                <button class="action-btn upvote-btn ${isUpvoted ? 'active' : ''}" data-post-id="${post.id}">
                    <i class="fas fa-arrow-up"></i>
                    <span class="score">${post.upvotes}</span>
                </button>
                <button class="action-btn downvote-btn ${isDownvoted ? 'active' : ''}" data-post-id="${post.id}">
                    <i class="fas fa-arrow-down"></i>
                    <span class="score">${post.downvotes}</span>
                </button>
            </div>
            
            <div class="action-group">
                <button class="action-btn comment-btn" data-post-id="${post.id}">
                    <i class="fas fa-comment"></i>
                    <span>${post.comments}</span>
                </button>
                <button class="action-btn share-btn" data-post-id="${post.id}">
                    <i class="fas fa-share"></i>
                    Compartir
                </button>
                <button class="action-btn save-btn ${isSaved ? 'active' : ''}" data-post-id="${post.id}">
                    <i class="fas fa-bookmark"></i>
                    ${isSaved ? 'Guardado' : 'Guardar'}
                </button>
            </div>
        </div>
    `;

    // Añadir event listeners a los botones de acción
    setupPostActions(card, post);

    return card;
}

function createPollContent() {
    return `
        <div class="poll-content">
            <div class="poll-option">
                <div class="poll-bar" style="width: 45%"></div>
                <span>RPG - 45%</span>
            </div>
            <div class="poll-option">
                <div class="poll-bar" style="width: 30%"></div>
                <span>Acción - 30%</span>
            </div>
            <div class="poll-option">
                <div class="poll-bar" style="width: 25%"></div>
                <span>Estrategia - 25%</span>
            </div>
        </div>
    `;
}

function setupPostActions(card, post) {
    const upvoteBtn = card.querySelector('.upvote-btn');
    const downvoteBtn = card.querySelector('.downvote-btn');
    const commentBtn = card.querySelector('.comment-btn');
    const shareBtn = card.querySelector('.share-btn');
    const saveBtn = card.querySelector('.save-btn');

    upvoteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleVote(post.id, 'upvote', upvoteBtn);
    });

    downvoteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleVote(post.id, 'downvote', downvoteBtn);
    });

    commentBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleComment(post.id, commentBtn);
    });

    shareBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleShare(post.id, shareBtn);
    });

    saveBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleSave(post.id, saveBtn);
    });
}

function handleVote(postId, voteType, button) {
    const post = appState.posts.find(p => p.id === postId);
    if (!post)
        return;

    const isUpvote = voteType === 'upvote';
    const currentSet = isUpvote ? appState.userInteractions.upvotes : appState.userInteractions.downvotes;
    const oppositeSet = isUpvote ? appState.userInteractions.downvotes : appState.userInteractions.upvotes;

    // Remover voto opuesto si existe
    if (oppositeSet.has(postId)) {
        oppositeSet.delete(postId);
        if (isUpvote) {
            post.downvotes--;
        } else {
            post.upvotes--;
        }
    }

    // Toggle voto actual
    if (currentSet.has(postId)) {
        currentSet.delete(postId);
        if (isUpvote) {
            post.upvotes--;
        } else {
            post.downvotes--;
        }
        button.classList.remove('active');
    } else {
        currentSet.add(postId);
        if (isUpvote) {
            post.upvotes++;
        } else {
            post.downvotes++;
        }
        button.classList.add('active');
    }

    // Actualizar UI con animaciones
    button.classList.add('vibrate');
    setTimeout(() => button.classList.remove('vibrate'), 300);

    const scoreElement = button.querySelector('.score');
    scoreElement.textContent = isUpvote ? post.upvotes : post.downvotes;
    scoreElement.classList.add('score-animation');
    setTimeout(() => scoreElement.classList.remove('score-animation'), 500);

    // Actualizar botón opuesto
    const oppositeBtn = button.parentElement.querySelector(isUpvote ? '.downvote-btn' : '.upvote-btn');
    oppositeBtn.classList.remove('active');
    oppositeBtn.querySelector('.score').textContent = isUpvote ? post.downvotes : post.upvotes;

    showNotification(`${isUpvote ? 'Upvote' : 'Downvote'} registrado`);
}

function handleComment(postId, button) {
    button.classList.add('vibrate');
    setTimeout(() => button.classList.remove('vibrate'), 300);

    showNotification('Abriendo comentarios...');
}

function handleShare(postId, button) {
    button.classList.add('vibrate');
    setTimeout(() => button.classList.remove('vibrate'), 300);

    // Simular compartir
    if (navigator.share) {
        navigator.share({
            title: 'Compartir desde reddUD',
            text: 'Mira esta publicación interesante',
            url: window.location.href
        });
    } else {
        // Fallback para navegadores sin Web Share API
        navigator.clipboard.writeText(window.location.href);
        showNotification('Enlace copiado al portapapeles');
    }
}

function handleSave(postId, button) {
    const isSaved = appState.userInteractions.saves.has(postId);

    if (isSaved) {
        appState.userInteractions.saves.delete(postId);
        button.classList.remove('active');
        button.innerHTML = '<i class="fas fa-bookmark"></i> Guardar';
        showNotification('Publicación eliminada de guardados');
    } else {
        appState.userInteractions.saves.add(postId);
        button.classList.add('active');
        button.innerHTML = '<i class="fas fa-bookmark"></i> Guardado';
        showNotification('Publicación guardada');
    }

    button.classList.add('vibrate');
    setTimeout(() => button.classList.remove('vibrate'), 300);
}

function renderSuggestedCommunities() {
    const container = document.getElementById('suggestedCommunities');
    container.innerHTML = '';

    appState.suggestedCommunities.forEach(community => {
        const suggestion = document.createElement('div');
        suggestion.className = 'community-suggestion';
        suggestion.innerHTML = `
            <h4>${community.name}</h4>
            <p>${community.description}</p>
            <div class="members">${community.members} miembros</div>
        `;

        suggestion.addEventListener('click', () => {
            showNotification(`Uniéndose a ${community.name}...`);
        });

        container.appendChild(suggestion);
    });
}

function setupInfiniteScroll() {
    const loadingIndicator = document.getElementById('loadingIndicator');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !appState.isLoading) {
                loadMorePosts();
            }
        });
    }, {
        threshold: 0.1
    });

    observer.observe(loadingIndicator);
}

function loadMorePosts() {
    if (appState.isLoading)
        return;

    appState.isLoading = true;
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block';

    // Simular carga de más contenido
    setTimeout(() => {
        const newPosts = generateMorePosts();
        appState.posts.push(...newPosts);

        // Renderizar solo los nuevos posts
        const feedGrid = document.getElementById('feedGrid');
        newPosts.forEach(post => {
            const postCard = createPostCard(post);
            feedGrid.appendChild(postCard);
        });

        appState.isLoading = false;
        loadingIndicator.style.display = 'none';
        appState.currentPage++;

        showNotification('Nuevo contenido cargado');
    }, 1500);
}

function generateMorePosts() {
    const additionalPosts = [
        {
            id: Date.now() + 1,
            type: 'text',
            author: 'DevCommunity',
            community: 'r/programacion',
            time: '30min',
            title: 'Tips para optimizar el rendimiento en React',
            content: 'Después de varios años trabajando con React, quiero compartir algunos tips que me han ayudado a mejorar significativamente el rendimiento de mis aplicaciones.',
            upvotes: 89,
            downvotes: 5,
            comments: 23,
            image: null
        },
        {
            id: Date.now() + 2,
            type: 'image',
            author: 'CoffeeAddict',
            community: 'r/cafe',
            time: '45min',
            title: 'Mi setup perfecto para el café matutino',
            content: 'Después de años de experimentar, finalmente encontré la combinación perfecta. ¿Cuál es su método favorito?',
            upvotes: 234,
            downvotes: 12,
            comments: 45,
            image: `https://picsum.photos/400/300?random=${Date.now()}`
        }
    ];

    return additionalPosts;
}

function showNotification(message) {
    const container = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    container.appendChild(notification);

    // Remover notificación después de 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function loadInitialContent() {
    // Simular carga inicial
    setTimeout(() => {
        const feedGrid = document.getElementById('feedGrid');
        feedGrid.style.opacity = '0';

        setTimeout(() => {
            feedGrid.style.transition = 'opacity 0.5s ease-in-out';
            feedGrid.style.opacity = '1';
        }, 100);

        showNotification('¡Bienvenido a tu feed personalizado!');
    }, 500);
}

// Función para manejar el redimensionamiento de la ventana
window.addEventListener('resize', () => {
    // Ajustar carrusel en móviles
    if (window.innerWidth <= 768) {
        const track = document.getElementById('trendingTrack');
        track.style.transform = 'translateX(0)';
    }
});

// Añadir estilos adicionales para elementos específicos
const additionalStyles = `
    .poll-content {
        margin: 15px 0;
        padding: 15px;
        background: rgba(0, 123, 255, 0.05);
        border-radius: 10px;
        border: 1px solid rgba(0, 123, 255, 0.1);
    }
    
    .poll-option {
        position: relative;
        margin-bottom: 10px;
        padding: 10px;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .poll-option:hover {
        background: rgba(255, 255, 255, 0.9);
    }
    
    .poll-bar {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        background: linear-gradient(45deg, #007BFF, #0056b3);
        border-radius: 5px;
        transition: width 0.5s ease;
        opacity: 0.3;
    }
    
    .poll-option span {
        position: relative;
        z-index: 1;
        font-weight: 500;
        color: #333;
    }
    
    .video-placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 200px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 10px;
        margin: 15px 0;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .video-placeholder:hover {
        transform: scale(1.02);
    }
    
    .video-placeholder i {
        font-size: 3rem;
        margin-right: 10px;
    }
`;

// Añadir estilos adicionales al documento
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);