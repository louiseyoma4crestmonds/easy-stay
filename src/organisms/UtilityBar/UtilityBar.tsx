import React from "react";

import { UtilityBarProps } from "./UtilityBar.types";

import styles from "./UtilityBar.module.css";

function UtilityBar(props: UtilityBarProps): JSX.Element {
  const { children } = props;
  return (
    <div className={styles.utilityBarContainer}>
      <div>&nbsp;</div>
      <div className="flex space-x-8">{children}</div>
    </div>
  );
}

export default UtilityBar;
