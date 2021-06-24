import { ɵmarkDirty as markDirty, ɵdetectChanges as detectChanges, ChangeDetectorRef, EmbeddedViewRef, Type } from '@angular/core';
import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Observable, Subscribable, Subscription } from 'rxjs';

@Pipe({
  name: 'watch',
  pure: false
})
export class WatchPipe implements PipeTransform, OnDestroy {

  private latestValue: any = null;
  private observable: Observable<any> = null;
  private subscription: Subscription = null;

  constructor(private cdr: ChangeDetectorRef) { }

  transform<T>(observable: Observable<T> | null | undefined): unknown {
    if (!this.observable) {
      if (observable) {
        this.subscribe(observable);
      }
      return this.latestValue;
    }

    /**
     * Target observable has changed
     */

    if (observable !== this.observable) {
      this.dispose();
      return this.transform(observable);
    }

    return this.latestValue;
  }

  private subscribe<T>(observable: Observable<T>): void {
    this.observable = observable;
    this.subscription = this.observable.subscribe(
      (value: T) => this.updateLatestValue(value),
      (error: any) => { throw error; }
    );
  }

  private updateLatestValue(value: any) {
    this.latestValue = value;
    const { context } = (this.cdr as EmbeddedViewRef<Type<any>>);
    markDirty(context);
  }

  private dispose(): void {
    this.latestValue = null;
    this.observable = null;

    if (this.subscription) {
      console.warn('[WatchPipe] disposed subscription.');
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  ngOnDestroy(): void {
    this.dispose();
  }
}
