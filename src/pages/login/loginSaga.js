import { put, call } from "redux-saga/effects"
import Cookies from "js-cookie"
import * as loginPageActions from "./login.actions"
import authService from "../../services/auth.service"
import {notification} from "antd";
export default function *loginSaga(action) {
  try {
    const loginUser = yield yield call(authService.login, action.loginCredentials);
    if (loginUser.code === 200) {
      Cookies.set("auth", loginUser.token)
      notification.open({
        message: 'Login',
        description:
            'User successfully login to the system'
      });
      yield put(loginPageActions.loginSuccess(loginUser.payload))
    } else {
      notification.open({
        message: 'Login',
        description:
            'Failure to user login'
      });
      yield put(loginPageActions.loginFailure())
    }
  } catch (e) {
    notification.open({
      message: 'Login',
      description:
          'Failure to user login'
    });
    console.log("somethings happen in login saga!")
    yield put(loginPageActions.loginFailure())
  }
}
