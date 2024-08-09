"use client";
import React, { useState, useEffect } from "react";
import { auth, provider, db } from "../../../firebase/config";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Home from "@/Components/Home/Home";
import Landing from "@/Components/Landing";
interface UserData {
  attended: number;
  total: number;
  Sub_name: string;
  target_percentage: number;
}

const Page: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDoc = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDoc);
        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data() as UserData);
        } else {
          console.log("No such document!");
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  return !user ? (
    <Landing login={handleLogin} />
  ) : (
    <Home logout={handleLogout} user={user} userData={userData} />
  );
};

export default Page;
