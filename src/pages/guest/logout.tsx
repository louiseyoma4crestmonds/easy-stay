import Router from "next/router";
import { signOut } from "next-auth/react";

function logout() {
  if (process.browser) {
    Router.replace("/guest");
    localStorage.clear();
    sessionStorage.clear();
    signOut();
  }
}
export default logout;
