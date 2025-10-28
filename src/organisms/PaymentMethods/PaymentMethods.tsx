import { useRouter } from "next/router";
import Image from "next/image";
import flutterwave from "public/icons/flutterwave.png";
import quickteller from "public/icons/quickteller.png";
import { PaymentMethodsProps } from "./PaymentMethods.types";
import { useEffect, useState } from "react";
import { initiateFlutterwavePayment } from "src/pages/api/property";
import { getSessionDetails } from "src/pages/api/user";

function HeroBanner(props: PaymentMethodsProps) {
  const {
    amount,
    checkinDate,
    checkoutDate,
    apartment,
    operation = "booking",
  } = props;
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [activePaymentMethod, setActivePaymentMethod] =
    useState<string>("flutterwave");
  const router = useRouter();

  const handleChoosenPayment = () => {
    if (activePaymentMethod === "flutterwave") {
      initiateFlutterwavePayment(
        {
          email,
          phone,
          amount,
          name,
          checkinDate,
          checkoutDate,
          apartment,
          operation: operation,
        },
        token
      ).then((response: any) => {
        if (response.data.status === "success") {
          window.location.href = response.data.data.link; // Redirect to Flutterwave payment page
        } else {
          alert("Payment initiation failed");
        }
        console.log("payment initialization: ", response);
      });
    }
  };

  useEffect(() => {
    if (token === "") {
      getSessionDetails().then((response: any) => {
        setToken(response?.user.user.token.token.userData.data[0].token);
        setEmail(response?.user.user.token.token.userData.data[0].user.email);
        setPhone(response?.user.user.token.token.userData.data[0].user.phone);
        setName(
          response?.user.user.token.token.userData.data[0].user.first_name
        );
      });
    }
  }, [token]);

  return (
    <div className="w-full p-4">
      <div className="space-y-4">
        <div>Please select payment method below</div>
        <div className="space-y-4">
          <div
            role="button"
            tabIndex={0}
            onKeyDown={() => setActivePaymentMethod("flutterwave")}
            onClick={() => setActivePaymentMethod("flutterwave")}
            className="w-full p-4 rounded-lg border flex justify-between gap-x-12 "
          >
            <div className="flex gap-x-2">
              <div className="self-center">
                <Image src={flutterwave} />
              </div>
              <div className="self-center">Pay with fluterwave</div>
            </div>
            <div className="self-center">
              <div
                className={`w-4 h-4 rounded-full border border-2 ${activePaymentMethod === "flutterwave" ? "border-blue-500" : ""} `}
              />
            </div>
          </div>
          <div
            role="button"
            tabIndex={0}
            onKeyDown={() => setActivePaymentMethod("quickteller")}
            onClick={() => setActivePaymentMethod("quickteller")}
            className="w-full p-4 rounded-lg border flex justify-between gap-x-12 "
          >
            <div className="flex gap-x-2">
              <div className="self-center">
                <Image src={quickteller} />
              </div>
              <div className="self-center">Pay with Quickteller</div>
            </div>
            <div className="self-center">
              <div
                className={`w-4 h-4 rounded-full border border-2 ${activePaymentMethod === "quickteller" ? "border-blue-500" : ""}`}
              />
            </div>
          </div>
          <div
            role="button"
            tabIndex={0}
            onKeyDown={handleChoosenPayment}
            onClick={handleChoosenPayment}
            className="w-full flex flex-row-reverse"
          >
            <div className="w-2/4 p-3 rounded-lg text-center bg-blue-500 text-white">
              Proceed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
