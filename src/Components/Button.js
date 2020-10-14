import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ButtonContainer = styled.button`
  width: 100%;
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  background-color: ${(props) => props.theme.ButtonColor};
  color: white;
`;

const Button = ({ text }) => <ButtonContainer>{text}</ButtonContainer>;

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
