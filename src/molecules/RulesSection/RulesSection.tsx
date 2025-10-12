import Image from "next/image";
import styles from "./RulesSection.module.css";

type RulesSectionProps = {
  rules: string;
  checkinTime: string;
  checkoutTime: string;
  isMobile?: boolean;
};

function RulesSection({
  rules,
  isMobile,
  checkinTime,
  checkoutTime,
}: RulesSectionProps) {
  return (
    <div className={styles.maindiv}>
      <p className={styles.text}>Rules </p>
      <p className=" text-gray-800 font-normal text-xs md:text-sm pb-4 border-b mt-1 ">
        {rules}{" "}
      </p>
      <div className="flex flex-row justify-between items-center mt-6 ">
        <div className="flex flex-row w-[50%] items-center gap-3 ">
          <Image
            src="/images/checkin-icon.png"
            alt="checkin-icon"
            width={isMobile ? 32 : 48}
            height={isMobile ? 32 : 48}
          />
          <div className="flex flex-col ">
            <p className={styles.text}>Check In Time</p>
            <p className={styles.P1}>{checkinTime} </p>
          </div>
        </div>
        <div className="flex flex-row w-[50%] items-center gap-3 ">
          <Image
            src="/images/checkout-icon.png"
            alt="checkout-icon"
            width={isMobile ? 32 : 48}
            height={isMobile ? 32 : 48}
          />
          <div className="flex flex-col ">
            <p className={styles.text}>Check Out Time</p>
            <p className={styles.P1}>{checkoutTime} </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RulesSection;
