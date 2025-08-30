import Image from "next/image";
import styles from "./RatingOverview.module.css";
import { RatingBreakdown } from "../ApartmentDetails/ApartmentDetails.types";

type RatingOverviewProps = {
  breakdown: RatingBreakdown;
  overall: number;
};

function RatingOverview({ breakdown, overall }: RatingOverviewProps) {
  return (
    <div className={styles.maindiv}>
      <div className={styles.firstdiv}>
        <p className={styles.P1}>{overall}</p>
        <p className={styles.P2}>Overall Rating</p>
      </div>

      <div className="flex flex-col items-center mt-6  ">
        <div className="flex flex-row w-full gap-4 ">
          <div className="flex flex-row w-[32%] border-r items-center gap-3 ">
            <Image
              src="/images/cleanliness-icon.png"
              alt="cleanliness-icon"
              width={40}
              height={40}
            />
            <div className="flex flex-col ">
              <p className={styles.text}>Cleanliness</p>
              <p className=" text-gray-800 font-normal text-sm  ">
                {breakdown.cleanliness}{" "}
              </p>
            </div>
          </div>

          <div className="flex flex-row w-[32%] border-r items-center gap-3 ">
            <Image
              src="/images/checkin-icon.png"
              alt="checkin-icon"
              width={40}
              height={40}
            />
            <div className="flex flex-col ">
              <p className={styles.text}>Check In</p>
              <p className=" text-gray-800 font-normal text-sm  ">
                {breakdown.checkin}{" "}
              </p>
            </div>
          </div>

          <div className="flex flex-row w-[32%] items-center gap-3 ">
            <Image
              src="/images/location2.png"
              alt="location-icon"
              width={40}
              height={40}
            />
            <div className="flex flex-col ">
              <p className={styles.text}>Location</p>
              <p className=" text-gray-800 font-normal text-sm  ">
                {breakdown.location}{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full gap-4 mt-6  ">
          <div className="flex flex-row w-[50%] border-r justify-center items-center gap-3 ">
            <Image
              src="/images/value-icon.png"
              alt="value-icon"
              width={40}
              height={40}
            />
            <div className="flex flex-col ">
              <p className={styles.text}>Value</p>
              <p className=" text-gray-800 font-normal text-sm  ">
                {breakdown.value}{" "}
              </p>
            </div>
          </div>

          <div className="flex flex-row w-[50%]  items-center gap-3 ">
            <Image
              src="/images/communication.png"
              alt="communication-icon"
              width={40}
              height={40}
            />
            <div className="flex flex-col ">
              <p className={styles.text}>Communication</p>
              <p className=" text-gray-800 font-normal text-sm  ">
                {breakdown.communication}{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RatingOverview;
