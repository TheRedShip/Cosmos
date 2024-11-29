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

    @PatchMapping("/{id}")
    public ResponseEntity<Planet> patchPlanet(@PathVariable Long id, @RequestBody Planet incomplete_planet)
    {
        Planet existing_planet = planetService.getPlanetById(id);

        if (existing_planet == null)
            return ResponseEntity.notFound().build();

        if (incomplete_planet.getName() != null)
            existing_planet.setName(incomplete_planet.getName());
        if (incomplete_planet.getDescription() != null)
            existing_planet.setDescription(incomplete_planet.getDescription());
        if (incomplete_planet.getDistance_from_sun() != 0.0f)
            existing_planet.setDistance_from_sun(incomplete_planet.getDistance_from_sun());
        if (incomplete_planet.getDiameter() != 0.0f)
            existing_planet.setDiameter(incomplete_planet.getDiameter());

        return ResponseEntity.ok(planetService.savePlanet(existing_planet));
    }
}
