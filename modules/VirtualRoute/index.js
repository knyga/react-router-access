import { matchPath } from 'react-router';

export default class VirtualRoute {
  constructor({
                children,
                parent,
                component,
                path,
                isExact,
                isStrict,
                isAbsolutePath,
                isAbstract,
                isScreen,
                hasAccess,
  } = {}) {
    this._parent = parent || null;
    this._component = component || null;
    this._isExact = isExact || false;
    this._isStrict = isStrict || true;
    // TODO redundant, if we have a component, rafactor
    this._isAbstract = isAbstract || false;
    this._isAbsolutePath = isAbsolutePath || false;
    // TODO could be removed and replaced with first nodes
      // from the root with component (non abstract)
    this._isScreen = isScreen || false;
    this._path = path;
    this._children = [];
    this._hasAccess = hasAccess || (() => true);

    if (children) {
      children.forEach(child => this.addChild(child));
    }
  }

  get parent() {
    return this._parent;
  }

  set parent(parent) {
    this._parent = parent;
  }

  get component() {
    return this._component;
  }

  get isExact() {
    return this._isExact;
  }

  get isStrict() {
    return this._isStrict;
  }

  get path() {
    return this.isAbsolutePath ?
      this._path :
      [this.parent ? this.parent.path : '', this._path].join('');
  }

  get isAbstract() {
    return this._isAbstract;
  }

  get isAbsolutePath() {
    return this._isAbsolutePath;
  }

  get isScreen() {
    return this._isScreen;
  }

  get children() {
    return this._children;
  }

  hasAccess() {
    return [
      this.parent ? this.parent.hasAccess() : true,
      this._hasAccess.apply(this),
    ].reduce((pv, cv) => pv && cv, true);
  }

  addChild(child) {
    // eslint-disable-next-line no-param-reassign
    child.parent = this;
    this._children.push(child);
  }

  generatePathOptions() {
    const path = this.path;
    const exact = this.isExact;
    const strict = this.isStrict;

    if (!path) {
      return null;
    }

    return {
      path,
      exact,
      strict,
    };
  }

  generateRouteData() {
    return {
      path: this.path,
      component: this.component,
      exact: this.isExact,
      strict: this.isStrict,
    };
  }

  // TODO add tests
  generateChildrenRoutesData() {
    return this._children.reduce(
      (pv, cv) => pv.concat(
        cv.isAbstract ?
          cv.generateChildrenRoutesData() :
          [cv.generateRouteData()],
      ),
      [],
    );
  }

  findRoute(path) {
    const pathOptions = this.generatePathOptions();

    if (!pathOptions && !this.children) {
      return null;
    }

    const match = matchPath(path, pathOptions);

    // TODO use partial match for faster depth recursion
    if (pathOptions && match !== null && match.isExact) {
      return this;
    }

    if (!this.children) {
      return null;
    }

    return this.children.reduce((pv, cv) => pv || cv.findRoute(path), null);
  }
}

// TODO add static methods
VirtualRoute.store = null;
VirtualRoute.root = null;
VirtualRoute.findRoute = function findRoute(path) {
  if (!VirtualRoute.root) {
    return null;
  }

  return VirtualRoute.root.findRoute(path);
};
