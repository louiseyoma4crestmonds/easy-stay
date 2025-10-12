import Image from "next/image";
import styles from "./FaqGrid.module.css";
import { FAQ } from "src/helpers/dataTypes";

type FaqGridProps = {
  faqs: FAQ[];
};

function FaqGrid({ faqs }: FaqGridProps) {
  return (
    <div className={styles.maindiv}>
      {faqs.map((faq) => (
        <div key={faq.id} className="flex flex-col ">
          <div className={styles.imgdiv}>
            <Image
              src="/images/question-mark-outline.png"
              width={24}
              height={24}
            />
          </div>
          <p className={styles.P1}>{faq.question} </p>
          <p className={styles.P2}>{faq.answer} </p>{" "}
        </div>
      ))}
    </div>
  );
}

export default FaqGrid;
