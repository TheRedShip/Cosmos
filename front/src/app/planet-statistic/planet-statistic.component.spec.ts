import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetStatisticComponent } from './planet-statistic.component';

describe('PlanetStatisticComponent', () => {
  let component: PlanetStatisticComponent;
  let fixture: ComponentFixture<PlanetStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanetStatisticComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanetStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
