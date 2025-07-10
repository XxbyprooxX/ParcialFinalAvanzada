// Configuración y variables globales
const formData = {
    email: '',
    username: '',
    password: '',
    gender: '',
    interests: []
};

const validationRules = {
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Por favor ingresa un email válido'
    },
    username: {
        required: true,
        minLength: 3,
        maxLength: 20,
        pattern: /^[a-zA-Z0-9_]+$/,
        message: 'El nombre de usuario debe tener entre 3-20 caracteres y solo contener letras, números y guiones bajos'
    },
    password: {
        required: true,
        minLength: 8,
        patterns: {
            uppercase: /[A-Z]/,
            lowercase: /[a-z]/,
            number: /[0-9]/,
            special: /[!@#$%^&*(),.?":{}|<>]/
        },
        message: 'La contraseña debe tener al menos 8 caracteres'
    }
};

// Inicialización del DOM
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();

    // Add navigation for "Inicia sesión" link
    const loginLink = document.querySelector('.login-link');
    if (loginLink) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '../PanelLogin/LoginHTML.html';
        });
    }
});

function initializeApp() {
    setupTheme();
    setupFormValidation();
    setupPasswordToggle();
    setupPasswordStrength();
    setupFormSubmission();
    setupInterestsValidation();
    setupGenderValidation();
    setupAccessibility();
}

// Configuración del tema
function setupTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Configuración de validación del formulario
function setupFormValidation() {
    const form = document.getElementById('registrationForm');
    const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(this);
            updateFormState();
        });
        
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('focus', function() {
            clearFieldError(this);
        });
    });
}

function validateField(field) {
    const fieldName = field.name;
    const value = field.value.trim();
    const rules = validationRules[fieldName];
    
    if (!rules) return true;
    
    let isValid = true;
    let errorMessage = '';
    
    // Validación de campo requerido
    if (rules.required && !value) {
        isValid = false;
        errorMessage = `${getFieldDisplayName(fieldName)} es requerido`;
    }
    
    // Validación de longitud mínima
    if (isValid && rules.minLength && value.length < rules.minLength) {
        isValid = false;
        errorMessage = `${getFieldDisplayName(fieldName)} debe tener al menos ${rules.minLength} caracteres`;
    }
    
    // Validación de longitud máxima
    if (isValid && rules.maxLength && value.length > rules.maxLength) {
        isValid = false;
        errorMessage = `${getFieldDisplayName(fieldName)} no debe exceder ${rules.maxLength} caracteres`;
    }
    
    // Validación de patrón
    if (isValid && rules.pattern && !rules.pattern.test(value)) {
        isValid = false;
        errorMessage = rules.message;
    }
    
    // Validación especial para contraseña
    if (isValid && fieldName === 'password') {
        const passwordValidation = validatePassword(value);
        if (!passwordValidation.isValid) {
            isValid = false;
            errorMessage = passwordValidation.message;
        }
    }
    
    if (isValid) {
        clearFieldError(field);
        formData[fieldName] = value;
    } else {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function validatePassword(password) {
    const rules = validationRules.password;
    let score = 0;
    let messages = [];
    
    if (password.length < rules.minLength) {
        messages.push(`Mínimo ${rules.minLength} caracteres`);
    } else {
        score += 1;
    }
    
    if (rules.patterns.uppercase.test(password)) {
        score += 1;
    } else {
        messages.push('Al menos una mayúscula');
    }
    
    if (rules.patterns.lowercase.test(password)) {
        score += 1;
    } else {
        messages.push('Al menos una minúscula');
    }
    
    if (rules.patterns.number.test(password)) {
        score += 1;
    } else {
        messages.push('Al menos un número');
    }
    
    if (rules.patterns.special.test(password)) {
        score += 1;
    } else {
        messages.push('Al menos un carácter especial');
    }
    
    return {
        isValid: score >= 4,
        score: score,
        message: messages.length > 0 ? messages.join(', ') : ''
    };
}

export function showFieldError(field, message) {
    const container = field.closest('.input-container');
    const errorElement = document.getElementById(`${field.name}-error`);
    
    container.classList.add('error');
    errorElement.textContent = `⚠️ ${message}`;
    errorElement.classList.add('show');
    
    // Agregar efecto de shake
    setTimeout(() => {
        errorElement.classList.remove('show');
    }, 500);
}

export function clearFieldError(field) {
    const container = field.closest('.input-container');
    const errorElement = document.getElementById(`${field.name}-error`);
    
    if (container) container.classList.remove('error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

function getFieldDisplayName(fieldName) {
    const names = {
        email: 'Email',
        username: 'Nombre de usuario',
        password: 'Contraseña'
    };
    return names[fieldName] || fieldName;
}

// Configuración del toggle de contraseña
function setupPasswordToggle() {
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    
    passwordToggle.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const icon = this.querySelector('i');
        icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
    });
}

// Configuración del medidor de seguridad de contraseña
function setupPasswordStrength() {
    const passwordInput = document.getElementById('password');
    const strengthBar = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const validation = validatePassword(password);
        const score = validation.score;
        
        // Actualizar barra de progreso
        const percentage = (score / 5) * 100;
        strengthBar.style.width = `${percentage}%`;
        
        // Actualizar color y texto
        if (score <= 2) {
            strengthBar.style.backgroundColor = '#dc3545';
            strengthText.textContent = 'Débil';
        } else if (score <= 3) {
            strengthBar.style.backgroundColor = '#ffc107';
            strengthText.textContent = 'Moderada';
        } else if (score <= 4) {
            strengthBar.style.backgroundColor = '#28a745';
            strengthText.textContent = 'Fuerte';
        } else {
            strengthBar.style.backgroundColor = '#28a745';
            strengthText.textContent = 'Muy fuerte';
        }
        
        if (password === '') {
            strengthBar.style.width = '0%';
            strengthText.textContent = 'Seguridad de la contraseña';
        }
    });
}

