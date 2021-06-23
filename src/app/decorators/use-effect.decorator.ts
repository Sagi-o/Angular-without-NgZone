export function UseEffect() {
    return function(target: object, key: string, descriptor: PropertyDescriptor) {
        target['ngOnInit'] = descriptor.value;
        target['ngAfterViewChecked'] = descriptor.value;
    }
}