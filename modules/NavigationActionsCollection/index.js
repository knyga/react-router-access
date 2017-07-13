import NavigationAction from '../NavigationAction';

export default class NavigationActionsCollection extends NavigationAction {
  get collection() {
    return this.virtualRoute.children.map(vr => vr.navigationAction);
  }

  accessMap(mapFunction) {
    return this.collection.reduce(
      (pv, cv) => (cv.hasAccess() ? [...pv, mapFunction(cv, pv.length)] : pv),
      [],
    );
  }
}
