import React, { useContext } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import Button from "../../Components/Button";
import SectionTitle from "../../Components/SectionTitle";
import { ShopInfoContext } from "./CreateShopContainer";

const Table = styled.table`
  font-size: 15px;
  tr {
    height: 40px;
  }
  border-collapse: collapse;
  border: 1px solid lightgrey;
  width: 100%;
  text-align: center;
  td,
  th {
    padding: 5px;
    vertical-align: middle;
  }
  th {
    background-color: #f2f2f2;
    font-weight: 500;
    border-bottom: 0.5px solid black;
  }
  .orderInputCell,
  .checkButtonCell {
    width: 300px;
  }
  td:first-child,
  th:first-child {
    background-color: #f2f2f2;
    border-right: 0.5px solid black;
  }
  tbody > tr:nth-child(2n) {
    border-top: 0.5px solid lightgrey;
    border-bottom: 0.5px solid lightgrey;
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
        <thead>
          <tr>
            <th className="orderInputCell">Social Media</th>
            <th>Link URL</th>
            <th className="checkButtonCell">Check</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="orderInputCell">Facebook</td>
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
            <td className="orderInputCell">Instagram</td>
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
            <td className="orderInputCell">Youtube</td>
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
        </tbody>
      </Table>
    </>
  );
};