// Configuración de validación de género
function setupGenderValidation() {
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    
    genderInputs.forEach(input => {
        input.addEventListener('change', function() {
            formData.gender = this.value;
            clearFieldError(this);
            updateFormState();
        });
    });
}

// Configuración de validación de intereses
function setupInterestsValidation() {
    const interestInputs = document.querySelectorAll('input[name="interests"]');
    
    interestInputs.forEach(input => {
        input.addEventListener('change', function() {
            updateInterests();
            validateInterests();
            updateFormState();
        });
    });
}

function updateInterests() {
    const checkedInterests = document.querySelectorAll('input[name="interests"]:checked');
    formData.interests = Array.from(checkedInterests).map(input => input.value);
}

function validateInterests() {
    const errorElement = document.getElementById('interests-error');
    const hasInterests = formData.interests.length > 0;
    
    if (!hasInterests) {
        errorElement.textContent = '⚠️ Debes seleccionar al menos un interés';
        errorElement.classList.add('show');
        return false;
    } else {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        return true;
    }
}

function validateGender() {
    const genderInput = document.querySelector('input[name="gender"]:checked');
    const errorElement = document.getElementById('gender-error');
    
    if (!genderInput) {
        errorElement.textContent = '⚠️ Debes seleccionar un género';
        errorElement.classList.add('show');
        return false;
    } else {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        return true;
    }
}

// Configuración del envío del formulario
function setupFormSubmission() {
    const form = document.getElementById('registrationForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            handleFormSubmission();
        }
    });
}

function validateForm() {
    const emailValid = validateField(document.getElementById('email'));
    const usernameValid = validateField(document.getElementById('username'));
    const passwordValid = validateField(document.getElementById('password'));
    const genderValid = validateGender();
    const interestsValid = validateInterests();
    
    return emailValid && usernameValid && passwordValid && genderValid && interestsValid;
}

function updateFormState() {
    const submitBtn = document.getElementById('submitBtn');
    const isFormValid = isFormComplete();
    
    submitBtn.disabled = !isFormValid;
    
    if (isFormValid) {
        submitBtn.classList.add('enabled');
    } else {
        submitBtn.classList.remove('enabled');
    }
}

function isFormComplete() {
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');
    const interests = document.querySelectorAll('input[name="interests"]:checked');
    
    // Validar que todos los campos básicos estén completos
    const basicFieldsValid = email && username && password && gender && interests.length > 0;
    
    if (!basicFieldsValid) return false;
    
    // Validar que los campos cumplan con las reglas
    const emailValid = validationRules.email.pattern.test(email);
    const usernameValid = validationRules.username.pattern.test(username) && 
                         username.length >= validationRules.username.minLength;
    const passwordValid = validatePassword(password).isValid;
    
    return emailValid && usernameValid && passwordValid;
}

function handleFormSubmission() {
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');
    
    // Mostrar estado de carga
    submitBtn.disabled = true;
    btnText.textContent = 'Registrando...';
    btnIcon.className = 'fas fa-spinner fa-spin';
    
    // Simular envío del formulario
    setTimeout(() => {
        // Aquí iría la lógica real de envío
        console.log('Datos del formulario:', formData);
        
        // Mostrar éxito
        showSuccess();
        
        // Resetear botón después de un tiempo
        setTimeout(() => {
            resetForm();
        }, 2000);
    }, 2000);
}

export function showSuccess() {
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');
    
    submitBtn.style.background = '#28a745';
    btnText.textContent = '¡Registrado!';
    btnIcon.className = 'fas fa-check';
    
    // Añadir efecto de confeti o celebración
    createConfetti();
}

export function createConfetti() {
    const colors = ['#007BFF', '#28a745', '#ffc107', '#dc3545', '#6f42c1'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.zIndex = '9999';
            confetti.style.borderRadius = '50%';
            confetti.style.animation = 'fall 3s linear forwards';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 50);
    }
}

