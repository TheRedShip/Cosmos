import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetDescriptorComponent } from './planet-descriptor.component';

describe('PlanetDescriptorComponent', () => {
  let component: PlanetDescriptorComponent;
  let fixture: ComponentFixture<PlanetDescriptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanetDescriptorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanetDescriptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
