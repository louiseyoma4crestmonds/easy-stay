import { useSession } from "next-auth/react";
import HeroSec from "@/molecules/HeroSec";
import { useState, useEffect } from "react";
import { getSessionDetails } from "./api/user";

function Home(): JSX.Element {
  // const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [token, setToken] = useState();
  const { status } = useSession();

  useEffect(() => {
    if (token === undefined) {
      getSessionDetails().then((response: any) => {
        try {
          setFirstName(response.user.user.token.token.firstName);
          setLastName(response.user.user.token.token.lastName);
          setToken(response?.user.user.token.token.userData.data[0].token);
          console.log("response", response);
        } catch (error) {}
      });
    }
  });

  return (
    <div>
      <HeroSec
        userAuthenticated={status === "authenticated" ? true : false}
        userDetails={{ firstName: firstName, lastName: lastName }}
      />

      {/* Add other components as needed */}
    </div>
  );
}

export default Home;
