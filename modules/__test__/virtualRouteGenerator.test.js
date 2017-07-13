import test from 'ava';
import virtualRouteGenerator from '../virtualRouteGenerator';

test.only('data initialized with empty object be default', (t) => {
  const data = {
    isExact: true,
    isStrict: false,
    path: '/test',
  };

  const someRouter = virtualRouteGenerator(data);

  t.deepEqual(someRouter.isExact, data.isExact);
  t.deepEqual(someRouter.isStrict, data.isStrict);
  t.deepEqual(someRouter.path, data.path);
});
