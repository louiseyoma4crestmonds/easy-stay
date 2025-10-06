import { ReactNode } from "react";

export type AppLayoutProps = {
  noNavigation?: boolean;
  children: React.ReactNode;
  isMobile?: boolean;
  pageTitle?: string;
  subTitle?: string;
  firstName?: string;
  lastName?: string;
  actionButtons?: React.ReactNode; // optional buttons beside title/subtitle
  tabs?: React.ReactNode;
  verificationPending?: boolean;
};
