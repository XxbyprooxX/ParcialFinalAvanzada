package edu.progAvUD.reddUD.User.services;

import edu.progAvUD.reddUD.User.models.ERole;
import edu.progAvUD.reddUD.User.models.Role;
import edu.progAvUD.reddUD.User.models.AppUser;
import edu.progAvUD.reddUD.User.repositories.RoleRepository;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import edu.progAvUD.reddUD.User.repositories.AppUserRepository;

/**
 *
 * @author Cristianlol789
 */
@Service
public class UserServiceImpl {

    @Autowired
    private AppUserRepository repositorio;

    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private MailService mailService;

    @CrossOrigin
    public List<AppUser> getAllUser() {
        return repositorio.findAll();
    }

    @CrossOrigin
    public ResponseEntity<AppUser> findByNombreUsuario(String nombreUsuario) {
        Optional<AppUser> userOptional = repositorio.findByNombreUsuario(nombreUsuario);
        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @CrossOrigin
    public ResponseEntity<?> createUser(AppUser user) {
        Optional<AppUser> porNombre = repositorio.findByNombreUsuario(user.getNombreUsuario());
        if (porNombre.isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("El nombre de usuario ya está en uso.");
        }

        Optional<AppUser> porEmail = repositorio.findByCorreo(user.getCorreo());
        if (porEmail.isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("El email ya está registrado.");
        }

        try {
            AppUser nuevoUsuario = new AppUser();
            nuevoUsuario.setCorreo(user.getCorreo());
            nuevoUsuario.setNombreUsuario(user.getNombreUsuario());
            nuevoUsuario.setContrasena(user.getContrasena());
            nuevoUsuario.setGenero(user.getGenero());
            nuevoUsuario.setIntereses(user.getIntereses());
            nuevoUsuario.setFechaRegistro(user.getFechaRegistro());

            // Asignar rol por defecto: USUARIO_NORMAL
            Role defaultRole = roleRepository.findByName(ERole.USUARIO_NORMAL)
                    .orElseThrow(() -> new RuntimeException("Rol USUARIO_NORMAL no existe"));
            nuevoUsuario.setRoles(Set.of(defaultRole));
            
            mailService.sendMessageUserRegister(user.getCorreo(), user.getNombreUsuario(), "Bienvenido a Reddud!!!");
            
            repositorio.save(nuevoUsuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @CrossOrigin
    public ResponseEntity<AppUser> deleteUserByNombreUsuario(String nombreUsuario) {
        Optional<AppUser> user = repositorio.findByNombreUsuario(nombreUsuario);
        if (user.isPresent()) {
            AppUser userToDelete = user.get();
            repositorio.delete(userToDelete);
            return ResponseEntity.ok(userToDelete); // 200 OK con el usuario eliminado
        } else {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
    }

    @CrossOrigin
    public ResponseEntity<AppUser> changeDataUserByNombreUsuario(String nombreUsuario, AppUser user) {
        Optional<AppUser> userGuardadoOpt = repositorio.findByNombreUsuario(nombreUsuario);

        if (userGuardadoOpt.isPresent()) {
            AppUser userGuardado = userGuardadoOpt.get();

            if (user.getCorreo() != null) {
                userGuardado.setCorreo(user.getCorreo());
            }
            if (user.getNombreUsuario() != null) {
                userGuardado.setNombreUsuario(user.getNombreUsuario());
            }
            if (user.getUbicacion() != null) {
                userGuardado.setUbicacion(user.getUbicacion());
            }
            if (user.getContrasena() != null) {
                userGuardado.setContrasena(user.getContrasena());
            }
            if (user.getGenero() != null) {
                userGuardado.setGenero(user.getGenero());
            }
            if (user.getIntereses() != null && !user.getIntereses().isEmpty()) {
                userGuardado.setIntereses(user.getIntereses());
            }
            if (user.getAvatar() != null && user.getAvatar().length > 0) {
                userGuardado.setAvatar(user.getAvatar());
            }
            if (user.getBanner() != null && user.getBanner().length > 0) {
                userGuardado.setBanner(user.getBanner());
            }
            if (user.getFechaRegistro() != null) {
                userGuardado.setFechaRegistro(user.getFechaRegistro());
            }
            if (user.getKarma() != 0) {
                userGuardado.setKarma(user.getKarma());
            }
            if (user.getRoles() != null && !user.getRoles().isEmpty()) {
                userGuardado.setRoles(user.getRoles());
            }

            repositorio.save(userGuardado);
            return ResponseEntity.ok(userGuardado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
