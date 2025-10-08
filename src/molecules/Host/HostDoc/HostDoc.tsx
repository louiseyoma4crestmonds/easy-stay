import { useEffect, useState } from "react";
import styles from "./HostDoc.module.css";
import { HOST_MOCK_DOCS, HostDocs } from "src/helpers/dataTypes";
import HostDocList from "../HostDocList";

function HostDoc() {
  const [docs, setDocs] = useState<HostDocs[]>([]);

  useEffect(() => {
    // Simulated API response
    setDocs(HOST_MOCK_DOCS);
    //   setLoading(false);
  }, []);

  return (
    <div>
      <div className={styles.maindiv}>
        <p className={styles.title}> Documents </p>
        <div className="px-6 py-5 ">
          <div className="border-b pb-5 ">
            <p className={styles.formLabel}>Government‑Issued ID</p>
            <div className="flex mt-3 justify-between border border-gray-200 rounded-lg p-3 items-center ">
              {/* File name + size */}
              <div className="flex items-start gap-3">
                <img
                  src="/images/file_upload_icon.png"
                  alt="file"
                  className="w-7 h-7 mt-0.5"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700 truncate">
                    International Passport
                  </span>
                  <span className="text-sm font-normal text-gray-500">
                    1 MB
                  </span>
                </div>
              </div>

              <img
                src="/images/Button-tick.png"
                alt="tick"
                className="w-5 h-5"
              />
            </div>
          </div>
          <p className={`${styles.formLabel} py-5`}>
            Property Documents Submitted
          </p>
          <div>
            <HostDocList docs={docs} />
          </div>
        </div>
      </div>

      <div className={`${styles.maindiv} mt-6`}>
        <p className={styles.title}> Payments and Account </p>
        <div className="px-6 py-5">
          <p className={styles.formLabel}>Bank Details</p>
          <p className="text-gray-500 text-base font-normal ">
            This is where all commissions earned from your apartment will be
            paid, based on our agreed terms.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HostDoc;
