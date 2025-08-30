import Image from "next/image";
import { useEffect } from "react";
import { ModalProps } from "./Modal.types";
import styles from "./Modal.module.css";

function Modal(props: ModalProps) {
  const {
    onClose,
    isOpen,
    message,
    imageUrl,
    width,
    height,
    modalcontent,
    children,
    title,
    titleImageUrl,
    showCloseButton = true,
    disableCloseOnClickOutside = false,
  } = props;

  // Handle click outside modal to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !disableCloseOnClickOutside) {
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
  }, [isOpen, onClose, disableCloseOnClickOutside]);

  if (!isOpen) return null;

  return (
    <div className={styles.background}>
      {/* <div className={`${styles.frame} ${modalcontent}`}> */}
      <div className={styles.frame}>
        <div className=" ">
          <div
            className={`flex items-center ${title ? "justify-between border-b p-5 " : "justify-end p-4"}`}
          >
            {title && (
              <div className="flex items-center gap-2">
                {/* Optional image beside the title */}
                {titleImageUrl && (
                  <Image
                    src={titleImageUrl}
                    alt="title icon"
                    width={18}
                    height={18}
                  />
                )}
                <p className="text-gray-900 font-medium text-xl">{title}</p>
              </div>
            )}

            {showCloseButton && (
              <div
                className="cursor-pointer flex justify-end "
                onClick={() => {
                  if (!disableCloseOnClickOutside) {
                    onClose();
                  }
                }}
                role="button"
                tabIndex={0}
                onKeyDown={() => {}}
              >
                <Image
                  src="/images/x-outline.png"
                  width={20}
                  height={20}
                />{" "}
              </div>
            )}
          </div>
          <div className={modalcontent}>
            {imageUrl && <Image src={imageUrl} width={width} height={height} />}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
