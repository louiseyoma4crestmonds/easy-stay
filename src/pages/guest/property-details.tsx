import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { property } from "src/helpers/dataTypes";
import { getProperty } from "../api/property";

function PropertyDetails() {
  const router = useRouter();
  const [property, setProperty] = useState<property>();

  useEffect(() => {
    if (router.query.propertyId !== undefined) {
      getProperty(router.query.propertyId).then((response: any) => {
        setProperty(response.data.data);
      });
    }
  }, [router.query.propertyId]);

  return (
    <div>
      <div>Property Details</div>
      <div>
        <div>{property ? property.name : ""}</div>
      </div>
    </div>
  );
}

export default PropertyDetails;
