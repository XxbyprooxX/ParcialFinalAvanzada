document.addEventListener('DOMContentLoaded', function () {
    // Initialize variables
    let isJoined = false;
    let memberCount = 0;
    let isLoading = false;

    // DOM Elements
    const joinBtn = document.getElementById('joinBtn');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.querySelector('.sidebar');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    const voteAnimation = document.getElementById('voteAnimation');
    const memberCountElement = document.querySelector('.member-count');
    const communityNameElement = document.querySelector('.community-name');
    const communityHandleElement = document.querySelector('.community-handle');
    const communityDescriptionElement = document.querySelector('.community-description');
    const bannerElement = document.querySelector('.banner');
    const avatarElement = document.querySelector('.avatar');

    // Update join button UI
    function updateJoinButton() {
        const btnText = joinBtn.querySelector('span');
        const btnIcon = joinBtn.querySelector('i');

        if (isJoined) {
            joinBtn.classList.add('joined');
            joinBtn.style.background = '#28a745';
            btnIcon.className = 'fas fa-check';
            btnText.textContent = 'Unido';
        } else {
            joinBtn.classList.remove('joined');
            joinBtn.style.background = '#FF4500';
            btnIcon.className = 'fas fa-plus';
            btnText.textContent = 'Unirse';
        }
    }

    // Update member count with animation
    function updateMemberCount() {
        const element = memberCountElement;
        element.style.transform = 'scale(1.1)';
        element.style.color = '#FF4500';

        setTimeout(() => {
            element.textContent = memberCount.toLocaleString();
        }, 100);

        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.color = '#FF4500';
        }, 200);
    }

    // Join/Leave button functionality
    joinBtn.addEventListener('click', async function () {
        try {
            if (isJoined) {
                const message = await leaveCommunity();
                if (message.includes('successfully')) {
                    isJoined = false;
                    memberCount--;
                    updateJoinButton();
                    updateMemberCount();
                    showNotification('Has abandonado la comunidad', 'error');
                } else {
                    showNotification('Error al abandonar la comunidad', 'error');
                }
            } else {
                const message = await joinCommunity();
                if (message.includes('successfully')) {
                    isJoined = true;
                    memberCount++;
                    updateJoinButton();
                    updateMemberCount();
                    showNotification('¡Te has unido a la comunidad!', 'success');
                } else {
                    showNotification('Error al unirse a la comunidad', 'error');
                }
            }
        } catch (error) {
            console.error('Error in join/leave community:', error);
            showNotification('Error en la operación de comunidad', 'error');
        }

        // Button animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });

    // Navigation functionality
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            const targetSection = this.dataset.section;

            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));

            // Add active class to clicked item
            this.classList.add('active');

            // Hide all sections
            sections.forEach(section => section.classList.remove('active'));

            // Show target section
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
            }

            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
        });
    });

    // Vote functionality
    function setupVoteButtons() {
        const voteButtons = document.querySelectorAll('.vote-btn');

        voteButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                e.stopPropagation();

                const isUpvote = this.classList.contains('upvote');
                const voteCountElement = this.querySelector('.vote-count');
                const currentCount = parseInt(voteCountElement.textContent);
                const postCard = this.closest('.post-card');
                const otherVoteBtn = postCard.querySelector(isUpvote ? '.downvote' : '.upvote');

                // Remove voted state from other button
                otherVoteBtn.classList.remove('voted');

                // Toggle vote state
                if (this.classList.contains('voted')) {
                    // Remove vote
                    this.classList.remove('voted');
                    voteCountElement.textContent = currentCount - 1;
                } else {
                    // Add vote
                    this.classList.add('voted');
                    voteCountElement.textContent = currentCount + 1;

                    // Show vote animation
                    showVoteAnimation(e, isUpvote);
                }

                // Button animation
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }

    // Show vote animation
    function showVoteAnimation(event, isUpvote) {
        const animation = voteAnimation;
        const rect = event.target.getBoundingClientRect();

        animation.style.left = rect.left + rect.width / 2 + 'px';
        animation.style.top = rect.top + 'px';
        animation.textContent = isUpvote ? '+1' : '-1';
        animation.className = `vote-animation ${isUpvote ? 'upvote' : 'downvote'}`;

        // Trigger animation
        setTimeout(() => {
            animation.classList.add('show');
        }, 50);

        // Remove animation after completion
        setTimeout(() => {
            animation.classList.remove('show');
        }, 650);
    }

    // Load more posts functionality
    loadMoreBtn.addEventListener('click', function () {
        if (isLoading)
            return;

        isLoading = true;
        const btnText = this.querySelector('.btn-text');
        const spinner = this.querySelector('.loading-spinner');

        // Show loading state
        btnText.style.display = 'none';
        spinner.classList.remove('hidden');
        spinner.classList.add('show');
        this.disabled = true;

        // Simulate loading delay
        setTimeout(() => {
            // Add new posts
            addNewPosts();

            // Hide loading state
            btnText.style.display = 'block';
            spinner.classList.add('hidden');
            spinner.classList.remove('show');
            this.disabled = false;
            isLoading = false;
        }, 1500);
    });

    // Add new posts dynamically
    function addNewPosts() {
        const postsContainer = document.querySelector('.posts-container');
        const newPosts = [
            {
                image: 'https://via.placeholder.com/400x200/20c997/FFFFFF?text=God+of+War',
                title: 'God of War Ragnarök - Análisis completo',
                username: '@NordicGamer',
                time: 'hace 3 horas',
                upvotes: 456,
                downvotes: 15,
                comments: 89
            },
            {
                image: 'https://via.placeholder.com/400x200/6610f2/FFFFFF?text=Fortnite+Season',
                title: 'Nueva temporada de Fortnite: Todo lo que necesitas saber',
                username: '@BattleRoyaleFan',
                time: 'hace 6 horas',
                upvotes: 321,
                downvotes: 23,
                comments: 67
            }
        ];

        newPosts.forEach(post => {
            const postElement = createPostElement(post);
            postsContainer.appendChild(postElement);
        });

        // Reinitialize vote buttons for new posts
        setupVoteButtons();

        // Animate new posts
        const newPostElements = postsContainer.querySelectorAll('.post-card:nth-last-child(-n+2)');
        newPostElements.forEach((post, index) => {
            post.style.opacity = '0';
            post.style.transform = 'translateY(20px)';
            setTimeout(() => {
                post.style.transition = 'all 0.5s ease';
                post.style.opacity = '1';
                post.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Create post element
    function createPostElement(post) {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        postCard.innerHTML = `
            <div class="post-image">
                <img src="${post.image}" alt="Post Image">
            </div>
            <div class="post-content">
                <h3 class="post-title">${post.title}</h3>
                <div class="post-meta">
                    <img src="https://via.placeholder.com/32x32/${getRandomColor()}/FFFFFF?text=${post.username.charAt(1).toUpperCase()}" alt="User" class="user-avatar">
                    <span class="username">${post.username}</span>
                    <span class="post-time">${post.time}</span>
                </div>
                <div class="post-actions">
                    <button class="vote-btn upvote">
                        <i class="fas fa-arrow-up"></i>
                        <span class="vote-count">${post.upvotes}</span>
                    </button>
                    <button class="vote-btn downvote">
                        <i class="fas fa-arrow-down"></i>
                        <span class="vote-count">${post.downvotes}</span>
                    </button>
                    <button class="comment-btn">
                        <i class="fas fa-comment"></i>
                        <span>${post.comments} comentarios</span>
                    </button>
                </div>
            </div>
        `;
        return postCard;
    }

    // Get random color for avatars
    function getRandomColor() {
        const colors = ['007BFF', 'dc3545', '28a745', 'ffc107', '17a2b8', '6f42c1'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Mobile menu functionality
    mobileMenuBtn.addEventListener('click', function () {
        sidebar.classList.toggle('open');

        // Animate button
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 768 &&
                !sidebar.contains(e.target) &&
                !mobileMenuBtn.contains(e.target) &&
                sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    });

    // Update member count with animation
    function updateMemberCount() {
        const element = memberCountElement;
        element.style.transform = 'scale(1.1)';
        element.style.color = '#FF4500';

        setTimeout(() => {
            element.textContent = memberCount.toLocaleString();
        }, 100);

        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.color = '#FF4500';
        }, 200);
    }

    // Show notification
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background: #28a745;' : 'background: #dc3545;'}
        `;

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Hide and remove notification
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add hover effects to post cards
    function setupPostHoverEffects() {
        const postCards = document.querySelectorAll('.post-card');

        postCards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-4px)';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    // Add community theme customization
    function setupCommunityTheme() {
        const communityThemes = {
            gaming: {
                primary: '#FF4500',
                secondary: '#ff6b35',
                accent: '#e63e00'
            },
            programming: {
                primary: '#007BFF',
                secondary: '#0056b3',
                accent: '#004085'
            },
            art: {
                primary: '#6f42c1',
                secondary: '#5a32a3',
                accent: '#452284'
            }
        };

        // Apply gaming theme by default
        const theme = communityThemes.gaming;
        document.documentElement.style.setProperty('--primary-color', theme.primary);
        document.documentElement.style.setProperty('--secondary-color', theme.secondary);
        document.documentElement.style.setProperty('--accent-color', theme.accent);
    }

    // Intersection Observer for animations
    function setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1
        });

        const animatedElements = document.querySelectorAll('.post-card');
        animatedElements.forEach(el => observer.observe(el));
    }

    // Add CSS for scroll animations
    function addScrollAnimationCSS() {
        const style = document.createElement('style');
        style.textContent = `
            .post-card {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.6s ease;
            }
            
            .post-card.animate {
                opacity: 1;
                transform: translateY(0);
            }
            
            .post-card:nth-child(1) { transition-delay: 0.1s; }
            .post-card:nth-child(2) { transition-delay: 0.2s; }
            .post-card:nth-child(3) { transition-delay: 0.3s; }
        `;
        document.head.appendChild(style);
    }

    // Initialize everything
    function init() {
        setupVoteButtons();
        setupPostHoverEffects();
        setupCommunityTheme();
        addScrollAnimationCSS();
        setupScrollAnimations();

        // Add initial animation to posts
        setTimeout(() => {
            const posts = document.querySelectorAll('.post-card');
            posts.forEach(post => post.classList.add('animate'));
        }, 500);
    }

    // Window resize handler
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('open');
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    });

    // Initialize the application
    init();

    // Add some dynamic content loading simulation
    setTimeout(() => {
        const loadingStates = document.querySelectorAll('.loading');
        loadingStates.forEach(state => {
            state.style.display = 'none';
        });
    }, 1000);
});

// Vote functionality
function setupVoteButtons() {
    const voteButtons = document.querySelectorAll('.vote-btn');

    voteButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();

            const isUpvote = this.classList.contains('upvote');
            const voteCountElement = this.querySelector('.vote-count');
            const currentCount = parseInt(voteCountElement.textContent);
            const postCard = this.closest('.post-card');
            const otherVoteBtn = postCard.querySelector(isUpvote ? '.downvote' : '.upvote');

            // Remove voted state from other button
            otherVoteBtn.classList.remove('voted');

            // Toggle vote state
            if (this.classList.contains('voted')) {
                // Remove vote
                this.classList.remove('voted');
                voteCountElement.textContent = currentCount - 1;
            } else {
                // Add vote
                this.classList.add('voted');
                voteCountElement.textContent = currentCount + 1;

                // Show vote animation
                showVoteAnimation(e, isUpvote);
            }

            // Button animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Show vote animation
function showVoteAnimation(event, isUpvote) {
    const animation = voteAnimation;
    const rect = event.target.getBoundingClientRect();

    animation.style.left = rect.left + rect.width / 2 + 'px';
    animation.style.top = rect.top + 'px';
    animation.textContent = isUpvote ? '+1' : '-1';
    animation.className = `vote-animation ${isUpvote ? 'upvote' : 'downvote'}`;

    // Trigger animation
    setTimeout(() => {
        animation.classList.add('show');
    }, 50);

    // Remove animation after completion
    setTimeout(() => {
        animation.classList.remove('show');
    }, 650);
}

// Load more posts functionality
loadMoreBtn.addEventListener('click', function () {
    if (isLoading)
        return;

    isLoading = true;
    const btnText = this.querySelector('.btn-text');
    const spinner = this.querySelector('.loading-spinner');

    // Show loading state
    btnText.style.display = 'none';
    spinner.classList.remove('hidden');
    spinner.classList.add('show');
    this.disabled = true;

    // Simulate loading delay
    setTimeout(() => {
        // Add new posts
        addNewPosts();

        // Hide loading state
        btnText.style.display = 'block';
        spinner.classList.add('hidden');
        spinner.classList.remove('show');
        this.disabled = false;
        isLoading = false;
    }, 1500);
});

// Add new posts dynamically
function addNewPosts() {
    const postsContainer = document.querySelector('.posts-container');
    const newPosts = [
        {
            image: 'https://via.placeholder.com/400x200/20c997/FFFFFF?text=God+of+War',
            title: 'God of War Ragnarök - Análisis completo',
            username: '@NordicGamer',
            time: 'hace 3 horas',
            upvotes: 456,
            downvotes: 15,
            comments: 89
        },
        {
            image: 'https://via.placeholder.com/400x200/6610f2/FFFFFF?text=Fortnite+Season',
            title: 'Nueva temporada de Fortnite: Todo lo que necesitas saber',
            username: '@BattleRoyaleFan',
            time: 'hace 6 horas',
            upvotes: 321,
            downvotes: 23,
            comments: 67
        }
    ];

    newPosts.forEach(post => {
        const postElement = createPostElement(post);
        postsContainer.appendChild(postElement);
    });

    // Reinitialize vote buttons for new posts
    setupVoteButtons();

    // Animate new posts
    const newPostElements = postsContainer.querySelectorAll('.post-card:nth-last-child(-n+2)');
    newPostElements.forEach((post, index) => {
        post.style.opacity = '0';
        post.style.transform = 'translateY(20px)';
        setTimeout(() => {
            post.style.transition = 'all 0.5s ease';
            post.style.opacity = '1';
            post.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Create post element
function createPostElement(post) {
    const postCard = document.createElement('div');
    postCard.className = 'post-card';
    postCard.innerHTML = `
            <div class="post-image">
                <img src="${post.image}" alt="Post Image">
            </div>
            <div class="post-content">
                <h3 class="post-title">${post.title}</h3>
                <div class="post-meta">
                    <img src="https://via.placeholder.com/32x32/${getRandomColor()}/FFFFFF?text=${post.username.charAt(1).toUpperCase()}" alt="User" class="user-avatar">
                    <span class="username">${post.username}</span>
                    <span class="post-time">${post.time}</span>
                </div>
                <div class="post-actions">
                    <button class="vote-btn upvote">
                        <i class="fas fa-arrow-up"></i>
                        <span class="vote-count">${post.upvotes}</span>
                    </button>
                    <button class="vote-btn downvote">
                        <i class="fas fa-arrow-down"></i>
                        <span class="vote-count">${post.downvotes}</span>
                    </button>
                    <button class="comment-btn">
                        <i class="fas fa-comment"></i>
                        <span>${post.comments} comentarios</span>
                    </button>
                </div>
            </div>
        `;
    return postCard;
}

// Get random color for avatars
function getRandomColor() {
    const colors = ['007BFF', 'dc3545', '28a745', 'ffc107', '17a2b8', '6f42c1'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Mobile menu functionality
mobileMenuBtn.addEventListener('click', function () {
    sidebar.classList.toggle('open');

    // Animate button
    this.style.transform = 'scale(0.9)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 150);
});

// Close mobile menu when clicking outside
document.addEventListener('click', function (e) {
    if (window.innerWidth <= 768 &&
            !sidebar.contains(e.target) &&
            !mobileMenuBtn.contains(e.target) &&
            sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
    }
});

// Update member count with animation
function updateMemberCount() {
    const element = memberCountElement;
    element.style.transform = 'scale(1.1)';
    element.style.color = '#FF4500';

    setTimeout(() => {
        element.textContent = memberCount.toLocaleString();
    }, 100);

    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.color = '#FF4500';
    }, 200);
}

// Show notification
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background: #28a745;' : 'background: #dc3545;'}
        `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Hide and remove notification
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add hover effects to post cards
function setupPostHoverEffects() {
    const postCards = document.querySelectorAll('.post-card');

    postCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-4px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Add community theme customization
function setupCommunityTheme() {
    const communityThemes = {
        gaming: {
            primary: '#FF4500',
            secondary: '#ff6b35',
            accent: '#e63e00'
        },
        programming: {
            primary: '#007BFF',
            secondary: '#0056b3',
            accent: '#004085'
        },
        art: {
            primary: '#6f42c1',
            secondary: '#5a32a3',
            accent: '#452284'
        }
    };

    // Apply gaming theme by default
    const theme = communityThemes.gaming;
    document.documentElement.style.setProperty('--primary-color', theme.primary);
    document.documentElement.style.setProperty('--secondary-color', theme.secondary);
    document.documentElement.style.setProperty('--accent-color', theme.accent);
}

// Intersection Observer for animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    const animatedElements = document.querySelectorAll('.post-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Add CSS for scroll animations
function addScrollAnimationCSS() {
    const style = document.createElement('style');
    style.textContent = `
            .post-card {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.6s ease;
            }
            
            .post-card.animate {
                opacity: 1;
                transform: translateY(0);
            }
            
            .post-card:nth-child(1) { transition-delay: 0.1s; }
            .post-card:nth-child(2) { transition-delay: 0.2s; }
            .post-card:nth-child(3) { transition-delay: 0.3s; }
        `;
    document.head.appendChild(style);
}

// Initialize everything
function init() {
    setupVoteButtons();
    setupPostHoverEffects();
    setupCommunityTheme();
    addScrollAnimationCSS();
    setupScrollAnimations();

    // Add initial animation to posts
    setTimeout(() => {
        const posts = document.querySelectorAll('.post-card');
        posts.forEach(post => post.classList.add('animate'));
    }, 500);
}

// Window resize handler
window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('open');
    }
});

// Keyboard navigation
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
    }
});

// Initialize the application
init();

// Add some dynamic content loading simulation
setTimeout(() => {
    const loadingStates = document.querySelectorAll('.loading');
    loadingStates.forEach(state => {
        state.style.display = 'none';
    });
}, 1000);