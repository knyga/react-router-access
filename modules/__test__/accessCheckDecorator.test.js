/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { shallow } from 'enzyme';
import test from 'ava';
import accessCheckDecorator, { defaultNegativeRender } from '../accessCheckDecorator';


test('renders component with access', (t) => {
  const content = (<div>Test Content</div>);

  @accessCheckDecorator(() => true)
  class TestComponent extends Component {
    render() {
      return content;
    }
  }

  const wrapper = shallow(<TestComponent />);
  t.is(wrapper.isEmptyRender(), false);
});

test('not renders component without access', (t) => {
  const content = (<div>Test Content</div>);

  @accessCheckDecorator(() => false)
  class TestComponent extends Component {
    render() {
      return content;
    }
  }

  const wrapper = shallow(<TestComponent />);
  t.is(wrapper.isEmptyRender(), true);
});

test('method works with access', (t) => {
  const content = (<div>Test Content</div>);

  class TestComponent extends Component {
    @accessCheckDecorator(() => true)
    render() {
      return content;
    }
  }

  const wrapper = shallow(<TestComponent />);
  t.is(wrapper.equals(content), true);
});

test('method has default negative result without an access', (t) => {
  const content = (<div>Test Content</div>);

  class TestComponent extends Component {
    @accessCheckDecorator(() => false)
    render() {
      return content;
    }
  }

  const wrapper = shallow(<TestComponent />);
  t.is(wrapper.equals(defaultNegativeRender()), true);
});
