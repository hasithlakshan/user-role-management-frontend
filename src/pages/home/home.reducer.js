import { actions } from "./index"
import { actions as loginActions } from "../login"
const initialState = {
  users: [],
  isGetUserLoading: false,
  isGetUserInitialLoading: true,
  isDeleteUserLoading: false,
  isDeleteUserInitialLoading: true,
  isUpdateTaskLoading: false,
  isUpdateTaskInitialLoading: true,
  deleted: false
}
const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_USER_REQUEST:
      return {
        ...state,
        isGetUserLoading: true,
        isGetUserInitialLoading: true
      }
    case actions.GET_USER: {
      return {
        ...state,
        users: action.userObject,
        isGetUserLoading: false,
        isGetUserInitialLoading: false
      }
    }
    case actions.GET_USER_FAILURE:
      return {
        ...state,
        isGetUserLoading: false,
        isGetUserInitialLoading: false

      }
    case actions.DELETE_USER_REQUEST:
      return {
        ...state,
        isDeleteUserLoading: true,
        isDeleteUserInitialLoading: true,
        deleted: false
      }
    case actions.DELETE_USER_SUCCESS: {
      const existingTask = state.users.filter(user=>(user._id!==action.userId))
      return {
        ...state,
        deleted:true,
        users: existingTask,
        isDeleteUserLoading: false,
        isDeleteUserInitialLoading: false
      }
    }
    case actions.DELETE_USER_FAILURE:
      return {
        ...state,
        isDeleteUserLoading: false,
        isDeleteUserInitialLoading: false,
        deleted: false
      }
    case actions.UPDATE_USER_REQUEST:
      return {
        ...state,
        isUpdateTaskLoading: true,
        isUpdateTaskInitialLoading: true
      }
    case actions.UPDATE_USER_SUCCESS: {
      const existingUser = state.users.filter(user=>(user._id!==action.userObject._id))
      const matchUser = state.users.find(user=>(user._id==action.userObject._id))
      matchUser.role = action.userObject.role
      return {
        ...state,
        isUpdateTaskLoading: false,
        isUpdateTaskInitialLoading: false,
        users: [
          ...existingUser,
          matchUser
        ],
      }
    }
    case actions.UPDATE_USER_FAILURE:
      return {
        ...state,
        isUpdateTaskLoading: false,
        isUpdateTaskInitialLoading: false

      }
    case loginActions.LOG_OUT: {
      return {
        ...state,
        users: []
      }
    }
    default:
      return state
  }
}
export default homeReducer
