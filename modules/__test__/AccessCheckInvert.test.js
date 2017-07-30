/* eslint-disable react/no-multi-comp */
import React from 'react';
import { shallow } from 'enzyme';
import test from 'ava';
import AccessCheck from '../AccessCheck';
import AccessCheckInvert from '../AccessCheckInvert';

test('renders when AccessCheck.checkIsRender() returns false', (t) => {
  AccessCheck.prototype.checkIsRender = () => false;
  const content = (<div>Hello content</div>);
  const wrapper = shallow(<AccessCheckInvert>{content}</AccessCheckInvert>);

  t.is(wrapper.equals(content), true);
});

test('not renders when AccessCheck.checkIsRender() returns true', (t) => {
  AccessCheck.prototype.checkIsRender = () => true;
  const content = (<div>Hello content</div>);
  const wrapper = shallow(<AccessCheckInvert>{content}</AccessCheckInvert>);

  t.is(wrapper.equals(null), true);
});

