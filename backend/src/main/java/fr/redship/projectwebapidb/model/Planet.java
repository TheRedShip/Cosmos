package fr.redship.projectwebapidb.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Table(name="planets")
@Entity
@Getter @Setter
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
public class Planet {

    @Id
    private Long id;

    private String name;
    private double diameter;
    private double distance_from_sun;
    private String description;

    @OneToMany(mappedBy = "planet", cascade = CascadeType.ALL)
    private List<Moon> moons;

}
