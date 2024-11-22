package fr.redship.projectwebapidb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import fr.redship.projectwebapidb.model.Moon;

import java.util.List;

public interface MoonRepository extends JpaRepository<Moon, Long>
{

    List<Moon> findMoonByDescriptionIsContainingIgnoreCase(String description);

}
