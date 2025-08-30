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
    { name: "Explore", href: "/", Icon: ExploreIcon },
    { name: "My Bookings", href: "/guest/my-bookings", Icon: BookingsIcon },
    { name: "Saved", href: "/guest/my-wishlist", Icon: SavedIcon },
  ];

  const isActive = (href: string) => {
    if (href === "/guest") {
      // only exact match for Explore
      return router.asPath === "/guest";
    }
    // match exact or sub-routes
    return router.asPath === href || router.asPath.startsWith(href + "/");
  };

  return (
    <div className={styles.maindiv}>
      {tabs.map((tab) => {
        // const isActive = router.asPath === tab.href;
        const active = isActive(tab.href);

        return (
          <Link key={tab.name} href={tab.href} legacyBehavior>
            <a className="group flex items-center gap-2 cursor-pointer">
              <tab.Icon
                className={`h-5 w-5 ${
                  active
                    ? "text-primary-600 font-medium"
                    : `${defaultTextColor} font-normal group-hover:text-black`
                }`}
              />
              <span
                className={`${
                  active
                    ? "text-primary-600 font-medium"
                    : `${defaultTextColor} font-normal group-hover:text-black group-hover:underline`
                }`}
              >
                {tab.name}
              </span>
            </a>
          </Link>
        );
      })}
    </div>
  );
}

export default CustomerTabs;
