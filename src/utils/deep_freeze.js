export function deepFreeze(object) {
    const properties = Object.getOwnPropertyNames(object);

    for (const name of properties) {
        let value = object[name];

        if (value && typeof value === 'object') {
            value = deepFreeze(value);
        } else {
            value = Object.freeze(value);
        }
    }

    return Object.freeze(object);
}
