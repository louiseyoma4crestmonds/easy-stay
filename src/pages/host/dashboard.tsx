import AppLayout from "@/layouts/AppLayout";
import AccountReview from "@/molecules/Host/AccountReview";
import DashboardComp from "@/molecules/Host/DashboardComp";
import VerificationComp from "@/molecules/Host/VerificationComp";
import { useEffect, useState } from "react";
import { HOST_MOCK_ISSUES, HostIssues } from "src/helpers/dataTypes";

function Dashboard() {
  const verificationPending = false;

  const [issues, setIssues] = useState<HostIssues[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API response
    setIssues(HOST_MOCK_ISSUES);
    setLoading(false);
  }, []);

  let content;

  if (verificationPending) {
    if (issues.length > 0) {
      content = <VerificationComp issues={issues} />;
    } else {
      content = <AccountReview />;
    }
  } else {
    content = <DashboardComp />;
  }

  if (loading) {
    // FULL-PAGE loader (inside AppLayout but above all content)
    return (
      <div className="flex items-center justify-center h-full">
        <img src="/icons/nobg-spinner.gif" alt="Loading..." />
      </div>
    );
  }

  return (
    <AppLayout verificationPending={verificationPending}>
      <div className="flex my-6 flex-col min-h-screen ">{content}</div>
    </AppLayout>
  );
}

export default Dashboard;
