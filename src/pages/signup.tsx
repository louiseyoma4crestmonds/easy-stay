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
    router.push("/guest/signin");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT SIDE - IMAGE + MODAL */}
      <div className="hidden md:block w-full md:w-1/2 ">
        {" "}
        <SignupLeftside
          text="Sign In"
          onClick={handleSigninClick}
          title=" Ready to find the perfect Short let"
          subtitle="We've got you covered."
        />{" "}
      </div>

      {/* RIGHT SIDE - FORM */}
      {showOtp ? (
        <div className="w-full md:w-1/2">
          {" "}
          <OtpComp
            email={otpEmail}
            password={otpPassword}
            isHost={false}
          />{" "}
        </div>
      ) : (
        <div className="w-full md:w-1/2">
          {" "}
          <SignupComp
            setShowOtp={setShowOtp}
            setOtpEmail={setOtpEmail}
            setOtpPassword={setOtpPassword}
            isHost={false}
          />{" "}
        </div>
      )}
    </div>
  );
}
// easy-stay/src/pages/signup.tsx
