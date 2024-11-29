package fr.redship.projectwebapidb.controller;

import fr.redship.projectwebapidb.model.Planet;
import fr.redship.projectwebapidb.model.PlanetStatistics;
import fr.redship.projectwebapidb.service.PlanetStatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/planets/stats/")
public class PlanetStatisticsController {
    private final PlanetStatisticsService planetService;

    @Autowired
    public PlanetStatisticsController(PlanetStatisticsService planetService)
    {
        this.planetService = planetService;
    }

    @GetMapping("/{id}")
    public PlanetStatistics getPlanetById(@PathVariable Long id)
    {
        return planetService.getPlanetStatsById(id);
    }

    @PostMapping
    public PlanetStatistics createPlanet(@RequestBody PlanetStatistics planet)
    {
        return planetService.savePlanet(planet);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlanetStatistics> updatePlanet(@PathVariable Long id, @RequestBody PlanetStatistics planetDetails)
    {
        PlanetStatistics updatedPlanet = planetService.updatePlanet(id, planetDetails);
        return ResponseEntity.ok(updatedPlanet);
    }
}

