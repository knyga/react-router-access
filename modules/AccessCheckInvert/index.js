import AccessCheck from '../AccessCheck';

// TODO tests
export default class AccessCheckInvert extends AccessCheck {
  checkIsRender() {
    return !super.checkIsRender();
  }
}
