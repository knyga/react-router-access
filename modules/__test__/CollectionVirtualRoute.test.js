import test from 'ava';
import { virtualRootBuilder } from '../../__mocks__';
import CollectionVirtualRoute from '../CollectionVirtualRoute';

test.beforeEach((t) => {
  t.context.virtualRoot = virtualRootBuilder();
});

test('Adds children', (t) => {
  const childRoute = new CollectionVirtualRoute({
    isAbsolutePath: true,
    path: '/child',
  });

  const { virtualRoot } = t.context;
  const InitChildrenLenght = virtualRoot.children.length;

  t.is(virtualRoot.findRoute('/child'), null);

  virtualRoot.addChild(childRoute);

  t.is(virtualRoot.children.length, InitChildrenLenght + 1);
  t.deepEqual(virtualRoot.findRoute('/child'), childRoute);
});

test('generates children routes data correctly', (t) => {
  const { virtualRoot } = t.context;
  const childrenRoutesData = virtualRoot.generateChildrenRoutesData();

  t.is(childrenRoutesData.length, 8);
});
