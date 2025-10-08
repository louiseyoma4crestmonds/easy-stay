type VerificationTimerProps = {
  timer: number;
  message: string;
};

function VerificationTimer(props: VerificationTimerProps) {
  const { timer, message } = props;

  return (
    <div className="w-full ">
      <div className="rounded-lg bg-[#E3A008] p-5 flex flex-row justify-between items-center  ">
        <div className="flex flex-col ">
          <div className="flex flex-row gap-2 items-center ">
            <img
              src="/images/exclamation_white.png"
              alt="img"
              className="w-5 h-5 "
            />
            <p className="text-gray-50 text-base font-semibold ">
              Action Required
            </p>{" "}
          </div>
          <p className="text-gray-100 font-sm font-normal w-[70%] ">
            {message}{" "}
          </p>
        </div>

        <div className="flex flex-row gap-1 items-center pr-3 ">
          <img
            src="/images/clock-outline-2.png"
            alt="clock"
            className="w-6 h-6 "
          />
          <p className="text-gray-50 font-semibold text-sm ">{timer} </p>{" "}
        </div>
      </div>
    </div>
  );
}

export default VerificationTimer;
