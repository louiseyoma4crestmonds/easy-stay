import Image from "next/image";
import Button from "@/atoms/Button";
import { useRouter } from "next/router";
import Modal from "@/molecules/Modal";
import { useState } from "react";
import styles from "./AccountReview.module.css";

function AccountReview() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const goToLandingpage = () => {
    router.push("/");
  };

  return (
    <div className="h-full">
      <div className="bg-white rounded-lg md:max-w-3xl flex mx-auto flex-col px-10 md:py-14 my-8 ">
        <div className="flex flex-col justify-center items-center ">
          <Image src="/images/exclamation.png" width={128} height={128} />
          <p className="text-gray-900 font-semibold text-sm md:text-2xl pt-3 ">
            Account Review in Progress
          </p>
        </div>

        <div className=" p-8 space-y-4 flex flex-col justify-center items-center font-base text-center  text-gray-500 ">
          <p className=" md:w-[60%] ">
            Your account is now <span className="font-bold">under review.</span>{" "}
            Verification typically takes{" "}
            <span className="font-bold"> 7 to 14 working days. </span>
          </p>
          <p className=" md:w-[60%] ">
            {" "}
            Your properties have been{" "}
            <span className="font-bold">queued for verification, </span> and
            we'll notify you via email regarding their approval or rejection.
            You'll gain <span className="font-bold">full dashboard access</span>{" "}
            once the verification process is complete.{" "}
          </p>
        </div>

        <div className="flex items-center gap-6 justify-center">
          <button
            className={styles.btn1}
            onClick={() => setShowLogoutModal(true)}
          >
            Logout
          </button>
          <Button variant="primary" onClick={goToLandingpage}>
            Explore Available Apartments
          </Button>
        </div>
      </div>

      {showLogoutModal && (
        <Modal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          imageUrl="/images/delete-icon.png"
          width={48}
          height={48}
          modalcontent={styles.modalContent3}
        >
          <div>
            <p className="text-gray-900 font-semibold text-lg text-center pt-5 pb-3  ">
              {" "}
              Logout
            </p>

            <p className="text-gray-500 text-sm pb-6 ">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center items-center gap-5 md:pb-6 ">
              <Button
                variant="profile"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </Button>
              <Button variant="delete">Logout</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default AccountReview;
