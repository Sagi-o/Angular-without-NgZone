// Property - patch value
export function Patchable() {
    return function (
        target: object, // The class
        key: string, // The name of key on the class
    ) {
        let value = target[key];

        const getter = () => {
            return value;
        };

        const setter = (next: any) => {
            value = `${next} (Patched)`
        };

        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
}

// Method - operation before calling
export function Confirmable() {
    return function (
        target: object, // The class
        key: string, // The name of key on the class
        descriptor: PropertyDescriptor
    ) {
        const original = descriptor.value;
        descriptor.value = function (...args: any[]) {
            const allow = confirm('Are you sure?');
            if (allow) {
                const result = original.apply(this, args);
                return result;
            } else {
                return null;
            }
        };
        return descriptor;
    }
}

// Method - change getter
export function WithTax() {
    return function (
        target: object, // The class
        key: string, // The name of key on the class
        descriptor: PropertyDescriptor
    ) {
        const original = descriptor.value;
        descriptor.get = function () {
            const result = original.apply(this);
            return (result * (1.17)).toFixed(2);
        }
        return descriptor;
    }
}