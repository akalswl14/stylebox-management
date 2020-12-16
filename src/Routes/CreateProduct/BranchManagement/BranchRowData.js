import React, { useContext } from "react";
import styled from "styled-components";
import { ProductInfoContext } from "../CreateProductContainer";

const Input = styled.input`
  width: ${(props) => {
    if (props.InputWidth) {
      return props.InputWidth.toString() + "px";
    } else {
      return null;
    }
  }};
  height: 35px;
  font-size: 15px;
  text-align: left;
`;

export default ({ data }) => {
  const { ProductInfoState, ProductInfoDispatch } = useContext(
    ProductInfoContext
  );

  const onChange = (e) => {
    const { name } = e.target;
    if (name === "BranchSelectInput") {
      let isExist = false;
      const rtnData = ProductInfoState.BranchManagement.value.filter(
        (eachData) => {
          if (eachData === Number(data.id)) {
            isExist = true;
          } else {
            return eachData;
          }
        }
      );
      if (!isExist) rtnData.push(Number(data.id));
      ProductInfoDispatch({
        type: "UPDATE_BRANCH",
        data: { BranchManagement: { value: rtnData } },
      });
      return;
    }
  };

  return (
    <tr id={data.id}>
      <td className="orderInputCell">{data.id}</td>
      <td>{data.branchName}</td>
      <td>{data.phoneNumber}</td>
      <td className="AddressCell">{data.address}</td>
      <td className="buttonCell">
        <Input
          InputWidth={17}
          type="checkbox"
          name="BranchSelectInput"
          value={data.isSelected}
          onChange={(e) => onChange(e)}
        />
      </td>
    </tr>
  );
};
