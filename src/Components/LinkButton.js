import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Arrow } from "./Icons";

const LinkButtonContainer = styled.a`
  width: 200px;
  border: ${(props) => props.theme.linkButtonBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  color: black;
  font-weight: 400;
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  background-color: ${(props) => props.theme.linkButtonColor};
  display: flex;
  justify-content: space-around;
`;

const LinkButton = ({ text, link }) => (
  <LinkButtonContainer href={link}>
    <div>{text}</div>
    <Arrow size={12} />
  </LinkButtonContainer>
);

LinkButton.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default LinkButton;
