import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import DashboardIcon from "@/atoms/Icons/DashboardIcon";
import PropertiesIcon from "@/atoms/Icons/PropertiesIcon";
import PaymentsIcon from "@/atoms/Icons/PaymentsIcon";
import SettingsIcon from "@/atoms/Icons/SettingsIcon";
import LogoutIcon from "@/atoms/Icons/LogoutIcon";
import SupportIcon from "@/atoms/Icons/SupportIcon";
import BookingIcon from "@/atoms/Icons/BookingIcon";
import logoText from "public/images/Text.png";
import styles from "./Navigation.module.css";

type NavigationProps = {
  isMobile?: boolean;
};

function Navigation({ isMobile }: NavigationProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const defaultTextColor = "text-gray-500";

  const mainLinks = [
    { name: "Dashboard", href: "/host", Icon: DashboardIcon },
    {
      name: "Properties & Apartments",
      href: "/host/properties",
      Icon: PropertiesIcon,
    },
    { name: "Bookings", href: "/host/bookings", Icon: BookingIcon },
    {
      name: "Payment & Commissions",
      href: "/host/payments_and_commissions",
      Icon: PaymentsIcon,
    },
    { name: "Settings", href: "/host/settings", Icon: SettingsIcon },
  ];

  const bottomLinks = [
    { name: "Support", href: "/host/support", Icon: SupportIcon },
    { name: "Logout", href: "/host/logout", Icon: LogoutIcon },
  ];

  return (
    <div>
      <button
        className="md:hidden p-2 fixed top-4 left-4 z-50 bg-gray-800 text-gray-500 rounded-lg"
        onClick={() => setOpen(!open)}
        aria-label="Toggle Sidebar"
      >
        ☰
      </button>

      <aside
        className={`fixed top-0 left-0 h-full w-64 cursor-pointer bg-white text-base border-r border-gray-100 flex flex-col
           p-3 transition-transform duration-300 z-40
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className={styles.imgdiv}>
          <Image
            src={logoText}
            alt="Easy Stay Logo"
            width={isMobile ? 96 : 153}
            height={isMobile ? 40 : 64}
          />
        </div>

        {/* Main links */}
        <nav className="space-y-2 mt-10 ">
          {mainLinks.map(({ name, href, Icon }) => {
            const isActive = router.pathname === href;
            return (
              <Link key={name} href={href} onClick={() => setOpen(false)}>
                <div
                  className={`flex items-center text-sm gap-3 rounded-md px-3 py-2 transition-colors
                    ${isActive ? "bg-primary-200" : "hover:bg-primary-50"}`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      isActive ? "text-primary-600" : defaultTextColor
                    }`}
                  />
                  <span
                    className={`${
                      isActive
                        ? "text-primary-600 font-semibold"
                        : defaultTextColor
                    }`}
                  >
                    {name}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom links */}
        <div className="mt-auto border-t space-y-2 pt-6 ">
          {bottomLinks.map(({ name, href, Icon }) => {
            const isActive = router.pathname === href;
            return (
              <Link key={name} href={href} onClick={() => setOpen(false)}>
                <div
                  className={`flex items-center gap-3 rounded-md text-sm px-3 py-2 transition-colors
                    ${isActive ? "bg-primary-200" : "hover:bg-primary-50"}`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      isActive ? "text-primary-600" : defaultTextColor
                    }`}
                  />
                  <span
                    className={`${
                      isActive
                        ? "text-primary-600 font-semibold"
                        : defaultTextColor
                    }`}
                  >
                    {name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}

export default Navigation;
