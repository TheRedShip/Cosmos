import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetStatisticListComponent } from './planet-statistic-list.component';

describe('PlanetStatisticListComponent', () => {
  let component: PlanetStatisticListComponent;
  let fixture: ComponentFixture<PlanetStatisticListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanetStatisticListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanetStatisticListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
