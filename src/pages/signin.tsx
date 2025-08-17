import { useRouter } from "next/router";
import LoginComp from "@/molecules/LoginComp";
import SignupLeftside from "@/molecules/SignupLeftside";

export default function Signin() {
  const router = useRouter();
  const handleSignupClick = () => {
    router.push("/signup");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT SIDE - IMAGE + MODAL */}
      <div className="hidden md:block w-full md:w-1/2 ">
        {" "}
        <SignupLeftside
          text="Create an Account"
          onClick={handleSignupClick}
        />{" "}
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="w-full md:w-1/2">
        <LoginComp />
      </div>
    </div>
  );
}
