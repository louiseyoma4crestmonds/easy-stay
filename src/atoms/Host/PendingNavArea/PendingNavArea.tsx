import LogoutIcon from "@/atoms/Icons/LogoutIcon";
import Image from "next/image";
import logoText from "public/images/Text.png";

type PendingNavAreaProps = {
  firstName?: string;
  lastName?: string;
  isMobile?: boolean;
};

function PendingNavArea({
  firstName,
  lastName,
  isMobile,
}: PendingNavAreaProps) {
  const initials = (firstName?.[0] || "") + (lastName?.[0] || "");

  return (
    <div className="flex justify-between items-center sticky bg-white px-10 py-5 ">
      <div className="flex justify-center items-center ">
        <Image
          src={logoText}
          alt="Easy Stay Logo"
          width={isMobile ? 96 : 150}
          height={isMobile ? 40 : 60}
        />
      </div>
      <div className="flex flex-row gap-4 items-center ">
        <div className="h-10 w-10  flex items-center justify-center rounded-full bg-gray-100 text-gray-900 font-medium text-base">
          {" "}
          {initials.toUpperCase()}{" "}
        </div>
        <LogoutIcon />
      </div>
    </div>
  );
}

export default PendingNavArea;
