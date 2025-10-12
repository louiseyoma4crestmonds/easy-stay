import DashActivity from "@/atoms/Host/DashActivity";
import DashHeader from "@/atoms/Host/DashHeader";
import DashProgressBar from "@/atoms/Host/DashProgressBar";
import DashTrends from "@/atoms/Host/DashTrends";
import DashWelcome from "@/atoms/Host/DashWelcome";

function DashboardComp() {
  const first_time_after_verification = true;

  return (
    <div>
      <p className="text-gray-800 font-medium text-base">
        Hello Lekan, welcome!{" "}
      </p>
      <p className="text-gray-500 font-normal text-sm mb-5">
        Here's your summary
      </p>
      {first_time_after_verification && <DashWelcome />}
      <div className="mb-5"></div> <DashHeader />
      <div className="flex gap-8 mt-5">
        <DashProgressBar />
        <DashTrends />
        <DashActivity />
      </div>
    </div>
  );
}

export default DashboardComp;
