import { css } from "styled-components";

export default FormStyle = css`
  padding: 15px;
  margin: 20px auto;
  max-width: 700px;
  display: flex;
  flex-direction: row;

  @media (max-width: 800px) {
    flex-direction: column;
  }

  label {
    display: block;
    text-align: center;
    font-family: "Montserrat", sans-serif;
    padding: 20px;
  }

  input {
    padding: 15px 10px;
    font-size: 14px;
    color: #333333;
    border: 0px none #1a0033;
    border-radius: 2px;
    background: #ffffff;
    font-family: "Montserrat", sans-serif;
    float: left;
    position: relative;
    z-index: 11;
    flex: 2;
    margin: 5px;
  }

  button {
    color: white;
    border: 0;
    line-height: inherit;
    text-decoration: none;
    cursor: pointer;
    border-radius: 3px;
    background-color: #020202;
    font-family: "Montserrat", sans-serif;
    flex: 1;
    padding: 15px 0px;
    font-size: 14px;
    z-index: 14;
    margin: 5px;
  }
`;
