import { Card } from "antd";
import { Meta } from "antd/es/list/Item";
import React from "react";
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText } from "./style";
import { StarFilled } from '@ant-design/icons'
import logo from '../../assets/images/logo.webp'
import { WrapperStyleTextSell } from "../ProductDetailsComponent/style";

const CardComponent = () => {
    return (
        <WrapperCardStyle
            hoverable
            headStyle={{ width: '200px', height: '200px' }}
            style={{ width: 200 }}
            bodyStyle={{ padding: '10px' }}
            cover={
                <img
                    draggable={false}
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
            }
        >
            <img src={logo} alt="logo" style={{width: '68px', height:'14px', position:'absolute', top: -1, left: -1, borderTopLeftRadius: '3px'}} />
            <StyleNameProduct>Iphone</StyleNameProduct>
            <WrapperReportText>
                <span style={{ marginRight: '4px' }}>
                    <span>4.96 </span> <StarFilled style={{ fontSize: '12px', color: 'red' }} />
                </span>
                <WrapperStyleTextSell> | Da ban 1000+</WrapperStyleTextSell>
            </WrapperReportText>
            <WrapperPriceText>
                <span style={{marginRight: '8px'}}>1.000.000 VND</span>
                <WrapperDiscountText>
                    -5%
                </WrapperDiscountText>
            </WrapperPriceText>
        </WrapperCardStyle>
    )
}

export default CardComponent