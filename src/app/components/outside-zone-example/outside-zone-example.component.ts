import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ɵmarkDirty as markDirty, ɵdetectChanges as detectChanges } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-outside-zone-example',
  templateUrl: './outside-zone-example.component.html',
  styleUrls: ['./outside-zone-example.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class OutsideZoneExampleComponent implements OnInit, AfterViewInit {
  @ViewChild('incrementButton') incrementButton: ElementRef<HTMLButtonElement>;
  @ViewChild('decrementButton') decrementButton: ElementRef<HTMLButtonElement>;

  value = 0;

  /**
   * Click event inside zone
   * Click event outside zone ways:
   * 1. only with runOutsideAngular
   * 2. use fromEvent without zone bindings
   * 3. using EventManager plugin (.zoneless)
   */

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private router: Router) { }

  ngOnInit(): void {
    console.warn('OutsideZoneExampleComponent - ngOnInit');
  }

  ngAfterViewInit(): void {
    // Remove click event listeners from buttons before using
    this.ngZone.runOutsideAngular(() => {
      // this.setupClickListeners();
    });
  }

  increment(): void {
    this.value++;
    // this.incrementOutsideZone();
    console.log('increment()');
  }

  decrement(): void {
    this.value--;
    // this.incrementOutsideZone();
    console.log('decrement()');
  }

  incrementOutsideZone(): void {
    this.ngZone.runOutsideAngular(() => {
      this.value++;
    });
  }

  decrementOutsideZone(): void {
    this.ngZone.runOutsideAngular(() => {
      this.value--;
    });
  }

  setupClickListeners(): void {
    fromEvent(this.incrementButton.nativeElement, 'click').subscribe(
      () => {                  
        this.value++;
        console.log('fromEvent() - increment');        
      }
    );
    fromEvent(this.decrementButton.nativeElement, 'click').subscribe(
      () => {
        this.value--;
        console.log('fromEvent() - decrement');        
      }
    );
  }

  onWatchDecoratorExampleClick(): void {
    this.router.navigate(['watch-example']);
  }
}