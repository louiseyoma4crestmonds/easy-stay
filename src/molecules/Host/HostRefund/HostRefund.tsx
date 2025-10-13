import { useEffect, useState } from "react";
import styles from "./HostRefund.module.css";
import {
  HOST_MOCK_REFUNDS_PERCENT,
  HostRefundPercent,
} from "src/helpers/dataTypes";
import Modal from "@/molecules/Modal";
import CustomDropdown from "@/molecules/CustomDropdown";
import { DropdownOption } from "@/molecules/CustomDropdown/CustomDropdown.types";
import Button from "@/atoms/Button";

const refundOptions: DropdownOption[] = [
  { value: "No Refund", label: "No Refund" },
  { value: "Partial Refund", label: "Partial Refund" },
  { value: "Full Refund", label: "Full Refund" },
];

function HostRefund() {
  const [refunds, setRefunds] = useState<HostRefundPercent[]>([]);
  const [selectedRefund, setSelectedRefund] =
    useState<HostRefundPercent | null>(null);
  //   const [selectedType, setSelectedType] = useState<string>("");
  const [percentage, setPercentage] = useState<number | "">("");
  const [selectedOption, setSelectedOption] = useState<
    DropdownOption | undefined
  >(undefined);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    // Simulated API response
    setRefunds(HOST_MOCK_REFUNDS_PERCENT);
  }, []);

  const handleEditClick = (refund: HostRefundPercent) => {
    setSelectedRefund(refund);

    const option =
      refundOptions.find((o) => o.value === refund.refundType) || undefined;
    setSelectedOption(option);
    console.log("ss", selectedOption);
    setPercentage(refund.percentage || "");
  };

  const handleSave = async () => {
    if (!selectedRefund) return;

    // Mock API call
    await new Promise((res) => setTimeout(res, 800));

    setRefunds((prev) =>
      prev.map((r) =>
        r.hours === selectedRefund.hours
          ? {
              ...r,
              refundType: selectedOption?.value || "No Refund",
              percentage:
                selectedOption?.value === "No Refund" ? 0 : Number(percentage),
            }
          : r
      )
    );

    setSelectedRefund(null);
    setShowSuccessModal(true);
  };

  useEffect(() => {
    if (selectedOption) {
      console.log("Updated selectedOption:", selectedOption);
    }
  }, [selectedOption]);

  return (
    <div className={styles.maindiv}>
      <p className={styles.title}> Refund </p>

      <div className="px-6 py-5 ">
        <p className="text-gray-500 font-normal text-sm">
          Set the number of days/hours before check-in when a refund can be
          requested.
        </p>

        {/* Table Section */}
        <div className="flex flex-col w-full mt-5 flex-1">
          <div>
            <table className="w-full border-collapse">
              <thead className="sticky top-0 z-20">
                <tr className="border-b h-12 text-left text-gray-500 text-xs font-semibold bg-gray-50">
                  <th className="pl-3">HOURS BEFORE CLOCK IN</th>
                  <th>REFUND TYPE </th>
                  <th>REFUND(%)</th>
                  <th className="hidden md:table-cell">DATE</th>
                  <th className="hidden md:table-cell px-4 w-[6%]">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {refunds.map((refund, idx) => (
                  <tr key={idx} className="border-b font-sm font-normal">
                    <td className="px-2 py-2 underline md:no-underline">
                      <span className="hidden md:block text-gray-800">
                        {refund.hours}
                      </span>
                    </td>
                    <td className="py-2 text-gray-500">{refund.refundType}</td>
                    <td className="py-2 text-gray-500">{refund.percentage}%</td>
                    <td className="py-2 text-gray-500">{refund.date}</td>
                    <td className="hidden md:table-cell py-2 relative">
                      <div
                        className="flex items-center justify-center cursor-pointer"
                        onClick={() => handleEditClick(refund)}
                      >
                        <img
                          src="/images/pen-outline.png"
                          alt="edit"
                          className="w-5 h-5"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedRefund && (
        <Modal
          isOpen
          onClose={() => setSelectedRefund(null)}
          title={selectedRefund.hours}
          modalcontent={styles.modalContent3}
        >
          <div className="w-full mt-6 space-y-4">
            {/* Refund Type */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Refund Type
              </label>
              <CustomDropdown
                options={refundOptions}
                value={selectedOption}
                onChange={(opt) => {
                  setSelectedOption(opt);
                  if (opt.value === "No Refund") setPercentage(0);
                }}
                buttonClassName={styles.btndiv}
                dropdownClassName={styles.dropdowndiv}
                toggleIcon="/images/chevron-down-outline.png"
              />
            </div>

            {/* Refund Percentage */}
            {selectedOption?.value !== "No Refund" && (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Refund Percentage (%)
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-200 rounded-md px-3 py-2 outline-none"
                  value={percentage}
                  min={0}
                  max={100}
                  onChange={(e) => setPercentage(Number(e.target.value))}
                />
                <p className="text-gray-500 pt-0.5 text-sm font-normal ">
                  Deduct {percentage}% for late cancellations{" "}
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                className={styles.btn1}
                onClick={() => setSelectedRefund(null)}
              >
                Cancel
              </button>
              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {showSuccessModal && (
        <Modal
          isOpen
          onClose={() => setShowSuccessModal(false)}
          imageUrl="/images/success-icon.png"
          width={48}
          height={48}
          modalcontent={styles.modalContent2}
        >
          <div className="pt-3 text-gray-900 text-lg font-semibold text-center">
            {" "}
            Saved Successfully
          </div>
        </Modal>
      )}
    </div>
  );
}

export default HostRefund;
