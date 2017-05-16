import test from 'ava';
import NavigationActionsCollection from '../';
import NavigationAction from '../../NavigationAction';

test('accessMap maps only navigation actions with hasAccess() equal to true', (t) => {
  class CustomNavigationAction extends NavigationAction {
    hasAccess() {
      const { author } = this.data;

      if (['administrator', 'moderator'].indexOf(author) > -1) {
        return true;
      }

      return false;
    }
  }

  const collection = new NavigationActionsCollection([
    new CustomNavigationAction({ author: 'user', id: 1 }),
    new CustomNavigationAction({ author: 'user', id: 2 }),
    new CustomNavigationAction({ author: 'administrator', id: 3 }),
    new CustomNavigationAction({ author: 'user', id: 4 }),
    new CustomNavigationAction({ author: 'moderator', id: 38 }),
    new CustomNavigationAction({ author: 'moderator', id: 45 }),
    new CustomNavigationAction({ author: 'user', id: 105 }),
  ]);

  t.deepEqual(collection.accessMap(action => `/user/${action.data.id}`), [
    '/user/3',
    '/user/38',
    '/user/45',
  ]);
});
