import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetOrbitComponent } from './planet-orbit.component';

describe('PlanetOrbitComponent', () => {
  let component: PlanetOrbitComponent;
  let fixture: ComponentFixture<PlanetOrbitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanetOrbitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanetOrbitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
