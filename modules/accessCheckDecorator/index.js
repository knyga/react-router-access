import React, { Component } from 'react';
import _ from 'lodash';

const defaultNegativeRender = () => null;
const accessClassCheckDecorator = (Target, decorationFunction, negativeRender) => {
  class DecoratedComponent extends Component {
    render() {
      if (!decorationFunction(this.props, this.state)) {
        return negativeRender(this.props, this.state);
      }

      return (<Target {...this.props} />);
    }
  }

  return DecoratedComponent;
};

const accessFunctionCheckDecorator = (target, name, descriptor, decorationFunction, negativeRender) => {
  const method = descriptor.value;
  descriptor.value = function (...args) {
    if (!decorationFunction(this.props, this.state)) {
      return negativeRender(this.props, this.state);
    }

    return method.apply(this, ...args);
  };
};

const accessCheckDecorator = (decorationFunction, negativeRender = defaultNegativeRender) => (target, name, descriptor) => {
  if (!_.isUndefined(name) && !_.isUndefined(descriptor)) {
    return accessFunctionCheckDecorator(target, name, descriptor, decorationFunction, negativeRender);
  }

  if (_.isUndefined(name) && _.isUndefined(descriptor) && target.prototype.render) {
    return accessClassCheckDecorator(target, decorationFunction, negativeRender);
  }

  return false;
};

export default accessCheckDecorator;
