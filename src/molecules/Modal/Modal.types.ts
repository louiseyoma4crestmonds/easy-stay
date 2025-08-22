export type ModalProps = {
  onClose: () => void;
  message?: string;
  isOpen?: boolean;
  imageUrl?: any;
  width?: number;
  height?: number;
  children: React.ReactNode;
  modalcontent?: string;
  disableCloseOnClickOutside?: boolean;
  isMobile?: boolean;
  showCloseButton?: boolean;
};
