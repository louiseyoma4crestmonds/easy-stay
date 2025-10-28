import { useEffect, useState } from "react";
import Image from "next/image";
import { verifyFlutterwavePropertyVerificationPayment } from "./api/property";
import Modal from "@/molecules/Modal";
import Router from "next/router";

function ApartmentRegistrationStatus() {
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const txid = urlParams.get("transaction_id");
    const tx_ref = urlParams.get("tx_ref");
    const propertiesToRegister = JSON.parse(
      localStorage.getItem("propertiesToRegister") ?? ""
    );

    verifyFlutterwavePropertyVerificationPayment({
      txid,
      tx_ref,
      propertiesToRegister,
    }).then((response: any) => {
      if (response.data.status === "success") {
        // payment successful
        setPaymentSuccessful(true);
      }
    });
  }, []);
  return (
    <div>
      {paymentSuccessful && (
        <Modal
          isOpen
          onClose={() => {
            Router.push({ pathname: "/" });
          }}
          imageUrl=""
          width={48}
          height={48}
          modalcontent={""}
        >
          <div className="w-full px-4 text-center pt-3 ">
            <div>
              <Image
                width={40}
                height={40}
                alt="success"
                src="/images/success-icon.png"
              />
            </div>
            <div className="p-8 font-bold">Payment Successful</div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ApartmentRegistrationStatus;
