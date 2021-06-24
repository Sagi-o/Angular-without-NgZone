import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Watch } from '../../decorators/watch.decorator';
import { CustomClass } from '../../models/custom-class.model';

@Component({
  selector: 'app-watch-example',
  templateUrl: './watch-example.component.html',
  styleUrls: ['./watch-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatchExampleComponent implements OnInit {

  @Watch()
  exampleString: string = 'abc';

  @Watch()
  exampleNumber: number = 1;

  @Watch()
  exampleBoolean: boolean = false;

  @Watch()
  array: number[] = [0, 1, 2];

  @Watch()
  object = {
    foo: {
      baz: 1000
    },
    bar: 'example',
  };

  @Watch()
  customClass = new CustomClass('abc', new CustomClass('def'));

  unwatchedVar = 0;

  @Watch()
  interval$: Observable<any>;

  /**
   * Run cd with ngZone disabled:
   * 1. The manual way (cdr)
   * 2. The decorator way - explained
   * 3. types: primitives including objects/classes, methods, observables
   */

  constructor(private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.warn('WatchExampleComponent - ngOnInit');
  }

  // @Watch()
  changeUnwatchedVar(): void {    
    this.unwatchedVar += 10;

    // Or manually with
    // this.cdr.detectChanges();
  }

  changeString(): void {
    this.exampleString += this.getRandomLetter();
  }

  changeNumber(): void {
    this.exampleNumber += 1;
  }

  changeBoolean(): void {
    this.exampleBoolean = !this.exampleBoolean;
  }

  changeObject(): void {
    this.object.foo.baz++;
  }

  changeObject2(): void {
    this.object.bar += this.getRandomLetter();
  }

  changeArray(): void {
    this.array.push(this.array.length);    
  }

  changeCustomClass() {
    this.customClass.customClass.foo += this.getRandomLetter();
  }

  startInterval(): void {    
    this.interval$ = interval(1000).pipe(take(10));
  }

  getCustomClassString(): string {
    return `
      {
        "foo": ${this.customClass.foo},
        "customClass": {
          "foo": ${this.customClass.customClass.foo}
        }
      }
    `
  }

  onOutsideZoneExampleClick(): void {
    this.router.navigate(['outside-zone-example']);
  }

  private getRandomLetter(): string {
    return String.fromCharCode(97 + Math.floor(Math.random() * 26));
  }
}
