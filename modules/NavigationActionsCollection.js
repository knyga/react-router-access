import NavigationAction from './NavigationAction';

export default class NavigationActionsCollection extends NavigationAction {
  constructor(props) {
    super(props);
    if (this.collection) {
      this.collection.forEach((action) => {
        action.props = props;
      });
    }
  }

  get collection() {
    return this.virtualRoute.children ?
      this.virtualRoute.children.map(vr => vr.navigationAction) : [];
  }

  accessMap(mapFunction) {
    return this.collection.reduce(
      (pv, cv) => (cv.hasAccess() ? [...pv, mapFunction(cv, pv.length)] : pv),
      [],
    );
  }
}