function resetForm() {
    const form = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');
    
    form.reset();
    
    // Resetear datos del formulario
    formData.email = '';
    formData.username = '';
    formData.password = '';
    formData.gender = '';
    formData.interests = [];
    
    // Resetear botón
    submitBtn.style.background = '';
    submitBtn.disabled = true;
    btnText.textContent = 'Registrar';
    btnIcon.className = 'fas fa-arrow-right';
    
    // Limpiar errores
    document.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
        error.classList.remove('show');
    });
    
    document.querySelectorAll('.input-container').forEach(container => {
        container.classList.remove('error');
    });
    
    // Resetear medidor de contraseña
    document.querySelector('.strength-fill').style.width = '0%';
    document.querySelector('.strength-text').textContent = 'Seguridad de la contraseña';
}

// Configuración de accesibilidad
function setupAccessibility() {
    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const activeElement = document.activeElement;
            
            if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'BUTTON') {
                if (activeElement.type === 'submit') {
                    activeElement.click();
                } else if (activeElement.type === 'radio' || activeElement.type === 'checkbox') {
                    activeElement.checked = !activeElement.checked;
                    activeElement.dispatchEvent(new Event('change'));
                }
            }
        }
    });
    
    // Mejorar contraste para usuarios con discapacidad visual
    const highContrastMode = localStorage.getItem('highContrast') === 'true';
    if (highContrastMode) {
        document.body.classList.add('high-contrast');
    }
    
    // Anunciar cambios importantes para lectores de pantalla
    setupAriaLive();
}

function setupAriaLive() {
    const ariaLive = document.createElement('div');
    ariaLive.setAttribute('aria-live', 'polite');
    ariaLive.setAttribute('aria-atomic', 'true');
    ariaLive.style.position = 'absolute';
    ariaLive.style.left = '-10000px';
    ariaLive.style.width = '1px';
    ariaLive.style.height = '1px';
    ariaLive.style.overflow = 'hidden';
    document.body.appendChild(ariaLive);
    
    window.announceToScreenReader = function(message) {
        ariaLive.textContent = message;
        setTimeout(() => {
            ariaLive.textContent = '';
        }, 1000);
    };
}

// Animación de confeti CSS
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes fall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .high-contrast {
        filter: contrast(150%) brightness(120%);
    }
    
    .high-contrast input,
    .high-contrast button,
    .high-contrast label {
        border-width: 3px !important;
    }
`;
document.head.appendChild(confettiStyle);

// Función para validar email en tiempo real con sugerencias
function setupEmailSuggestions() {
    const emailInput = document.getElementById('email');
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'email-suggestions';
    emailInput.parentNode.appendChild(suggestionsContainer);
    
    const commonDomains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];
    
    emailInput.addEventListener('input', function() {
        const email = this.value;
        const atIndex = email.indexOf('@');
        
        if (atIndex > 0 && atIndex < email.length - 1) {
            const domain = email.substring(atIndex + 1);
            const suggestions = commonDomains.filter(d => d.startsWith(domain) && d !== domain);
            
            if (suggestions.length > 0 && domain.length > 0) {
                showEmailSuggestions(suggestions, email.substring(0, atIndex + 1));
            } else {
                hideEmailSuggestions();
            }
        } else {
            hideEmailSuggestions();
        }
    });
}

function showEmailSuggestions(suggestions, prefix) {
    const suggestionsContainer = document.querySelector('.email-suggestions');
    suggestionsContainer.innerHTML = '';
    
    suggestions.forEach(domain => {
        const suggestion = document.createElement('div');
        suggestion.className = 'suggestion';
        suggestion.textContent = prefix + domain;
        suggestion.addEventListener('click', function() {
            document.getElementById('email').value = this.textContent;
            hideEmailSuggestions();
            validateField(document.getElementById('email'));
        });
        suggestionsContainer.appendChild(suggestion);
    });
    
    suggestionsContainer.style.display = 'block';
}

function hideEmailSuggestions() {
    const suggestionsContainer = document.querySelector('.email-suggestions');
    if (suggestionsContainer) {
        suggestionsContainer.style.display = 'none';
    }
}

// Inicializar sugerencias de email cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    setupEmailSuggestions();
});

// Funciones de utilidad para mejorar la experiencia del usuario
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimizar validación con debounce
const debouncedValidation = debounce(validateField, 300);

// Reemplazar eventos de input con versión optimizada
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            debouncedValidation(this);
        });
    });
});

// Función para mostrar tooltips informativos
function setupTooltips() {
    const tooltips = {
        username: 'El nombre de usuario debe ser único y solo puede contener letras, números y guiones bajos.',
        password: 'Para mayor seguridad, incluye mayúsculas, minúsculas, números y símbolos.',
        interests: 'Selecciona tus intereses para personalizar tu experiencia.'
    };
    
    Object.keys(tooltips).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.setAttribute('title', tooltips[fieldName]);
            field.setAttribute('aria-describedby', `${fieldName}-tooltip`);
        }
    });
}