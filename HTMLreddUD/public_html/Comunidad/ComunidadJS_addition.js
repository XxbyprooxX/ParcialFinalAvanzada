document.addEventListener('DOMContentLoaded', () => {
    const crearComunidadBtn = document.getElementById('createCommunitySidebarBtn');
    if (crearComunidadBtn) {
        crearComunidadBtn.addEventListener('click', () => {
            window.open('CrearComunidadHTML.html', '_blank');
        });
    }
});
