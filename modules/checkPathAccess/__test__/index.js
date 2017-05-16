import test from 'ava';
import checkPathAccess from '../';
import { virtualRootBuilder } from '../../../__mocks__';

test.beforeEach((t) => {
  t.context.virtualRouteRoot = virtualRootBuilder();
});

test('root has access', (t) => {
  t.is(checkPathAccess('/', t.context.virtualRouteRoot), true);
});

test('settings has no access', (t) => {
  t.is(checkPathAccess('/settings', t.context.virtualRouteRoot), false);
});

test('settingsPage has no access', (t) => {
  t.is(checkPathAccess('/settings/page/1', t.context.virtualRouteRoot), false);
});

test('companyModule has access', (t) => {
  t.is(checkPathAccess('/company', t.context.virtualRouteRoot), true);
});

test('companyModule has access', (t) => {
  t.is(checkPathAccess('/company/view', t.context.virtualRouteRoot), true);
});

test('companyModule has access', (t) => {
  t.is(checkPathAccess('/company/view/1', t.context.virtualRouteRoot), true);
});
