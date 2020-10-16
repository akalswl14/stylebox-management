import React, { useState } from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";
import Button from "../../Components/Button";
import { PlusIcon, DeleteIcon } from "../../Components/Icons";
import { useQuery } from "react-apollo-hooks";
import { STYLE_CLASS_OPTION } from "./TagIconQueries";

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid black;
  width: 100%;
  text-align: center;
  tr,
  td,
  th {
    border: ${(props) => props.theme.tableBorder};
  }
  td,
  th {
    padding: 8px;
  }
  th {
    background-color: #f2f2f2;
    font-weight: 500;
  }
  .tagNameCell {
    display: flex;
    justify-content: space-around;
    border: 0;
  }
  .NumCell {
    padding: 7px 0px;
  }
`;

const TitleBox = styled.div`
  padding: 15px 0px 15px 0px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const ButtonBox = styled.div`
  padding: 15px 0px 15px 0px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
`;

const RowButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  min-width: fit-content;
`;

const OrderInputBox = styled.input`
  width: 30px;
  text-align: center;
`;

const SelectBox = styled.select`
  width: 200px;
  text-align: center;
`;

export const MainTagIcon = ({ setAction, data, classData }) => {
  // {
  //   "tagId": 4,
  //   "tagName": "style2",
  //   "classId": 7,
  //   "className": "Style2",
  //   "category": "Style",
  //   "order": 0
  // },
  console.log("ClassDATA");
  console.log(classData);
  // const {
  //   loading: loading_class,
  //   error: error_class,
  //   data: data_class,
  // } = useQuery(STYLE_CLASS_OPTION);
  let idIdx = 1;
  const [RowDatas, setRowDatas] = useState(
    data.map((eachTag) => {
      let tagData = {
        id: idIdx,
        order: idIdx,
        Category: "Style",
        Class: eachTag.className,
        Tag: [{ value: eachTag.tagName, isSelected: true }],
      };
      idIdx++;
      return tagData;
    })
  );
  const addRow = () => {
    const newData = {
      id: RowDatas[RowDatas.length - 1].id + 1,
      order: RowDatas[RowDatas.length - 1].id + 1,
      Category: "Style",
      Class: "exampleCategory",
      Tag: "exampleTag",
    };
    setRowDatas((prevData) => [...prevData, newData]);
  };
  const deleteRow = (rowId) => {
    setRowDatas(RowDatas.filter((eachRow) => eachRow.id !== rowId));
  };
  return (
    <>
      <TitleBox>
        <SectionTitle text={"Style Tag Icon Management ( in Main Page )"} />
        <ButtonBox>
          <Button
            text="Confirm"
            ClickEvent={() => {
              setAction("Confirm");
            }}
          ></Button>
        </ButtonBox>
      </TitleBox>
      <Table>
        <tr>
          <th>Order</th>
          <th>Category</th>
          <th>Class</th>
          <th>Tag</th>
          <th>
            <RowButton onClick={() => addRow()}>
              <PlusIcon size={19} />
            </RowButton>
          </th>
        </tr>
        {RowDatas.map((eachRow) => (
          <tr id={eachRow.id}>
            <td>
              <OrderInputBox placeholder={eachRow.order}></OrderInputBox>
            </td>
            <td>
              <SelectBox name="CategorySelectBox">
                <option value={eachRow.Category}>{eachRow.Category}</option>
              </SelectBox>
            </td>
            <td>
              <SelectBox
                name="ClassSelectBox"
                onClick={(e) => {
                  console.log(e.target);
                }}
              >
                {classData.map((eachClass) => {
                  if (eachClass.name === eachRow.Class) {
                    return (
                      <option value={eachClass.name} selected>
                        {eachClass.name}
                      </option>
                    );
                  } else {
                    return (
                      <option value={eachClass.name}>{eachClass.name}</option>
                    );
                  }
                })}
              </SelectBox>
            </td>
            <td>
              <SelectBox name="TagSelectBox">
                {eachRow.Tag.map((eachTag) => {
                  if (eachTag.isSelected) {
                    return (
                      <option value={eachTag.value} selected>
                        {eachTag.value}
                      </option>
                    );
                  } else {
                    return (
                      <option value={eachTag.value}>{eachTag.value}</option>
                    );
                  }
                })}
              </SelectBox>
            </td>
            <td>
              <RowButton onClick={() => deleteRow(eachRow.id)}>
                <DeleteIcon size={19} />
              </RowButton>
            </td>
          </tr>
        ))}
      </Table>
    </>
  );
};
