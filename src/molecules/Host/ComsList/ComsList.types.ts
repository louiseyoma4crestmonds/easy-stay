import { HostCommission } from "src/helpers/dataTypes";

export type ComsListProps = {
  commissions: HostCommission[];
  onOpen: (payment: HostCommission) => void;
  statusStyles: Record<string, string>;
  statusOptions: { name: string; label: string }[];
};
