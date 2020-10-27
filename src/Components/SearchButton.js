import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { SearchIcon } from "./Icons";

const SearchButtonContainer = styled.button`
  width: 24px;
  height: 24px;
  border: ${(props) => props.theme.SearchButtonBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  text-align: center;
  font-size: 14px;
  background-color: ${(props) => props.theme.SearchButtonColor};
  margin: 0px 4px;
  cursor: pointer;
`;

const SearchButton = ({ ClickEvent }) => (
  <SearchButtonContainer onClick={(e) => ClickEvent(e)}>
    <SearchIcon size={12} />
  </SearchButtonContainer>
);

SearchButton.propTypes = {
  ClickEvent: PropTypes.func.isRequired,
};

export default SearchButton;
