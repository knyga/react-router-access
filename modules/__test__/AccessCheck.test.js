/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Link } from 'react-router-dom';
import { shallow } from 'enzyme';
import test from 'ava';
import AccessCheck from '../AccessCheck';
import { virtualRootBuilder } from '../../__mocks__';

test.beforeEach((t) => {
  const virtualRouteRoot = virtualRootBuilder();

  t.context = {
    virtualRouteRoot,
  };
});

test('renders with access', (t) => {
  const content = (<div>Hello content</div>);
  const wrapper = shallow(<AccessCheck>{content}</AccessCheck>);

  t.is(wrapper.equals(content), true);
});

test('not renders with hasAccess prop returning false', (t) => {
  const content = (<div>Hello content</div>);
  const wrapper = shallow(
    <AccessCheck hasAccess={() => false}>
      {content}
    </AccessCheck>,
  );

  t.is(wrapper.equals(null), true);
});

test('renders with links with access', (t) => {
  const content = (<Link to="/company">Hello link</Link>);
  const wrapper = shallow(<AccessCheck>{content}</AccessCheck>);

  t.is(wrapper.equals(content), true);
});

test('not renders with links without access', (t) => {
  const content = (<Link to="/settings">Hello link</Link>);
  const wrapper = shallow(<AccessCheck>{content}</AccessCheck>);

  t.is(wrapper.equals(null), true);
});

