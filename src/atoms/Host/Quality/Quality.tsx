import Modal from "@/molecules/Modal";
import styles from "./Quality.module.css";

type QualityProps = {
  setShowModal: React.Dispatch<
    React.SetStateAction<"none" | "terms" | "quality" | "privacy">
  >;
};

function Quality({ setShowModal }: QualityProps) {
  return (
    <Modal
      isOpen
      onClose={() => setShowModal("none")}
      title="Quality Standards"
      modalcontent={styles.modalContent3}
    >
      <div className="overflow-auto h-[450px] py-6 ">
        <p>
          By accessing or using [Your Platform Name] (the "Platform"), you agree
          to be bound by these Terms and Conditions ("Terms"). Please read them
          carefully. If you do not agree with any part of these Terms, you may
          not access or use the Platform.  
        </p>
        <p className="py-4">1. Acceptance of Terms:</p>
        <p>
          These Terms constitute a legally binding agreement between you and
          [Your Company Name/Platform Operator] ("we," "us," or "our"). By
          creating an account, browsing, or otherwise using the Platform, you
          acknowledge that you have read, understood, and agree to be bound by
          these Terms.  
        </p>
        <p className="py-4">2. User Accounts:</p>
        <ul className="list-disc ml-8 ">
          <li>
            You are responsible for maintaining the confidentiality of your
            account credentials, including your username and password.
          </li>
          <li>
            You agree to provide accurate, current, and complete information
            during the registration process and to update such information to
            keep it accurate, current, and complete.  
          </li>
          <li>
            You are responsible for all activities that occur under your
            account.{" "}
          </li>
          <li>
            You agree to notify us immediately of any unauthorized access to or
            use of your account.  
          </li>
          <li>
            We reserve the right to suspend or terminate your account at our
            sole discretion, without prior notice, for any reason, including but
            not limited to violation of these Terms.  
          </li>
        </ul>

        <p className="py-4">3. Use of the Platform:</p>
        <ul className="list-disc ml-8 ">
          <li>
            You agree to use the Platform only for lawful purposes and in a
            manner that does not infringe the rights of, restrict, or inhibit
            anyone else's use and enjoyment of the Platform.  
          </li>
          <li>
            You must not use the Platform to transmit any viruses, malware, or
            other harmful code.  
          </li>
          <li>
            You must not attempt to gain unauthorized access to any part of the
            Platform, other accounts, computer systems, or networks connected to
            the Platform.  
          </li>
          <li>
            You are solely responsible for any content you upload, post,
            transmit, or otherwise make available through the Platform. You
            represent and warrant that you have all necessary rights to such
            content and that it does not violate these Terms or the rights of
            any third party.
          </li>
          <li>
            We reserve the right to modify, suspend, or discontinue the Platform
            (or any part thereof) at any time, with or without notice.
          </li>
        </ul>
      </div>
    </Modal>
  );
}

export default Quality;
