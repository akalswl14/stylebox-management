// import React, { useContext, useEffect } from "react";
// import styled from "styled-components";
// import PageTitle from "../../Components/PageTitle";
// import WrapPage from "../../Styles/WrapPageStyles";
// import Loader from "../../Components/Loader";
// import Button from "../../Components/Button";
// import { ShopListContext } from "./ShopDetailContainer";
// import ShopDataRow from "./ShopDataRow";
// import SortButton from "../../Components/SortButton";
// import Pagination from "react-pagination-js";
// import "../CreateShop/node_modules/react-pagination-js/dist/styles.css";
// import SearchButton from "../../Components/SearchButton";

// const Wrapper = styled.div`
//   min-height: 25vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   padding: 20px;
// `;

// const TitleBox = styled.div`
//   padding: 15px 0px 15px 0px;
//   display: flex;
//   align-items: center;
//   width: 100%;
// `;

// const ButtonBox = styled.div`
//   padding: 15px 0px 15px 0px;
//   display: flex;
//   align-items: center;
//   width: 100%;
//   justify-content: flex-end;
// `;

// const DeleteButtonBox = styled(ButtonBox)`
//   justify-content: flex-start;
// `;

// const Form = styled.form``;

// const Table = styled.table`
//   border-collapse: collapse;
//   border: 1px solid black;
//   width: 100%;
//   text-align: center;
//   tr,
//   td,
//   th {
//     border: ${(props) => props.theme.tableBorder};
//   }
//   td,
//   th {
//     padding: 5px;
//     vertical-align: middle;
//   }
//   th {
//     background-color: #f2f2f2;
//     font-weight: 500;
//   }
//   .SortCell {
//     justify-content: center;
//     border: 0;
//   }
//   .tagNameCell {
//     display: flex;
//     justify-content: space-around;
//     border: 0;
//   }
//   input.InUpdateList {
//     border-color: #db3d45;
//   }
// `;

// const SortText = styled.span`
//   line-height: 30px;
// `;

// const PaginationWrapper = styled.div`
//   text-align: center;
//   margin: 40px 0px;
// `;

// const SelectedShopContainer = styled.div`
//   font-weight: 500;
//   font-size: 17px;
// `;

// const SearchContainer = styled.div`
//   padding-bottom: 20px;
//   font-weight: 450;
//   select,
//   option,
//   input {
//     font-size: 16px;
//   }
//   input {
//     margin-left: 10px;
//   }
// `;

// export default ({ onSubmit, loading, error, data }) => {
//   const { ShopListState, ShopListDispatch } = useContext(ShopListContext);

//   const SortClick = (e, name) => {
//     e.preventDefault();
//     let SortOption = {
//       SortShopId: false,
//       SortShopName: false,
//       SortWeight: false,
//       SortRank: false,
//       shopIdAsc: true,
//       ShopNameAsc: true,
//       WeightAsc: true,
//       RankAsc: true,
//     };
//     if (name === "ShopId") {
//       if (ShopListState.SortOption.SortShopId) {
//         if (ShopListState.SortOption.shopIdAsc) {
//           SortOption.SortShopId = true;
//           SortOption.shopIdAsc = false;
//         } else {
//           SortOption.SortShopId = false;
//           SortOption.shopIdAsc = true;
//         }
//       } else {
//         SortOption.SortShopId = true;
//         SortOption.shopIdAsc = true;
//       }
//     } else if (name === "ShopName") {
//       if (ShopListState.SortOption.SortShopName) {
//         if (ShopListState.SortOption.ShopNameAsc) {
//           SortOption.SortShopName = true;
//           SortOption.ShopNameAsc = false;
//         } else {
//           SortOption.ShopNameAsc = true;
//           SortOption.SortShopName = false;
//         }
//       } else {
//         SortOption.SortShopName = true;
//         SortOption.ShopNameAsc = true;
//       }
//     } else if (name === "Weight") {
//       if (ShopListState.SortOption.SortWeight) {
//         if (ShopListState.SortOption.WeightAsc) {
//           SortOption.SortWeight = true;
//           SortOption.WeightAsc = false;
//         } else {
//           SortOption.SortWeight = false;
//           SortOption.WeightAsc = true;
//         }
//       } else {
//         SortOption.SortWeight = true;
//         SortOption.WeightAsc = true;
//       }
//     } else if (name === "Rank") {
//       if (ShopListState.SortOption.SortRank) {
//         if (ShopListState.SortOption.RankAsc) {
//           SortOption.SortRank = true;
//           SortOption.RankAsc = false;
//         } else {
//           SortOption.SortRank = false;
//           SortOption.RankAsc = true;
//         }
//       } else {
//         SortOption.SortRank = true;
//         SortOption.RankAsc = true;
//       }
//     }
//     ShopListDispatch({
//       type: "UPDATE_SORTOPTION",
//       data: {
//         SortOption,
//       },
//     });
//   };

