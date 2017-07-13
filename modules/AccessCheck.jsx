import { Component } from 'react';
import PropTypes from 'prop-types';
import checkReactChildrenRecursive from './checkReactChildrenRecursive';
import checkPathAccess from './checkPathAccess';
import VirtualRoute from './VirtualRoute';

export default class AccessCheck extends Component {
  static propTypes = {
    children: PropTypes.node,
    hasAccess: PropTypes.func,
  };

  static defaultProps = {
    children: null,
    hasAccess: null,
  };

  checkElementAccess() {
    return checkReactChildrenRecursive(
      this,
      (element) => {
        const checkElements = ['link', 'navlink'];
        if (checkElements.indexOf(
            ((element.type && element.type.name) || '').toLowerCase(),
          ) === -1) {
          return true;
        }

        return checkPathAccess(element.props.to, VirtualRoute.getRoot());
      },
    );
  }

  checkPropAccess() {
    const { hasAccess } = this.props;

    return hasAccess ? hasAccess() : true;
  }

  checkIsRender() {
    return this.checkPropAccess() && this.checkElementAccess();
  }

  render() {
    if (this.checkIsRender()) {
      return this.props.children;
    }

    return null;
  }
}
