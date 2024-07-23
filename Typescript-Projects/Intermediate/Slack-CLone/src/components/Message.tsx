import { FC } from "react";
import styled from "styled-components";
import { Typography, Avatar } from "@mui/material";
interface IMessage {
  message: string;
  timestamp: any;
  user: string;
  userImage: string;
}

export const Message: FC<IMessage> = ({
  message,
  timestamp,
  user,
  userImage,
}) => {
  return (
    <MessageContainer>
      <UserAvatar src={userImage} alt="user-img" />
      <MessageInfo>
        <h4>
          {user} <span>{new Date(timestamp?.toDate()).toTimeString()}</span>
        </h4>
        <Typography>{message}</Typography>
      </MessageInfo>
    </MessageContainer>
  );
};

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
`;

const UserAvatar = styled(Avatar)`
  height: 50px;
  width: 50px;
  border-radius: 8px;
  z-index: -1;
`;

const MessageInfo = styled.div`
  padding-left: 10px;

  > h4 > span {
    color: gray;
    font-weight: 300;
    margin-left: 4px;
    font-size: 10px;
  }
`;