//   const ChangeCurrentPage = (pageNum) => {
//     ShopListDispatch({
//       type: "UPDATE_PAGENUM",
//       data: {
//         pageNum,
//       },
//     });
//   };

//   const ChangeSearchSelectBox = (e) => {
//     const { value } = e.target;
//     ShopListDispatch({
//       type: "UPDATE_SEARCH_SELECTBOX",
//       data: {
//         SearchSelectBox: value,
//       },
//     });
//   };

//   const ChangeSearchKeyword = (e) => {
//     const { value } = e.target;
//     ShopListDispatch({
//       type: "UPDATE_SEARCH_KEYWORD",
//       data: {
//         SearchKeyWord: value,
//       },
//     });
//   };

//   const SearchShopList = (e) => {
//     e.preventDefault();
//     let rtnSearchOption = {};
//     if (ShopListState.SearchOption.SearchSelectBox === "ShopID") {
//       rtnSearchOption = {
//         ...ShopListState.SearchOption,
//         SearchShopId: true,
//         ShopId: Number(ShopListState.SearchOption.SearchKeyWord),
//       };
//     } else if (ShopListState.SearchOption.SearchSelectBox === "ShopName") {
//       rtnSearchOption = {
//         ...ShopListState.SearchOption,
//         SearchShopName: true,
//         ShopName: ShopListState.SearchOption.SearchKeyWord,
//       };
//     } else if (ShopListState.SearchOption.SearchSelectBox === "PhoneNumber") {
//       rtnSearchOption = {
//         ...ShopListState.SearchOption,
//         SeacrchPhoneNumber: true,
//         PhoneNumber: ShopListState.SearchOption.SearchKeyWord,
//       };
//     } else if (ShopListState.SearchOption.SearchSelectBox === "Address") {
//       rtnSearchOption = {
//         ...ShopListState.SearchOption,
//         SearchAddress: true,
//         Address: ShopListState.SearchOption.SearchKeyWord,
//       };
//     } else if (ShopListState.SearchOption.SearchSelectBox === "Tag") {
//       rtnSearchOption = {
//         ...ShopListState.SearchOption,
//         SearchTag: true,
//         Tag: ShopListState.SearchOption.SearchKeyWord,
//       };
//     }
//     ShopListDispatch({
//       type: "UPDATE_SEARCHOPTION",
//       data: {
//         SearchOption: rtnSearchOption,
//       },
//     });
//   };

//   if (error) return `Error! ${error.message}`;
//   if (loading)
//     return (
//       <Wrapper>
//         <Loader />
//       </Wrapper>
//     );
//   if (!loading && data) {
//     const CheckAllCheckBox = (e) => {
//       let BatchShopList = ShopListState.SelectedShopList;
//       if (e.target.checked) {
//         for (const eachShop of data.getShopList.shops) {
//           if (!BatchShopList.includes(eachShop.shopId)) {
//             BatchShopList.push(eachShop.shopId);
//           }
//         }
//       } else {
//         for (const eachShop of data.getShopList.shops) {
//           const index = BatchShopList.indexOf(eachShop.shopId);
//           if (index > -1) {
//             BatchShopList.splice(index, 1);
//           }
//         }
//       }
//       ShopListDispatch({
//         type: "UPDATE_BATCH_SELECTSHOP",
//         data: { BatchShopList },
//       });
//     };

//     const AllCheckBoxStatus = () => {
//       for (const eachShop of data.getShopList.shops) {
//         if (!ShopListState.SelectedShopList.includes(eachShop.shopId)) {
//           return false;
//         }
//       }
//       return true;
//     };

