import test from 'ava';
import navigationActionGenerator from '../navigationActionGenerator';
import { virtualRootBuilder } from '../../__mocks__';

test.beforeEach((t) => {
  t.context.virtualRouteRoot = virtualRootBuilder();
});

test('generate navigation action without data', (t) => {
  const props = {};
  const NavigationActionConstructor = navigationActionGenerator(props);
  const navigationAction = new NavigationActionConstructor();

  t.deepEqual(navigationAction.data, {});
  t.throws(() => navigationAction.label, Error);
  t.throws(() => navigationAction.virtualRoute, Error);
  t.throws(() => navigationAction.generatePath(), Error);
  t.throws(() => navigationAction.hasAccess(), Error);
});

test('generate navigation action with data', (t) => {
  const props = {
    virtualRoute: t.context.virtualRouteRoot,
    label: 'Test label',
    data: {
      test: 11,
    },
    path: '/test',
    hasAccess: () => false,
  };
  const NavigationActionConstructor = navigationActionGenerator(props);
  const navigationAction = new NavigationActionConstructor();

  t.deepEqual(navigationAction.data, props.data);
  t.is(navigationAction.label, props.label);
  t.deepEqual(navigationAction.virtualRoute, props.virtualRoute);
  t.is(navigationAction.generatePath(), props.path);
  t.is(navigationAction.hasAccess(), props.hasAccess());
});

test('generate navigation action with virtualRoute and extend its data', (t) => {
  const props = {
    virtualRoute: t.context.virtualRouteRoot.findRoute('/settings'),
  };
  const NavigationActionConstructor = navigationActionGenerator(props);
  const navigationAction = new NavigationActionConstructor();

  t.is(navigationAction.generatePath(), '/settings');
  t.is(navigationAction.hasAccess(), false);
});
