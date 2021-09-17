import { put, call } from "redux-saga/effects"
import * as registerPageActions from "./register.actions"
import profileService from "../../services/profile.service"
import {redirect} from "../../services/history";
import {notification} from "antd";

export default function *registerSaga(action) {
    try {
        const registeredUser = yield yield call(profileService.register, action.userData);
        if (registeredUser.code === 200) {
            yield put(registerPageActions.registerSuccess(registeredUser.payload))
            notification.open({
                message: 'Registration',
                description:
                    'User successfully registered to the system'
            });
            redirect("/")
        } else {
            notification.open({
                message: 'Registration',
                description:
                    'Fail user registration'
            });
            yield put(registerPageActions.registerFailure())
        }
    } catch (e) {
        notification.open({
            message: 'Registration',
            description:
                'Fail user registration'
        });
        console.log("somethings happen in register saga!")
        yield put(registerPageActions.registerFailure())
    }
}
