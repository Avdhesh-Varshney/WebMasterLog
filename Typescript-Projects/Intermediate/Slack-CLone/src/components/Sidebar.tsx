import { FC } from "react";
import styled from "styled-components";
import {
  FiberManualRecord,
  Create,
  Apps,
  BookmarkBorder,
  ExpandLess,
  FileCopy,
  AlternateEmail,
  InsertComment,
  PeopleAlt,
  ExpandMore,
  Add,
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import { SidebarOption } from "./SidebarOption";
import { db, auth } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export const Sidebar: FC = () => {
  const [channels] = useCollection(db.collection("rooms"));
  const [user] = useAuthState(auth);

  const roomStyle = {
    display: "flex",
    fontSize: "14px",
    alignItems: "center",
  };

  const iconStyle = {
    marginTop: "1px",
    marginRight: "2px",
    fontSize: "16px",
    color: "green",
    alignSelf: "baseline",
  };

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Himanshu's Slack
          </Typography>
          <Typography variant="subtitle2" sx={roomStyle}>
            <FiberManualRecord sx={iconStyle} />
            {user?.displayName}
          </Typography>
        </SidebarInfo>
        <Create />
      </SidebarHeader>

      <SidebarOption Icon={InsertComment} title="Threads" />
      <SidebarOption Icon={AlternateEmail} title="Mentions & reactions" />
      <SidebarOption Icon={BookmarkBorder} title="Saved items" />
      <SidebarOption Icon={PeopleAlt} title="People & user groups" />
      <SidebarOption Icon={Apps} title="Apps" />
      <SidebarOption Icon={FileCopy} title="File browser" />
      <SidebarOption Icon={ExpandLess} title="Show less" />
      <hr />
      <SidebarOption Icon={ExpandMore} title="Channels" />
      <hr />
      <SidebarOption Icon={Add} addChannelOption title="Add Channel" />

      {channels?.docs?.map((doc: any) => (
        <SidebarOption key={doc?.id} id={doc?.id} title={doc?.data()?.name} />
      ))}
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  background-color: var(--slack-color);
  color: white;
  flex: 0.3;
  border-top: 1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;
  overflow: scroll;

  > hr {
    border: 1px solid #49274b;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;
`;
