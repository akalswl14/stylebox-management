import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Text = styled.span`
  font-weight: 550;
  font-size: 17px;
`;

const SectionTitle = ({ text }) => <Text>{text}</Text>;

SectionTitle.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SectionTitle;
