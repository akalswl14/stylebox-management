import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const LinkButtonContainer = styled.a`
  width: 200px;
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  background-color: ${(props) => props.theme.linkButtonColor};
`;

const LinkButton = ({ text, link }) => (
  <LinkButtonContainer href={link}>{text}</LinkButtonContainer>
);

LinkButton.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default LinkButton;
