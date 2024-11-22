package fr.redship.projectwebapidb.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Table(name="moons")
@Entity
@Getter @Setter
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
public class Moon {

    @Id
    private Long id;
    private String name;
    private double diameter;
    private double distance_from_planet;
    private String description;

    @ManyToOne
    @JoinColumn(name = "planet_id", nullable = false)
//    @JsonIgnore
    private Planet planet;

}
