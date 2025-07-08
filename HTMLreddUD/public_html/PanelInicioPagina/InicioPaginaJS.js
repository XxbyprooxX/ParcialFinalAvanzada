// Inicialización del DOM
document.addEventListener('DOMContentLoaded', function () {
    initializeTheme();
    setupScrollAnimations();
    setupFloatingCTA();
    setupSmoothScrolling();
    setupInteractiveElements();
    setupHeaderScrollEffect();
});

// Gestión del tema claro/oscuro
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Obtener tema guardado o usar preferencia del sistema
    const currentTheme = localStorage.getItem('theme') ||
            (prefersDarkScheme.matches ? 'dark' : 'light');

    // Aplicar tema inicial
    applyTheme(currentTheme);

    // Event listener para el botón de cambio de tema
    themeToggle.addEventListener('click', function () {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Escuchar cambios en la preferencia del sistema
    prefersDarkScheme.addEventListener('change', function (e) {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');

    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
        themeToggle.setAttribute('aria-label', 'Cambiar a modo claro');
    } else {
        icon.className = 'fas fa-moon';
        themeToggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
    }
}

// Animaciones de scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-delay') || 0;

                setTimeout(() => {
                    if (element.hasAttribute('data-aos')) {
                        const animationType = element.getAttribute('data-aos');
                        element.classList.add('aos-animate');

                        switch (animationType) {
                            case 'fade-up':
                                element.style.opacity = '1';
                                element.style.transform = 'translateY(0)';
                                break;
                            case 'slide-right':
                                element.style.opacity = '1';
                                element.style.transform = 'translateX(0)';
                                break;
                            case 'slide-left':
                                element.style.opacity = '1';
                                element.style.transform = 'translateX(0)';
                                break;
                        }
                    }
                }, delay);

                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observar elementos con animación
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(element => {
        // Configurar estado inicial
        element.style.opacity = '0';
        element.style.transition = 'all 0.6s ease';

        const animationType = element.getAttribute('data-aos');
        switch (animationType) {
            case 'fade-up':
                element.style.transform = 'translateY(30px)';
                break;
            case 'slide-right':
                element.style.transform = 'translateX(-50px)';
                break;
            case 'slide-left':
                element.style.transform = 'translateX(50px)';
                break;
        }

        observer.observe(element);
    });
}

// Botón flotante CTA
function setupFloatingCTA() {
    const floatingCTA = document.getElementById('floatingCTA');
    let isVisible = false;

    // Mostrar/ocultar basado en scroll
    window.addEventListener('scroll', function () {
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;

        if (scrollPosition > windowHeight * 0.5 && !isVisible) {
            floatingCTA.style.opacity = '1';
            floatingCTA.style.transform = 'translateY(0)';
            isVisible = true;
        } else if (scrollPosition <= windowHeight * 0.5 && isVisible) {
            floatingCTA.style.opacity = '0';
            floatingCTA.style.transform = 'translateY(100px)';
            isVisible = false;
        }
    });

    // Configurar estado inicial
    floatingCTA.style.opacity = '0';
    floatingCTA.style.transform = 'translateY(100px)';
    floatingCTA.style.transition = 'all 0.3s ease';

    // Agregar funcionalidad al botón
    floatingCTA.addEventListener('click', function () {
        showModal('¡Únete a reddUD!', 'Funcionalidad de registro próximamente...');
    });
}

// Scroll suave para enlaces internos
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Elementos interactivos
function setupInteractiveElements() {
    // Animación de hover para tarjetas flotantes
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--shadow-light)';
        });
    });

    // Efectos de hover para botones
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Agregar funcionalidad a los botones principales
    const joinButtons = document.querySelectorAll('.btn-primary');
    joinButtons.forEach(button => {
        button.addEventListener('click', function () {
            if (this.textContent.includes('Únete') || this.textContent.includes('Empezar')) {
                showModal('¡Bienvenido a reddUD!', 'El registro estará disponible pronto. ¡Mantente atento!');
            }
        });
    });

    const exploreButtons = document.querySelectorAll('.btn-secondary');
    exploreButtons.forEach(button => {
        button.addEventListener('click', function () {
            if (this.textContent.includes('Explorar')) {
                showModal('Explorar Comunidades', 'Descubre miles de comunidades increíbles. Funcionalidad próximamente...');
            }
        });
    });
}

// Efecto del header al hacer scroll
function setupHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollY = window.pageYOffset;

    window.addEventListener('scroll', function () {
        const currentScrollY = window.pageYOffset;

        // Agregar/quitar clase para backdrop blur
        if (currentScrollY > 50) {
            header.style.backgroundColor = 'rgba(248, 249, 250, 0.9)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.backgroundColor = 'var(--bg-secondary)';
            header.style.backdropFilter = 'blur(0px)';
        }

        // Ocultar/mostrar header basado en dirección del scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });
}

// Modal simple para mostrar mensajes
function showModal(title, message) {
    // Crear modal si no existe
    let modal = document.getElementById('customModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'customModal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title"></h3>
                        <button class="modal-close" aria-label="Cerrar modal">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p class="modal-message"></p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-primary modal-confirm">Entendido</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Estilos del modal
        const modalStyles = `
            #customModal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            #customModal.show {
                opacity: 1;
                visibility: visible;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            
            .modal-content {
                background-color: var(--bg-secondary);
                border-radius: 12px;
                max-width: 500px;
                width: 100%;
                box-shadow: var(--shadow-heavy);
                transform: scale(0.8);
                transition: transform 0.3s ease;
            }
            
            #customModal.show .modal-content {
                transform: scale(1);
            }
            
            .modal-header {
                padding: 20px 20px 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-title {
                color: var(--text-primary);
                font-size: 1.5rem;
                font-weight: 600;
                margin: 0;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--text-secondary);
                cursor: pointer;
                padding: 5px;
                border-radius: 50%;
                transition: all 0.2s ease;
            }
            
            .modal-close:hover {
                color: var(--accent-orange);
                background-color: var(--bg-tertiary);
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .modal-message {
                color: var(--text-secondary);
                line-height: 1.6;
                margin: 0;
            }
            
            .modal-footer {
                padding: 0 20px 20px;
                display: flex;
                justify-content: flex-end;
            }
        `;

        // Agregar estilos al head
        const styleSheet = document.createElement('style');
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);

        // Event listeners para cerrar modal
        modal.querySelector('.modal-close').addEventListener('click', hideModal);
        modal.querySelector('.modal-confirm').addEventListener('click', hideModal);
        modal.querySelector('.modal-overlay').addEventListener('click', function (e) {
            if (e.target === this) {
                hideModal();
            }
        });

        // Cerrar con ESC
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                hideModal();
            }
        });
    }

    // Actualizar contenido y mostrar modal
    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.modal-message').textContent = message;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function hideModal() {
    const modal = document.getElementById('customModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Parallax suave para elementos flotantes
function setupParallaxEffect() {
    const floatingCards = document.querySelectorAll('.floating-card');

    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        floatingCards.forEach((card, index) => {
            const speed = 0.3 + (index * 0.1);
            card.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Inicializar parallax después de que se cargue todo
window.addEventListener('load', function () {
    setupParallaxEffect();
});

// Gestión de rendimiento para animaciones
function optimizeAnimations() {
    let ticking = false;

    function updateAnimations() {
        // Aquí puedes agregar lógica para optimizar animaciones
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    });
}

// Inicializar optimizaciones
optimizeAnimations();