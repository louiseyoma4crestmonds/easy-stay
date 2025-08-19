import CustomerNavArea from "@/molecules/CustomerNavArea";
import NoSaved from "@/molecules/NoSaved";

export default function MyWishList() {
  const isLoggedIn = true;
  const firstName = "Lekan";

  return (
    <section className="min-h-screen bg-gray-50 w-full pb-10 ">
      <CustomerNavArea
        isLoggedIn={isLoggedIn}
        isOnImage={false}
        firstName={firstName}
        leftIcon="/images/menu-white.png"
        defaultTextColor="text-gray-500"
      />
      <div className="flex w-[70%] justify-center mt-12 gap-6 mx-auto ">
        <NoSaved />
      </div>
    </section>
  );
}
