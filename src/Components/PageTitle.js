import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Text = styled.span`
  font-weight: 650;
  font-size: 20px;
`;

const PageTitle = ({ text }) => <Text>{text}</Text>;

PageTitle.propTypes = {
  text: PropTypes.string.isRequired,
};

export default PageTitle;
