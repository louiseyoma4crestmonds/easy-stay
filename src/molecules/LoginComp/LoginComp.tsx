import { useState } from "react";
import { useRouter } from "next/router";
import Button from "@/atoms/Button";
import styles from "./LoginComp.module.css";

function LoginComp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState("");

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setErrors("Please enter both email and password.");
      return;
    }

    setErrors(""); // Clear previous errors

    try {
      // 🔒 Future: Replace this block with your real API call
      setErrors("");
      // ✅ Redirect after successful login
      const redirectPath = (router.query.redirect as string) || "/";
      router.push(redirectPath);
    } catch (err: any) {
      // 🧯 Handle error and show it to user
      setErrors(err.message || "An unexpected error occurred. Try again.");
    }
  };

  const handleForgotPasswordClick = () => {
    console.log("Redirect to forgot password");
    router.push("/recover-password");
  };

  const handleSignupClick = () => {
    console.log("Redirect to signup");
    router.push("/signup");
  };

  return (
    <div className={styles.maindiv}>
      {/* Logo at top center */}
      <div className="mt-24">
        <img
          src="/images/text.png"
          alt="Easy Stay Logo"
          className="h-12  w-auto mx-auto"
        />
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
                if (errors) setErrors("");
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
                if (errors) setErrors("");
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
        {errors && <p className="text-red-600 text-sm mb-4">{errors}</p>}
        <div className={styles.formButtonDiv}>
          <Button variant="primary" width="full">
            Log in
          </Button>
          <Button
            variant="accentWithImg"
            width="full"
            image="/images/Google.png"
            imageWidth={24}
            height={24}
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
