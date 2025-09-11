import { useState } from "react";
import Image from "next/image";
import styles from "./FooterComp.module.css";
import CustomDropdown from "../../molecules/CustomDropdown";
import { DropdownOption } from "../../molecules/CustomDropdown/CustomDropdown.types";
import { Props } from "./FooterComp.types";
import Router from "next/router";
import ReportanIssue from "@/molecules/ReportanIssue";
import Modal from "@/molecules/Modal";

const languageOptions: DropdownOption[] = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
];

const currencyOptions: DropdownOption[] = [
  { value: "ngn", label: "NGN - ₦" },
  { value: "usd", label: "USD - $" },
  { value: "eur", label: "EUR - €" },
  { value: "gbp", label: "GBP - £" },
];

function FooterComp({ data }: Props) {
  const [selectedLanguage, setSelectedLanguage] = useState<
    DropdownOption | undefined
  >(languageOptions[0]);
  const [selectedCurrency, setSelectedCurrency] = useState<
    DropdownOption | undefined
  >(currencyOptions[0]);
  const [reportAnIssue, setReportAnIssue] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const features = [
    { id: 1, icon: "/images/home-outline-2.png", bgColor: "#EDEBFE" },
    { id: 2, icon: "/images/home-outline-3.png", bgColor: "#E1EFFE" },
    { id: 3, icon: "/images/portH.png", bgColor: "#DEF7EC" },
    { id: 4, icon: "/images/cal.png", bgColor: "#FEECDC" },
    { id: 5, icon: "/images/sokt.png", bgColor: "#FCE8F3" },

    // add more icons matching the ids from your endpoint
  ];

  return (
    <section className={styles.maindiv}>
      <p className={styles.footerExploreText}>Explore more apartments</p>

      {/* Brand / About */}

      <div className={styles.footerAboutDiv}>
        {data.map((item: any) => {
          // find icon for this id
          // const featureIcon = features.find((f) => f.id === item.id)?.icon;
          const featureIconData = features.find((f) => f.id === item.id);
          const featureIcon = featureIconData?.icon;

          return (
            <div
              key={item.id}
              className={`${styles.footerborder} flex items-center justify-between md:hover:bg-gray-800 `}
              role="button"
              onKeyDown={() => {
                Router.push({
                  pathname: "/guest/properties",
                  query: { location: item.id },
                });
              }}
              onClick={() => {
                Router.push({
                  pathname: "/guest/properties",
                  query: { location: item.id },
                });
              }}
            >
              <div className="flex items-center gap-3 ">
                {featureIcon && (
                  <div
                    className={styles.footerAbout}
                    style={{
                      backgroundColor: featureIconData?.bgColor || "#1f1f1f", // fallback if no color
                    }}
                  >
                    <Image
                      src={featureIcon}
                      alt={item.name}
                      width={20}
                      height={20}
                      className="object-contain"
                    />{" "}
                  </div>
                )}
                <div>
                  <p className={styles.footerP1}>
                    {" "}
                    {`Apartments in ${item.name}`}{" "}
                  </p>
                  <p className={styles.footerP2}>{item.cover_text}</p>
                </div>
              </div>
              <Image
                src="/images/angle-down.png"
                alt="Previous"
                width={24}
                height={24}
                className="transform -rotate-90 "
              />
            </div>
          );
        })}
      </div>

      <hr className="border-gray-700 my-10 md:my-14  " />

      {/* Quick Links */}
      <div className={styles.quicklinkdiv}>
        <div>
          <p className={styles.quicklinkP1}>Product</p>
          <ul className={styles.quicklinkUL}>
            <li>
              <a href="/register-your-apartment" className="">
                Register your Apartment
              </a>
            </li>
            <li>
              <a href="/guest/properties?location=1" className="">
                Find Apartments
              </a>
            </li>
            <li>
              <a href="/how-it-works" className="">
                How it Works
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className={styles.quicklinkP1}>Support</p>
          <ul className={styles.quicklinkUL}>
            <li>
              <a href="/faqs" className="">
                FAQs
              </a>
            </li>
            <li>
              <a href="/refund&cancellation" className="">
                Refund & Cancellation Policy
              </a>
            </li>
            <li>
              <a href="/trust&safety" className="">
                Trust & Safety
              </a>
            </li>
            {/* <li>
              <a href="#" className="">
                Report an Issue
              </a>
            </li> */}
            <li>
              <button onClick={() => setReportAnIssue(true)}>
                Report an Issue
              </button>
            </li>
          </ul>
        </div>

        <div>
          <p className={styles.quicklinkP1}>Legal</p>
          <ul className={styles.quicklinkUL}>
            <li>
              <a href="/termsOfService" className="">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/cookies-policy" className="">
                Cookie Policy
              </a>
            </li>
            <li>
              <a href="/guest-refund-policy" className="">
                Guest Refund Policy
              </a>
            </li>
            <li>
              <a href="/host-terms" className="">
                Host Terms
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className={styles.quicklinkP1}>Company</p>
          <ul className={styles.quicklinkUL}>
            <li>
              <a href="/about-us" className="">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact-us" className="">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr className="border-gray-700 my-6 md:my-14 " />

      <div className=" w-full md:w-auto flex flex-col md:flex-row justify-between items-center px-5 md:px-0 mb-6">
        <p className="text-gray-300 text-base font-normal py-2 md:py-0 order-last md:order-first">
          {" "}
          @ 2025 Easy Stay. Inc
        </p>
        <div className="flex w-full md:w-auto flex-col md:flex-row justify-between gap-2 items-center ">
          <div className="w-full md:w-auto py-2 md:py-0 flex gap-3">
            <div className="w-full md:w-auto ">
              <CustomDropdown
                options={languageOptions}
                value={selectedLanguage}
                onChange={setSelectedLanguage}
                buttonClassName={styles.btndiv}
                dropdownClassName={styles.dropdowndiv}
                toggleIcon="/images/angle-down.png"
                leftIcon="/images/globe-outline.png"
                spanClassName="flex items-center gap-1"
                ImgClass="w-4 h-4 object-contain"
              />
            </div>
            <div className="w-full md:w-auto ">
              <CustomDropdown
                options={currencyOptions}
                value={selectedCurrency}
                onChange={setSelectedCurrency}
                buttonClassName={styles.btndiv}
                dropdownClassName={styles.dropdowndiv}
                toggleIcon="/images/angle-down.png"
              />
            </div>
          </div>

          <div className=" flex justify-center items-center gap-2">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <img
                src="/images/facebook.png"
                alt="Facebook"
                className="w-6 h-6"
              />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <img
                src="/images/linkedin.png"
                alt="LinkedIn"
                className="w-6 h-6"
              />
            </a>

            {/* twitter */}
            <a
              href="https://www.instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <img
                src="/images/twitter.png"
                alt="Instagram"
                className="w-6 h-6"
              />
            </a>
          </div>
        </div>
      </div>

      {reportAnIssue && (
        <ReportanIssue
          reportAnIssue={reportAnIssue}
          setReportAnIssue={setReportAnIssue}
          setShowSuccessModal={setShowSuccessModal}
        />
      )}

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
    </section>
  );
}

export default FooterComp;
