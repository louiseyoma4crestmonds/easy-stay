import dynamic from "next/dynamic";
import classNames from "classnames";
import Image from "next/future/image";

// import UtilityBar from "@/organisms/UtilityBar";
import { AppLayoutProps } from "./AppLayout.types";

import styles from "./AppLayout.module.css";
import Navigation from "@/molecules/Navigation";
import HostNavArea from "@/molecules/Host/HostNavArea";

function AppLayout(props: AppLayoutProps): JSX.Element {
  const {
    noNavigation = false,
    children,
    isMobile,
    pageTitle,
    subTitle,
    firstName,
    lastName,
    tabs,
    actionButtons,
  } = props;
  // const mainClassName = classNames({
  //   [styles.appMainWrapperWithNavigation]: !noNavigation,
  // });
  return (
    <main className={styles.appWrapper}>
      <Navigation isMobile={isMobile} />

      {/* Main content area */}
      <div className={styles.mainArea}>
        <div className={styles.navTop}>
          <HostNavArea firstName="Lekan" lastName="Okeowo" />
        </div>
        {/* Page title/subtitle + optional action buttons */}
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            {pageTitle && (
              <p className="text-gray-800 font-medium text-base">{pageTitle}</p>
            )}
            {subTitle && <p className="text-gray-500 text-sm">{subTitle}</p>}
          </div>
          {actionButtons && <div className="flex gap-2">{actionButtons}</div>}
        </div>
        {/* Optional Tabs */}
        {tabs && <div className="px-6 ">{tabs}</div>}{" "}
      </div>
      {/* Page content */}
      <div className={styles.pageContent}>{children}</div>
    </main>
  );
}

export default AppLayout;
