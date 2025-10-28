import { useEffect, useState } from "react";
import Step1Property from "../Step1Property";
import { Property } from "../Step1Property/Step1Property";
import Step2Identity from "../Step2Identity";
import Step3PropVerification from "../Step3PropVerification";
import PaymentSuccess from "../PaymentSuccess";
import Terms from "@/atoms/Host/Terms";
import styles from "./OnboardingComp.module.css";
import Quality from "@/atoms/Host/Quality";
import Cookies from "@/atoms/Host/Cookies";
import { registerProperty } from "src/pages/api/property";
import Modal from "@/molecules/Modal";
import PaymentMethods from "@/organisms/PaymentMethods";
import { json } from "stream/consumers";
import { generateRandomString } from "src/services/utilities/generateRandomString";

type componentProp = {
  token: string;
};

function OnboardingComp(props: componentProp) {
  const { token } = props;
  const [step, setStep] = useState(1);
  const [batch, setBatch] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [saveProperty, setSaveProperty] = useState(false);
  const [properties, setProperties] = useState<Property[]>([
    {
      id: 1,
      location: undefined,
      address: "",
      deed: null,
      webLink: "",
      open: true,
      neighbourhood: undefined,
      apartments: [{ id: 1, type: undefined, images: [], open: true }],
    },
  ]);
  const [identityFile, setIdentityFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState<
    "none" | "terms" | "quality" | "privacy"
  >("none");

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const [showChoosePaymentMethod, setShowChoosePaymentMethod] =
    useState<boolean>(false);

  const backToStep1 = () => {
    setStep(1);
  };

  useEffect(() => {
    setBatch(generateRandomString(64));
  }, []);

  useEffect(() => {
    if (saveProperty) {
      localStorage.setItem("propertiesToRegister", JSON.stringify(properties));
      registerProperty(properties, batch, token).then((response: any) => {
        if (response.status === 201) {
          setShowChoosePaymentMethod(true);
        }
      });
    }
  }, [saveProperty]);

  return (
    <div
      className={` ${showSuccess ? "md:max-w-3xl" : "md:max-w-5xl"}  mx-auto p-6 space-y-8`}
    >
      {/* ----- Stepper Header ----- */}
      {!showSuccess && (
        <div className="flex items-center justify-center md:mt-6 gap-x-4 ">
          {[
            "Property Details",
            "Identity Verification",
            "Property Verification",
          ].map((label, i) => {
            const index = i + 1;
            const active = step === index;
            // const completed = step > index;
            const circleColor = active
              ? "border-blue-600 text-primary-600 "
              : "border-gray-500 text-gray-500";
            const textColor = active ? "text-primary-600" : "text-gray-500";
            return (
              <div key={label} className="flex items-center space-x-2">
                <div
                  className={`w-5 h-5 flex items-center text-xs justify-center border rounded-full ${circleColor}`}
                >
                  {index}
                </div>
                <span className={`font-medium text-base  ${textColor}`}>
                  {label}
                </span>
                {index < 3 && (
                  <img
                    src="/images/chevron-double-right.png"
                    alt="img"
                    className="w-4 h-4 mx-2"
                  />
                  // <div className="w-10 border-t border-gray-300 mx-2"></div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div>
        {step === 1 && (
          <Step1Property
            properties={properties}
            setProperties={setProperties}
            onProceed={next}
          />
        )}
        {step === 2 && (
          <Step2Identity
            file={identityFile}
            setFile={setIdentityFile}
            onBack={back}
            onProceed={next}
          />
        )}

        {step === 3 && !showSuccess && (
          <Step3PropVerification
            properties={properties}
            onProceed={next}
            onBack={back}
            backToStep1={backToStep1}
            setSaveProperty={setSaveProperty}
            setShowModal={setShowModal}
          />
        )}

        {step === 3 && showSuccess && <PaymentSuccess />}
      </div>

      {showModal === "terms" && <Terms setShowModal={setShowModal} />}
      {showModal === "quality" && <Quality setShowModal={setShowModal} />}
      {showModal === "privacy" && <Cookies setShowModal={setShowModal} />}

      {/* PAYMENT MODAL */}
      {showChoosePaymentMethod && (
        <Modal
          isOpen
          onClose={() => setShowChoosePaymentMethod(false)}
          imageUrl=""
          title="Payment Method"
          width={48}
          height={48}
          modalcontent={""}
        >
          <div className="pt-3 ">
            <PaymentMethods
              checkinDate={""}
              checkoutDate={""}
              operation="verification"
              apartment={batch}
              amount={(7.5 / 100) * 50000 + properties?.length * 50000}
            />
          </div>
        </Modal>
      )}
      {/* END PAYMENT MODAL */}
    </div>
  );
}

export default OnboardingComp;
