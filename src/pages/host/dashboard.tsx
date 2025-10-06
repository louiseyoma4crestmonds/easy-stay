import AppLayout from "@/layouts/AppLayout";
import AccountReview from "@/molecules/Host/AccountReview";

function Dashboard() {
  const verificationPending = true;

  return (
    <AppLayout verificationPending>
      {verificationPending ? <AccountReview /> : <p>DASHBOARD</p>}
    </AppLayout>
  );
}

export default Dashboard;
