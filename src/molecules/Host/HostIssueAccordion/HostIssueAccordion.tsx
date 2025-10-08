import { useState } from "react";
import Image from "next/image";
import { HostIssues } from "src/helpers/dataTypes";
import styles from "./HostIssueAccordion.module.css";
import Modal from "@/molecules/Modal";
import HostResolveModal from "../HostResolvemodal";
import Button from "@/atoms/Button";

type HostIssueAccordionProps = {
  issue: HostIssues;
  index: number;
};

function HostIssueAccordion({ issue, index }: HostIssueAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState<any>(null);
  const [resolvedApts, setResolvedApts] = useState<number[]>([]);

  const toggleAccordion = () => setIsOpen((prev) => !prev);

  const handleResolve = (apt: any) => {
    setSelectedApartment(apt);
    setShowUploadModal(true);
  };

  const handleSaveUpload = () => {
    setShowUploadModal(false);
    setShowConfirmModal(true);
  };

  const handleConfirmSave = async () => {
    setShowConfirmModal(false);

    // Simulate backend save delay
    // later make actual API CALLS
    await new Promise((res) => setTimeout(res, 1200));

    // Mark apartment as resolved
    if (selectedApartment) {
      setResolvedApts((prev) => [...prev, selectedApartment.id]);
    }

    setShowSuccessModal(true);
  };

  const statusStyles: Record<string, string> = {
    approved: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800",
  };

  const isResolved = (id: number) => resolvedApts.includes(id);

  return (
    <div className={styles.maindiv}>
      {/* --- HEADER --- */}
      <div
        onClick={toggleAccordion}
        className="flex justify-between items-center cursor-pointer px-4"
      >
        {/* Left side - Property image + label */}
        <div className="flex items-center gap-3">
          <Image
            src="/images/prop-icon.png"
            alt={`Property ${index + 1}`}
            width={32}
            height={32}
            className="rounded-md"
          />
          <div className="flex flex-col ">
            <div className="flex items-center gap-2 ">
              <p className="font-medium font-base text-gray-800">{`Property ${index + 1}`}</p>
              <p className="bg-primary-100 py-0.5 px-2.5 rounded-md text-xs text-[#1E40AF] ">
                {issue.property.number_of_aprts} Apartment
                {issue.property.number_of_aprts > 1 ? "s" : ""}
              </p>
            </div>
            <p className="text-sm text-gray-500">{issue.property.address}</p>
          </div>
        </div>

        {/* Right - status */}
        <div className="flex items-center gap-2">
          <p className="text-gray-500 text-sm ">Property Document:</p>
          <span
            className={`text-xs font-normal px-2.5 py-0.5 rounded-md capitalize ${statusStyles[issue.property.status]}`}
          >
            {issue.property.status}
          </span>
          <img
            src="/images/chevron-down-outline.png"
            alt="toggle"
            className={`w-5 h-5 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* --- BODY --- */}
      {isOpen && (
        <div className="mt-4 border-t border-gray-200 pt-5 px-4 space-y-3">
          {/* --- IF PROPERTY IS REJECTED --- */}
          {issue.property.status === "rejected" ? (
            <div className=" flex flex-col">
              <p className="text-gray-900 font-medium text-base">
                As a property Owner
              </p>
              <p className="text-gray-600 font-normal text-sm">
                Upload a document that proves you ownership (e.g., Certificate
                of Occupancy (C of O), Deed of Assignment, Mortgage Deed).
              </p>
              <div className="flex justify-between items-center border mt-4 border-red-600 rounded-lg p-4">
                <div className="flex flex-row gap-3 ">
                  <img
                    src="/images/file_upload_icon.png"
                    alt="file"
                    className="w-7 h-7 "
                  />
                  <div className="flex flex-col">
                    <p className="text-gray-700 font-medium text-sm ">
                      Exclusive or non-exclusive agreement
                    </p>
                    <p className="text-gray-500 font-normal text-sm ">1 MB</p>
                    <p className="text-red-600 fonr-normal text-sm ">
                      Document Not Valid
                    </p>
                  </div>
                </div>

                <button className={styles.btn2}>
                  {" "}
                  <img
                    src="/images/upload.png"
                    alt="upload"
                    className="w-4 h-4 "
                  />
                  Re-upload
                </button>
              </div>
            </div>
          ) : (
            /* --- SHOW APARTMENTS ONLY IF PROPERTY IS NOT REJECTED --- */
            <>
              {issue.property.apartments?.length ? (
                issue.property.apartments.map((apt, i) => {
                  const resolved = isResolved(apt.id);

                  return (
                    <div
                      key={apt.id}
                      className="flex flex-col items-start border border-gray-200 rounded-lg p-3"
                    >
                      {/* Left side: apartment image + label */}
                      <div className="flex items-center gap-3">
                        <Image
                          src="/images/apt_icon.png"
                          alt={`Apartment ${i + 1}`}
                          width={28}
                          height={28}
                          className="rounded-md"
                        />
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 ">
                            <p className="font-medium text-gray-700">{`Apartment ${i + 1}`}</p>
                            <span
                              className={`text-xs font-normal px-2.5 py-0.5 rounded-md capitalize ${statusStyles[apt.status]}`}
                            >
                              {apt.status}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">
                            {apt.apartmentType}
                          </p>
                        </div>
                      </div>

                      {/* If rejected, show reason */}
                      {apt.status === "rejected" && (
                        <div
                          className={`rounded-lg p-5 flex flex-col mt-3 w-full ${
                            resolved ? "bg-gray-50" : "bg-red-100"
                          }`}
                        >
                          {!resolved && (
                            <>
                              {" "}
                              <p className="text-red-700 font-semibold text-sm ">
                                Reason for Rejection
                              </p>
                              <p className="text-sm text-gray-600 ">
                                Apartment not up to standard and needs fixing.
                              </p>{" "}
                            </>
                          )}

                          {!resolved ? (
                            <div className="flex justify-start mt-2">
                              <button
                                className={styles.btn1}
                                onClick={() => handleResolve(apt)}
                              >
                                Resolve
                              </button>
                            </div>
                          ) : (
                            <div className="flex justify-between items-center ">
                              {/* Left - File Uploaded */}

                              <p className="text-gray-700 text-sm font-medium">
                                File Submitted
                              </p>

                              {/* Right - Pending badge */}
                              <span className="bg-gray-200 text-gray-900 text-xs font-normal px-2.5 py-0.5 rounded-md">
                                Pending
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500">No apartments listed.</p>
              )}
            </>
          )}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && selectedApartment && (
        <HostResolveModal
          isOpen
          onClose={() => setShowUploadModal(false)}
          title={`Apartment ${
            (issue.property.apartments?.findIndex(
              (apt) => apt.id === selectedApartment.id
            ) ?? 0) + 1
          }`}
          address={issue.property.address}
          type={selectedApartment.apartmentType}
          handleSaveUpload={handleSaveUpload}
        />
      )}

      {/* Confirm Submission Modal */}
      {showConfirmModal && (
        <Modal
          isOpen
          onClose={() => setShowConfirmModal(false)}
          imageUrl="/images/delete-icon.png"
          width={48}
          height={48}
          modalcontent={styles.modalContent3}
        >
          <div className="flex flex-col items-center text-center ">
            <p className="text-gray-900 font-semibold text-lg pt-5 ">
              Submit Document
            </p>
            <p className="text-gray-500 text-sm font-normal px-10 mt-2 ">
              Are you sure you want to submit this document? This action cannot
              be undone.
            </p>
            <div className="flex justify-center gap-3 mt-5 ">
              <button
                className={styles.btn1}
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <Button variant="primary" onClick={handleConfirmSave}>
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
          <div className="pt-3 "> Saved Successfully</div>
        </Modal>
      )}
    </div>
  );
}

export default HostIssueAccordion;
