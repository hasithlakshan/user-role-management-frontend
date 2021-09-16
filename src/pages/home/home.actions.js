
export const GET_USER_REQUEST = "GET_USER_REQUEST"
export const GET_USER = "GET_USER"
export const GET_USER_FAILURE = "GET_USER_FAILURE"
export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST"
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS"
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE"
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST"
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS"
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE"

export const getUserRequest = () => ({
  type: GET_USER_REQUEST
})
export const getUser = (userObject) => ({
  type: GET_USER,
  userObject
})
export const getUserFailure = () => ({
  type: GET_USER_FAILURE
})
export const deleteUserRequest = (id) => ({
  type: DELETE_USER_REQUEST,
  id
})
export const deleteUserSuccess = (userId) => ({
  type: DELETE_USER_SUCCESS,
  userId
})
export const deleteUserFailure = () => ({
  type: DELETE_USER_FAILURE
})
export const updateUserRequest = (userObject) => ({
  type: UPDATE_USER_REQUEST,
  userObject
})
export const updateTaskSuccess = (userObject) => ({
  type: UPDATE_USER_SUCCESS,
  userObject
})
export const updateTaskFailure = () => ({
  type: UPDATE_USER_FAILURE
})
