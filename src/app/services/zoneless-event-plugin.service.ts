import { Injectable } from "@angular/core";
import { EventManager } from "@angular/platform-browser";

@Injectable()
export class ZonelessEventPluginService {
  manager: EventManager;

  supports(eventName: string): boolean {
    return eventName.endsWith('.zoneless');
  }

  addEventListener(
    element: HTMLElement,
    eventName: string,
    originalHandler: EventListener
  ): Function {    
    const [nativeEventName] = eventName.split('.');

    this.manager.getZone().runOutsideAngular(() => {
      element.addEventListener(nativeEventName, originalHandler);
    });

    return () => element.removeEventListener(nativeEventName, originalHandler);
  }
}