import Link from "next/link";
import { useRouter } from "next/router";
import BookingsIcon from "../Icons/BookingsIcon";
import SavedIcon from "../Icons/SavedIcon";
import ExploreIcon from "../Icons/ExploreIcon";
import styles from "./CustomerTabs.module.css";

// type CustomerTabsProps = {
//   defaultTextColor?: string; // new prop
// };

function CustomerTabs({ defaultTextColor = "text-gray-100" }) {
  const router = useRouter();

  const tabs = [
    { name: "Explore", href: "/guest", Icon: ExploreIcon },
    { name: "My Bookings", href: "/guest/my-bookings", Icon: BookingsIcon },
    { name: "Saved", href: "/guest/my-wishlist", Icon: SavedIcon },
  ];

  return (
    <div className={styles.maindiv}>
      {tabs.map((tab) => {
        const isActive = router.pathname === tab.href;
        return (
          <Link key={tab.name} href={tab.href}>
            <span className="group flex items-center gap-2 cursor-pointer">
              <tab.Icon
                className={`h-5 w-5 ${
                  isActive
                    ? "text-primary-600 font-medium"
                    : `${defaultTextColor} font-normal group-hover:text-black`
                }`}
              />
              <span
                className={`${
                  isActive
                    ? "text-primary-600 font-medium"
                    : `${defaultTextColor} font-normal group-hover:text-black group-hover:underline`
                }`}
              >
                {tab.name}
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default CustomerTabs;
