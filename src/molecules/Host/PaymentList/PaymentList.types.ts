import { HostPayment } from "src/helpers/dataTypes";

export type PaymentListProps = {
  payments: HostPayment[];
  onOpen: (payment: HostPayment) => void;
  statusStyles: Record<string, string>;
  statusOptions: { name: string; label: string }[];
};
