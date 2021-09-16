import React, { useCallback, useEffect, useState } from "react"
import { ListItem, Loading, TextInput } from "../../components"
import { useDispatch, useSelector } from "react-redux"
import {Button, Checkbox, Col, Layout, Modal, Row} from "antd"
import "./home.stylesheet.sass"
import { actions as homeActions } from "./index"

export default function Home () {
  // states
  const [visibleToUpdate, setVisibleToUpdate] = useState(false)

  const [checkedUser, setToUser] = useState(true)
  const [checkedAdmin, setAdmin] = useState(false)
  const [checkedSuperAdmin, setSuperAdmin] = useState(false)

  const [user, setUser] = useState("")
  const [userId, setUserId] = useState("")
  const [checkedValue, setCheckedValue] = useState("Todo")
  const [searchWord, setSearchWord] = useState("")
  const [searchArray, setSearchArray] = useState([])

  //redux
  const { isLoading } = useSelector((state) => state.login)
  const loginUser  = useSelector((state) => state.login.user)
  const { users } = useSelector((state) => state.home)

  const dispatch = useDispatch()

  // functions getToUpdate
  function getToUpdate (id, role, email) {
    setUserId(id)
    setUser(email)
    setVisibleToUpdate(true)
    if (role === "User") {
      setToUser(true)
      setAdmin(false)
      setSuperAdmin(false)
    } else if (role === "Admin") {
      setToUser(false)
      setAdmin(true)
      setSuperAdmin(false)

    } else {
      setToUser(false)
      setAdmin(false)
      setSuperAdmin(true)
    }
    setCheckedValue(getRoleId(role))
  }

  // functions updateToList
  function updateToList () {
    const userObject = {
      _id: userId,
      role: checkedValue
    }
    dispatch((homeActions.updateUserRequest(userObject)))
    setVisibleToUpdate(false)
  }

  // functions deleteUser
  function deleteUser (id) {
      dispatch((homeActions.deleteUserRequest(id)))
    }

  function getRoleName (id) {
    const roleList = [
      {roleId: "1", name: "User"},
      {roleId: "2", name: "Admin"},
      {roleId: "3", name: "super Admin"}
    ]
    const foundRole = roleList.find(role=>(role.roleId === id))
    return foundRole.name
  }

  function getRoleId (roleName) {
    const roleList = [
      {roleId: "1", name: "User"},
      {roleId: "2", name: "Admin"},
      {roleId: "3", name: "super Admin"}
    ]
    const foundRole = roleList.find(role=>(role.name === roleName))
    return foundRole.roleId
  }

  useEffect(() => {
      dispatch((homeActions.getUserRequest()))
  }, [])

  useEffect(() => {
    if (searchWord) {
      const searchUser = users.filter(user => {
        const nameSliceArray = user.email.toLowerCase().match(searchWord.toLowerCase())
        return nameSliceArray
      })
      setSearchArray(searchUser)
    }
  }, [searchWord])

  const onChange = useCallback(e => {
    if (e.target.value === "1") {
      setToUser(true)
      setAdmin(false)
      setSuperAdmin(false)
      setCheckedValue("1")
    } else if (e.target.value === "2") {
      setToUser(false)
      setAdmin(true)
      setSuperAdmin(false)
      setCheckedValue("2")
    } else {
      setToUser(false)
      setAdmin(false)
      setSuperAdmin(true)
      setCheckedValue("3")
    }
  }, [])



  return isLoading
    ? <Loading />
    : <Layout className="home-container">
        <Row className="home-container__title-wrapper">
          <div className="home-container__title-wrapper__title">
            User List
          </div>
        </Row>
        <Row className="home-container__content-wrapper">
          <Row className="home-container__content-wrapper__header-wrapper">
            <TextInput inputClassname="home-container__content-wrapper__header-wrapper__search" placeholder="search user" onChange={setSearchWord} />
          </Row>
            <Row className="home-container__content-wrapper__header-wrapper">
              <Col span={6} className="home-container__content-wrapper__header-wrapper__text">First Name</Col>
              <Col span={9} className="home-container__content-wrapper__header-wrapper__text">Emil</Col>
              <Col span={5} className="home-container__content-wrapper__header-wrapper__text">Role</Col>
              <Col span={2} className="home-container__content-wrapper__header-wrapper__text">Edit</Col>
              <Col span={2} className="home-container__content-wrapper__header-wrapper__text">Remove</Col>
            </Row>
          {
            searchWord
              ? searchArray.map(user => <ListItem key={user._id} id={user._id} name={user.firstName} email={user.email} role={user.role} loginUserRole={loginUser.role} getToUpdate={getToUpdate} deleteUser={deleteUser} />)
              : users.map(user => <ListItem key={user._id} id={user._id} name={user.firstName} email={user.email} role={getRoleName(user.role)} loginUserRole={loginUser.role} getToUpdate={getToUpdate} deleteUser={deleteUser} />)
          }
        </Row>
        <Modal
            title={"Update User"}
            centered
            visible={visibleToUpdate}
            onOk={() => {
              setVisibleToUpdate(false)
            }}
            onCancel={() => {
              setVisibleToUpdate(false)
            }}
            width={500}
            footer={[
              <Button key="back" onClick={() => {
                setVisibleToUpdate(false)
              }}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={updateToList} >
                Update
              </Button>
            ]}
        >
          <TextInput disabled={visibleToUpdate} containerClassName="pop-up" label={"Please check the user email"} required value={user}/>
          <Checkbox value="1" checked={checkedUser} onChange={onChange}>User</Checkbox>
          <Checkbox value="2" checked={checkedAdmin} onChange={onChange}>Admin</Checkbox>
          <Checkbox value="3" checked={checkedSuperAdmin} onChange={onChange}>Super Admin</Checkbox>
        </Modal>
      </Layout>
}
