export function setIntersectionPreserve<T>(setA: Set<T>, setB: Set<T>): Set<T> {
    const intersection = new Set<T>();
    for (const item of setA) {
        if (setB.has(item)) {
            intersection.add(item);
        }
    }
    return intersection;
}
