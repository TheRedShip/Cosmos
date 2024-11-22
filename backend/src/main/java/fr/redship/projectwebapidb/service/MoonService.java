package fr.redship.projectwebapidb.service;

import fr.redship.projectwebapidb.model.Moon;
import fr.redship.projectwebapidb.repository.MoonRepository;
import fr.redship.projectwebapidb.repository.PlanetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MoonService {
    private final MoonRepository moonRepository;

    @Autowired
    public MoonService(MoonRepository moonRepository) {
        this.moonRepository = moonRepository;
    }

    public List<Moon> getAllMoons() {
        return moonRepository.findAll();
    }

    public Moon getMoonById(long id) {
        return moonRepository.findById(id).orElseThrow(() -> new RuntimeException("Moon not found"));
    }

    public List<Moon> findMoon(String description)
    {
        return moonRepository.findMoonByDescriptionIsContainingIgnoreCase(description);
    }

    public Moon saveMoon(Moon moon) {
        return moonRepository.save(moon);
    }

    public Moon updateMoon(Long id, Moon moonDetails) {
        Moon moon = moonRepository.findById(id).orElseThrow(() -> new RuntimeException("Moon not found"));

        moon.setDescription(moonDetails.getDescription());
        moon.setName(moonDetails.getName());
        moon.setDiameter(moonDetails.getDiameter());
        moon.setDistance_from_planet(moonDetails.getDistance_from_planet());
        return moonRepository.save(moon);
    }
}
