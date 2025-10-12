import { useState } from "react";
import styles from "./HostSessionMgt.module.css";
import Modal from "@/molecules/Modal";

const sessions = [
  {
    id: 1,
    device: "Windows 10 PC",
    ip: "11.10.001P",
    location: "Lagos, Nigeria",
    lastActive: "10/10/2025 09:45AM",
  },
  {
    id: 2,
    device: "Macbook",
    ip: "11.10.001P",
    location: "Lagos, Nigeria",
    lastActive: "10/10/2025 09:45AM",
  },
  {
    id: 3,
    device: "Windows 11 PC",
    ip: "11.10.001P",
    location: "Lagos, Nigeria",
    lastActive: "10/10/2025 09:45AM",
  },
];

function HostSessionMgt() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const logDevice = () => {
    //API CALL
    setShowSuccessModal(true);
  };

  return (
    <div className={styles.maindiv}>
      <p className={styles.title}>Session Management ({sessions.length}) </p>

      <div className="px-7 py-5">
        {sessions.map((session, idx) => (
          <div
            key={session.id}
            className={`flex flex-row justify-between items-center py-4 ${
              idx !== sessions.length - 1 ? "border-b border-gray-200" : ""
            }`}
          >
            <div className="flex items-center gap-4 flex-1">
              <img
                src="/images/windows.png"
                alt="windows"
                className="w-14 h-14"
              />

              <div className="flex flex-col w-full">
                <p className="text-gray-800 font-medium text-base">
                  {session.device}
                </p>

                <div className="flex justify-between text-xs text-gray-500 w-[90%] ">
                  <span>
                    IP Address:{" "}
                    <span className="text-gray-800 font-medium">
                      {session.ip}
                    </span>
                  </span>
                  <span>
                    Location:{" "}
                    <span className="text-gray-800 font-medium">
                      {session.location}
                    </span>
                  </span>
                  <span>
                    Last Active:{" "}
                    <span className="text-gray-800 font-medium">
                      {session.lastActive}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <button className={styles.btndiv} onClick={logDevice}>
              Log out
            </button>
          </div>
        ))}
      </div>

      {showSuccessModal && (
        <Modal
          isOpen
          onClose={() => setShowSuccessModal(false)}
          imageUrl="/images/success-icon.png"
          width={48}
          height={48}
          modalcontent={styles.modalContent2}
        >
          <div className="pt-3  text-center">
            {" "}
            Device Logged Out Successfully
          </div>
        </Modal>
      )}
    </div>
  );
}

export default HostSessionMgt;
