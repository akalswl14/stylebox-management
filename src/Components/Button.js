import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ButtonContainer = styled.button`
  width: 120px;
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  background-color: ${(props) => props.theme.ButtonColor};
  color: white;
  margin: 4px;
  cursor: pointer;
`;

const Button = ({ text, ClickEvent, isButtonType, name }) => (
  <ButtonContainer
    onClick={ClickEvent}
    type={isButtonType && "button"}
    name={name}
  >
    {text}
  </ButtonContainer>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  ClickEvent: PropTypes.func,
  isButtonType: PropTypes.bool,
  name: PropTypes.string,
};

export default Button;
