import { useState, FC } from "react";
import { Button } from "@mui/material";
import styled from "styled-components";
import { db, auth } from "../firebase";
import firebase from "firebase/compat/app";
import { useAuthState } from "react-firebase-hooks/auth";

interface IChatInput {
  channelName: string;
  channelId: null | string;
  chatRef: React.MutableRefObject<HTMLDivElement | null>;
}

export const ChatInput: FC<IChatInput> = ({
  channelName,
  channelId,
  chatRef,
}) => {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);

  const sendMessage = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }

    db.collection("rooms").doc(channelId).collection("messages").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user?.displayName,
      userImage: user?.photoURL,
    });

    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });

    setInput("");
  };

  return (
    <ChatInputContainer>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName}`}
        />
        <Button hidden type="submit" onClick={sendMessage} />
      </form>
    </ChatInputContainer>
  );
};

const ChatInputContainer = styled.div`
  padding: 45px;
  position: sticky;
  bottom: 0;
  background-color: white;

  > form {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > form > input {
    position: fixed;
    bottom: 15px;
    width: 65%;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`;
