import React, { useContext } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import Button from "../../Components/Button";
import SectionTitle from "../../Components/SectionTitle";
import { ShopInfoContext } from "./CreateShopContainer";

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid black;
  width: 100%;
  text-align: center;
  font-size: 15px;
  tr {
    height: 40px;
  }
  tr,
  td,
  th {
    border: ${(props) => props.theme.tableBorder};
    height: 200px;
  }
  td,
  th {
    padding: 5px;
    vertical-align: middle;
  }
  th {
    background-color: #f2f2f2;
    font-weight: 500;
    width: 300px;
  }
`;

const TextInput = styled.textarea`
  width: 100%;
  height: 100%;
  font-size: 15px;
`;

export default () => {
  const { ShopInfoState, ShopInfoDispatch } = useContext(ShopInfoContext);

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.name === "ShopDescriptionInput") {
      ShopInfoDispatch({
        type: "UPDATE_DESCRIPTION",
        data: {
          ShopDescription: e.target.value,
        },
      });
    }
  };

  return (
    <>
      <SectionTitle text="Shop Description" />
      <Table>
        <tr>
          <th>Shop Description</th>
          <td>
            <TextInput
              name="ShopDescriptionInput"
              value={ShopInfoState.ShopDescription}
              onChange={(e) => onChange(e)}
            />
          </td>
        </tr>
      </Table>
    </>
  );
};
