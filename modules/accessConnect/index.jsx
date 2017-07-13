import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router';
import _ from 'lodash';
// import {VirtualRoute} from '../';
import VirtualRoute from '../VirtualRoute';

export const defaultScreenNegativeRenderResultGenerator = () => (<Redirect to="/dashboard/downloads/" />);
export const defaultNonScreenNegativeRenderResult = null;

const decorator = function decorator(Target, negativeRenderResult) {
  class ExtendedTarget extends Target {
    static propTypes = {
      // eslint-disable-next-line react/no-unused-prop-types
      location: PropTypes.object,
    };

    render() {
      const { location } = this.props;
      this.relatedVirtualRoute = VirtualRoute.findRoute(location.pathname);

      if (!this.relatedVirtualRoute) {
        return null;
      }

      if (this.relatedVirtualRoute.hasAccess()) {
        return super.render();
      }

      if (this.relatedVirtualRoute.isScreen) {
        return _.isUndefined(negativeRenderResult) ?
          defaultScreenNegativeRenderResultGenerator() :
            negativeRenderResult;
      }

      return _.isUndefined(negativeRenderResult) ?
        defaultNonScreenNegativeRenderResult :
        negativeRenderResult;
    }
  }

  // location property is considered as reserved property name for withRouter
  if (Target.propTypes && Target.propTypes.location) {
    return ExtendedTarget;
  }

  return withRouter(ExtendedTarget);
};

export default function accessConnect(input) {
  return decorator(input);

  // eslint-disable-next-line no-prototype-builtins
  // if (Component.isPrototypeOf(input)) {
  //   return decorator(input);
  // }
  //
  // return function accessConnectWithNegative(Target) {
  //   return decorator(Target, input);
  // };
}
