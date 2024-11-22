package fr.redship.projectwebapidb.service;

import fr.redship.projectwebapidb.model.Planet;
import fr.redship.projectwebapidb.repository.PlanetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanetService {
    private final PlanetRepository planetRepository;

    @Autowired
    public PlanetService(PlanetRepository planetRepository)
    {
        this.planetRepository = planetRepository;
    }

    public List<Planet> getAllPlanets()
    {
        return planetRepository.findAll();
    }

    public Planet getPlanetById(long id)
    {
        return planetRepository.findById(id).orElseThrow(() -> new RuntimeException("Planet not found"));
    }

    public Planet savePlanet(Planet planet)
    {
        return planetRepository.save(planet);
    }

    public Planet updatePlanet(Long id, Planet planetDetails)
    {
        Planet planet = planetRepository.findById(id).orElseThrow(() -> new RuntimeException("Planet not found"));

        planet.setName(planetDetails.getName());
        planet.setDiameter(planetDetails.getDiameter());
        planet.setDistanceFromSun(planetDetails.getDistanceFromSun());
        planet.setDescription(planetDetails.getDescription());
        planet.setMoons(planetDetails.getMoons());

        return planetRepository.save(planet);
    }
}
