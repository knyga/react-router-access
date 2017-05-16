export default class NavigationActionsCollection {
  constructor(collection) {
    this.collection = collection;
  }

  accessMap(mapFunction) {
    return this.collection.reduce(
      (pv, cv) => (cv.hasAccess() ? [...pv, mapFunction(cv)] : pv),
      [],
    );
  }
}