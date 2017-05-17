import test from 'ava';
import NavigationAction from '../';
import VirtualRoute from '../../VirtualRoute';

test.beforeEach((t) => {
  const props = {
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

  t.context.props = props;
  t.context.virtualRoute = virtualRoute;
  t.context.PageNavigationAction = PageNavigationAction;
});

test('throws error if no virtual route', (t) => {
  const { props } = t.context;
  t.throws(() => (new NavigationAction(props)).virtualRoute, Error);
});

test('path data is not the same as data by default', (t) => {
  const { props, PageNavigationAction } = t.context;
  const navigationAction = new PageNavigationAction(props);
  t.is(navigationAction.generatePathData(), props);
});

test('path is generated based on the virtual route and path data', (t) => {
  const { props, virtualRoute, PageNavigationAction } = t.context;

  class SomeAction extends PageNavigationAction {
    generatePathData() {
      return {
        ...this.props,
        id: this.props._id,
      };
    }
  }

  SomeAction.virtualRoute = virtualRoute;

  const navigationAction = new SomeAction(props);
  t.is(navigationAction.generatePath(), '/page/5-diff');
});

test('virtualRouteData returns rotes data', (t) => {
  const data = {
    icon: 'someIcon',
  };

  const virtualRoute = new VirtualRoute({
    data,
  });

  class ExampleNavigationAction extends NavigationAction {
    get virtualRoute() {
      return virtualRoute;
    }
  }

  t.deepEqual(new ExampleNavigationAction().virtualRouteData, data);
});
