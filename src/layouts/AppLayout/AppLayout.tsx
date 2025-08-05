import dynamic from "next/dynamic";
import classNames from "classnames";
import Image from "next/future/image";

import UtilityBar from "@/organisms/UtilityBar";
import { AppLayoutProps } from "./AppLayout.types";

import styles from "./AppLayout.module.css";

function AppLayout(props: AppLayoutProps): JSX.Element {
  const { noNavigation = false, children } = props;
  const mainClassName = classNames({
    [styles.appMainWrapperWithNavigation]: !noNavigation,
  });
  return (
    <div className={styles.appWrapper}>
      <main className={mainClassName}>
        <UtilityBar>
          <div>user profile</div>
        </UtilityBar>
        {children}
      </main>
    </div>
  );
}

export default AppLayout;
