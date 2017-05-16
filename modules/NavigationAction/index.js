import { compile as compilePath } from 'path-to-regexp';

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
