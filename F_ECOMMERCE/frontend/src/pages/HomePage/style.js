import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    height: 44px
`

// Phải thêm !important vì style bên kia có độ ưu tiên cao hơn :hover
export const WrapperButtonMore = styled(ButtonComponent)`
  &:hover {
    color: #fff;
    background: rgb(13, 92, 182) !important;
    span{
        color: #fff;
    }
  }
    width: 100%;
    text-align: center;
`
export const WrapperProducts = styled.div`
  display: flex;
  // justify-content: center;
  // justify-content: space-between;
  gap: 14px;
  margin-top: 20px;
  flex-wrap: wrap;
`