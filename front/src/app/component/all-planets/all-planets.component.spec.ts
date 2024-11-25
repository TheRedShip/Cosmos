import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPlanetsComponent } from './all-planets.component';

describe('AllPlanetsComponent', () => {
  let component: AllPlanetsComponent;
  let fixture: ComponentFixture<AllPlanetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPlanetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPlanetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
