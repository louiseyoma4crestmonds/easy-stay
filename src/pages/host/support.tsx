import AppLayout from "@/layouts/AppLayout";
import HostSupport from "@/molecules/Host/HostSupport";
import { useEffect, useState } from "react";

function Support() {
  const [width, setWidth] = useState<number>(0);
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
      pageTitle="Support"
      subTitle="Having a little trouble? No worries, we're here to help!"
    >
      <div className="mt-5  h-[calc(100vh-180px)]  ">
        {" "}
        <HostSupport />{" "}
      </div>
    </AppLayout>
  );
}

export default Support;
