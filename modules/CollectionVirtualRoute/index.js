import { matchPath } from 'react-router';
import _ from 'lodash';
import VirtualRoute from '../VirtualRoute';
import NavigationActionsCollection from '../NavigationActionsCollection';
import navigationActionGenerator from '../navigationActionGenerator';

// TODO add interface
export default class CollectionVirtualRoute extends VirtualRoute {
  static getStore = function () {
    return VirtualRoute.getStore();
  };
  static setStore = function (...args) {
    VirtualRoute.setStore(...args);
  };
  static getRoot = function () {
    return VirtualRoute.getRoot();
  };
  static setRoot = function (...args) {
    VirtualRoute.setRoot(...args);
  };
  static findRoute = function findRoute(...args) {
    return VirtualRoute.findRoute(...args);
  };

  constructor(data) {
    const { children } = data;
    super(data);
    this._children = [];

    if (children) {
      children.forEach(child => this.addChild(child));
    }

    if (_.isUndefined(this._redirectTo)) {
      this._redirectTo = this.findClosestAvailableChild();
    }
  }

  // TODO remove generator, just use constructor..
  generateNavigationAction(data = {}) {
    this.NavigationActionConstructor = navigationActionGenerator({
      ...data,
      virtualRoute: this,
    }, NavigationActionsCollection);

    return this.NavigationActionConstructor;
  }

  get children() {
    return this._children;
  }
  // TODO: Why do we need to check children hasAccess() here?
  // hasAccess() {
  //   return super.hasAccess() && this.children.reduce((pv, cv) => pv || cv.hasAccess(), false);
  // }

  addChild(child) {
    // eslint-disable-next-line no-param-reassign
    child.parent = this;
    this._children.push(child);
  }

  // TODO add tests
  generateChildrenRoutesData() {
    return this.children
      .reduce((pv, cv) => pv.concat(cv.generateChildrenRoutesData()), [])
      .concat(super.generateChildrenRoutesData());
  }

  findRoute(path) {
    let result = null;
    const pathOptions = this.generatePathOptions();

    if (!pathOptions && !this.children) {
      return null;
    }

    const match = matchPath(path, pathOptions);

    if (pathOptions && match !== null) {
      result = this;
    }

    if (!this.children) {
      return result;
    }

    const childrenResult = this.children.reduce((pv, cv) => pv || cv.findRoute(path), null);

    if (!childrenResult) {
      return result;
    }

    return childrenResult;
  }

  findClosestAvailableChild() {
    return this.children.reduce((pv, cv) => pv || cv.findClosestAvailableChild(), null);
  }
}
