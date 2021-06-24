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
   * Click event inside zone
   * Click event outside zone ways:
   * 1. only with runOutsideAngular
   * 2. fromEvent without zone bindings
   * 3. using EventManager plugin
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


  increment(): void {
    this.value++;
    // this.incrementOutsideZone();
  }

  decrement(): void {
    this.value--;
    // this.incrementOutsideZone();
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

  onWatchDecoratorExampleClick(): void {
    this.router.navigate(['watch-example']);
  }
}