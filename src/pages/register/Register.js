import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { actions as registerActions } from "./index"
import { Loading, PasswordInput, TextInput } from "../../components"
import {Menu, Button, Layout, Row, Dropdown } from "antd"
import {Link, useHistory} from "react-router-dom"
import "./register.stylesheet.sass"
import validator from "../../utils/validator"
import { redirect } from "../../services/history"

export default function Register () {

    //fields
    const [firstName, setFirstName] = useState("")
    const [firstNameError, setFirstNameError] = useState("")
    const [lastName, setLastName] = useState("")
    const [lastNameError, setLastNameError] = useState("")
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const [roleId, setRoleId] = useState("1")
    const [role, setRole] = useState("User")
    const roleList = [
        {roleId: "1", name: "User"},
        {roleId: "2", name: "Admin"},
        {roleId: "3", name: "super Admin"}

    ]
    const dispatch = useDispatch()
    const history = useHistory()

    //redux
    const { isLoading, registeredUser } = useSelector((state) => state.register)

    const setRoleItem = (item) => {
        const role = roleList.find(role=> role.roleId === item.key)
        setRole(role.name)
        setRoleId(item.key)
    }
    const menu = (
        <Menu>
            <Menu.Item key="3" onClick={setRoleItem}>
                Super Admin
            </Menu.Item>
            <Menu.Item key="2" onClick={setRoleItem}>
                Admin
            </Menu.Item>
            <Menu.Item key="1" onClick={setRoleItem}>
               user
            </Menu.Item>
        </Menu>
    );
    // functions
    const onClickRegister = () => {
        const errorFirstName = validator("registerFirstName", firstName)
        setFirstNameError(errorFirstName)
        const errorLastName = validator("registerLastName", lastName)
        setLastNameError(errorLastName)
        const errorEmail = validator("registerEmail", email)
        setEmailError(errorEmail)
        const errorPassword = validator("registerPassword", password)
        setPasswordError(errorPassword)
        const errorConfirmPassword = validator("registerConfirmPassword", confirmPassword)
        setConfirmPasswordError(errorConfirmPassword)
        if(confirmPassword!==password) setConfirmPasswordError("Password does not match")
        if (!errorFirstName && !errorLastName && !errorEmail && !errorPassword && !errorConfirmPassword) {

            setTimeout(() => {
                dispatch(registerActions.registerRequest({
                    FirstName: firstName,
                    LastName: lastName,
                    Role: roleId,
                    Email: email,
                    Password: password
                }))
            }, 1000)
            dispatch((registerActions.isLoading()))
        }
    }

    useEffect(() => {
        if (firstName) {
            const errorFirstName = validator("registerFirstName", firstName)
            setFirstNameError(errorFirstName)
        }
    }, [firstName])

    useEffect(() => {
        if (lastName) {
            const errorLastName = validator("registerLastName", lastName)
            setLastNameError(errorLastName)
        }
    }, [lastName])

    useEffect(() => {
        if (email) {
            const errorEmail = validator("registerEmail", email)
            setEmailError(errorEmail)
        }
    }, [email])

    useEffect(() => {
        if (password) {
            const errorPassword = validator("registerPassword", password)
            setPasswordError(errorPassword)
        }
    }, [password])

    useEffect(() => {
        if (confirmPassword) {
            const errorConfirmPassword = validator("registerConfirmPassword", confirmPassword)
            setConfirmPasswordError(errorConfirmPassword)
        }
        if(confirmPassword!==password) setConfirmPasswordError("Password does not match")
    }, [confirmPassword])


    return isLoading
        ? <Loading />
        : <Layout className="register-container">
            <Row className="register-container__wrapper">
                <div className="register-container__wrapper__register-title">
                    Create your account
                </div>
                <Row className="register-container__wrapper__input-fields">
                    <TextInput name="registerFirstName" onChange={setFirstName} isInvalid={firstNameError} label={"First Name"} errorMsg={firstNameError} required value={firstName}/>
                    <TextInput name="registerLastName" onChange={setLastName} isInvalid={lastNameError} label={"Last Name"} errorMsg={lastNameError} required value={lastName}/>
                    <TextInput name="registerEmail" onChange={setEmail} isInvalid={emailError} label={"Email"} errorMsg={emailError} required value={email}/>
                    <div className="role-wrapper">
                        <label>Role</label>
                        <Dropdown overlay={menu} className="dddd">
                            <Button className="register-container__wrapper__input-fields__role-item">
                                {role ? role : "Select Role"}
                            </Button>
                        </Dropdown>
                    </div>
                    <PasswordInput name="registerPassword" onChange={setPassword} isInvalid={passwordError} label={"Password"} errorMsg={passwordError} required value={password} />
                    <PasswordInput name="registerConfirmPassword" onChange={setConfirmPassword} isInvalid={confirmPasswordError} label={"Confirm Password"} errorMsg={confirmPasswordError} required value={confirmPassword} />
                </Row>
                <Button className="register-container__wrapper__button" type="primary" onClick={onClickRegister}>
                    Register
                </Button>
                <Link className="register-container__wrapper__login" to="/" >Login</Link>
            </Row>
        </Layout>
}
