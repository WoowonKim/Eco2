import styled from "styled-components";
let LoginInput = styled.input`
  background: white;
  border: none;
  border-bottom: 1px solid #dadada;
  width: 360px;
  height: 35px;
  padding-left: 10px;
`;

let GreenBtn = styled.button`
  background: rgb(87, 214, 150);
  border: 1px solid rgb(87, 214, 150);
  border-radius: 8px;
  width: 360px;
  height: 50px;
  text-align: center;
  color: white;
  cursor: pointer;
  margin-top: 10px;
`;

let ShortGreenBtn = styled.button`
  background: rgb(87, 214, 150);
  border: 1px solid rgb(87, 214, 150);
  border-radius: 8px;
  width: 150px;
  height: 50px;
  text-align: center;
  color: white;
  cursor: pointer;
  margin-top: 10px;
`;

let WarningText = styled.p`
  color: red;
  font-size: x-small;
  text-align: start;
`;

let Leaf = styled.img`
  position: absolute;
  height: 40px;
  z-index: 1000;
  left: ${(props) => props.left};
  top: ${(props) => props.top};
`;
export { GreenBtn, LoginInput, WarningText, ShortGreenBtn, Leaf };
