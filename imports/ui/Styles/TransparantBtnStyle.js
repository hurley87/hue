import { css } from "styled-components";

export default TransparantBtnStyle = css`
  float: right;
  color: #141414 !important;
  padding: 2px 5px;
  font-weight: 1px;
  border: none;
  border-bottom: 4px solid #e8e2dc;
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
  display: block;
  background-color: transparent;
  cursor: pointer;
  font-weight: 500;
  margin-left: 30px;
  &:hover {
    border-bottom: 4px solid #b366ff;
  }
`;
