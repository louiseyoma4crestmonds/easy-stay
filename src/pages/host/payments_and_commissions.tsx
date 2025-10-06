import Tabs from "@/atoms/Tabs";
import AppLayout from "@/layouts/AppLayout";
import ComTab from "@/molecules/Host/ComTab";
import HostBookingComp from "@/molecules/Host/HostBookingComp";
import PaymentTab from "@/molecules/Host/PaymentTab";
import RefundTab from "@/molecules/Host/RefundTab";
import { useEffect, useState } from "react";
import { BookingStatus } from "src/helpers/dataTypes";

function PaymentsAndCommissions() {
  const [width, setWidth] = useState<number>(0);
  const [activeTab, setActiveTab] = useState("payments");
  const [showModal, setShowModal] = useState<
    "none" | "reject" | "approve" | "success"
  >("none");
  const [reportModal, setReportModal] = useState(false);

  const tabs = ["payments", "refunds", "commissions"];

  const statusLabel = {
    payments: "Payments",
    refunds: "Refunds",
    commissions: "Commissions",
  };

  const isMobile = width <= 767;

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <AppLayout
      isMobile={isMobile}
      pageTitle="Payments and commissions"
      subTitle="Manage transactions easily"
      tabs={
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          labels={statusLabel}
          type="host"
        />
      }
      actionButtons={
        <button
          className="py-2.5 px-5 text-white text-sm rounded-lg bg-primary-600"
          onClick={() => setReportModal(true)}
        >
          Generate Report
        </button>
      }
    >
      <div className="flex mt-5 flex-col h-[calc(100vh-210px)]">
        <div className="flex-1 min-h-0">
          {activeTab === "payments" && (
            <PaymentTab
              reportModal={reportModal}
              setReportModal={setReportModal}
              isMobile={isMobile}
            />
          )}
          {activeTab === "refunds" && (
            <RefundTab
              showModal={showModal}
              setShowModal={setShowModal}
              isMobile={isMobile}
              reportModal={reportModal}
              setReportModal={setReportModal}
            />
          )}
          {activeTab === "commissions" && (
            <ComTab
              reportModal={reportModal}
              setReportModal={setReportModal}
              isMobile={isMobile}
            />
          )}
        </div>
      </div>
    </AppLayout>
  );
}

export default PaymentsAndCommissions;
