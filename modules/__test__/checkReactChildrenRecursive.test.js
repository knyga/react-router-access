/* eslint-disable react/no-multi-comp */
import React from 'react';
import test from 'ava';
import checkReactChildrenRecursive from '../checkReactChildrenRecursive';

test('returns true if element is empty', (t) => {
  const isChecked = checkReactChildrenRecursive(null, () => true);

  t.is(isChecked, true);
});

test('returns false if checkFn is undefined', (t) => {
  const isChecked = checkReactChildrenRecursive(<div />);

  t.is(isChecked, false);
});

test('returns true if element is not a component', (t) => {
  const isChecked = checkReactChildrenRecursive('just text', () => true);

  t.is(isChecked, true);
});

test('returns true if checkFn is truthy for all children', (t) => {
  const element = (
    <div>
      <span />
      <span />
    </div>
  );
  const isChecked = checkReactChildrenRecursive(element, () => true);

  t.is(isChecked, true);
});


test('returns false if checkFn falsy for at least 1 child', (t) => {
  const element = (
    <div>
      <div>
        <div />
        <p />
      </div>
      <div />
    </div>
  );
  const isChecked = checkReactChildrenRecursive(element, el => el.type === 'div');

  t.is(isChecked, false);
});
