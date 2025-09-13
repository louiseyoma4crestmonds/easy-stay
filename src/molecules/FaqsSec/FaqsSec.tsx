import Image from "next/image";
import { useState } from "react";
import styles from "./FaqsSec.module.css";
import { guestFAQs, hostFAQs } from "src/helpers/dataTypes";
import FaqGrid from "@/atoms/FaqGrid";

function FaqsSec() {
  const [activeTab, setActiveTab] = useState<"guest" | "host">("guest");

  // Choose which FAQ data to show based on the active tab
  const faqsToShow = activeTab === "guest" ? guestFAQs : hostFAQs;

  return (
    <div className="w-full mx-auto px-2 md:px-4 ">
      <div className="border-b p-4 md:p-8 ">
        <div className={styles.thirddiv}>
          <button
            onClick={() => setActiveTab("guest")}
            className={` ${styles.btn1} ${
              activeTab === "guest"
                ? " bg-primary-600 text-white  "
                : "text-gray-800 bg-gray-50 "
            }`}
          >
            {" "}
            <Image
              src={
                activeTab
                  ? "/images/users-group-outline.png"
                  : "/images/users-group2.png"
              }
              alt="Guest"
              width={20}
              height={20}
            />
            <span className="text-sm font-medium">For Guests</span>
          </button>
          <button
            onClick={() => setActiveTab("host")}
            className={` ${styles.btn2} ${
              activeTab === "host"
                ? " bg-primary-600 text-white "
                : "text-gray-800 bg-gray-50 "
            }`}
          >
            <Image
              src="/images/explore-default.png"
              alt="Guest"
              width={20}
              height={20}
            />
            <span className="text-sm font-medium">For Hosts</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 py-8 ">
        <FaqGrid faqs={faqsToShow} />
      </div>
    </div>
  );
}

export default FaqsSec;
