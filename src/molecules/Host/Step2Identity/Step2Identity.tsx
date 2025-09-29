import styles from "./Step2Identity.module.css";
import Button from "@/atoms/Button";

type Step2IdentityProps = {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  onProceed: () => void;
  onBack: () => void;
};

function Step2Identity({
  onProceed,
  file,
  onBack,
  setFile,
}: Step2IdentityProps) {
  const formatSize = (bytes: number) =>
    bytes > 1048576
      ? `${(bytes / 1048576).toFixed(1)} MB`
      : `${(bytes / 1024).toFixed(1)} KB`;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
  };

  const handleDelete = () => setFile(null);

  return (
    <div>
      <div className="flex flex-col ">
        <p className="text-xl font-semibold text-gray-900 ">
          Identity Verification
        </p>

        <p className="text-gray-500 font-normal text-base md:w-[70%]  ">
          Completing identity verification helps us prevent impersonation and
          confirms your direct connection to the property, building a more
          trustworthy environment for everyone.
        </p>
      </div>

      <div className="bg-white rounded-lg mt-6 ">
        <div className="w-full p-6 flex flex-col">
          <label className="block text-sm text-gray-900 font-medium pb-1">
            Upload Government‑Issued ID
          </label>
          <p className="text-gray-600 text-sm font-normal">
            For verification, the name on your submitted ID must be identical to
            the name used when creating your account. You can use your
            (International Passport, Driver's License, or National ID).
          </p>

          <input
            id="identity-file-input"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />

          <div
            className={`mt-3 flex items-center border border-gray-300 rounded-lg overflow-hidden ${
              file ? "bg-transparent" : "bg-gray-50"
            }`}
          >
            {!file && (
              <button
                type="button"
                onClick={() =>
                  document.getElementById("identity-file-input")?.click()
                }
                className="bg-black text-white p-4 text-sm rounded-l-lg"
              >
                Choose file
              </button>
            )}

            <div className="flex-1 px-4 py-3">
              {file ? (
                <div className="flex justify-between items-center w-full">
                  {/* File name + size */}
                  <div className="flex items-start gap-3">
                    <img
                      src="/images/file_upload_icon.png"
                      alt="file"
                      className="w-7 h-7 mt-0.5"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700 truncate">
                        {file.name}
                      </span>
                      <span className="text-sm font-normal text-gray-500">
                        {formatSize(file.size)}
                      </span>
                    </div>
                  </div>

                  <button type="button" onClick={handleDelete}>
                    <img
                      src="/images/bin.png"
                      alt="delete"
                      className="w-6 h-6"
                    />
                  </button>
                </div>
              ) : (
                <span className="text-sm text-gray-900">No file chosen</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.btndiv}>
        <button className={styles.btnBack} onClick={onBack}>
          Back
        </button>
        <Button variant="primary" disabled={!file} onClick={onProceed}>
          Proceed
        </Button>
      </div>
    </div>
  );
}

export default Step2Identity;
