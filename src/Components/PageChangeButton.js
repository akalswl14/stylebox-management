import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Arrow } from "./Icons";

const PageChangeButtonContainer = styled.a`
  width: ${(props) => (props.width ? props.width + "px" : "120px")};
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: 600;
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  background-color: ${(props) => props.theme.ButtonColor};
  color: white;
  margin: 4px;
  cursor: pointer;
  display: block;
`;

const PageChangeButton = ({ text, href, width }) => (
  <PageChangeButtonContainer href={href} width={width}>
    <div>{text}</div>
  </PageChangeButtonContainer>
);

PageChangeButton.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  width: PropTypes.number,
};

export default PageChangeButton;
