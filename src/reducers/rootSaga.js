import { takeLatest } from "redux-saga/effects"
import { actions as loginAction, loginSaga } from "../pages/login"
import { actions as homeAction, homeSaga } from "../pages/home"
import { actions as registerAction, registerSaga } from "../pages/register"

export function * watcherSaga () {
  yield takeLatest(loginAction.LOGIN_REQUEST, loginSaga)
  yield takeLatest(registerAction.REGISTER_REQUEST, registerSaga)
  yield takeLatest(homeAction.GET_USER_REQUEST, homeSaga.getUsersSaga)
  yield takeLatest(homeAction.UPDATE_USER_REQUEST, homeSaga.updateUserSaga)
  yield takeLatest(homeAction.DELETE_USER_REQUEST, homeSaga.deleteUserSaga)
}
