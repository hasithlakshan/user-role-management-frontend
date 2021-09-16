import {call, put} from "redux-saga/effects"
import Cookies from "js-cookie"
import * as homePageActions from "./home.actions"
import managementService from "../../services/management.service"

function * getUsersSaga (action) {
  try {
    let token = ""
    token = Cookies.get("auth")
    const users = yield call(managementService.getUsers, { token: token });
    if(users.code===200){
      yield put(homePageActions.getUser(users.payload))
    }else{
      yield put(homePageActions.getUserFailure())
    }
  } catch (e) {
    yield put(homePageActions.getUserFailure())
  }
}

function * updateUserSaga (action) {
  try {
    let token = ""
    token = Cookies.get("auth")
    const tasks = yield call(managementService.updateUser, { userId:action.userObject._id, user:action.userObject, token: token });
    if(tasks.code===200){
      yield put(homePageActions.updateTaskSuccess(action.userObject))
    }else{
      yield put(homePageActions.updateTaskFailure())
    }
  } catch (e) {
    yield put(homePageActions.updateTaskFailure())
  }
}

function * deleteUserSaga (action) {
  try {
    let token = ""
    token = Cookies.get("auth")
    const tasks = yield call(managementService.deleteUser, { taskId:action.id, token: token });
    if(tasks.code===200){
      yield put(homePageActions.deleteUserSuccess(action.id))
    }else{
      yield put(homePageActions.deleteUserFailure())
    }
  } catch (e) {
    yield put(homePageActions.deleteUserFailure())
  }
}

export {
  getUsersSaga,
  updateUserSaga,
  deleteUserSaga
}
