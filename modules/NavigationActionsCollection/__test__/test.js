import test from 'ava';
import NavigationActionsCollection from '../';
import NavigationAction from '../../NavigationAction';

test.beforeEach((t) => {
  class CustomNavigationAction extends NavigationAction {
    hasAccess() {
      const { author } = this.props;

      if (['administrator', 'moderator'].indexOf(author) > -1) {
        return true;
      }

      return false;
    }
  }

  class CustomNavigationActionsCollection extends NavigationActionsCollection {
    constructor(collection) {
      super(collection);
      this._collection = collection;
    }

    get collection() {
      return this._collection;
    }
  }

  const collection = new CustomNavigationActionsCollection([
    new CustomNavigationAction({ author: 'user', id: 1 }),
    new CustomNavigationAction({ author: 'user', id: 2 }),
    new CustomNavigationAction({ author: 'administrator', id: 3 }),
    new CustomNavigationAction({ author: 'user', id: 4 }),
    new CustomNavigationAction({ author: 'moderator', id: 38 }),
    new CustomNavigationAction({ author: 'moderator', id: 45 }),
    new CustomNavigationAction({ author: 'user', id: 105 }),
  ]);

  t.context = {
    collection,
  };
});

test('accessMap maps only navigation actions with hasAccess() equal to true', (t) => {
  const { collection } = t.context;

  t.deepEqual(collection.accessMap(action => `/user/${action.props.id}`), [
    '/user/3',
    '/user/38',
    '/user/45',
  ]);
});

test('accessMap has indexes in the iterator', (t) => {
  const { collection } = t.context;

  t.deepEqual(collection.accessMap((action, index) => index), [0, 1, 2]);
});
