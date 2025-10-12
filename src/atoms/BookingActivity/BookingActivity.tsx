type BookingActivityProps = {
  setShowActivity: (arg: boolean) => void;
  onClose: () => void;
  activities: {
    id: number;
    text: string;
    guest: string;
    timeBooked: string;
  }[];
};

function BookingActivity({
  setShowActivity,
  onClose,
  activities,
}: BookingActivityProps) {
  return (
    <div className="flex flex-col ">
      <div className="flex flex-row items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2 ">
          <button
            onClick={() => setShowActivity(false)}
            className="mr-2 text-gray-600 hover:text-gray-800"
            aria-label="Back"
          >
            <img
              src="/images/arrow-left.png"
              alt="arrow-left"
              className="w-5 h-5 "
            />
          </button>
          <p className="text-xl text-gray-800 font-medium">Activity History</p>
        </div>

        <button
          onClick={onClose}
          className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="px-5 mt-4 ">
        {activities.length === 0 ? (
          <p className="text-gray-500 text-sm italic">
            No activity history for this booking.
          </p>
        ) : (
          activities.map((item) => (
            <div className="flex flex-col border-b  py-3 ">
              <p className="text-gray-800 text-base font-normal ">
                {item.text}{" "}
              </p>
              <div className="flex flex-row justify-between ">
                <p className="text-gray-500 text-sm ">
                  {" "}
                  <span className="font-normal ">by</span>{" "}
                  <span className=" font-bold "> {item.guest}</span>{" "}
                </p>
                <p className="text-gray-500 text-sm font-normal ">
                  {item.timeBooked}{" "}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BookingActivity;
