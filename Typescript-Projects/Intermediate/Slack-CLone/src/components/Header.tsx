import { useState, FC } from "react";
import styled from "styled-components";
import { AccessTime, HelpOutline, Search } from "@mui/icons-material";
import { Avatar, Popover, Typography } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export const Header: FC = () => {
  const [user] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const typoStyle = {
    width: 200,
    display: "flex",
    alignItems: "center",
    height: 50,
    marginLeft: 2,
    cursor: "pointer",
  };

  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderAvatar
          alt={user?.displayName}
          src={user?.photoURL}
          onClick={(e: React.MouseEvent<HTMLElement>) =>
            setAnchorEl(e.currentTarget)
          }
        />
        <AccessTime />
        <Popover
          open={open}
          sx={{ marginTop: 5 }}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
        >
          <Typography sx={typoStyle} onClick={() => auth.signOut()}>
            Sign Out
          </Typography>
        </Popover>
      </HeaderLeft>

      <HeaderSearch>
        <Search />
        <input placeholder="Search Himanshu's Slack" />
      </HeaderSearch>

      <HeaderRight>
        <HelpOutline />
      </HeaderRight>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: white;
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: flex-end;
  flex: 0.3;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }
`;

const HeaderSearch = styled.div`
  display: flex;
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: #421f44;
  text-align: center;
  padding: 0 50px;
  color: gray;
  border: 1px gray solid;

  > input {
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: 0;
    background-color: transparent;
    color: white;
  }
`;
