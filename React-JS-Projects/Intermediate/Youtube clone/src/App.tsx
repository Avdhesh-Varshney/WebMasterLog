import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage/MainPage";
import SignInPage from "./Pages/SignInPage/SignInPage";
import AccountPage from "./Pages/AccountPage/AccountPage";
import Navbar from "./Components/Navbar/Navbar";
import UploadPage from "./Pages/UploadPage/UploadPage";

import { ToggleSidebarContext } from "./Helpers/Context";

function App() {
  const [showSidebar, setShowSidebar] = useState<any>(true);

  return (
    <ToggleSidebarContext.Provider value={{ showSidebar, setShowSidebar }}>
      <div className="top">
        <Navbar />
      </div>
      <Router>
        <Switch>
          <Route path="/" exact render={() => <MainPage />} />
          <Route path="/signin" exact render={() => <SignInPage />} />
          <Route path="/account" exact render={() => <AccountPage />} />
          <Route path="/upload" exact render={() => <UploadPage />} />
        </Switch>
      </Router>
    </ToggleSidebarContext.Provider>
  );
}

export default App;
