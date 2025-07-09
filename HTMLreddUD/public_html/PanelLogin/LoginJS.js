class LoginJS {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.usuarioInput = document.getElementById('usuario');
        this.passwordInput = document.getElementById('password');
        this.loginButton = document.getElementById('loginButton');
        this.spinner = this.loginButton.querySelector('.loading-spinner');
        this.buttonText = this.loginButton.querySelector('.button-text');
        this.modeToggle = document.querySelector('.mode-toggle');
        this.isSubmitting = false;
        this.init();
    }

    init() {
        this.setupListeners();
        this.loadTheme();
    }

    setupListeners() {
        // Form submission
        this.form.addEventListener('submit', e => this.onSubmit(e));

        // Input validation
        [this.usuarioInput, this.passwordInput].forEach(input => {
            input.addEventListener('focus', () => this.onInputFocus(input));
            input.addEventListener('blur', () => this.onInputBlur(input));
            input.addEventListener('input', () => this.onInputChange(input));
        });

        // Button effects
        this.loginButton.addEventListener('click', e => this.createRipple(e));
        this.loginButton.addEventListener('mouseenter', () => this.onButtonHover());

        // Dark mode toggle
        this.modeToggle.addEventListener('click', () => this.toggleDarkMode());

        // Prevent form submission on empty fields with animation
        this.form.addEventListener('submit', e => {
            if (!this.validateForm()) {
                e.preventDefault();
                this.animateEmptyFieldsError();
            }
        });
    }

    loadTheme() {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        }
    }

    onInputFocus(input) {
        input.classList.remove('error');
        this.hideError(input);
    }

    onInputBlur(input) {
        this.validateInput(input);
    }

    onInputChange(input) {
        if (input.classList.contains('error')) {
            this.validateInput(input);
        }
    }

    validateInput(input) {
        const value = input.value.trim();
        const inputType = input.id;
        let isValid = true;
        let errorMessage = '';

        if (!value) {
            isValid = false;
            errorMessage = 'Este campo es requerido';
        } else if (inputType === 'usuario') {
            const usuarioRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!usuarioRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor ingresa un usuario válido';
            }
        } else if (inputType === 'password') {
            if (value.length < 6) {
                isValid = false;
                errorMessage = 'La contraseña debe tener al menos 6 caracteres';
            }
        }

        this.updateValidationUI(input, isValid, errorMessage);
        return isValid;
    }

    updateValidationUI(input, isValid, errorMessage) {
        const validationIcon = input.nextElementSibling;

        if (isValid) {
            input.classList.remove('error');
            validationIcon.className = 'validation-icon valid';
            this.hideError(input);
        } else {
            input.classList.add('error');
            validationIcon.className = 'validation-icon invalid';
            this.showError(input, errorMessage);
        }
    }

    showError(input, message) {
        const errorElement = input.parentElement.querySelector('.error-message');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    hideError(input) {
        const errorElement = input.parentElement.querySelector('.error-message');
        errorElement.classList.remove('show');
    }

    validateForm() {
        const usuarioValid = this.validateInput(this.usuarioInput);
        const passwordValid = this.validateInput(this.passwordInput);
        return usuarioValid && passwordValid;
    }

    animateEmptyFieldsError() {
        // Check which fields are empty
        const emptyFields = [];
        if (!this.usuarioInput.value.trim())
            emptyFields.push(this.usuarioInput);
        if (!this.passwordInput.value.trim())
            emptyFields.push(this.passwordInput);

        // Animate button shake
        this.loginButton.classList.add('shake');
        setTimeout(() => this.loginButton.classList.remove('shake'), 500);

        // Animate empty fields
        emptyFields.forEach(field => {
            field.classList.add('error');
            setTimeout(() => {
                field.focus();
            }, 100);
        });

        // Add wiggle animation to button when clicked with empty fields
        this.loginButton.classList.add('wiggle');
        setTimeout(() => this.loginButton.classList.remove('wiggle'), 300);
    }

    onButtonHover() {
        if (!this.isSubmitting) {
            // Add subtle animation on hover
            this.loginButton.style.transform = 'translateY(-2px)';
        }
    }

    async onSubmit(e) {
        e.preventDefault();

        if (this.isSubmitting)
            return;

        if (!this.validateForm()) {
            this.animateEmptyFieldsError();
            return;
        }

        await this.performLogin();
    }

    async performLogin() {
        this.isSubmitting = true;
        this.loginButton.disabled = true;

        // Show loading state
        this.buttonText.style.opacity = '0';
        this.spinner.style.display = 'block';

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Success animation
            this.showSuccessAnimation();

            // Reset form after success
            setTimeout(() => {
                this.form.reset();
                this.resetValidationIcons();
                this.showSuccessMessage();
            }, 1000);

        } catch (error) {
            // Error animation
            this.showErrorAnimation();
            this.showErrorMessage('Credenciales incorrectas. Por favor intenta de nuevo.');
        } finally {
            // Reset button state
            setTimeout(() => {
                this.resetButtonState();
            }, 1500);
        }
    }

    showSuccessAnimation() {
        this.loginButton.style.background = 'linear-gradient(45deg, #2ed573, #1dd1a1)';
        this.buttonText.textContent = '¡Éxito!';
        this.buttonText.style.opacity = '1';
        this.spinner.style.display = 'none';
    }

    showErrorAnimation() {
        this.loginButton.style.background = 'linear-gradient(45deg, #ff4757, #ff3838)';
        this.buttonText.textContent = 'Error';
        this.buttonText.style.opacity = '1';
        this.spinner.style.display = 'none';

        // Shake animation
        this.loginButton.classList.add('shake');
        setTimeout(() => this.loginButton.classList.remove('shake'), 500);
    }

    resetButtonState() {
        this.isSubmitting = false;
        this.loginButton.disabled = false;
        this.loginButton.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
        this.buttonText.textContent = 'Iniciar Sesión';
        this.buttonText.style.opacity = '1';
        this.spinner.style.display = 'none';
    }

    resetValidationIcons() {
        const validationIcons = document.querySelectorAll('.validation-icon');
        validationIcons.forEach(icon => {
            icon.className = 'validation-icon';
        });
    }

    showSuccessMessage() {
        // Create a temporary success message
        const successMsg = document.createElement('div');
        successMsg.innerHTML = '¡Inicio de sesión exitoso!';
        successMsg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #2ed573, #1dd1a1);
            color: white;
            padding: 15px 30px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(46, 213, 115, 0.3);
            z-index: 1000;
            font-weight: 600;
            animation: fadeInOut 3s ease-in-out;
        `;

        document.body.appendChild(successMsg);
        setTimeout(() => document.body.removeChild(successMsg), 3000);
    }

    showErrorMessage(message) {
        // Create a temporary error message
        const errorMsg = document.createElement('div');
        errorMsg.innerHTML = message;
        errorMsg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #ff4757, #ff3838);
            color: white;
            padding: 15px 30px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(255, 71, 87, 0.3);
            z-index: 1000;
            font-weight: 600;
            animation: fadeInOut 3s ease-in-out;
        `;

        document.body.appendChild(errorMsg);
        setTimeout(() => document.body.removeChild(errorMsg), 3000);
    }

    createRipple(e) {
        const button = e.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple-effect');

        const ripple = button.querySelector('.ripple-effect');
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
        setTimeout(() => circle.remove(), 800);
    }

    toggleDarkMode() {
        const body = document.body;
        body.classList.toggle('dark-mode');

        // Save preference
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);

        // Add transition animation
        this.modeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.modeToggle.style.transform = 'scale(1)';
        }, 150);
    }
}

// Add CSS for success/error message animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    new LoginJS();
});