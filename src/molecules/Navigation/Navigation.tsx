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
import Modal from "../Modal";
import Button from "@/atoms/Button";

type NavigationProps = {
  isMobile?: boolean;
};

function Navigation({ isMobile }: NavigationProps) {
  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  const defaultTextColor = "text-gray-500";

  const mainLinks = [
    { name: "Dashboard", href: "/host/dashboard", Icon: DashboardIcon },
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
    { name: "Logout", isLogout: true, Icon: LogoutIcon },
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
        className={`fixed top-0 left-0 h-full w-64 cursor-pointer bg-white border-r border-gray-100 flex flex-col
           p-3 transition-transform duration-300 z-40
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className={styles.imgdiv}>
          <Image
            src={logoText}
            alt="Easy Stay Logo"
            width={153}
            height={64}
            priority
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
          {bottomLinks.map(({ name, href, Icon, isLogout }) => {
            const isActive = href && router.pathname === href;

            if (isLogout) {
              return (
                <button
                  key={name}
                  onClick={() => setShowLogoutModal(true)}
                  className="w-full flex items-center gap-3 rounded-md text-sm px-3 py-2 hover:bg-primary-50 text-gray-500"
                >
                  <Icon className="h-5 w-5 text-gray-500" />
                  <span>{name}</span>
                </button>
              );
            }

            // ✅ Only render Link if href exists
            return (
              href && (
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
              )
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

      {showLogoutModal && (
        <Modal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          imageUrl="/images/delete-icon.png"
          width={48}
          height={48}
          modalcontent={styles.modalContent3}
        >
          <div>
            <p className="text-gray-900 font-semibold text-lg text-center pt-5 pb-3  ">
              {" "}
              Logout
            </p>

            <p className="text-gray-500 text-sm pb-6 ">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center items-center gap-5 md:pb-6 ">
              <Button
                variant="profile"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </Button>
              <Button variant="delete">Logout</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Navigation;
