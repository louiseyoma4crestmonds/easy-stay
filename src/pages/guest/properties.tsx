import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { property } from "src/helpers/dataTypes";
import { getPropertiesByLocation } from "../api/property";

function Properties() {
  const router = useRouter();
  const [properties, setProperties] = useState<property[]>([]);

  useEffect(() => {
    if (router.query.location !== undefined) {
      getPropertiesByLocation(router.query.location).then((response: any) => {
        setProperties(response.data.data);
      });
    }
  }, [router.query.location]);

  return (
    <div>
      <div>Properties</div>
      <div>
        {properties.map((property: property) => (
          <div>{property.name}</div>
        ))}
      </div>
    </div>
  );
}

export default Properties;