//     const ExportToExcel = (e) => {
//       e.preventDefault();
//       console.log("Export to Excel");
//     };
//     return (
//       <WrapPage>
//         <Form>
//           <TitleBox>
//             <PageTitle text={"Shop List"} />
//             <ButtonBox>
//               <Button
//                 text="Export to Excel"
//                 ClickEvent={ExportToExcel}
//                 isButtonType={true}
//               ></Button>
//             </ButtonBox>
//           </TitleBox>
//           <SearchContainer>
//             <select
//               name="SearchTypeBox"
//               defaultValue={ShopListState.SearchOption.SearchSelectBox}
//               onChange={(e) => ChangeSearchSelectBox(e)}
//             >
//               <option value="ShopID">ShopID</option>
//               <option value="ShopName">Shop Name</option>
//               <option value="PhoneNumber">PhoneNumber</option>
//               <option value="Address">Address</option>
//               <option value="Tag">Tag</option>
//             </select>
//             <input
//               type="text"
//               name="SearchKeywordInput"
//               value={ShopListState.SearchOption.SearchKeyWord}
//               onChange={(e) => ChangeSearchKeyword(e)}
//               onKeyPress={(e) => {
//                 if (e.key === "Enter") {
//                   e.preventDefault();
//                   SearchShopList(e);
//                 }
//               }}
//             />
//             <SearchButton ClickEvent={SearchShopList} />
//           </SearchContainer>
//           <Table>
//             <tr>
//               <th className="CheckBoxCell">
//                 <input
//                   type="checkbox"
//                   onClick={(e) => CheckAllCheckBox(e)}
//                   checked={AllCheckBoxStatus()}
//                 />
//               </th>
//               <th>
//                 <SortText>Shop ID</SortText>
//                 <SortButton
//                   type={
//                     !ShopListState.SortOption.SortShopId
//                       ? 0
//                       : ShopListState.SortOption.shopIdAsc
//                       ? 1
//                       : 2
//                   }
//                   func={(e) => SortClick(e, "ShopId")}
//                 />
//               </th>
//               <th>
//                 <SortText>Shop Name</SortText>
//                 <SortButton
//                   type={
//                     !ShopListState.SortOption.SortShopName
//                       ? 0
//                       : ShopListState.SortOption.ShopNameAsc
//                       ? 1
//                       : 2
//                   }
//                   func={(e) => SortClick(e, "ShopName")}
//                 />
//               </th>
//               <th>PhoneNumber</th>
//               <th>Address</th>
//               <th>Thumbnail Tags</th>
//               <th>
//                 <SortText>Rank</SortText>
//                 <SortButton
//                   type={
//                     !ShopListState.SortOption.SortRank
//                       ? 0
//                       : ShopListState.SortOption.RankAsc
//                       ? 1
//                       : 2
//                   }
//                   func={(e) => SortClick(e, "Rank")}
//                 />
//               </th>
//               <th>
//                 <SortText>Weight</SortText>
//                 <SortButton
//                   type={
//                     !ShopListState.SortOption.SortWeight
//                       ? 0
//                       : ShopListState.SortOption.WeightAsc
//                       ? 1
//                       : 2
//                   }
//                   func={(e) => SortClick(e, "Weight")}
//                 />
//               </th>
//               <th>Posts</th>
//               <th>Products</th>
//               <th>Likes</th>
//               <th>Views</th>
//               <th>Edit</th>
//             </tr>
//             {data.getShopList.shops.map((eachShop) => (
//               <ShopDataRow data={eachShop} key={eachShop.shopId} />
//             ))}
//           </Table>
//           <DeleteButtonBox>
//             <Button
//               text="Edit Selected"
//               name="EditButton"
//               ClickEvent={onSubmit}
//             ></Button>
//             <Button
//               text="Delete Selected"
//               name="DeleteButton"
//               ClickEvent={onSubmit}
//             ></Button>
//           </DeleteButtonBox>
//           <SelectedShopContainer>
//             Selected Shop : {ShopListState.SelectedShopList.toString()}
//           </SelectedShopContainer>
//           <SelectedShopContainer>
//             Edited Shop :{" "}
//             {ShopListState.WeightData.map((eachData) => eachData.id).toString()}
//           </SelectedShopContainer>
//         </Form>
//         <PaginationWrapper>
//           <Pagination
//             currentPage={ShopListState.pageNum}
//             totalSize={data.getShopList.totalShopNum}
//             sizePerPage={13}
//             theme="bootstrap"
//             changeCurrentPage={(e) => ChangeCurrentPage(e)}
//             numberOfPagesNextToActivePage={3}
//           />
//         </PaginationWrapper>
//       </WrapPage>
//     );
//   }
// };
