import VirtualRoute from '../modules/VirtualRoute';

export default function virtualRootBuilder() {
  // / -> /settings (no access) -> /settings/page/:id
  // / -> /company -> /company/view -> /company/view/:id

  const companyViewPageUsersList = new VirtualRoute({
    path: '/users',
    hasAccess: function() {
      return false;
    },
  });

  const companyViewPageGroupsList = new VirtualRoute({
    path: '/groups',
  });

  const companyViewPage = new VirtualRoute({
    children: [companyViewPageUsersList, companyViewPageGroupsList],
    path: '/:id',
    isScreen: true,
  });

  const companyView = new VirtualRoute({
    isAbstract: true,
    children: [companyViewPage],
    path: '/view',
  });

  const companyModule = new VirtualRoute({
    children: [companyView],
    isAbstract: true,
    isAbsolutePath: true,
    path: '/company',
  });

  const settingsPage = new VirtualRoute({
    path: '/page/:id',
    isScreen: true,
  });

  const settings = new VirtualRoute({
    children: [settingsPage],
    isAbstract: true,
    hasAccess: function() {
      return false;
    },
    isAbsolutePath: true,
    path: '/settings',
  });

  const root = new VirtualRoute({
    children: [settings, companyModule],
    isAbstract: true,
    isAbsolutePath: true,
    path: '/',
  });

  VirtualRoute.root = root;

  return root;
}
