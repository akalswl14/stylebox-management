import React, { useContext } from "react";
import styled from "styled-components";
import { ProductInfoContext } from "../ProductDetailContainer";

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
      const rtnData = [];
      for (const eachData of ProductInfoState.BranchManagement.value) {
        if (eachData === Number(data.id)) {
          isExist = true;
        } else {
          rtnData.push(eachData);
        }
      }
      if (!isExist) rtnData.push(Number(data.id));
      ProductInfoDispatch({
        type: "UPDATE_BRANCH",
        data: { BranchManagement: { value: rtnData, isChange: true } },
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
          checked={ProductInfoState.BranchManagement.value.includes(data.id)}
          onChange={(e) => onChange(e)}
        />
      </td>
    </tr>
  );
};
