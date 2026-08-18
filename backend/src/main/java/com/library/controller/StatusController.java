package com.library.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController // Indique à Spring d'exposer les méthodes
                // sous forme d'endpoints HTTP (REST)
public class StatusController {

    @GetMapping("/api/status") // Route HTTP GET
    public Map<String, String> getStatus() {
        // Retourne un objet Java que Spring convertira automatiquement en JSON
        return Map.of("status", "UP", "massage", "Le serveur de la bibliothèque fonctionne parfaitement !!");
    }
}
