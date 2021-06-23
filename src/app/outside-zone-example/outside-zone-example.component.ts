import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ɵmarkDirty as markDirty, ɵdetectChanges as detectChanges } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-outside-zone-example',
  templateUrl: './outside-zone-example.component.html',
  styleUrls: ['./outside-zone-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OutsideZoneExampleComponent implements OnInit, AfterViewChecked, AfterViewInit {
  @ViewChild('incrementButton') incrementButton: ElementRef<HTMLButtonElement>;
  @ViewChild('decrementButton') decrementButton: ElementRef<HTMLButtonElement>;

  value = 0;

  /**
   * Click event with zone
   * Click event without zone:
   *  1. only with runOutsideAngular
   *  2. fromEvent without bindings
   *  3. EventManager plugin
   */

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private router: Router) { }

  ngOnInit(): void {
    console.warn('OutsideZoneExampleComponent - ngOnInit');
  }

  ngAfterViewChecked(): void {
    console.warn('OutsideZoneExampleComponent - ngAfterViewChecked');
  }

  ngAfterViewInit(): void {
    // Remove click event listeners from buttons before using
    // fromEvent(this.incrementButton.nativeElement, 'click').subscribe(
    //   () => {
    //     this.incrementOutsideZone();
    //   }
    // );
    // fromEvent(this.decrementButton.nativeElement, 'click').subscribe(
    //   () => {
    //     this.decrementOutsideZone();
    //   }
    // );
  }


  increment() {
    this.value++;
    // this.incrementOutsideZone();
  }

  decrement() {
    this.value--;
    // this.incrementOutsideZone();
  }

  incrementOutsideZone() {
    this.ngZone.runOutsideAngular(() => {
      this.value++;
    });
  }

  decrementOutsideZone() {
    this.ngZone.runOutsideAngular(() => {
      this.value--;
    });
  }

  onWatchDecoratorExampleClick() {
    this.router.navigate(['watch-example']);
  }
}