import AccessCheck from './AccessCheck';

export default class AccessCheckInvert extends AccessCheck {
  checkIsRender() {
    return !super.checkIsRender();
  }
}
