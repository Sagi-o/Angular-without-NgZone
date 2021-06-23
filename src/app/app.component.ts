import { AfterViewChecked, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ApplicationRef, ChangeDetectorRef, Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewChecked {

  constructor(
    private ngZone: NgZone,
    private applicationRef: ApplicationRef,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    console.warn('AppComponent - ngOnInit');
  }

  ngAfterViewChecked() {
    console.warn("AppComponent - ngAfterViewChecked");
  }

  tick() {
    this.applicationRef.tick();
  }

  detectChanges() {
    this.cdr.detectChanges();
  }

  markForCheck() {
    this.cdr.markForCheck();
  }
}
