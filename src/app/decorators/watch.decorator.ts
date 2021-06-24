import { ɵmarkDirty as markDirty, ɵdetectChanges as detectChanges, Component } from '@angular/core';
import { Observable } from 'rxjs';

export function Watch() {
    return function (
        target: any,
        propertyKey: string,
        descriptor?: PropertyDescriptor
    ) {
        if (descriptor) {

            /**
             * Component method
             */

            const originalMethod = descriptor.value;

            descriptor.value = function (...args: any[]) {
                const result = originalMethod.apply(this, args);
                requestAnimationFrame(() => markDirty(this));
                return result;
            };

            return;
        }

        /**
         * Patch ngOnInit
         */

        const ngOnInit = target['ngOnInit'];

        if (!ngOnInit) {
            console.error('Error: Please implement ngOnInit to use @Watch on a property.');
            return;
        }

        target['ngOnInit'] = function () {
            const component = this;
            ngOnInit.call(component);
            assignMarkDirtyToProperty(component, component, propertyKey);
        };

        const patchPrimitiveOrObservable = (component: Component, object: object, propertyKey: string) => {
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
        };

        const patchObjectRecursively = (component: Component, object: object, propertyKey: string) => {

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
        }

        const assignMarkDirtyToProperty = function (component: Component, object: object, propertyKey: string) {
            if (object[propertyKey] instanceof Observable) {
                console.warn(`[@Watch] Please use also WatchPipe on template: {{ ${propertyKey} | watch }}`);

                /**
                 * Observable
                 */

                patchPrimitiveOrObservable(component, object, propertyKey);
                return;
            } else if (object[propertyKey] instanceof Object) {

                /**
                 * Object or Array 
                 */

                patchObjectRecursively(component, object, propertyKey);

            } else {

                /**
                 * Primitive
                 */

                patchPrimitiveOrObservable(component, object, propertyKey);
            };
        };
    }
}