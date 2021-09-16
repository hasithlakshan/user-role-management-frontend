import React, {memo, useMemo, useState} from "react"
import {Row, Col, Button, Modal} from "antd"
import "./ListItems.stylesheet.sass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import PropTypes from "prop-types"
import Cookies from "js-cookie";

const ListItem = memo(({ name, role, email, getToUpdate, deleteUser, id, loginUserRole }) => {
    const [deletePopupVisible, setDeletePopupVisible] = useState(false)
  const checkBackgroundColor = useMemo(() => {
    if (role === "User") {
      return {
        color: "#404040", border: "1px solid #404040"
      }
    } else if (role === "Admin") {
      return {
          color: "#ffcc00", border: "1px solid #ffcc00"
      }
    } else {
      return {
          color: "#1f7a1f", border: "1px solid #1f7a1f"
      }
    }
  }, [role])

  return (
        <Row className="item-container">
            <Col span={6} className="item-container__id">{name}</Col>
            <Col span={9} className="item-container__name">{email}</Col>
            <Col span={5} className="item-container__status">
                 <span className="item-container__status__name" style={checkBackgroundColor} >{role}</span>
            </Col>
            <Col span={2} className="item-container__edit" disabled={true}>
                <span className="item-container__edit__wrapper" style={( loginUserRole==="2" || loginUserRole==="3") ? {} : {opacity: 0.5}} onClick={()=>{if( loginUserRole==="2" || loginUserRole==="3") getToUpdate(id, role, email)}}><FontAwesomeIcon className="item-container__edit__wrapper__icon" size="1x" icon={faPencilAlt}/></span>
            </Col>
            <Col span={2} className="item-container__remove">
                <span className="item-container__remove__wrapper" style={( loginUserRole==="3") ? {} : {opacity: 0.5}} onClick={()=> loginUserRole==="3" && setDeletePopupVisible(true)}><FontAwesomeIcon className="item-container__remove__wrapper__icon" size="1x" icon={faTrashAlt}/></span>
            </Col>
            <Modal
                title="Delete"
                centered
                visible={deletePopupVisible}
                onOk={() => setDeletePopupVisible(false)}
                onCancel={() => setDeletePopupVisible(false)}
                width={500}
                footer={[
                    <Button key="back" onClick={() => setDeletePopupVisible(false)}>
                        NO
                    </Button>,
                    <Button key="submit" type="primary" onClick={()=> {
                        deleteUser(id)
                        setDeletePopupVisible(false)
                    }} >
                        YES
                    </Button>
                ]}
            >
                Are you sure want to delete ?
            </Modal>
        </Row>
  )
})

export default ListItem

ListItem.propTypes = {
    email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired
}
