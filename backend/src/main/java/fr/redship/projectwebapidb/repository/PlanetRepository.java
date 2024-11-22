package fr.redship.projectwebapidb.repository;

import fr.redship.projectwebapidb.model.Planet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanetRepository extends JpaRepository<Planet, Long> {

}
