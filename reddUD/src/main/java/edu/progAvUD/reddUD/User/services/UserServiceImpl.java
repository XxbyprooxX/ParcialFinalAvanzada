package edu.progAvUD.reddUD.User.services;

import edu.progAvUD.reddUD.User.models.User;
import edu.progAvUD.reddUD.User.repositories.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 *
 * @author Cristianlol789
 */
@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserRepository repositorio;

    @CrossOrigin
    public List<User> getAllUser() {
        return repositorio.findAll();
    }

    @CrossOrigin
    public ResponseEntity<User> findByNombreUsuario(String nombreUsuario) {
        User user = repositorio.findByNombreUsuario(nombreUsuario);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @CrossOrigin
    public ResponseEntity<User> createUser(User user) {
        try {
            User nuevoUsuario = repositorio.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @CrossOrigin
    public ResponseEntity<User> deleteUserByNombreUsuario(String nombreUsuario) {
        User user = repositorio.findByNombreUsuario(nombreUsuario);
        if (user != null) {
            repositorio.delete(user);
            return ResponseEntity.ok(user); // 200 OK con el usuario eliminado
        } else {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
    }

    @CrossOrigin
    public ResponseEntity<User> changeDataUserByNombreUsuario(String nombreUsuario, User user) {
        User userGuardado = repositorio.findByNombreUsuario(nombreUsuario);

        if (userGuardado != null) {

            // Evita cambiar el correo o nombre de usuario a duplicados si ya existen en la base, eso lo debes validar por fuera si lo deseas
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
            // Puedes ajustar este comportamiento según si quieres sumar karma o reemplazarlo
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
