import Button from "@/atoms/Button";
import styles from "./Step3PropVerification.module.css";
import { Property } from "../Step1Property/Step1Property";
import Properties from "src/pages/guest/properties";
import { useState } from "react";
import Terms from "@/atoms/Host/Terms";

type Step3PropVerificationProps = {
  onProceed: () => void;
  onBack: () => void;
  properties: Property[];
  backToStep1: () => void;
  setSaveProperty: (arg: boolean) => void;
  setShowModal: React.Dispatch<
    React.SetStateAction<"none" | "terms" | "quality" | "privacy">
  >;
};

function Step3PropVerification(props: Step3PropVerificationProps) {
  const {
    onProceed,
    onBack,
    setSaveProperty,
    properties,
    backToStep1,
    setShowModal,
  } = props;

  const [agreed, setAgreed] = useState(false);

  const payFees = () => {
    //CONSUME API

    setSaveProperty(true);
  };

  return (
    <div>
      <div className="flex flex-col ">
        <p className="text-xl font-semibold text-gray-900 ">
          Property Verification
        </p>

        <p className="text-gray-500 font-normal text-base md:w-[70%]  ">
          To ensure guest safety and quality, we'll physically verify your
          property and apartments. This helps us ensure everything meets our
          standards.
        </p>
        <ul className="list-disc text-gray-500 font-normal text-base ml-6 mt-3 md:w-[70%]  ">
          <li>
            {" "}
            A non-refundable, one-time fee is required for this verification.
          </li>
          <li>
            Please understand that this physical check doesn't automatically
            guarantee approval; your apartment must meet our established{" "}
            <span
              className="text-primary-600 underline cursor-pointer "
              onClick={() => {
                setShowModal("quality");
              }}
            >
              {" "}
              quality standards.
            </span>
          </li>
        </ul>
      </div>

      {/*HEADER*/}
      <div className="bg-white rounded-lg my-6 p-6 ">
        <div className="flex flex-row justify-between items-center w-full  ">
          <div className="flex flex-row items-start border-r gap-3 w-[33%]  ">
            <div className="rounded-full w-12 h-12 bg-green-100 flex items-center justify-center ">
              <img
                src="/images/green-home-outline.png"
                alt="img"
                className="w-6 h-6 "
              />
            </div>

            <div className="flex flex-col ">
              <p className="text-gray-500 font-normal text-sm ">
                Properties Registered
              </p>
              <p className="font-semibold text-xl text-gray-800 ">3</p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-3 border-r w-[33%] ">
            <div className="rounded-full w-12 h-12 bg-blue-100 flex items-center justify-center ">
              <img
                src="/images/archive-outline.png"
                alt="img"
                className="w-6 h-6 "
              />
            </div>

            <div className="flex flex-col ">
              <p className="text-gray-500 font-normal text-sm ">
                Total Apartments
              </p>
              <p className="font-semibold text-xl text-gray-800 ">12 </p>
            </div>
          </div>

          <div className="flex flex-row items-center  gap-3 ">
            <div className="rounded-full w-12 h-12 bg-primary-100 flex items-center justify-center ">
              <img
                src="/images/credit-card-outline.png"
                alt="img"
                className="w-6 h-6 "
              />
            </div>

            <div className="flex flex-col ">
              <p className="text-gray-500 font-normal text-sm ">
                Verification Fee Per Property
              </p>
              <div className="flex items-center gap-3 ">
                {" "}
                <p className="font-semibold text-xl text-gray-800 ">50000 </p>
                <p className="bg-pink-100 rounded-md px-2.5 py-0.5 text-pink-800 text-xs font-normal ">
                  Non-refundable
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*BODY*/}
      <div className="bg-white rounded-lg my-6 p-6 ">
        <div className="flex md:flex-row justify-between items-center  ">
          <p className="text-gray-900 font-semibold text-xl ">
            Property Details
          </p>
          <button className={styles.btn3} onClick={backToStep1}>
            Edit
          </button>
        </div>

        <div className="md:mt-6 space-y-4 ">
          {properties.map((property, index) => (
            <div
              key={property.id}
              className="border rounded-lg border-gray-200 p-5 "
            >
              <div className="flex md:flex-row items-center justify-between ">
                <div className="flex items-center gap-3 ">
                  <img
                    src="/images/prop-icon.png"
                    alt="img"
                    className="w-8 h-8 "
                  />
                  <div className="flex flex-col ">
                    <div className="flex items-center gap-2 ">
                      <p className="text-gray-700 text-sm font-medium ">
                        {" "}
                        Property {property.id}{" "}
                      </p>
                      <p className="bg-primary-100 py-0.5 px-2.5 rounded-md text-xs text-[#1E40AF] ">
                        {property.apartments.length}{" "}
                        {property.apartments.length > 1
                          ? "Apartments"
                          : "Apartment"}
                      </p>
                    </div>
                    <p className="text-gray-500 text-sm font-normal ">
                      {property.address}{" "}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col ">
                  <p className="text-gray-800 font-semibold text-xl ">50000</p>
                  <p className="text-gray-500 text-sm font-normal   ">
                    Verification Fee
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*PAYMENT SUMMARY*/}
      <div className="bg-white rounded-lg my-6 p-6 flex flex-col ">
        <p className="text-gray-900 font-semibold text-xl ">Payment Summary</p>
        <div className="flex md:flex-row items-center border-b justify-between py-4 ">
          <p className="text-gray-600 text-base font-medium ">
            Subtotal (3 properties)
          </p>
          <p className="text-gray-800 font-semibold text-xl ">150000</p>
        </div>
        <div className="flex md:flex-row items-center border-b justify-between py-4 ">
          <p className="text-gray-600 text-base font-medium ">VAT(7.5%) </p>
          <p className="text-gray-800 font-semibold text-xl ">11250</p>
        </div>
        <div className="flex md:flex-row items-center justify-between py-4 ">
          <p className="text-gray-600 text-base font-medium ">Total Amount </p>
          <p className="text-gray-800 font-semibold text-xl ">161250</p>
        </div>
      </div>

      {/* AGREEMENT CHECKBOX */}
      <div className="flex items-center gap-2 mb-4">
        <input
          id="termsAgreement"
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className=" h-4 w-4 rounded border-gray-300 cursor-pointer text-primary-600"
        />
        <label htmlFor="termsAgreement" className="text-sm text-gray-600">
          I have read and agreed to EasyStay's{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => {
              setShowModal("terms");
            }}
          >
            Terms &amp; Conditions
          </span>{" "}
          and{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => {
              setShowModal("privacy");
            }}
          >
            Cookies &amp; Privacy Policy
          </span>
          .
        </label>
      </div>

      {/*BUTTONS*/}
      <div className={styles.btndiv}>
        <button className={styles.btnBack} onClick={onBack}>
          Back
        </button>
        <Button variant="primary" disabled={!agreed} onClick={payFees}>
          Pay 161120
        </Button>
      </div>
    </div>
  );
}

export default Step3PropVerification;
