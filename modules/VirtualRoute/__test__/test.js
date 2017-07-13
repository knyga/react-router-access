import test from 'ava';
import { virtualRootBuilder } from '../../../__mocks__';
import VirtualRoute from '../';

test.beforeEach((t) => {
  t.context.virtualRoot = virtualRootBuilder();
});

test('doesnt find non existing routes', (t) => {
  const { virtualRoot } = t.context;
  t.is(virtualRoot.findRoute('/groups'), null);
});

test('find existing routes', (t) => {
  const { virtualRoot } = t.context;
  t.is(virtualRoot.findRoute('/company/view/5/groups').path, '/company/view/:id/groups');
});

test('initialization with data field works', (t) => {
  const data = {
    icon: 'someIcon',
  };

  const virtualRoot = new VirtualRoute({
    data,
  });

  t.deepEqual(virtualRoot.data, data);
});

test('data initialized with empty object be default', (t) => {
  const virtualRoot = new VirtualRoute();

  t.deepEqual(virtualRoot.data, {});
});
