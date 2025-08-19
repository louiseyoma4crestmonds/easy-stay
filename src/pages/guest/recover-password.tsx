import { useRouter } from "next/router";
import SignupLeftside from "@/molecules/SignupLeftside";
import RecoverpwdComp from "@/molecules/RecoverpwdComp";

export default function RecoverPassword() {
  const router = useRouter();
  const handleSignupClick = () => {
    console.log("Redirect to signup");
    router.push("/guest/signup");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT SIDE - IMAGE + MODAL */}
      <div className="hidden md:block w-full md:w-1/2 ">
        <SignupLeftside text="Create an Account" onClick={handleSignupClick} />
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="w-full md:w-1/2">
        <RecoverpwdComp />
      </div>
    </div>
  );
}
