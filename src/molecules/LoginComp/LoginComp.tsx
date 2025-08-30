import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Button from "@/atoms/Button";
import logoText from "public/images/Text.png";
import styles from "./LoginComp.module.css";

function LoginComp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const signinUser = async () => {
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    })
      .then((res) => {
        if (res?.status === 200) {
          console.log("login response", res);
          router.push({ pathname: "/" });
        } else if (res?.status === 401) {
          setError("Wrong Login credentials");
        } else {
          setError("Network error");
        }
      })
      .catch((err) => {
        setError("Something went wrong");
      });
  };

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setError(""); // Clear previous errors

    try {
      signinUser();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Try again.");
    }
  };

  const handleForgotPasswordClick = () => {
    console.log("Redirect to forgot password");
    router.push("/guest/recover-password");
  };

  const handleSignupClick = () => {
    console.log("Redirect to signup");
    router.push("/guest/signup");
  };

  return (
    <div className={styles.maindiv}>
      {/* Logo at top center */}
      <div className=" flex  mt-24 justify-center  ">
        {" "}
        <Image
          src={logoText}
          alt="Easy Stay Logo"
          width={167}
          height={70}
        />{" "}
      </div>

      <form className={styles.formDiv} onSubmit={handleLogin}>
        <p className={styles.loginP1}>Continue like you never left</p>
        <p className={styles.loginP2}>
          Welcome back! Please enter your details.
        </p>

        <div className="mb-4">
          <label className={styles.formLabel}>Email Address</label>
          <div className="relative">
            <img
              src="/images/envelope-outline.png"
              alt="envelope"
              style={{ width: 20, height: 20 }}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              name="no-autofill-email"
              value={email}
              autoComplete="new-email"
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              placeholder="Input email"
              className="w-full pl-10 p-3 border bg-gray-50 rounded-lg focus:outline-none "
            />
          </div>
        </div>
        <div className="mb-4">
          <label className={styles.formLabel}> Password</label>
          <div className="relative">
            <img
              src="/images/lock-outline.png"
              alt="lock"
              style={{ width: 20, height: 20 }}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 "
            />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              name="no-autofill-password"
              autoComplete="new-password"
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
              placeholder=" Password"
              className="w-full pl-10 p-3 border bg-gray-50 rounded-lg focus:outline-none"
            />

            {showPassword ? (
              <>
                <img
                  onClick={() => setShowPassword(false)}
                  src="/images/eye-outline.png"
                  alt="show-password"
                  style={{ width: 12, height: 12 }}
                  className={styles.eyeIcon}
                />{" "}
              </>
            ) : (
              <>
                <img
                  onClick={() => setShowPassword(true)}
                  src="/images/eye-slash-outline.png"
                  alt="show-password"
                  style={{ width: 12, height: 12 }}
                  className={styles.eyeIcon}
                />{" "}
              </>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <label className={styles.checkboxLabel}>
            <input type="checkbox" className={styles.checkbox} />
            Remember me
          </label>
          <p
            className="text-sm font-medium text-primary-600 cursor-pointer"
            onClick={handleForgotPasswordClick}
          >
            Forgot Password
          </p>
        </div>
        {/* Error message */}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <div className={styles.formButtonDiv}>
          <Button type="submit" variant="primary" width="full">
            Log in
          </Button>

          <Button
            variant="accentWithImg"
            type="button"
            width="full"
            image="/images/Google.png"
            imageWidth={24}
            height={24}
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            Sign in with Google
          </Button>
        </div>
      </form>

      <div className=" md:hidden text-center mt-auto mb-4 md:mb-0">
        <p className="font-sm font-normal text-gray-500 ">
          {" "}
          Don't have an account?{" "}
          <span
            className="text-primary-600 cursor-pointer"
            onClick={handleSignupClick}
          >
            Sign up
          </span>{" "}
        </p>
      </div>
    </div>
  );
}

export default LoginComp;
