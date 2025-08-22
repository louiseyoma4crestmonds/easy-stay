import { useState } from "react";
import CustomDropdown from "../CustomDropdown";
import { DropdownOption } from "../CustomDropdown/CustomDropdown.types";
import styles from "./SupportTab.module.css";
import Button from "@/atoms/Button";
import Modal from "../Modal";

const issueOptions: DropdownOption[] = [
  { value: "apartment", label: "Apartments" },
  { value: "bookings", label: "Bookings" },
  { value: "payments", label: "Payments & Commissions" },
  { value: "others", label: "Others" },
];

function SupportTab() {
  const [selectedIssue, setSelectedIssue] = useState<
    DropdownOption | undefined
  >();
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async () => {
    setErrorMsg(null); // clear old errors

    if (!selectedIssue) {
      setErrorMsg("Please select a type of issue.");
      return;
    }

    if (!description.trim()) {
      setErrorMsg("Please enter a description.");
      return;
    }
    setShowSuccessModal(true);
    // try {
    // //   setLoading(true);
    //   const res = await axios.post("/api/tickets", {
    //     issueType: selectedIssue.value,
    //     description,
    //   });

    //   if (res.status === 200) {
    //     setErrorMsg("✅ Ticket submitted successfully!");
    //     setSelectedIssue(undefined);
    //     setDescription("");
    //   } else {
    //     setErrorMsg("Something went wrong. Please try again.");
    //   }
    // } catch (error: any) {
    //   if (axios.isAxiosError(error)) {
    //     setErrorMsg(error.response?.data?.message || "Server error, please try again.");
    //   } else {
    //     setErrorMsg("Unexpected error occurred.");
    //   }
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="w-[70%] ">
      <div className={styles.maindiv1}>
        <div className="flex flex-row gap-4 items-center w-[45%] border-r ">
          <img src="/images/otp-icon.png" width={48} height={48} />
          <div className="flex flex-col  ">
            <p className="text-gray-500 font-normal text-sm ">
              Send us an email
            </p>
            <p className={styles.text}>info@easystay.com</p>
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center w-[55%] pl-5 ">
          <img src="/images/telephone-icon.png" width={48} height={48} />
          <div className="flex flex-col  ">
            <p className="text-gray-500 font-normal text-sm ">Call us on</p>
            <div className="flex gap-6 ">
              <p className="text-gray-800 text-base font-semibold border-r pr-3 ">
                +234 703 126 7197
              </p>{" "}
              <p className={styles.text}>+234 703 126 7197</p>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.maindiv2}>
        <p className={styles.title}> Raise a ticket</p>
        <div className="flex flex-col border-b ">
          <div className={styles.div1}>
            <p className={styles.P1}>Type of Issue</p>
            <CustomDropdown
              options={issueOptions}
              value={selectedIssue}
              onChange={(val) => {
                setSelectedIssue(val);
                if (errorMsg) setErrorMsg("");
              }}
              buttonClassName={styles.btndiv}
              dropdownClassName={styles.dropdowndiv}
              placeholder="Select issue"
              toggleIcon="/images/chevron-down-outline.png"
            />
          </div>

          <div className={styles.div1}>
            <p className={styles.P1}>Description</p>
            <textarea
              rows={6}
              cols={50}
              className={styles.textarea}
              placeholder="Input a short description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errorMsg) setErrorMsg("");
              }}
            />
          </div>
        </div>
        {errorMsg && (
          <p className="px-8 py-2 text-sm text-red-800 ">{errorMsg}</p>
        )}
        <div className="flex px-8 justify-end py-5 ">
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>

      {showSuccessModal && (
        <Modal
          isOpen
          onClose={() => setShowSuccessModal(false)}
          imageUrl="/images/success-icon.png"
          width={48}
          height={48}
          modalcontent={styles.modalContent4}
        >
          <p className="text-lg font-semibold text-gray-900 my-4 ">
            Ticket Raised Successfully{" "}
          </p>
          <p className="text-gray-500 text-sm font-normal text-center ">
            {" "}
            Your ticket has been successfully logged. You will receive a
            follow-up email from our support team.
          </p>
        </Modal>
      )}
    </div>
  );
}

export default SupportTab;
