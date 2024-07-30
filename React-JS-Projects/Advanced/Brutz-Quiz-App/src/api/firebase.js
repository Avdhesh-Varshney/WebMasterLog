import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export async function handleRegister(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      resolve(userCredential.user);
    } catch (error) {
      throw reject({ message: error.message });
    }
  });
}

export async function handleLogin(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      resolve(userCredential.user);
    } catch (error) {
      console.error(error);
      throw reject({ message: error.message });
    }
  });
}
