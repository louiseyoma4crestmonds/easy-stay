import { useState } from "react";
import styles from "./HostNotification.module.css";

type NotificationType = {
  id: string;
  label: string;
};

const emailNotifications: NotificationType[] = [
  { id: "new_apt", label: "New Apartment Upload" },
  { id: "apt_status", label: "Apartment Status Change" },
  { id: "commision_paid", label: "Commission Paid" },
  { id: "payment_confirmations", label: "Payment Confirmations" },
  { id: "refund_status_updates", label: "Refund Status Updates" },
  { id: "refund_completion", label: "Refund Completion" },
  { id: "cancellation_notices", label: "Cancellation Notices" },
  { id: "system_announcements", label: "System Announcements" },
  { id: "policy_changes", label: "Policy Changes" },
];

const pushNotifications: NotificationType[] = [
  { id: "1", label: "Booking Reminders" },
  { id: "2", label: "System Announcements" },
  { id: "3", label: "Policy Changes" },
];

function HostNotification() {
  const [emailSettings, setEmailSettings] = useState(
    Object.fromEntries(emailNotifications.map((n) => [n.id, true]))
  );

  const [pushSettings, setPushSettings] = useState(
    Object.fromEntries(pushNotifications.map((n) => [n.id, true]))
  );

  // Function to instantly update backend when toggle changes
  //   const updatePreference = async (
  //     category: "email" | "push",
  //     id: string,
  //     value: boolean
  //   ) => {
  //     try {
  //       await fetch("/api/notifications", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ category, id, value }),
  //       });
  //     } catch (err) {
  //       console.error("Error updating preference", err);
  //     }
  //   };

  const handleToggle = (category: "email" | "push", id: string) => {
    if (category === "email") {
      setEmailSettings((prev) => {
        const updated = { ...prev, [id]: !prev[id] };
        // updatePreference("email", id, updated[id]); // auto-save
        return updated;
      });
    } else {
      setPushSettings((prev) => {
        const updated = { ...prev, [id]: !prev[id] };
        // updatePreference("push", id, updated[id]); // auto-save
        return updated;
      });
    }
  };

  return (
    <div className="w-full ">
      <div className={styles.maindiv1}>
        <p className={styles.title}>Email Notifications</p>
        <div className="px-4 md:px-8 py-5">
          {emailNotifications.map((n) => (
            <div key={n.id} className="flex items-center gap-4 py-2  ">
              <button
                onClick={() => handleToggle("email", n.id)}
                className={`relative inline-flex h-5 w-11 items-center rounded-full transition ${
                  emailSettings[n.id] ? "bg-primary-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    emailSettings[n.id] ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className={styles.span}>{n.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.maindiv2}>
        <p className={styles.title}>Push Notifications</p>
        <div className="px-4 md:px-8 py-5">
          {pushNotifications.map((n) => (
            <div key={n.id} className="flex items-center gap-4 py-2  ">
              <button
                onClick={() => handleToggle("push", n.id)}
                className={`relative inline-flex h-5 w-11 items-center rounded-full transition ${
                  pushSettings[n.id] ? "bg-primary-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    pushSettings[n.id] ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className={styles.span}>{n.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HostNotification;
