import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColortitleComponent } from './colortitle.component';

describe('ColortitleComponent', () => {
  let component: ColortitleComponent;
  let fixture: ComponentFixture<ColortitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColortitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColortitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
