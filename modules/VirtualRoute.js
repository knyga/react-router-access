import React from 'react';
import { Helmet } from 'react-helmet';
import { matchPath } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import { compile as compilePath } from 'path-to-regexp';
import _ from 'lodash';
import generateRedirectChildComponent from './RedirectChildComponent';
import navigationActionGenerator from './navigationActionGenerator';

// TODO: add interface
export default class VirtualRoute {
  static _store = null;
  static _root = null;
  // TODO make selection interface more clean
  static getStore = function () {
    return VirtualRoute._store;
  };
  static setStore = function (store) {
    this._store = store;
  };
  static getRoot = function () {
    return VirtualRoute._root;
  };
  static setRoot = function (root) {
    this._root = root;
  };
  static findRoute = function findRoute(path) {
    if (!VirtualRoute.getRoot()) {
      return null;
    }

    return VirtualRoute.getRoot().findRoute(path);
  };

  constructor({
    parent,
    component,
    path,
    redirectTo,
    isExact,
    isStrict,
    isAbsolutePath,
    isActive,
    hasAccess,
    data,
  } = {}) {
    this._isExact = isExact || false;
    this._isStrict = _.isUndefined(isStrict) ? true : isStrict;
    this._isActive = _.isUndefined(isActive) ? true : isActive;
    this._isAbsolutePath = isAbsolutePath || false;
    this._isScreen = !!component;

    this._parent = parent || null;
    this._path = path;
    this._hasAccess = hasAccess || (() => true);
    this._data = data || {};

    this._redirectTo = redirectTo;
    this._component = component;
  }

  get NavigationActionConstructor() {
    return this._NavigationActionConstructor;
  }

  set NavigationActionConstructor(NavigationActionConstructor) {
    this._NavigationActionConstructor = NavigationActionConstructor;
  }

  get navigationAction() {
    if (!this._navigationAction) {
      this._navigationAction = this.generateConcreteNavigationAction();
    }

    return this._navigationAction;
  }

  get data() {
    return this._data;
  }

  get parent() {
    return this._parent;
  }

  set parent(parent) {
    this._parent = parent;
  }

  get component() {
    if (this.redirectTo) {
      let redirectTo;
      const redirectPath = _.isString(this.redirectTo) ? this.redirectTo : this.redirectTo.path;
      const history = createHistory();
      const location = history.location;

      if (_.isUndefined(location)) {
        redirectTo = redirectPath;
      } else {
        const params = this.extractParams(location.pathname);
        const toPath = compilePath(redirectPath);
        redirectTo = toPath(params);
      }

      return generateRedirectChildComponent(redirectTo);
    }

    return this._component;
  }

  get isExact() {
    return this._isExact;
  }

  get isStrict() {
    return this._isStrict;
  }

  get redirectTo() {
    return this._redirectTo;
  }

  get path() {
    return this.isAbsolutePath ?
      this._path :
      [this.parent ? this.parent.path : '', this._path].join('');
  }

  get isActive() {
    return this._isActive;
  }

  get isAbsolutePath() {
    return this._isAbsolutePath;
  }

  get isScreen() {
    return this._isScreen;
  }

  // TODO not clear.. could be confused with generateNavigationAction
  generateConcreteNavigationAction(data = {}) {
    return new this.NavigationActionConstructor(data);
  }

  // TODO remove generator, just use constructor..
  generateNavigationAction(data = {}) {
    this.NavigationActionConstructor = navigationActionGenerator({
      ...data,
      virtualRoute: this,
    });

    return this.NavigationActionConstructor;
  }

  hasAccess() {
    const store = VirtualRoute.getStore();
    const state = store ? store.getState() : null;

    return [
      this.parent ? this.parent.hasAccess() : true,
      this._hasAccess.apply(this, [state]),
    ].reduce((pv, cv) => pv && cv, true);
  }

  generateChildrenRoutesData() {
    if (!this.isActive) {
      return [];
    }

    return [this.generateRouteData()];
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

  // looks quite similar to generatePathOptions
  generateRouteData() {
    return {
      path: this.path,
      exact: this.isExact,
      strict: this.isStrict,
      render: () => {
        if (this.data.headerTitle) {
          return (
            <div>
              <Helmet>
                <title>{this.data.headerTitle}</title>
              </Helmet>
              <this.component />
            </div>
          );
        }

        return <this.component />;
      },
    };
  }

  extractParams(pathname) {
    const pathOptions = this.generatePathOptions();

    if (!pathOptions) {
      return null;
    }

    const match = matchPath(pathname, pathOptions);

    if (match !== null) {
      return match.params;
    }

    return null;
  }

  findRoute(pathname) {
    const params = this.extractParams(pathname);

    if (params !== null) {
      return this;
    }

    return null;
  }

  findClosestAvailableChild() {
    return this;
  }
}
