import {compile as compilePath} from 'path-to-regexp';

// renderSDKLinks() {
//   return _.map(this.sdks, (sdk, id) => {
//     const navigationAction = new EditSDKNavigationAction(sdk);
//     return navigationAction.hasAccess() ?
//       <Link key={id} to={navigationAction.generatePath()} >{sdk.name}</Link>:
//       null;
//   });
// }

// TODO implement
// (sdk, id) => editNavigationActionRenderer(sdk, <Link key={id} to={navigationAction.generatePath()} >{sdk.name}</Link>)
// (sdk, id) => editNavigationActionRenderer(sdk, <Link key={id} to={navigationAction.generatePath()} >{sdk.name}</Link>, null)

export default class NavigationAction {
  constructor(data) {
    this.data = data;
  }

  get virtualRoute() {
    throw new Error(`You have to implement getter virtualRoute in the ${this.name}`);
  }

  get label() {
    throw new Error(`You have to implement getter label in the ${this.name}`);
  }

  get data() {
    return this._data;
  }

  set data(data) {
    this._data = data || {};
  }

  hasAccess() {
    if (this.virtualRoute) {
      return this.virtualRoute.hasAccess();
    }

    return true;
  }

  generatePathData() {
    return this.data;
  }

  generatePath() {
    if (!this.virtualRoute) {
      return '';
    }

    const path = this.virtualRoute.path;
    const pathData = this.generatePathData();
    const toPath = compilePath(path);

    return toPath(pathData);
  }
}
