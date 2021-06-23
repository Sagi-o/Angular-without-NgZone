export function UseState(initialValue: any) {
    return function(target: object, key: string) {
        target[key] = initialValue;
        target[`set${key.replace(/^\w/, char => char.toUpperCase())}`] = 
            (value) => target[key] = value;;
    }
}