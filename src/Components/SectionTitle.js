import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Header = styled.div`
  padding: 15px 0px 15px 0px;
  display: flex;
  align-items: center;
  width: 100%;
`;
const Text = styled.span`
  font-weight: 550;
  font-size: 17px;
`;

const SectionTitle = ({ text }) => (
  <Header>
    <Text>{text}</Text>
  </Header>
);

SectionTitle.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SectionTitle;
