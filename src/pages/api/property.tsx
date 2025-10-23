import axios from "axios";
import { endpointUrl } from "src/services/server";

export async function getLocations() {
  const response = await axios
    .get(`${endpointUrl}/easystay/locations`)
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function getLocationNeighbourhoods(locationId: any) {
  const response = await axios
    .get(`${endpointUrl}/easystay/neighbourhood/${locationId}`)
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function getPropertyReviews(propertyId: any) {
  const response = await axios
    .get(`${endpointUrl}/easystay/property/reviews/${propertyId}`)
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function getPropertyAmenities(propertyId: any) {
  const response = await axios
    .get(`${endpointUrl}/easystay/property/amenities/${propertyId}`)
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

export async function getApartmentTypes() {
  const response = await axios
    .get(`${endpointUrl}/easystay/property-types`)
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function getCountOfApartmentTypes(
  typeId: number,
  propertyLocation: string
) {
  const response = await axios
    .get(
      `${endpointUrl}/easystay/property-types/count/${propertyLocation}/${typeId}`
    )
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function getPropertyTypesFilterParameters(
  propertyLocation: string
) {
  const response = await axios
    .get(
      `${endpointUrl}/easystay/property-types/filter-parameters/${propertyLocation}`
    )
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function getAmenitiezFilterParameters(propertyLocation: string) {
  const response = await axios
    .get(
      `${endpointUrl}/easystay/amenities/filter-parameters/${propertyLocation}`
    )
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function getRatingsFilterParameters(propertyLocation: string) {
  const response = await axios
    .get(
      `${endpointUrl}/easystay/ratings/filter-parameters/${propertyLocation}`
    )
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function getLocationFilterParameters() {
  const response = await axios
    .get(`${endpointUrl}/easystay/locations/filter-parameters`)
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function getGuestBookings(guestEmail: string) {
  const response = await axios
    .get(`${endpointUrl}/easystay/guest/bookings/${guestEmail}`)
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function searchWithFilterParameters(filterParameters: any) {
  const data = {
    filterParameters,
  };

  const response = await axios
    .post(`${endpointUrl}/easystay/filter-parameters/search`, data)
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function propertiesSearch(filterParameters: any) {
  const data = {
    filterParameters,
  };

  const response = await axios
    .post(`${endpointUrl}/easystay/properties-search`, data)
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function registerProperty(properties: any, token: string) {
  const response = await axios
    .post(`${endpointUrl}/easystay/register/properties`, properties, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res);

  return response;
}

export async function initiateFlutterwavePayment(data: any, token: string) {
  const response = await axios
    .post(`${endpointUrl}/easystay/initiate-flutterwave-payment`, data, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res);

  return response;
}

export async function verifyFlutterwavePayment(data: any) {
  const response = await axios
    .post(`${endpointUrl}/easystay/verify-flutterwave-payment`, data, {})
    .then((res) => res);

  return response;
}
