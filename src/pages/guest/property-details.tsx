import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { property } from "src/helpers/dataTypes";
import { getLocations, getProperty } from "../api/property";
import CustomerNavArea from "@/molecules/CustomerNavArea";
import ApartmentDetails from "@/molecules/ApartmentDetails";
import FooterComp from "@/organisms/FooterComp";
import PageSkeletons from "@/components/PageSkeletons";
import { useSession } from "next-auth/react";
import useSessionDetails from "@/hooks/useSessionDetails";

function PropertyDetails() {
  const router = useRouter();
  const [property, setProperty] = useState<property>();
  const [cities, setCities] = useState([]);
  const { status } = useSession();
  const { firstName } = useSessionDetails();
  const isLoggedIn = status === "authenticated";

  const [width, setWidth] = useState<number>(0);
  const isMobile = width <= 767;

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  //  Show skeleton while NextAuth is checking
  // if (status === "loading") {
  //   return <PageSkeletons />;
  // }

  // GET CITIES
  useEffect(() => {
    getLocations().then((response) => {
      setCities(response.data.data);
    });
  }, []);

  useEffect(() => {
    if (router.query.propertyId !== undefined) {
      getProperty(router.query.propertyId).then((response: any) => {
        setProperty(response.data.data);
      });
    }
  }, [router.query.propertyId]);

  console.log("property", property);

  return (
    <main className="min-h-screen flex flex-col  ">
      {status === "loading" ? (
        <PageSkeletons />
      ) : (
        <>
          <CustomerNavArea
            isLoggedIn={isLoggedIn}
            isOnImage={false}
            firstName={firstName}
            leftIcon="/images/menu-white.png"
            defaultTextColor="text-gray-500"
            isMobile={isMobile}
          />

          {property && (
            <ApartmentDetails
              apartment={property}
              isLoggedIn={isLoggedIn}
              isMobile={isMobile}
            />
          )}

          <FooterComp data={cities} />
        </>
      )}
    </main>
  );
}

export default PropertyDetails;
