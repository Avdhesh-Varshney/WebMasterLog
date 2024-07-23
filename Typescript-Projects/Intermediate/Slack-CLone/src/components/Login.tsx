import { FC } from "react";
import styled from "styled-components";
import { Avatar, Button } from "@mui/material";
import { auth, provider } from "../firebase";

export const Login: FC = () => {
  const signIn = (e: React.MouseEvent) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <LoginAvatar src="slack.jpg" alt="slack-logo" />
        <h1>Sign in to the Himanshu's Slack</h1>
        <p>himanshu.slack.com</p>
        <Button onClick={signIn}>Sign in with Google</Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  display: flex;
  flex-direction: column;
  justify-content: center;

  > p {
    margin-top: 20px;
  }

  > button {
    margin-top: 20px;
    text-transform: inherit !important;
    background-color: #0a8d48 !important;
    color: white;
    width: 200px;
    align-self: center;
  }
`;

const LoginAvatar = styled(Avatar)`
  height: 100px;
  width: 100px;
  margin-bottom: 30px;
  object-fit: contain;
  align-self: center;
`;
