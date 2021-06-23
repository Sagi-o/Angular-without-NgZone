import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchExampleComponent } from './watch-example.component';

describe('WatchExampleComponent', () => {
  let component: WatchExampleComponent;
  let fixture: ComponentFixture<WatchExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
