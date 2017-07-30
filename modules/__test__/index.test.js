import test from 'ava';
import _ from 'lodash';
import {
  AccessCheck,
  AccessCheckInvert,
  accessConnect,
  checkPathAccess,
  checkReactChildrenRecursive,
  NavigationAction,
  NavigationActionsCollection,
  VirtualRoute,
  virtualRouteGenerator,
} from '../';

test('all libs are in the root', (t) => {
  t.false(_.isUndefined(AccessCheck));
  t.false(_.isUndefined(AccessCheckInvert));
  t.false(_.isUndefined(accessConnect));
  t.false(_.isUndefined(checkPathAccess));
  t.false(_.isUndefined(checkReactChildrenRecursive));
  t.false(_.isUndefined(NavigationAction));
  t.false(_.isUndefined(NavigationActionsCollection));
  t.false(_.isUndefined(VirtualRoute));
  t.false(_.isUndefined(virtualRouteGenerator));
});
