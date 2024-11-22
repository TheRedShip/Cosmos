package fr.redship.projectwebapidb.controller;

import fr.redship.projectwebapidb.model.Moon;
import fr.redship.projectwebapidb.service.MoonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/moons")
public class MoonController
{
    private final MoonService moonService;

    @Autowired
    public MoonController(MoonService moonService)
    {
        this.moonService = moonService;
    }

    @GetMapping
    public List<Moon> getAllMoons()
    {
        return moonService.getAllMoons();
    }

    @GetMapping("/{id}")
    public Moon getMoonById(@PathVariable Long id)
    {
        return moonService.getMoonById(id);
    }

    @GetMapping("/search/{description}")
    public List<Moon> searchMoons(@PathVariable String description)
    {
        return moonService.findMoon(description);
    }

    @PostMapping
    public Moon createMoon(@RequestBody Moon moon) {
        return moonService.saveMoon(moon);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Moon> updateMoon(@PathVariable Long id, @RequestBody Moon moonDetails)
    {
        Moon updated_moon = moonService.updateMoon(id, moonDetails);
        return ResponseEntity.ok(updated_moon);
    }

}
