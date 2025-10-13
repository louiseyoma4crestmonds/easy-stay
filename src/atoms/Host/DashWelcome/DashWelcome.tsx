function DashWelcome() {
  return (
    <div className="w-full bg-green-600 rounded-lg p-4 ">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 ">
            <img
              src="/images/check-circle2.png"
              alt="img"
              className="w-4 h-4 "
            />
            <p className="text-gray-50 font-semibold text-base">
              Congrats on your verification
            </p>
          </div>
          <p className="text-gray-50 font-normal text-sm">
            Great news! Your verification was successful, You can now complete
            your apartment listing.
          </p>
        </div>
        <button className="px-3 py-2 bg-gray-50 rounded-lg text-gray-800 font-medium text-xs">
          Manage Properties
        </button>
      </div>
    </div>
  );
}

export default DashWelcome;
