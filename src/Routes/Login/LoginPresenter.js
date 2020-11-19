import React from "react";
import styled from "styled-components";
import Button from "../../Components/Button";
import logo from "./logo.png";

const WrapperLogin = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  border-radius:20px;
  width: 100%;
  max-width: 350px;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  height: 40vh;
  text-align: center;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

const TitleBox = styled.div`
  font-size: 3em;
  height: 35%;
`;

const ContentBox = styled.div`
  height: 65%;
  padding: 10% 0px 10% 0px;
`;

const inputStyle = {
  height: "3.5vh",
};

export default ({ id, onSubmit, secret }) => (
  <WrapperLogin>
    <Form>
      <>
        <TitleBox>
          <img img src={logo} alt={"logo"} width="85%" height="100%" />
        </TitleBox>
        <ContentBox>
          <form onSubmit={onSubmit}>
            <input
              placeholder={"Id"}
              {...id}
              type="id"
              required
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              required
              {...secret}
              style={inputStyle}
            />
            <Button text={"Log in"} />
          </form>
        </ContentBox>
      </>
    </Form>
  </WrapperLogin>
);
