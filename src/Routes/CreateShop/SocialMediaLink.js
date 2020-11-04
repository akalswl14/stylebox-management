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
  }
  td,
  th {
    padding: 5px;
    vertical-align: middle;
  }
  th {
    background-color: #f2f2f2;
    font-weight: 500;
  }
  .orderInputCell,
  .checkButtonCell {
    width: 300px;
  }
`;

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

export default () => {
  const { ShopInfoState, ShopInfoDispatch } = useContext(ShopInfoContext);

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.name === "FacebookLinkInput") {
      ShopInfoDispatch({
        type: "UPDATE_SNSLINK",
        data: {
          SocialMediaLink: {
            ...ShopInfoState.SocialMediaLink,
            FacebookLink: e.target.value,
          },
        },
      });
    } else if (e.target.name === "InstagramLinkInput") {
      ShopInfoDispatch({
        type: "UPDATE_SNSLINK",
        data: {
          SocialMediaLink: {
            ...ShopInfoState.SocialMediaLink,
            InstagramLink: e.target.value,
          },
        },
      });
    } else if (e.target.name === "YoutubeLinkInput") {
      ShopInfoDispatch({
        type: "UPDATE_SNSLINK",
        data: {
          SocialMediaLink: {
            ...ShopInfoState.SocialMediaLink,
            YoutubeLink: e.target.value,
          },
        },
      });
    }
  };

  const CheckLink = (e) => {
    const InputLinkType = e.target.name;
    if (InputLinkType === "FacebookLinkCheckButton") {
      let InputLink = ShopInfoState.SocialMediaLink.FacebookLink;
      InputLink =
        InputLink.includes("http://") || InputLink.includes("https://")
          ? InputLink
          : "http://" + InputLink;
      try {
        window.open(InputLink, "_blank");
      } catch (e) {
        toast.error("You are checking invalid URL");
      }
      ShopInfoDispatch({
        type: "UPDATE_SNSLINK",
        data: {
          SocialMediaLink: {
            ...ShopInfoState.SocialMediaLink,
            FacebookLink: InputLink,
          },
        },
      });
    } else if (InputLinkType === "InstagramLinkCheckButton") {
      let InputLink = ShopInfoState.SocialMediaLink.InstagramLink;
      InputLink =
        InputLink.includes("http://") || InputLink.includes("https://")
          ? InputLink
          : "http://" + InputLink;
      window.open(InputLink, "_blank");
      ShopInfoDispatch({
        type: "UPDATE_SNSLINK",
        data: {
          SocialMediaLink: {
            ...ShopInfoState.SocialMediaLink,
            InstagramLink: InputLink,
          },
        },
      });
    } else if (InputLinkType === "YoutubeLinkCheckButton") {
      let InputLink = ShopInfoState.SocialMediaLink.YoutubeLink;
      InputLink =
        InputLink.includes("http://") || InputLink.includes("https://")
          ? InputLink
          : "http://" + InputLink;
      window.open(InputLink, "_blank");
      ShopInfoDispatch({
        type: "UPDATE_SNSLINK",
        data: {
          SocialMediaLink: {
            ...ShopInfoState.SocialMediaLink,
            YoutubeLink: InputLink,
          },
        },
      });
    }
  };

  return (
    <>
      <SectionTitle text="Social Media Link" />
      <Table>
        <tr>
          <th className="orderInputCell">Social Media</th>
          <th>Link URL</th>
          <th className="checkButtonCell">Check</th>
        </tr>
        <tr>
          <th className="orderInputCell">Facebook</th>
          <td>
            <Input
              InputWidth={1000}
              type="text"
              name="FacebookLinkInput"
              value={ShopInfoState.SocialMediaLink.FacebookLink}
              onChange={(e) => onChange(e)}
            />
          </td>
          <td className="checkButtonCell">
            <Button
              text={"Check"}
              isButtonType={true}
              ClickEvent={CheckLink}
              name="FacebookLinkCheckButton"
            />
          </td>
        </tr>
        <tr>
          <th className="orderInputCell">Instagram</th>
          <td>
            <Input
              InputWidth={1000}
              type="text"
              name="InstagramLinkInput"
              value={ShopInfoState.SocialMediaLink.InstagramLink}
              onChange={(e) => onChange(e)}
            />
          </td>
          <td className="checkButtonCell">
            <Button
              text={"Check"}
              isButtonType={true}
              ClickEvent={CheckLink}
              name="InstagramLinkCheckButton"
            />
          </td>
        </tr>
        <tr>
          <th className="orderInputCell">Youtube</th>
          <td>
            <Input
              InputWidth={1000}
              type="text"
              name="YoutubeLinkInput"
              value={ShopInfoState.SocialMediaLink.YoutubeLink}
              onChange={(e) => onChange(e)}
            />
          </td>
          <td className="checkButtonCell">
            <Button
              text={"Check"}
              isButtonType={true}
              ClickEvent={CheckLink}
              name="YoutubeLinkCheckButton"
            />
          </td>
        </tr>
      </Table>
    </>
  );
};
