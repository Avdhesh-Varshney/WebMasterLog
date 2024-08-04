import React, { useState } from "react";
import "./SignInPage.css";

import { GoogleLogin } from "react-google-login";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const SignInPage: React.FC = () => {
  const [channelName, setChannelName] = useState<string>("");
  const [signInOption, setSignInOption] = useState<string>("");

  let history = useHistory();

  const responseGoogle = (res: any) => {
    console.log(res);

    const name = res.profileObj.name;
    const email = res.profileObj.email;
    const googleId = res.profileObj.googleId;
    const imageUrl = res.profileObj.imageUrl;

    Axios.post("http://localhost:3001/user", {
      name: name,
      email: email,
      googleId: googleId,
      channelName: channelName,
      imageUrl: imageUrl,
    }).then((response) => {
      sessionStorage.setItem("loggedIn", "true");
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("imageUrl", imageUrl);
      sessionStorage.setItem("googleId", googleId);
      history.push("/");
    });
  };

  return (
    <div className="SignInPage">
      <div className="Container">
        {signInOption == "" ? (
          <div className="body">
            <button id="bttn" onClick={() => setSignInOption("create")}>
              {" "}
              Create Account
            </button>
            <button id="bttn" onClick={() => setSignInOption("signin")}>
              {" "}
              Sign In
            </button>
          </div>
        ) : (
          <>
            <div className="top">
              <h1>
                {signInOption == "create" ? "Create Account" : "Sign In"} With
                Google
              </h1>
            </div>
            <div className="body">
              {signInOption == "create" && (
                <input
                  type="text"
                  placeholder="Channel Name..."
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setChannelName(event.target.value);
                  }}
                />
              )}
              <GoogleLogin
                clientId="31781579272-r0t99j48ttam5dbkc7b0olc6s4beq86m.apps.googleusercontent.com"
                buttonText="SignIn"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignInPage;
