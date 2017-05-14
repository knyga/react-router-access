import test from 'ava';
import {virtualRootBuilder} from '../../__mocks__';

test.beforeEach(t => {
  t.context.virtualRoot = virtualRootBuilder();
});

test('doesnt find non existing routes', t => {
  const {virtualRoot} = t.context;
  t.is(virtualRoot.findRoute('/groups'), null);
});

test('doesnt find non existing routes', t => {
  const {virtualRoot} = t.context;
  t.is(virtualRoot.findRoute('/company/view/5/groups').path, '/company/view/:id/groups');
});
