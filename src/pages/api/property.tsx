import axios from "axios";
import { endpointUrl } from "src/services/server";

export async function getLocations() {
  const response = await axios
    .get(`${endpointUrl}/easystay/locations`)
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function getPropertiesNearby(
  usersLattitude: string,
  usersLongitude: String
) {
  const response = await axios
    .get(
      `${endpointUrl}/easystay/properties-nearby/${usersLattitude}/${usersLongitude}`
    )
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function getPopularProperties() {
  const response = await axios
    .get(`${endpointUrl}/easystay/popular/properties`)
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function getPropertiesByLocation(locationId: any) {
  const response = await axios
    .get(`${endpointUrl}/easystay/properties/${locationId}`)
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function getProperty(propertyId: any) {
  const response = await axios
    .get(`${endpointUrl}/easystay/property/${propertyId}`)
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}
