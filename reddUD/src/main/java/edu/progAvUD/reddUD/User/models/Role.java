/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package edu.progAvUD.reddUD.User.models;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 *
 * @author Andres Felipe
 */
@Data // Genera getters, setters, toString, equals, hashCode
@Entity // Marca esta clase como una entidad JPA
@Table(name = "roles") // Especifica el nombre de la tabla en la base de datos
@NoArgsConstructor // Genera un constructor sin argumentos
@AllArgsConstructor // Genera un constructor con todos los argumentos
public class Role {
    @Id // Marca 'id' como la clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Configura la generación automática de IDs
    private Integer id;

    @Enumerated(EnumType.STRING) // Almacena el nombre del enum (ej. "USUARIO_NORMAL") como String en la DB
    private ERole name; // Campo para el nombre del rol, usando el enum ERole

    // Constructor adicional para facilitar la creación de roles con solo el nombre del enum
    public Role(ERole name) {
        this.name = name;
    }
}

