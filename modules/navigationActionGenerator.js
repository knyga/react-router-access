import _ from 'lodash';
import NavigationAction from './NavigationAction';

export default function navigationActionGenerator({ virtualRoute, label, data, path, hasAccess }, Extender = NavigationAction) {
  class ConcreteNavigationAction extends Extender {
    get label() {
      if (_.isUndefined(label)) {
        return super.label;
      }

      return label;
    }

    get virtualRoute() {
      if (_.isUndefined(virtualRoute)) {
        return super.virtualRoute;
      }

      return virtualRoute;
    }

    get data() {
      if (_.isUndefined(data)) {
        return super.data;
      }

      return data;
    }

    generatePath() {
      if (_.isUndefined(path)) {
        return super.generatePath();
      }

      return path;
    }

    hasAccess() {
      if (_.isUndefined(hasAccess)) {
        return super.hasAccess();
      }

      return super.hasAccess() && hasAccess.apply(this);
    }
  }

  return ConcreteNavigationAction;
}
