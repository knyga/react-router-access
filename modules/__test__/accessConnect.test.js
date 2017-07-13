/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import test from 'ava';
import accessConnect, { defaultScreenNegativeRenderResultGenerator, defaultNonScreenNegativeRenderResult } from '../accessConnect';
import { virtualRootBuilder } from '../../__mocks__';

const withRouterExtended = pathname => (TargetComponent) => {
  const location = {
    pathname,
  };

  class ExtendedComponent extends TargetComponent {
    static propTypes = {
      location: PropTypes.object,
    };
    static defaultProps = {
      location,
    }
  }

  return ExtendedComponent;
};

test.beforeEach((t) => {
  const virtualRouteRoot = virtualRootBuilder();

  t.context = {
    virtualRouteRoot,
  };
});


test('renders with access', (t) => {
  const content = (<div>Hello screen</div>);

  @accessConnect
  @withRouterExtended('/company/view/5')
  class SomeScreen extends Component {
    render() {
      return content;
    }
  }

  const wrapper = shallow(<SomeScreen />);
  t.is(wrapper.equals(content), true);
});

test('does not render non existing routes', (t) => {
  const content = (<div>Hello screen</div>);

  @accessConnect
  @withRouterExtended('/users/1')
  class SomeScreen extends Component {
    render() {
      return content;
    }
  }

  const wrapper = shallow(<SomeScreen />);
  t.is(wrapper.equals(defaultNonScreenNegativeRenderResult), true);
});

test('does not render without an access and has default negative render result for screen', (t) => {
  const content = (<div>Hello screen</div>);

  @accessConnect
  @withRouterExtended('/settings/page/1')
  class SomeScreen extends Component {
    render() {
      return content;
    }
  }

  const wrapper = shallow(<SomeScreen />);
  t.is(wrapper.equals(defaultScreenNegativeRenderResultGenerator()), true);
});

/*
test('can redefine negative result for screen', (t) => {
  const content = (<div>Hello screen</div>);
  const negativeResult = (<div>So negaitve</div>);

  @accessConnect(negativeResult)
  @withRouterExtended('/settings/page/1')
  class SomeScreen extends Component {
    render() {
      return content;
    }
  }

  const wrapper = shallow(<SomeScreen />);
  t.is(wrapper.equals(negativeResult), true);
});
*/

test('does not render without an access and has default negative render result for non-screen', (t) => {
  const content = (<div>Hello non-screen</div>);

  @accessConnect
  @withRouterExtended('/company/view/1/users')
  class SomeScreen extends Component {
    render() {
      return content;
    }
  }

  const wrapper = shallow(<SomeScreen />);
  t.is(wrapper.equals(defaultNonScreenNegativeRenderResult), true);
});

/*
test('can redefine negative result for non-screen', (t) => {
  const content = (<div>Hello non-screen</div>);
  const negativeResult = (<div>So negaitve</div>);

  @accessConnect(negativeResult)
  @withRouterExtended('/company/view/1/users')
  class SomeScreen extends Component {
    render() {
      return content;
    }
  }

  const wrapper = shallow(<SomeScreen />);
  t.is(wrapper.equals(negativeResult), true);
});
*/
