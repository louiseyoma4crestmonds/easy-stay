import { useEffect, useState } from "react";
import Router from "next/router";
import { useSession } from "next-auth/react";
import OnboardingComp from "@/molecules/Host/OnboardingComp";
import AppLayout from "@/layouts/AppLayout";
import { generateRandomString } from "src/services/utilities/generateRandomString";
import { getSessionDetails } from "../api/user";

function Onboarding() {
  const { status } = useSession();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      Router.replace("/guest/signin");
    }
  }, [status]);

  useEffect(() => {
    if (token === "") {
      getSessionDetails().then((response: any) => {
        setToken(response?.user.user.token.token.userData.data[0].token);
        // setEmail(response?.user.user.token.token.userData.data[0].user.email);
      });
    }
  }, [token]);

  if (status === "authenticated") {
    return (
      <AppLayout verificationPending>
        <div className="    ">
          <OnboardingComp token={token} />
        </div>
      </AppLayout>
    );
  }

  return null;
}

export default Onboarding;
