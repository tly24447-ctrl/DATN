import React from "react";
import { Badge, Col } from "antd";
import { WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from "./style";
import Search from "antd/es/transfer/search";
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";

const HeaderComponent = () => {

    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }
    console.log('user', user)
    return (
        <div style={{ width: '100%', background: 'rgb(26, 148, 255)', display: 'flex', justifyContent: 'center' }}>
            <WrapperHeader>
                <Col span={5}>
                    <WrapperTextHeader>E-Commerce</WrapperTextHeader>
                </Col>
                <Col span={13}>
                    {/* tam thoi bo bordered={false} */}
                    <ButtonInputSearch size="large" textButton="Tim Kiem" placeholder="input search text" />
                </Col>
                <Col span={6} style={{ display: "flex", gap: "54px", alignItem: "center" }}>
                    <WrapperHeaderAccount>
                        <UserOutlined style={{ fontSize: "30px" }} />
                        {user?.name ? (
                            <div>{user.name}</div>
                        ) : (
                            <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                                <WrapperTextHeaderSmall>Dang nhap/Dang ky</WrapperTextHeaderSmall>
                                <div>
                                    <WrapperTextHeaderSmall>Tai khoan</WrapperTextHeaderSmall>
                                    <CaretDownOutlined />
                                </div>
                            </div>
                        )}
                    </WrapperHeaderAccount>
                    <div>
                        <Badge count={4} size='small'>
                            <ShoppingCartOutlined style={{ fontSize: "30px", color: "#fff" }} />
                        </Badge>
                        <WrapperTextHeaderSmall>Gio hang</WrapperTextHeaderSmall>
                    </div>
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent