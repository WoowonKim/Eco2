import styled from "styled-components";
let LoginInput = styled.input`
  background: #f7f8f9;
  border: 1px solid #dadada;
  border-radius: 8px;
  width: 330px;
  height: 50px;
  padding-left: 10px;
`;

let GreenBtn = styled.button`
  background: #adc178;
  border: 1px solid #dadada;
  border-radius: 8px;
  width: 340px;
  height: 50px;
  text-align: center;
  color: white;
  cursor: pointer;
`;

let ShortGreenBtn = styled.button`
  background: #adc178;
  border: 1px solid #dadada;
  border-radius: 8px;
  width: 150px;
  height: 50px;
  text-align: center;
  color: white;
  cursor: pointer;
`;

let WarningText = styled.p`
  color: red;
  font-size: small;
`;

export { GreenBtn, LoginInput, WarningText, ShortGreenBtn };
