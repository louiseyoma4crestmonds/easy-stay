import Image from "next/image";
import styles from "./HostResolveModal.module.css";
import { useEffect, useRef, useState } from "react";
import Button from "@/atoms/Button";

type HostResolveModalProps = {
  onClose: () => void;
  isOpen: boolean;
  title: string;
  address?: string;
  type?: string;
  handleSaveUpload: () => void;
};

function HostResolveModal(props: HostResolveModalProps) {
  const { onClose, handleSaveUpload, isOpen, title, address, type } = props;
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen) {
        const modalElement = document.querySelector(`.${styles.frame}`);
        if (modalElement && !modalElement.contains(event.target as Node)) {
          onClose();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files);
    const validFiles = newFiles.filter((file) => file.size <= 30 * 1024 * 1024); // 30MB max
    setImages((prev) => [...prev, ...validFiles]);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleFiles(event.dataTransfer.files);
      event.dataTransfer.clearData();
    }
  };

  const handleRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.background}>
      <div className={styles.frame}>
        {/* HEADER */}
        <div className="flex items-center justify-between bg-gray-200 border-b p-3 md:p-4 rounded-t-lg">
          <div className="flex flex-col ">
            <p className="text-gray-900 font-medium text-base ">{title}</p>
            <p className="text-gray-600 text-sm font-normal">{address}</p>
          </div>

          <div
            className="cursor-pointer flex justify-end"
            onClick={onClose}
            role="button"
            tabIndex={0}
            onKeyDown={() => {}}
          >
            <Image
              src="/images/x-outline.png"
              width={20}
              height={20}
              alt="close"
            />
          </div>
        </div>

        {/* BODY */}
        <div className={styles.modalContent}>
          <div className="flex flex-col bg-red-100 rounded-lg p-4 ">
            <div className="flex items-center gap-2">
              <img
                src="/images/red_exclamation.png"
                alt="upload"
                className="w-4 h-4"
              />
              <p className="text-red-600 font-semibold text-base">
                Action Required
              </p>
            </div>

            <p className="text-gray-600 text-sm font-normal">
              Reason: Unclear and poor photo, please re-upload.
            </p>
          </div>

          <div className="flex flex-col mt-4">
            <p className="text-gray-900 font-medium text-sm">Apartment Type</p>
            <div className={styles.typediv}>{type}</div>
          </div>

          {/* Upload Section */}
          <div className="mt-6">
            <p className="text-gray-900 font-medium text-sm ">
              Re-upload Property Photos
            </p>
            <p className="text-gray-600 font-normal text-sm ">
              Upload high-quality, landscape photos; they'll attract more
              interest and are essential for apartment verification.
            </p>

            <div
              className={`border-2 border-dashed rounded-xl p-6 mt-2 flex flex-col items-center bg-gray-50 justify-center text-center cursor-pointer transition-all duration-300 ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => {
                  if (e.target.files) handleFiles(e.target.files);
                }}
                className="hidden"
              />

              <img
                src="/images/upload.png"
                alt="upload"
                className="w-10 h-10 mb-2 opacity-70"
              />
              <p className="text-gray-500 text-sm font-normal">
                Click to upload or drag and drop
              </p>
              <p className="text-gray-500 font-semibold text-xs mt-1">
                Max file size: 30MB
              </p>
            </div>

            {/* Image Thumbnails */}
            {images.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {images.map((file, index) => {
                  const src = URL.createObjectURL(file);
                  return (
                    <div
                      key={index}
                      className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200"
                    >
                      <img
                        src={src}
                        alt={`uploaded-${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => handleRemove(index)}
                        className="absolute top-1 right-1 bg-white w-5 h-5 flex items-center justify-center rounded-full shadow p-1 hover:bg-red-100"
                      >
                        <Image
                          src="/images/x-outline.png"
                          alt="remove"
                          width={14}
                          height={14}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 p-4 border-t rounded-b-lg bg-white">
          <button className={styles.btn1} onClick={onClose}>
            Cancel
          </button>
          <Button variant="primary" onClick={handleSaveUpload}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HostResolveModal;
