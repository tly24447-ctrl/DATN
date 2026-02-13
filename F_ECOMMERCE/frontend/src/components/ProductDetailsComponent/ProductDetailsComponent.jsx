import React from "react";
import { Col, Row, Image, InputNumber } from 'antd';
import imageProduct from "../../assets/images/test.webp"
import smallImageProduct from "../../assets/images/smalltest.webp"
import { WrapperAddressProduct, WrapperBtnQualityProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from "./style";
import { MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'


const ProductDetailsComponent = () => {
    const onChange = () => { }
    return (
        <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
            <Col span={10} style={{borderRight: '1px solid #e5e5e5', paddingRight: '8px'}}>
                <Image src={imageProduct} alt="image product" preview={false} />
                <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                    <WrapperStyleColImage span={4} flex>
                        <WrapperStyleImageSmall src={smallImageProduct} alt="small image product" preview={false} width={64} height={64} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={smallImageProduct} alt="small image product" preview={false} width={64} height={64} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={smallImageProduct} alt="small image product" preview={false} width={64} height={64} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={smallImageProduct} alt="small image product" preview={false} width={64} height={64} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={smallImageProduct} alt="small image product" preview={false} width={64} height={64} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={smallImageProduct} alt="small image product" preview={false} width={64} height={64} />
                    </WrapperStyleColImage>
                </Row>
            </Col>
            <Col span={14} style={{paddingLeft: '10px'}}>
                <WrapperStyleNameProduct>Sach - Tham tu lung danh Conan - Combo 10 tap tu tap 81 den tap 90</WrapperStyleNameProduct>
                <div>
                    <StarFilled style={{ fontSize: '12px', color: 'red' }} />
                    <StarFilled style={{ fontSize: '12px', color: 'red' }} />
                    <StarFilled style={{ fontSize: '12px', color: 'red' }} />
                    <WrapperStyleTextSell> | Da ban 1000+</WrapperStyleTextSell>
                </div>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>200.000</WrapperPriceTextProduct>
                </WrapperPriceProduct>
                <WrapperAddressProduct>
                    <span>Giao den </span>
                    <span className="address">Q. 1, P. Ben Nghe, Ho Chi Minh</span> -
                    <span className="change-address"> Doi dia chi</span>
                </WrapperAddressProduct>
                <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                    <div style={{ marginBottom: '10px' }}>So luong</div>
                    <WrapperQualityProduct>
                        <button style={{ border: 'none', background: 'transparent' }}>
                            <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                        </button>
                        <WrapperInputNumber defaultValue={3} onChange={onChange} size="small" />
                        <button style={{ border: 'none', background: 'transparent' }}>
                            <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                        </button>
                    </WrapperQualityProduct>
                </div>
                <div style={{ display: "flex", alignItems: 'center', gap: '15px' }}>
                    <ButtonComponent
                        // bordered={false}
                        size={40}
                        styleButton={{
                            background: 'rgb(255, 57, 69)',
                            height: '48px',
                            width: '220px',
                            border: 'none',
                            borderRadius: '4px'
                        }}
                        textButton={'Chon mua'}
                        styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent>
                    <ButtonComponent
                        size={40}
                        styleButton={{
                            background: '#fff',
                            height: '48px',
                            width: '220px',
                            border: '1px solid rgb(13, 92, 182',
                            borderRadius: '4px'
                        }}
                        textButton={'Mua tra sau'}
                        styleTextButton={{ color: 'rgb(13, 92, 182)', fontSize: '15px' }}
                    ></ButtonComponent>
                </div>
            </Col>
        </Row>
    )
}

export default ProductDetailsComponent