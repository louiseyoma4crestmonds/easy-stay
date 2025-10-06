import Button from "@/atoms/Button";
import Image from "next/image";
import { useRouter } from "next/router";

function PaymentSuccess() {
  const router = useRouter();

  const goToHostDashboard = () => {
    router.push("/host/dashboard");
  };

  return (
    <div>
      <div className="bg-white rounded-lg px-10 py-14 my-8 ">
        <div className="flex flex-col justify-center items-center ">
          <Image src="/images/success-icon.png" width={128} height={128} />
          <p className="text-gray-900 font-semibold text-2xl py-4 ">
            Payment Successful!
          </p>
          <p className="text-gray-500 font-normal text-base text-center pb-5 w-[60%] ">
            Your verification payment has been processed successfully
          </p>
        </div>

        <div className="border border-gray-200 bg-gray-50 rounded-lg p-8 space-y-4 flex flex-col ">
          <p className="text-gray-900 font-medium text-xl border-b border-gray-200 pb-6 ">
            Payment Receipt
          </p>
          <div className="flex flex-row items-center justify-between ">
            <p className="text-gray-500 font-normal text-base ">
              Transaction ID:
            </p>
            <p className="text-gray-900 font-medium text-base ">VER-12345</p>
          </div>
          <div className="flex flex-row items-center justify-between ">
            <p className="text-gray-500 font-normal text-base ">Amount Paid:</p>
            <p className="text-gray-900 font-medium text-base ">161250</p>
          </div>
          <div className="flex flex-row items-center justify-between ">
            <p className="text-gray-500 font-normal text-base ">Properties:</p>
            <p className="text-gray-900 font-medium text-base ">3</p>
          </div>
          <div className="flex flex-row items-center justify-between ">
            <p className="text-gray-500 font-normal text-base ">Date:</p>
            <p className="text-gray-900 font-medium text-base ">04/05/2025</p>
          </div>
        </div>

        <div className="flex items-center justify-between py-5">
          <button className="bg-transparent border border-gray-200 rounded-lg py-3.5 px-6 text-gray-900 font-medium text-base ">
            Download Receipt
          </button>
          <Button variant="primary" onClick={goToHostDashboard}>
            Go To Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
