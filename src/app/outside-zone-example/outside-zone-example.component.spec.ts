import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutsideZoneExampleComponent } from './outside-zone-example.component';

describe('OutsideZoneExampleComponent', () => {
  let component: OutsideZoneExampleComponent;
  let fixture: ComponentFixture<OutsideZoneExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutsideZoneExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutsideZoneExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
