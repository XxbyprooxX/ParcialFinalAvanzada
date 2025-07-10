const userData = {
    username: "Alex Rodriguez",
    handle: "@alexrod123",
    bio: "Desarrollador Full Stack apasionado por la tecnología y el código abierto. Siempre aprendiendo algo nuevo.",
    joinDate: "Marzo 2023",
    karma: 1247,
    posts: 127,
    followers: 432,
    communities: 23,
    status: "online",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    banner: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=200&fit=crop"
};

// Datos de ejemplo para el contenido
const contentData = {
    publicaciones: [
        {
            id: 1,
            title: "Mi experiencia aprendiendo JavaScript",
            content: "Después de 6 meses estudiando JavaScript, quiero compartir los recursos que más me han ayudado...",
            upvotes: 45,
            downvotes: 2,
            comments: 12,
            time: "hace 2 horas",
            community: "r/programacion"
        },
        {
            id: 2,
            title: "¿Qué framework de CSS recomiendan para principiantes?",
            content: "Estoy empezando con desarrollo web y me gustaría saber cuál es el mejor framework de CSS para comenzar...",
            upvotes: 23,
            downvotes: 1,
            comments: 8,
            time: "hace 5 horas",
            community: "r/webdev"
        },
        {
            id: 3,
            title: "Tutorial: Cómo configurar un entorno de desarrollo Node.js",
            content: "Una guía completa para configurar Node.js, npm y las herramientas esenciales para desarrollo...",
            upvotes: 67,
            downvotes: 3,
            comments: 15,
            time: "hace 1 día",
            community: "r/nodejs"
        }
    ],
    comentarios: [
        {
            id: 1,
            post: "Los mejores editores de código 2024",
            comment: "VSCode es definitivamente mi favorito, especialmente con las extensiones correctas.",
            upvotes: 12,
            downvotes: 0,
            time: "hace 1 hora",
            community: "r/programacion"
        },
        {
            id: 2,
            post: "Debate: ¿Tabs o espacios?",
            comment: "Siempre espacios, especialmente en Python donde la indentación es crucial.",
            upvotes: 8,
            downvotes: 2,
            time: "hace 3 horas",
            community: "r/python"
        }
    ],
    guardados: [
        {
            id: 1,
            title: "Guía completa de Git y GitHub",
            author: "u/gitmaster",
            upvotes: 234,
            comments: 45,
            time: "hace 2 días",
            community: "r/git"
        },
        {
            id: 2,
            title: "Recursos gratuitos para aprender React",
            author: "u/reactdev",
            upvotes: 156,
            comments: 23,
            time: "hace 1 semana",
            community: "r/reactjs"
        }
    ],
    comunidades: [
        {
            id: 1,
            name: "r/programacion",
            members: "125k",
            description: "Comunidad de programadores en español",
            joined: "hace 3 meses"
        },
        {
            id: 2,
            name: "r/webdev",
            members: "89k",
            description: "Todo sobre desarrollo web",
            joined: "hace 2 meses"
        },
        {
            id: 3,
            name: "r/javascript",
            members: "201k",
            description: "La comunidad de JavaScript",
            joined: "hace 1 mes"
        }
    ]
};

// Clase principal para manejar el perfil
class PerfilUsuario {
    constructor() {
        this.currentSection = 'publicaciones';
        this.currentTheme = 'light';
        this.isMobile = window.innerWidth <= 768;
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadUserData();
        this.loadContent('publicaciones');
        this.setupTheme();
        this.setupAccessibility();
        this.setupTooltips();
    }

