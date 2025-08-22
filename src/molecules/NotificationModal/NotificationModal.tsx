import styles from "./NotificationModal.module.css";

const notifications = [
  { text: "You have a new booking", time: "a few minutes ago" },
  { text: "Lekan okeowo #238498 checked-in", time: "30 minutes ago" },
  { text: "Lekan okeowo #238498 checked-Out", time: "10 minutes ago" },
  { text: "Lekan okeowo #238498 requested a refund", time: "44 minutes ago" },
  { text: "Commission Paid for booking #298382", time: "3 hours ago" },
];

function NotificationModal() {
  return (
    <div className={styles.notificationmodaldiv}>
      <p className={styles.text}>Notification</p>

      {notifications.map((item, i) => {
        const isLast = i === notifications.length - 1;
        return (
          <div
            key={i}
            className={`flex flex-row px-4 py-2 gap-2 ${!isLast ? "border-b border-gray-200" : ""}`}
          >
            <div className={styles.imgDiv}>
              <img
                src="/images/bell-blue.png"
                alt="notification"
                className="h-5 w-5"
              />
            </div>
            <div className="flex flex-col">
              <p className={styles.P1}>{item.text} </p>
              <p className={styles.P2}>{item.time} </p>
            </div>
          </div>
        );
      })}
      <div className="bg-gray-50 p-3  " />
    </div>
  );
}

export default NotificationModal;
