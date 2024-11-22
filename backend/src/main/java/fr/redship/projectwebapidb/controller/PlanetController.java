package fr.redship.projectwebapidb.controller;

import fr.redship.projectwebapidb.model.Planet;
import fr.redship.projectwebapidb.service.PlanetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/planets")
public class PlanetController {
    private final PlanetService planetService;

    @Autowired
    public PlanetController(PlanetService planetService)
    {
        this.planetService = planetService;
    }

    @GetMapping
    public List<Planet> getAllPlanets()
    {
        return planetService.getAllPlanets();
    }

    @GetMapping("/{id}")
    public Planet getPlanetById(@PathVariable Long id)
    {
        return planetService.getPlanetById(id);
    }

    @PostMapping
    public Planet createPlanet(@RequestBody Planet planet)
    {
        return planetService.savePlanet(planet);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Planet> updatePlanet(@PathVariable Long id, @RequestBody Planet planetDetails)
    {
        Planet updatedPlanet = planetService.updatePlanet(id, planetDetails);
        return ResponseEntity.ok(updatedPlanet);
    }

}
