import test from 'ava';
import NavigationAction from './';
import VirtualRoute from '../VirtualRoute';

test.beforeEach(t => {
  const data = {
    _id: 5,
    urlname: 'diff',
    name: 'test company',
  };

  const virtualRoute = new VirtualRoute({
    path: '/page/:id-:urlname',
  });

  class PageNavigationAction extends NavigationAction {
    get virtualRoute() {
      return virtualRoute;
    }
  }

  t.context.data = data;
  t.context.virtualRoute = virtualRoute;
  t.context.PageNavigationAction = PageNavigationAction;
});

test('throws error if no virtual route', t => {
  const {data} = t.context;
  t.throws(() => (new NavigationAction(data)).virtualRoute, Error);
});

test('path data is not the same as data by default', t => {
  const {data, PageNavigationAction} = t.context;
  const navigationAction = new PageNavigationAction(data);
  t.is(navigationAction.generatePathData(), data);
});

test('path is generated based on the virtual route and path data', t => {
  const {data, virtualRoute, PageNavigationAction} = t.context;

  class SomeAction extends PageNavigationAction {
    generatePathData() {
      return {
        ...this.data,
        id: this.data._id,
      };
    }
  }

  SomeAction.virtualRoute = virtualRoute;

  const navigationAction = new SomeAction(data);
  t.is(navigationAction.generatePath(), '/page/5-diff');
});
