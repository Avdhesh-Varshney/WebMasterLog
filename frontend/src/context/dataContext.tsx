"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext<any>(null);

export function DataProvider({ children }: any) {
  const [authState, setAuthState] = useState<string>("loading");
  const [userid, setUserid] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [token,setToken] = useState<string>("")

  useEffect(() => {
    async function fetchAuth() {
      const token = localStorage.getItem("access");
      if (token) {
        try {
          const data: any = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_PATH}/api/isLoggedIn`,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          console.log(data);
          if (data?.data && data?.data?.isLoggedIn === true) {
            setEmail(data.data.email);
            setUserid(data.data.userid);
            setName(data.data.name);
            setToken(token)
            setAuthState("loggedin");
          }
        } catch (error) {
          // setAuthState("loggedin");
          setAuthState("notloggedin");
        }
      } else {
        // setAuthState("loggedin");
        setAuthState("notloggedin");
      }
    }
    fetchAuth();
  }, []);

  const value = { userid, email, name, authState,token };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useDataContext() {
  return useContext(Context);
}
