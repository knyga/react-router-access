import React from 'react';
import VirtualRoute from '../modules/VirtualRoute';
import CollectionVirtualRoute from '../modules/CollectionVirtualRoute';

export default function virtualRootBuilder() {
  // / -> /settings (no access) -> /settings/page/:id
  // / -> /company -> /company/view -> /company/view/:id

  const companyViewPageUsersList = new VirtualRoute({
    path: '/users',
    hasAccess: function () {
      return false;
    },
  });

  const companyViewPageGroupsList = new VirtualRoute({
    path: '/groups',
  });

  const companyViewPage = new CollectionVirtualRoute({
    children: [companyViewPageUsersList, companyViewPageGroupsList],
    path: '/:id',
    component: (<div>Screen</div>),
  });

  const companyView = new CollectionVirtualRoute({
    isAbstract: true,
    children: [companyViewPage],
    path: '/view',
  });

  const companyModule = new CollectionVirtualRoute({
    children: [companyView],
    isAbstract: true,
    isAbsolutePath: true,
    path: '/company',
  });

  const settingsPage = new VirtualRoute({
    path: '/page/:id',
    component: (<div>Screen</div>),
  });

  const settings = new CollectionVirtualRoute({
    children: [settingsPage],
    isAbstract: true,
    hasAccess: function () {
      return false;
    },
    isAbsolutePath: true,
    path: '/settings',
  });

  const root = new CollectionVirtualRoute({
    children: [settings, companyModule],
    isAbstract: true,
    isAbsolutePath: true,
    path: '/',
    isExact: true,
  });

  VirtualRoute.setRoot(root);

  return root;
}
