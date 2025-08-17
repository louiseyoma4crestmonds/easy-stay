import FooterComp from "@/organisms/FooterComp";
import HeroBanner from "@/organisms/HeroBanner";

export default function AboutUs() {
  return (
    <main className="min-h-screen flex flex-col ">
      <HeroBanner
        backgroundImg="/images/hero-three.png"
        primaryText="About Us"
        secondaryText="At Easy Stay, we're building a community where convenience, quality, and trust come together for every stay."
      />

      {/* TEXT SECTION */}
      <section className="bg-gray-50 px-36 py-24">
        <div className="w-[70%]">
          <p className="text-gray-800 font-normal text-xl mb-14">
            Welcome to Easy Stay, the premier short-let platform designed to
            connect guests with exceptional temporary accommodations and empower
            property owners to effortlessly monetize their spaces. We believe in
            creating seamless experiences, offering a diverse range of
            comfortable and stylish homes for travelers, while providing hosts
            with the tools and support they need to succeed.
          </p>

          <p className="text-primary-500 font-normal text-xl mb-6">
            We’ve helped hundreds of people find a shortlet
          </p>

          <p className="text-gray-900 font-semibold text-5xl mb-6">
            We’re only just getting started on our journey
          </p>

          <div className="w-[80%] flex flex-row items-center gap-28 mt-16">
            <div className="flex flex-col ">
              <p className="font-semibold text-primary-600 text-6xl ">1000+</p>
              <p className="text-gray-900 font-medium text-lg ">Apartments</p>
            </div>
            <div className="flex flex-col mt-8 ">
              <p className="font-semibold text-primary-600 text-6xl ">100%</p>
              <p className="text-gray-900 font-medium text-lg  ">
                Host Compliance based on Guest Ratings
              </p>
            </div>
          </div>
          <div className="w-[80%] flex flex-row items-center gap-28 mt-16">
            <div className="flex flex-col ">
              <p className="font-semibold text-primary-600 text-6xl ">500+</p>
              <p className="text-gray-900 font-medium text-lg ">Hosts</p>
            </div>
            <div className="flex flex-col ">
              <p className="font-semibold text-primary-600 text-6xl ">200+</p>
              <p className="text-gray-900 font-medium text-lg ">
                5-star reviews
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*//////section*/}
      <section className="border bg-primary-50 border-gray-300 ">
        <div className="flex flex-col items-center justify-center py-16 ">
          <div className=" flex flex-col items-center">
            <p className="font-semibold text-primary-600 text-base ">
              Our Values
            </p>
            <p className="text-gray-900 font-semibold text-4xl pt-2  ">
              Let us tell you about our values
            </p>
            <p className="text-gray-500 font-normal text-xl pt-4 ">
              Our shared values keep us connected and guide us as one team.
            </p>
          </div>
          <div className="mt-14 w-full gap-6 flex flex-row items-center justify-center ">
            <div className=" w-[28%] flex flex-col items-center">
              <img
                src="/images/featured-icon-host.png"
                alt="Easy Stay Logo"
                className="h-10 w-10"
              />
              <p className="text-gray-800 font-medium text-xl  py-4 ">
                Powering Hosts
              </p>
              <p className="text-gray-500 font-normal text-base text-center ">
                Providing hosts with the tools, flexibility, and support to
                maximize their earnings and manage their properties effectively.
              </p>
            </div>
            <div className="w-[28%] flex flex-col items-center">
              <img
                src="/images/featured-icon-heart.png"
                alt="Easy Stay Logo"
                className="h-10 w-10"
              />
              <p className="text-gray-800 font-medium text-xl  py-4  ">
                Trusted Connections
              </p>
              <p className="text-gray-500 font-normal text-base text-center ">
                Fostering a secure and reliable environment where hosts and
                guests can confidently interact and transact.
              </p>
            </div>
            <div className="w-[28%] flex flex-col items-center">
              <img
                src="/images/featured-icon-choices.png"
                alt="Easy Stay Logo"
                className="h-10 w-10"
              />
              <p className="text-gray-800 font-medium text-xl py-4 ">
                Diverse Choices
              </p>
              <p className="text-gray-500 font-normal text-base text-center ">
                Offering a wide array of unique properties to ensure every guest
                finds their perfect temporary home.
              </p>
            </div>
          </div>
          <div className="mt-14 w-full gap-6 flex flex-row items-center justify-center ">
            <div className=" w-[28%] flex flex-col items-center">
              <img
                src="/images/featured-icon-happy.png"
                alt="Easy Stay Logo"
                className="h-10 w-10"
              />
              <p className="text-gray-800 font-medium text-xl  py-4 ">
                Satisfied Customers
              </p>
              <p className="text-gray-500 font-normal text-base text-center ">
                Committed to offering and facilitating well-maintained,
                comfortable properties that provide memorable stays.
              </p>
            </div>
            <div className="w-[28%] flex flex-col items-center">
              <img
                src="/images/featured-icon-clarity.png"
                alt="Easy Stay Logo"
                className="h-10 w-10"
              />
              <p className="text-gray-800 font-medium text-xl  py-4  ">
                Transparency & Clarity
              </p>
              <p className="text-gray-500 font-normal text-base text-center ">
                Ensuring clear communication regarding pricing, policies, and
                property details for both parties.
              </p>
            </div>
            <div className="w-[28%] flex flex-col items-center">
              <img
                src="/images/featured-icon-support.png"
                alt="Easy Stay Logo"
                className="h-10 w-10"
              />
              <p className="text-gray-800 font-medium text-xl py-4 ">
                Dedicated Support
              </p>
              <p className="text-gray-500 font-normal text-base text-center ">
                Providing responsive and helpful assistance to resolve issues
                and ensure satisfaction for our entire community.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FooterComp />
    </main>
  );
}
