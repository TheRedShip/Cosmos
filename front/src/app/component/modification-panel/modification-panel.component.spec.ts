import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationPanelComponent } from './modification-panel.component';

describe('ModificationPanelComponent', () => {
  let component: ModificationPanelComponent;
  let fixture: ComponentFixture<ModificationPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificationPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
