import { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Chat } from "./components/Chat";
import { Login } from "./components/Login";
import { Avatar } from "@mui/material";
import Spinner from "react-spinkit";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

const App: FC = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <Loading>
        <LoadingContent>
          <SlackLogo src="slack.jpg" alt="slack-logo" />
          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
        </LoadingContent>
      </Loading>
    );
  }

  return (
    <div>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <AppBody>
              <Sidebar />
              <Switch>
                <Route path="/" exact>
                  <Chat />
                </Route>
              </Switch>
            </AppBody>
          </>
        )}
      </Router>
    </div>
  );
};

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const Loading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const LoadingContent = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SlackLogo = styled(Avatar)`
  height: 100px;
  width: 100px;
  padding: 20px;
  margin-bottom: 40px;
`;
