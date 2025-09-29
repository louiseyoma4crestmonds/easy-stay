import OnboardingComp from "@/molecules/Host/OnboardingComp";
import AppLayout from "@/layouts/AppLayout";

function Onboarding() {
  return (
    <AppLayout verificationPending>
      <div className="    ">
        <OnboardingComp />
      </div>
    </AppLayout>
  );
}

export default Onboarding;
