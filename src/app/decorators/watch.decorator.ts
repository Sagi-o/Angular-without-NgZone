import { ɵmarkDirty as markDirty, ɵdetectChanges as detectChanges, Component } from '@angular/core';
import { Observable } from 'rxjs';

export function Watch() {
    return function (
        target: any,
        propertyKey: string,
        descriptor?: PropertyDescriptor
    ) {
        if (descriptor) {

            /** Method **/

            const originalMethod = descriptor.value;
            
            descriptor.value = function (...args: any[]) {
                const result = originalMethod.apply(this, args);
                requestAnimationFrame(() => markDirty(this));
                return result;
            };

            return;
        }

        /** Patch ngOnInit **/

        const ngOnInit = target['ngOnInit'];

        if (!ngOnInit) {
            console.error('Error: Please implement ngOnInit to use @Watch on a component property.');
            return;
        }

        target['ngOnInit'] = function () {
            const component = this;
            ngOnInit.call(component);
            assignMarkDirtyToProperty(component, component, propertyKey);
        };

        const assignMarkDirtyToProperty = function (component: Component, object: object, propertyKey: string) {
            if (object[propertyKey] instanceof Observable) {
                console.error('Error: @Watch not support observables.');
                return;
            }
            else if (object[propertyKey] instanceof Object) {

                /** Object or Array **/

                const handler = {
                    set(obj: object, prop: string, newValue: unknown) {
                        obj[prop] = newValue;
                        markDirty(component);
                        return true;
                    }
                };

                const originalObject = object[propertyKey];
                object[propertyKey] = new Proxy(originalObject, handler);

                for (const [key, value] of Object.entries(originalObject)) {
                    if (value instanceof Object) {
                        return assignMarkDirtyToProperty(component, originalObject, key);
                    }
                }
            } else {

                /** Property **/
                
                let value = object[propertyKey];
                const setter = (newValue: unknown) => {                    
                    value = newValue;
                    markDirty(component);
                };

                Object.defineProperty(object, propertyKey, {
                    get: () => value,
                    set: setter,
                    enumerable: false,
                    configurable: true
                });
            }
        };
    }
}