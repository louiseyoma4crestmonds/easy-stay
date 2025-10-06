// pages/signup.jsx (or .tsx)
import { useState } from "react";
import { useRouter } from "next/router";
import SignupComp from "@/molecules/SignupComp/SignupComp";
import SignupLeftside from "@/molecules/SignupLeftside";
import OtpComp from "@/molecules/OtpComp";

export default function SignupPage() {
  const [showOtp, setShowOtp] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [otpPassword, setOtpPassword] = useState("");

  const router = useRouter();
  const handleSigninClick = () => {
    console.log("Redirect to signin");
    router.push("/guest/signin");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT SIDE - IMAGE + MODAL */}
      <div className="hidden md:block w-full md:w-1/2 ">
        {" "}
        <SignupLeftside
          text="Log In"
          onClick={handleSigninClick}
          title=" Simplify Your Apartment Management Today!"
          subtitle="Join our platform and effortlessly manage your apartments. From tenant communication to rent collection, we've got you covered."
        />{" "}
      </div>

      {/* RIGHT SIDE - FORM */}
      {showOtp ? (
        <div className="w-full md:w-1/2">
          {" "}
          <OtpComp email={otpEmail} password={otpPassword} isHost={true} />{" "}
        </div>
      ) : (
        <div className="w-full md:w-1/2">
          {" "}
          <SignupComp
            setShowOtp={setShowOtp}
            setOtpEmail={setOtpEmail}
            setOtpPassword={setOtpPassword}
            isHost={true}
          />{" "}
        </div>
      )}
    </div>
  );
}
// easy-stay/src/pages/signup.tsx
