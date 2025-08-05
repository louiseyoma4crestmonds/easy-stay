import dynamic from "next/dynamic";
import classNames from "classnames";
import Image from "next/future/image";

import UtilityBar from "@/organisms/UtilityBar";
import UserProfileMenu from "@/molecules/UserProfileMenu";
import ScoreSummaryCard from "@/atoms/ScoreSummaryCard";
import { AppLayoutProps } from "./AppLayout.types";

import styles from "./AppLayout.module.css";

const Navigation = dynamic(() => import("@/molecules/Navigation"));

function AppLayout(props: AppLayoutProps): JSX.Element {
  const { noNavigation = false, children } = props;
  const mainClassName = classNames({
    [styles.appMainWrapperWithNavigation]: !noNavigation,
  });
  return (
    <div className={styles.appWrapper}>
      {!noNavigation ? <Navigation /> : null}
      <main className={mainClassName}>
        <UtilityBar>
          <ScoreSummaryCard title="Score" score={50213} />
          <ScoreSummaryCard title="Crestcoins" score={2105}>
            <Image src="/icons/crestcoin.svg" width={21} height={21} />
          </ScoreSummaryCard>
          <ScoreSummaryCard title="Badges" score={14002}>
            <Image src="/icons/crestbadge.svg" width={21} height={21} />
          </ScoreSummaryCard>
          <UserProfileMenu
            name="Steve Goodwin"
            jobRole="Lead Engineer"
            profileImage="https://media-exp1.licdn.com/dms/image/C5603AQEIdm7IfHSc_w/profile-displayphoto-shrink_800_800/0/1517770421071?e=1664409600&v=beta&t=DR-i-6kx7tvzwLjoiuq92WdDnTaSl8jl7dty8oEoOg8"
          />
        </UtilityBar>
        {children}
      </main>
    </div>
  );
}

export default AppLayout;
