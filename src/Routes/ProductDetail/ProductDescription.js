import React, { useContext } from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";
import { ProductInfoContext } from "./ProductDetailContainer";

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
  const { ProductInfoState, ProductInfoDispatch } = useContext(
    ProductInfoContext
  );

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.name === "ProductDescriptionInput") {
      ProductInfoDispatch({
        type: "UPDATE_DESCRIPTION",
        data: {
          ProductDescription: { value: e.target.value, isChange: true },
        },
      });
    }
  };

  return (
    <>
      <SectionTitle text="Product Description" />
      <Table>
        <tr>
          <th>Product Description</th>
          <td>
            <TextInput
              name="ProductDescriptionInput"
              value={ProductInfoState.ProductDescription.value}
              onChange={(e) => onChange(e)}
            />
          </td>
        </tr>
      </Table>
    </>
  );
};
