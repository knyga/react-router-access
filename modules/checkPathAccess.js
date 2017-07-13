import { matchPath } from 'react-router';

// It is not clear from the name that we will have 2nd argument here
export default function (path, rootRoute) {
  const route = rootRoute.findRoute(path);

  if (!route) {
    return true;
  }

  const match = matchPath(path, route.generatePathOptions());

  return route.hasAccess(match.params);
}
