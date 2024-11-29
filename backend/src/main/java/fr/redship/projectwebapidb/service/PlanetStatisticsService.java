package fr.redship.projectwebapidb.service;

import fr.redship.projectwebapidb.model.PlanetStatistics;
import fr.redship.projectwebapidb.repository.PlanetStatisticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlanetStatisticsService {
    private final PlanetStatisticsRepository planetStatisticsRepository;

    @Autowired
    public PlanetStatisticsService(PlanetStatisticsRepository planetStatisticsRepository)
    {
        this.planetStatisticsRepository = planetStatisticsRepository;
    }

    public PlanetStatistics getPlanetStatsById(long id)
    {
        return planetStatisticsRepository.findById(id).orElseThrow(() -> new RuntimeException("Planet not found"));
    }

    public PlanetStatistics savePlanet(PlanetStatistics planet)
    {
        return planetStatisticsRepository.save(planet);
    }

    public PlanetStatistics updatePlanet(Long id, PlanetStatistics planetDetails)
    {
        PlanetStatistics planetStatistics = planetStatisticsRepository.findById(id).orElseThrow(() -> new RuntimeException("Planet not found"));

        planetStatistics.setPlanet(planetDetails.getPlanet());
        planetStatistics.setPlanet_type(planetDetails.getPlanet_type());
        planetStatistics.setGravity(planetDetails.getGravity());
        planetStatistics.setTemperature(planetDetails.getTemperature());
        planetStatistics.setDay_hours(planetDetails.getDay_hours());

        return planetStatisticsRepository.save(planetStatistics);
    }
}

