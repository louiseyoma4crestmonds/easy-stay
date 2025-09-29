import { useRouter } from "next/router";
import SignupLeftside from "@/molecules/SignupLeftside";
import HostRecoverPwd from "@/molecules/Host/HostRecoverPwd";

export default function RecoverPassword() {
  const router = useRouter();
  const handleSignupClick = () => {
    console.log("Redirect to signup");
    router.push("/host/signup");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT SIDE - IMAGE + MODAL */}
      <div className="hidden md:block w-full md:w-1/2 ">
        <SignupLeftside
          text="Create an Account"
          onClick={handleSignupClick}
          title=" Simplify Your Apartment Management Today!"
          subtitle="Join our platform and effortlessly manage your apartments. From tenant communication to rent collection, we've got you covered."
        />
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="w-full md:w-1/2">
        <HostRecoverPwd />
      </div>
    </div>
  );
}
