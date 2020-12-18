import React, { useContext } from "react";
import { DeleteIcon } from "../../../Components/Icons";
import styled from "styled-components";
import { PostInfoContext } from "../PostInfoContainer";
import Button from "../../../Components/Button";
import { useQuery } from "react-apollo-hooks";
import { GET_SUBPRODUCT } from "../PostInfoQueries";
import { toast } from "react-toastify";
import AutoSelectBox from "./AutoSelectBox";
import ParsePrice from "../../../Styles/ParsePrice";

const OrderInputBox = styled.input`
  width: 30px;
  text-align: center;
`;

const RowButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  min-width: fit-content;
`;

const SubProductTable = ({ data }) => {
  const { postDispatch, postState } = useContext(PostInfoContext);

  const { data: data_subProduct, error: error_subProduct } = useQuery(
    GET_SUBPRODUCT,
    {
      variables: {
        productName: "",
        shopId: postState.basicInfo.shopId ? postState.basicInfo.shopId : null,
      },
    }
  );

  if (error_subProduct) toast.error("Error Occured while Searching products.");

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "order") {
      if (Number(value) >= 0) {
        postDispatch({
          type: "UPDATE_PRODUCT",
          data: {
            id: Number(data.id),
            order: Number(value),
            productId: Number(data.productId),
            productName: data.productName,
            price: Number(data.price),
            link: data.link,
          },
        });
      }
    }
    if (name === "productName") {
      postDispatch({
        type: "UPDATE_PRODUCT",
        data: {
          id: Number(data.id),
          order: Number(data.order),
          productId: Number(data.productId),
          productName: value,
          price: Number(data.price),
          link: data.link,
        },
      });
    }
  };

  const deleteRow = (e, rowId) => {
    e.preventDefault();
    postDispatch({
      type: "DELETE_PRODUCT",
      data: {
        id: Number(rowId),
      },
    });
  };

  const ClickEvent = (e) => {
    e.preventDefault();
    let url = data.link;
    if (url.includes("https://") || url.includes("http://")) {
      window.open(`${data.link}`, "_blank");
    } else {
      toast.error("This is not a valid address.");
    }
  };

  return (
    <tr id={data.id}>
      <td>
        <OrderInputBox
          name="order"
          type="text"
          value={data.order}
          onChange={onChange}
          required
        />
      </td>
      <td>{data.productId}</td>
      <td>
        <AutoSelectBox
          value={{
            productId: data.productId,
            productName: data.productName,
            price: data.price,
            link: data.link,
          }}
          data={data_subProduct ? data_subProduct.getProductByName : []}
          onChangeFunc={(e, newInputValue) => {
            postDispatch({
              type: "UPDATE_PRODUCT",
              data: {
                id: Number(data.id),
                order: Number(data.order),
                productId: newInputValue ? newInputValue.productId : 0,
                productName: newInputValue ? newInputValue.productName : "",
                price: newInputValue ? newInputValue.price : 0,
                link: newInputValue ? newInputValue.link : "",
              },
            });
          }}
        />
      </td>
      <td>{ParsePrice(data.price)}</td>
      <td>{data.link}</td>
      <td>
        <Button text={"Check"} ClickEvent={ClickEvent} />
      </td>
      <td>
        <RowButton onClick={(e) => deleteRow(e, data.id)}>
          <DeleteIcon size={19} />
        </RowButton>
      </td>
    </tr>
  );
};

export default SubProductTable;
