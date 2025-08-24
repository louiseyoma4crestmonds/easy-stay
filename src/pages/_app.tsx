import "../../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        localStorage.setItem(
          "usersLattitude",
          position.coords.latitude.toString()
        );
        localStorage.setItem(
          "usersLongitude",
          position.coords.longitude.toString()
        );
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      {" "}
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