    bindEvents() {
        // Navegación
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.switchSection(section);
            });
        });

        // Botón de editar perfil
        const editProfileBtn = document.getElementById('editProfileBtn');
        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', () => {
                this.openEditModal();
            });
        }

        // Modal
        const modalClose = document.getElementById('modalClose');
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                this.closeModal();
            });
        }

        const cancelEdit = document.getElementById('cancelEdit');
        if (cancelEdit) {
            cancelEdit.addEventListener('click', () => {
                this.closeModal();
            });
        }

        const saveEdit = document.getElementById('saveEdit');
        if (saveEdit) {
            saveEdit.addEventListener('click', () => {
                this.saveProfile();
            });
        }

        // Overlay del modal
        const modalOverlay = document.getElementById('modalOverlay');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === e.currentTarget) {
                    this.closeModal();
                }
            });
        }

        // Menú móvil
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        const mobileOverlay = document.getElementById('mobileOverlay');
        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }

        // Botones de acción
        const newPostBtn = document.getElementById('newPostBtn');
        if (newPostBtn) {
            newPostBtn.addEventListener('click', () => {
                this.showNotification('Función de nueva publicación próximamente', 'info');
            });
        }

        const sortBtn = document.getElementById('sortBtn');
        if (sortBtn) {
            sortBtn.addEventListener('click', () => {
                this.toggleSort();
            });
        }

        // Editar banner
        const editBannerBtn = document.getElementById('editBannerBtn');
        if (editBannerBtn) {
            editBannerBtn.addEventListener('click', () => {
                this.showNotification('Función de editar banner próximamente', 'info');
            });
        }

        // Responsive
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Teclado
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
    }

    loadUserData() {
        const username = document.getElementById('username');
        const userHandle = document.getElementById('userHandle');
        const karma = document.getElementById('karma');
        const posts = document.getElementById('posts');
        const followers = document.getElementById('followers');
        const communities = document.getElementById('communities');
        const statusIndicator = document.getElementById('statusIndicator');
        const avatarImage = document.getElementById('avatarImage');
        const bannerImage = document.getElementById('bannerImage');

        if (username)
            username.textContent = userData.username;
        if (userHandle)
            userHandle.textContent = userData.handle;
        if (karma)
            karma.textContent = userData.karma.toLocaleString();
        if (posts)
            posts.textContent = userData.posts;
        if (followers)
            followers.textContent = userData.followers;
        if (communities)
            communities.textContent = userData.communities;

        // Status indicator
        if (statusIndicator) {
            statusIndicator.className = `status-indicator ${userData.status}`;
        }

        // Avatar y banner
        if (avatarImage)
            avatarImage.src = userData.avatar;
        if (bannerImage)
            bannerImage.src = userData.banner;
    }

    switchSection(section) {
        // Actualizar navegación
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        const activeItem = document.querySelector(`[data-section="${section}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }

        // Actualizar título
        const titles = {
            'publicaciones': 'Mis publicaciones',
            'comentarios': 'Mis comentarios',
            'guardados': 'Publicaciones guardadas',
            'comunidades': 'Comunidades seguidas',
            'configuracion': 'Configuración'
        };
        const contentTitle = document.getElementById('contentTitle');
        if (contentTitle && titles[section]) {
            contentTitle.textContent = titles[section];
        }

        // Cargar contenido
        this.currentSection = section;
        this.loadContent(section);

        // Cerrar menú móvil si está abierto
        if (this.isMobile) {
            this.closeMobileMenu();
        }
    }

    loadContent(section) {
        const contentGrid = document.getElementById('contentGrid');
        if (!contentGrid)
            return;

        contentGrid.innerHTML = '';
        contentGrid.classList.add('loading');

        // Simular carga
        setTimeout(() => {
            contentGrid.classList.remove('loading');

            switch (section) {
                case 'publicaciones':
                    this.renderPublicaciones();
                    break;
                case 'comentarios':
                    this.renderComentarios();
                    break;
                case 'guardados':
                    this.renderGuardados();
                    break;
                case 'comunidades':
                    this.renderComunidades();
                    break;
                case 'configuracion':
                    this.renderConfiguracion();
                    break;
            }
        }, 500);
    }

    renderPublicaciones() {
        const contentGrid = document.getElementById('contentGrid');
        if (!contentGrid)
            return;

        contentData.publicaciones.forEach(post => {
            const card = this.createContentCard({
                title: post.title,
                content: post.content,
                meta: `${post.community} • ${post.time}`,
                actions: [
                    {icon: 'fas fa-arrow-up', label: post.upvotes, action: 'upvote'},
                    {icon: 'fas fa-arrow-down', label: post.downvotes, action: 'downvote'},
                    {icon: 'fas fa-comment', label: post.comments, action: 'comment'},
                    {icon: 'fas fa-share', label: 'Compartir', action: 'share'}
                ]
            });
            contentGrid.appendChild(card);
        });
    }

    renderComentarios() {
        const contentGrid = document.getElementById('contentGrid');
        if (!contentGrid)
            return;

        contentData.comentarios.forEach(comment => {
            const card = this.createContentCard({
                title: `En: ${comment.post}`,
                content: comment.comment,
                meta: `${comment.community} • ${comment.time}`,
                actions: [
                    {icon: 'fas fa-arrow-up', label: comment.upvotes, action: 'upvote'},
                    {icon: 'fas fa-arrow-down', label: comment.downvotes, action: 'downvote'},
                    {icon: 'fas fa-reply', label: 'Responder', action: 'reply'}
                ]
            });
            contentGrid.appendChild(card);
        });
    }

    renderGuardados() {
        const contentGrid = document.getElementById('contentGrid');
        if (!contentGrid)
            return;

        contentData.guardados.forEach(saved => {
            const card = this.createContentCard({
                title: saved.title,
                content: `Por ${saved.author}`,
                meta: `${saved.community} • ${saved.time}`,
                actions: [
                    {icon: 'fas fa-arrow-up', label: saved.upvotes, action: 'upvote'},
                    {icon: 'fas fa-comment', label: saved.comments, action: 'comment'},
                    {icon: 'fas fa-bookmark-slash', label: 'Eliminar', action: 'unsave'}
                ]
            });
            contentGrid.appendChild(card);
        });
    }

    renderComunidades() {
        const contentGrid = document.getElementById('contentGrid');
        if (!contentGrid)
            return;

        contentData.comunidades.forEach(community => {
            const card = this.createContentCard({
                title: community.name,
                content: community.description,
                meta: `${community.members} miembros • Te uniste ${community.joined}`,
                actions: [
                    {icon: 'fas fa-eye', label: 'Visitar', action: 'visit'},
                    {icon: 'fas fa-user-minus', label: 'Salir', action: 'leave'}
                ]
            });
            contentGrid.appendChild(card);
        });
    }

    renderConfiguracion() {
        const contentGrid = document.getElementById('contentGrid');
        if (!contentGrid)
            return;

        const configHTML = `
            <div class="config-section">
                <h3>Configuración de cuenta</h3>
                <div class="config-item">
                    <label>Tema</label>
                    <button class="config-btn" onclick="window.perfilUsuario.toggleTheme()">
                        <i class="fas fa-${this.currentTheme === 'light' ? 'moon' : 'sun'}"></i>
                        ${this.currentTheme === 'light' ? 'Modo oscuro' : 'Modo claro'}
                    </button>
                </div>
                <div class="config-item">
                    <label>Notificaciones</label>
                    <button class="config-btn">
                        <i class="fas fa-bell"></i>
                        Gestionar notificaciones
                    </button>
                </div>
                <div class="config-item">
                    <label>Privacidad</label>
                    <button class="config-btn">
                        <i class="fas fa-shield-alt"></i>
                        Configurar privacidad
                    </button>
                </div>
                <div class="config-item">
                    <label>Cuenta</label>
                    <button class="config-btn danger">
                        <i class="fas fa-trash"></i>
                        Eliminar cuenta
                    </button>
                </div>
            </div>
        `;
        contentGrid.innerHTML = configHTML;
    }

    createContentCard(data) {
        const card = document.createElement('div');
        card.className = 'content-card';
        card.innerHTML = `
            <div class="card-header">
                <h3 class="card-title">${data.title}</h3>
                <span class="card-meta">${data.meta}</span>
            </div>
            <div class="card-content">${data.content}</div>
            <div class="card-actions">
                ${data.actions.map(action => `
                    <button class="card-action ${action.action}" onclick="window.perfilUsuario.handleCardAction('${action.action}')">
                        <i class="${action.icon}"></i>
                        <span>${action.label}</span>
                    </button>
                `).join('')}
            </div>
        `;
        return card;
    }

    handleCardAction(action) {
        const actions = {
            'upvote': () => this.showNotification('¡Voto positivo!', 'success'),
            'downvote': () => this.showNotification('Voto negativo', 'info'),
            'comment': () => this.showNotification('Función de comentarios próximamente', 'info'),
            'share': () => this.showNotification('Enlace copiado al portapapeles', 'success'),
            'reply': () => this.showNotification('Función de respuesta próximamente', 'info'),
            'unsave': () => this.showNotification('Eliminado de guardados', 'info'),
            'visit': () => this.showNotification('Visitando comunidad...', 'info'),
            'leave': () => this.showNotification('Has salido de la comunidad', 'info')
        };

        if (actions[action]) {
            actions[action]();
        }
    }

    openEditModal() {
        const modal = document.getElementById('modalOverlay');
        if (!modal)
            return;

        modal.classList.add('active');

        // Cargar datos actuales
        const editUsername = document.getElementById('editUsername');
        const editHandle = document.getElementById('editHandle');
        const editBio = document.getElementById('editBio');

        if (editUsername)
            editUsername.value = userData.username;
        if (editHandle)
            editHandle.value = userData.handle;
        if (editBio)
            editBio.value = userData.bio || '';

        // Focus en el primer campo
        if (editUsername)
            editUsername.focus();
    }

    closeModal() {
        const modal = document.getElementById('modalOverlay');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    saveProfile() {
        const editUsername = document.getElementById('editUsername');
        const editHandle = document.getElementById('editHandle');
        const editBio = document.getElementById('editBio');

        const username = editUsername ? editUsername.value : '';
        const handle = editHandle ? editHandle.value : '';
        const bio = editBio ? editBio.value : '';

        if (!username || !handle) {
            this.showNotification('Por favor completa todos los campos requeridos', 'error');
            return;
        }

        // Simular guardado
        userData.username = username;
        userData.handle = handle;
        userData.bio = bio;

        this.loadUserData();
        this.closeModal();
        this.showNotification('Perfil actualizado correctamente', 'success');
    }

    toggleMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobileOverlay');

        if (sidebar)
            sidebar.classList.toggle('active');
        if (overlay)
            overlay.classList.toggle('active');
    }

    closeMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobileOverlay');

        if (sidebar)
            sidebar.classList.remove('active');
        if (overlay)
            overlay.classList.remove('active');
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);

        if (this.currentSection === 'configuracion') {
            this.renderConfiguracion();
        }
    }

    toggleSort() {
        this.showNotification('Ordenando por más reciente', 'info');
        // Aquí iría la lógica de ordenamiento
    }

    setupTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.currentTheme = savedTheme;
        document.body.setAttribute('data-theme', savedTheme);
    }

    setupAccessibility() {
        // Navegación por teclado
        document.querySelectorAll('.nav-item').forEach((item, index) => {
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
            item.setAttribute('aria-pressed', 'false');
        });

        // Actualizar aria-pressed para el elemento activo
        const activeItem = document.querySelector('.nav-item.active');
        if (activeItem) {
            activeItem.setAttribute('aria-pressed', 'true');
        }
    }

    setupTooltips() {
        const tooltip = document.getElementById('tooltip');
        if (!tooltip)
            return;

        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const text = e.target.getAttribute('data-tooltip');
                tooltip.textContent = text;
                tooltip.classList.add('show');

                const rect = e.target.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            });

            element.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });
        });
    }

    handleResize() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 768;

        if (wasMobile !== this.isMobile) {
            if (!this.isMobile) {
                this.closeMobileMenu();
            }
        }
    }

    handleKeyboard(e) {
        // Cerrar modal con Escape
        if (e.key === 'Escape') {
            const modal = document.getElementById('modalOverlay');
            const sidebar = document.getElementById('sidebar');

            if (modal && modal.classList.contains('active')) {
                this.closeModal();
            } else if (this.isMobile && sidebar && sidebar.classList.contains('active')) {
                this.closeMobileMenu();
            }
        }

        // Navegación por teclado en el menú
        if (e.target.classList.contains('nav-item')) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.target.click();
            }
        }
    }

    showNotification(message, type = 'info') {
        // Crear notificación
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation' : 'info'}"></i>
            <span>${message}</span>
        `;

        // Agregar estilos si no existen
        if (!document.querySelector('.notification-styles')) {
            const style = document.createElement('style');
            style.className = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 1rem 1.5rem;
                    border-radius: 0.5rem;
                    color: white;
                    font-weight: 500;
                    z-index: 10000;
                    animation: slideInRight 0.3s ease-out;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    min-width: 200px;
                }
                .notification.success { background: #28a745; }
                .notification.error { background: #dc3545; }
                .notification.info { background: #17a2b8; }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Eliminar después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Funciones de inicialización
function initializeApp() {
    // Inicializar la aplicación
    console.log('Aplicación inicializada');
}

function setupEventListeners() {
    // Configurar event listeners adicionales
    console.log('Event listeners configurados');
}

function loadInitialContent() {
    // Cargar contenido inicial
    console.log('Contenido inicial cargado');
}

// Manejo del userButton y userMenu
function setupUserMenu() {
    const userButton = document.getElementById('userButton');
    const userMenu = document.getElementById('userMenu');

    if (userButton && userMenu) {
        userButton.addEventListener('click', function (e) {
            e.stopPropagation();
            const isExpanded = userButton.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                userMenu.style.display = 'none';
                userButton.setAttribute('aria-expanded', 'false');
            } else {
                userMenu.style.display = 'flex';
                userButton.setAttribute('aria-expanded', 'true');
            }
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function (e) {
            if (userMenu.style.display === 'flex' &&
                    !userMenu.contains(e.target) &&
                    e.target !== userButton) {
                userMenu.style.display = 'none';
                userButton.setAttribute('aria-expanded', 'false');
            }
        });

        // Manejo del enlace de logout
        const logoutLink = userMenu.querySelector('a[href*="InicioPaginaHTML.html"]');
        if (logoutLink) {
            logoutLink.addEventListener('click', function (e) {
                e.preventDefault();
                window.location.href = '../PanelInicioPagina/InicioPaginaHTML.html';
            });
        }
    }
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function () {
    // Crear instancia global del perfil usuario
    window.perfilUsuario = new PerfilUsuario();

    // Inicializar funciones
    initializeApp();
    setupEventListeners();
    loadInitialContent();
    setupUserMenu();
});

// Agregar estilos adicionales para la configuración
const additionalStyles = `
    .config-section {
        background: var(--bg-secondary);
        border-radius: var(--border-radius);
        padding: 2rem;
    }
    
    .config-section h3 {
        margin-bottom: 2rem;
        color: var(--text-primary);
        font-size: 1.25rem;
    }
    
    .config-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0;
        border-bottom: 1px solid var(--border-color);
    }
    
    .config-item:last-child {
        border-bottom: none;
    }
    
    .config-item label {
        font-weight: 500;
        color: var(--text-primary);
    }
    
    .config-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius-sm);
        cursor: pointer;
        transition: var(--transition);
        color: var(--text-primary);
    }
    
    .config-btn:hover {
        background: var(--hover-light);
        transform: translateY(-1px);
    }
    
    .config-btn.danger {
        color: var(--accent-red);
        border-color: var(--accent-red);
    }
    
    .config-btn.danger:hover {
        background: var(--accent-red);
        color: white;
    }
`;

// Agregar estilos adicionales al head
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);