import { compile as compilePath } from 'path-to-regexp';

export default class NavigationAction {
  constructor(props) {
    this.props = props;
  }

  get virtualRoute() {
    throw new Error(`You have to implement getter virtualRoute in the ${this.name}`);
  }

  get label() {
    throw new Error(`You have to implement getter label in the ${this.name}`);
  }

  get props() {
    return this._props;
  }

  set props(props) {
    this._props = props || {};
  }

  get data() {
    return {};
  }

  get virtualRouteData() {
    return this.virtualRoute.data;
  }

  hasAccess() {
    if (this.virtualRoute) {
      return this.virtualRoute.hasAccess();
    }

    return true;
  }

  generatePathData() {
    return this.props;
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
