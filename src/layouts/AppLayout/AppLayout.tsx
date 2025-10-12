import dynamic from "next/dynamic";
import classNames from "classnames";
import Image from "next/future/image";

// import UtilityBar from "@/organisms/UtilityBar";
import { AppLayoutProps } from "./AppLayout.types";

import styles from "./AppLayout.module.css";
import Navigation from "@/molecules/Navigation";
import HostNavArea from "@/molecules/Host/HostNavArea";
import PendingNavArea from "@/atoms/Host/PendingNavArea";

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
    secondarySidebar,
  } = props;

  const verificationPending = false;
  // const mainClassName = classNames({
  //   [styles.appMainWrapperWithNavigation]: !noNavigation,
  // });
  return (
    <main
      className={
        verificationPending
          ? styles.appWrapperNoSidebar //no sidebar margin
          : styles.appWrapper
      }
    >
      {!verificationPending && <Navigation isMobile={isMobile} />}

      {/* Main content area */}
      <div
        className={
          verificationPending ? styles.mainAreaPending : styles.mainArea
        }
      >
        <div className={styles.navTop}>
          {verificationPending ? (
            <PendingNavArea
              isMobile={isMobile}
              firstName="Lekan"
              lastName="Okeowo"
            />
          ) : (
            <HostNavArea firstName="Lekan" lastName="Okeowo" />
          )}
        </div>

        {/* Page title/subtitle + optional action buttons */}
        {!verificationPending && (
          <>
            <div className={styles.pageTitlediv}>
              <div>
                {pageTitle && <p className={styles.title}>{pageTitle}</p>}
                {subTitle && <p className={styles.subtitle}>{subTitle}</p>}
              </div>
              {actionButtons && (
                <div className="flex gap-2">{actionButtons}</div>
              )}
            </div>
            {/* Optional Tabs */}
            {tabs && <div className="px-6 ">{tabs}</div>}{" "}
          </>
        )}
      </div>
      {/*Content area with optional secondary sidebar UNDER the header */}
      <div className="flex flex-1 w-full  ">
        {secondarySidebar && (
          <div className="hidden md:block w-48">{secondarySidebar}</div>
        )}
        <div className={styles.pageContent}>{children}</div>
      </div>
      {/* Page content */}
      {/* <div className={styles.pageContent}>{children}</div> */}
    </main>
  );
}

export default AppLayout;
