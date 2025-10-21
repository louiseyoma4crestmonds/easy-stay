import { useEffect, useState } from "react";
import styles from "./Step1Property.module.css";
import {
  getApartmentTypes,
  getLocationFilterParameters,
  getLocationNeighbourhoods,
  getLocations,
} from "src/pages/api/property";
import CustomDropdown from "@/molecules/CustomDropdown";
import { DropdownOption } from "@/molecules/CustomDropdown/CustomDropdown.types";
import Button from "@/atoms/Button";
import Tooltip from "@/atoms/Tooltip";

type Apartment = {
  id: number;
  type: DropdownOption | undefined;
  images: File[];
  open: boolean;
};

export type Property = {
  id: number;
  location: DropdownOption | undefined;
  address: string;
  deed: File | null;
  webLink: string;
  open: boolean;
  neighbourhood: DropdownOption | undefined;
  apartments: Apartment[];
};

type Step1PropertyProps = {
  properties: Property[];
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>;
  onProceed: () => void;
};

function Step1Property({
  properties,
  setProperties,
  onProceed,
}: Step1PropertyProps) {
  const [propertyLocations, setPropertyLocations] = useState([]);
  useEffect(() => {
    getLocationFilterParameters().then((res: any) => {
      console.log("res", res.data.data.location);
      setPropertyLocations(res.data.data);
    });
  }, []);

  const [availableLocations, setAvailableLocations] = useState<any>([]);
  const [choosenLocation, setChoosenLocation] = useState<any>();
  const [availableNeighbourhoods, setAvailableNeighbourhoods] = useState<any>(
    []
  );
  const [availableApartmentTypes, setAvailableApartmentTypes] = useState([]);

  useEffect(() => {
    getLocations().then((response: any) => {
      setAvailableLocations(response.data.data);
    });

    getApartmentTypes().then((response: any) => {
      setAvailableApartmentTypes(response.data.data);
    });
  }, []);

  useEffect(() => {
    getLocationNeighbourhoods(choosenLocation?.id).then((response: any) => {
      setAvailableNeighbourhoods(response?.data?.data);
    });
  }, [choosenLocation]);

  console.log("Nna mehnnnn: ", choosenLocation);

  // helpers
  const toggleProperty = (pid: number) =>
    setProperties((prev) =>
      prev.map((p) => (p.id === pid ? { ...p, open: !p.open } : p))
    );

  const toggleApartment = (pid: number, aid: number) =>
    setProperties((prev) =>
      prev.map((p) =>
        p.id === pid
          ? {
              ...p,
              apartments: p.apartments.map((a) =>
                a.id === aid ? { ...a, open: !a.open } : a
              ),
            }
          : p
      )
    );

  const addProperty = () => {
    setProperties((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        location: undefined,
        address: "",
        deed: null,
        webLink: "",
        open: true,
        neighbourhood: undefined,
        apartments: [{ id: 1, type: undefined, images: [], open: true }],
      },
    ]);
  };

  const addApartment = (pid: number) =>
    setProperties((prev) =>
      prev.map((p) =>
        p.id === pid
          ? {
              ...p,
              apartments: [
                ...p.apartments,
                {
                  id: p.apartments.length + 1,
                  type: undefined,
                  images: [],
                  open: true,
                },
              ],
            }
          : p
      )
    );

  // handle simple field updates
  const updatePropertyField = (
    pid: number,
    field: keyof Omit<Property, "id" | "open" | "apartments">,
    value: any
  ) =>
    setProperties((prev) =>
      prev.map((p) => (p.id === pid ? { ...p, [field]: value } : p))
    );

  const updateApartmentField = (
    pid: number,
    aid: number,
    field: keyof Omit<Apartment, "id" | "open">,
    value: any
  ) =>
    setProperties((prev) =>
      prev.map((p) =>
        p.id === pid
          ? {
              ...p,
              apartments: p.apartments.map((a) =>
                a.id === aid ? { ...a, [field]: value } : a
              ),
            }
          : p
      )
    );

  // remove deed file for a property
  const removePropertyFile = (pid: number) =>
    updatePropertyField(pid, "deed", null);

  // Add photos (append to current images)
  const addApartmentImages = (pid: number, aid: number, files: File[]) =>
    setProperties((prev) =>
      prev.map((p) =>
        p.id === pid
          ? {
              ...p,
              apartments: p.apartments.map((a) =>
                a.id === aid ? { ...a, images: [...a.images, ...files] } : a
              ),
            }
          : p
      )
    );

  // Remove a single image by index
  const removeApartmentImage = (pid: number, aid: number, index: number) =>
    setProperties((prev) =>
      prev.map((p) =>
        p.id === pid
          ? {
              ...p,
              apartments: p.apartments.map((a) =>
                a.id === aid
                  ? {
                      ...a,
                      images: a.images.filter((_, i) => i !== index),
                    }
                  : a
              ),
            }
          : p
      )
    );

  // Delete the entire apartment
  const deleteApartment = (pid: number, aid: number) =>
    setProperties((prev) =>
      prev.map((p) =>
        p.id === pid
          ? { ...p, apartments: p.apartments.filter((a) => a.id !== aid) }
          : p
      )
    );

  const isValid = properties.some(
    (p) =>
      p.location &&
      p.address.trim() !== "" &&
      p.deed &&
      p.apartments.some((a) => a.type) // at least one apartment has a type
  );

  //TO FORMAT FILE SIZE
  const formatSize = (bytes: number) =>
    bytes > 1048576
      ? `${(bytes / 1048576).toFixed(1)} MB`
      : `${(bytes / 1024).toFixed(1)} KB`;

  return (
    <div>
      <div className="flex flex-col ">
        <div className="flex flex-row items-center justify-between ">
          <p className="text-xl font-semibold text-gray-900 ">Properties</p>
          <button className={styles.btn1} onClick={addProperty}>
            {" "}
            <img
              src="/images/plus-outline.png"
              alt="add img"
              className="w-5 h-5 "
            />{" "}
            Add Property
          </button>
        </div>

        <p className="text-gray-500 font-normal text-base md:w-[50%]  ">
          To begin, share some details about your property so we can set you up
          for success.
        </p>
      </div>

      <div className="   md:mt-6 md:space-y-8 ">
        {properties.map((property) => (
          <div
            key={property.id}
            className=" bg-white rounded-lg pb-6 mb-6 space-y-4"
          >
            {/* Property header */}

            <div
              className={`flex items-center justify-between cursor-pointer pt-4 px-6 ${
                property.open ? "border-b pb-4" : " "
              }`}
              onClick={() => toggleProperty(property.id)}
            >
              {/* LEFT SIDE: arrow + label when open */}
              <div className="flex items-center gap-2">
                {/* arrow left when open, right when closed */}
                {property.open && (
                  <img
                    src="/images/chevron-down-outline.png"
                    alt="toggle"
                    className={`w-5 h-5 transition-transform duration-200 ${
                      property.open ? "rotate-180" : ""
                    }`}
                  />
                )}
                <h3 className="text-xl font-semibold text-gray-900">
                  Property {property.id}
                </h3>
              </div>

              {/* RIGHT SIDE: Add Apartment only when open */}
              {property.open && (
                <button
                  className={styles.btn3}
                  onClick={(e) => {
                    e.stopPropagation(); // so it doesn't toggle
                    addApartment(property.id);
                  }}
                >
                  <img
                    src="/images/plus-outline.png"
                    alt="add img"
                    className="w-4 h-4"
                  />
                  Add Apartment
                </button>
              )}

              {/* CLOSED STATE: arrow on far right */}
              {!property.open && (
                <img
                  src="/images/chevron-down-outline.png"
                  alt="toggle"
                  className="w-5 h-5 ml-2"
                />
              )}
            </div>

            {property.open && (
              <div className="space-y-4 mt-2">
                <div className="w-full px-6 pb-6  border-b">
                  <div className="w-full flex items-center gap-4 pb-5 md:flex-row  ">
                    {/* Location */}
                    <div className="w-[50%] ">
                      <label className="block text-sm text-gray-900 font-medium pb-1">
                        State
                      </label>
                      <CustomDropdown
                        placeholder="Select"
                        options={availableLocations}
                        value={property.location}
                        onChange={(option) => {
                          updatePropertyField(property.id, "location", option);
                          setChoosenLocation(option);
                        }}
                        buttonClassName={styles.btndiv}
                        dropdownClassName={styles.dropdowndiv}
                        toggleIcon="/images/chevron-down-outline.png"
                        // spanClassName="flex items-center gap-3"
                      />
                    </div>

                    {/* Neighbourhood */}
                    <div className="w-[50%] ">
                      <label className="block text-sm text-gray-900 font-medium pb-1">
                        Neighbourhood
                      </label>
                      <CustomDropdown
                        placeholder="Select"
                        options={availableNeighbourhoods}
                        value={property.neighbourhood}
                        onChange={(option) =>
                          updatePropertyField(
                            property.id,
                            "neighbourhood",
                            option
                          )
                        }
                        buttonClassName={styles.btndiv}
                        dropdownClassName={styles.dropdowndiv}
                        toggleIcon="/images/chevron-down-outline.png"
                        // spanClassName="flex items-center gap-3"
                      />
                    </div>
                  </div>
                  {/* Address */}
                  <div className="w-full md:w-full ">
                    <label className="block text-sm text-gray-900 font-medium pb-1">
                      Address
                    </label>
                    <div className="relative ">
                      <div className="absolute left-3 top-[50%] -translate-y-1/2">
                        {" "}
                        <img
                          src="/images/map-pin-outline.png"
                          alt="img"
                          className="w-5 h-5 "
                        />{" "}
                      </div>
                      <input
                        placeholder="Input Address"
                        className={styles.inputdiv}
                        value={property.address}
                        onChange={(e) =>
                          updatePropertyField(
                            property.id,
                            "address",
                            e.target.value
                          )
                        }
                      />{" "}
                    </div>
                  </div>
                </div>

                {/* Deed upload */}
                {/* Deed upload */}
                <div className="w-full px-6 py-4 flex flex-col">
                  <label className="block text-sm text-gray-900 font-medium pb-1">
                    As a Property Owner
                  </label>
                  <p className="text-gray-600 text-sm font-normal">
                    Upload a document that proves your ownership (e.g.,
                    Certificate of Occupancy (C of O), Deed of Assignment,
                    Mortgage Deed).
                  </p>

                  <input
                    id={`deed-input-${property.id}`}
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      updatePropertyField(
                        property.id,
                        "deed",
                        e.target.files?.[0] || null
                      )
                    }
                  />

                  <div
                    className={`mt-3 flex items-center border border-gray-300 rounded-lg overflow-hidden ${
                      property.deed ? "bg-transparent" : "bg-gray-50"
                    }`}
                  >
                    {!property.deed && (
                      <button
                        type="button"
                        onClick={() =>
                          document
                            .getElementById(`deed-input-${property.id}`)
                            ?.click()
                        }
                        className="bg-black text-white p-4 text-sm rounded-l-lg"
                      >
                        Choose file
                      </button>
                    )}

                    <div className="flex-1 px-4 py-3">
                      {property.deed ? (
                        <div className="flex justify-between items-center w-full">
                          {/* File name + size */}
                          <div className="flex items-start gap-3">
                            <img
                              src="/images/file_upload_icon.png"
                              alt="file"
                              className="w-7 h-7 mt-0.5"
                            />
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-700 truncate">
                                {property.deed.name}
                              </span>
                              <span className="text-sm font-normal text-gray-500">
                                {formatSize(property.deed.size)}
                              </span>
                            </div>
                          </div>

                          {/* Delete button far right */}
                          <button
                            type="button"
                            onClick={() => removePropertyFile(property.id)}
                            // className="ml-4"
                          >
                            <img
                              src="/images/bin.png"
                              alt="delete"
                              className="w-6 h-6"
                            />
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-900">
                          No file chosen
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Optional Web link */}
                <div className="w-full px-6  ">
                  <label className="block text-sm text-gray-900 font-medium pb-1">
                    Web Link to Apartment (Optional)
                  </label>
                  <div className="relative ">
                    <div className="absolute left-3 top-[50%] -translate-y-1/2">
                      {" "}
                      <img
                        src="/images/globe-outline2.png"
                        alt="img"
                        className="w-5 h-5 "
                      />{" "}
                    </div>
                    <input
                      className={styles.inputdiv}
                      placeholder="https://"
                      value={property.webLink}
                      onChange={(e) =>
                        updatePropertyField(
                          property.id,
                          "webLink",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>

                {/* Apartments */}
                {property.apartments.map((apt, index) => (
                  <div
                    key={apt.id}
                    className="border border-gray-200 rounded-lg mx-6 mt-4  "
                  >
                    <div
                      className={`flex justify-between py-5 px-4 items-center cursor-pointer 
    ${apt.open ? "bg-gray-50 border-b" : "bg-transparent"}`}
                      onClick={() => toggleApartment(property.id, apt.id)}
                    >
                      <div>
                        <p className="font-semibold text-gray-900 text-base ">
                          Apartment {index + 1}
                        </p>
                        {apt.open && (
                          <p className="text-gray-600 font-normal text-sm">
                            Please confirm this apartment is located at the
                            property address you just provided.
                          </p>
                        )}
                      </div>

                      <div>
                        <img
                          src="/images/chevron-down-outline.png"
                          alt="toggle"
                          className={`w-5 h-5 transition-transform duration-200 ${
                            apt.open ? "rotate-180" : ""
                          }`}
                        />
                      </div>

                      {/* <span>{apt.open ? "−" : "+"}</span> */}
                    </div>

                    {apt.open && (
                      <div className="space-y-3 px-4 py-5 ">
                        <div>
                          <label className="block text-sm text-gray-900 font-medium pb-1">
                            Apartment Type
                          </label>
                          <CustomDropdown
                            placeholder="Select"
                            options={availableApartmentTypes}
                            value={apt.type}
                            onChange={(option) =>
                              updateApartmentField(
                                property.id,
                                apt.id,
                                "type",
                                option
                              )
                            }
                            buttonClassName={styles.btndiv}
                            dropdownClassName={styles.dropdowndiv}
                            toggleIcon="/images/chevron-down-outline.png"
                          />
                        </div>

                        <div>
                          <div className="hidden md:flex items-center gap-1 pb-1">
                            <label className="block text-sm text-gray-900 font-medium ">
                              Property Photos
                            </label>
                            <Tooltip
                              content={
                                <div className="w-[450px] text-sm ">
                                  <p className="font-medium text-gray-900 ">
                                    Quick Guide to Apartment Photos
                                  </p>
                                  <p className="font-medium text-gray-900  mt-3">
                                    Key Constraints:
                                  </p>
                                  <ul className="list-disc text-gray-600 ml-5  ">
                                    <li>
                                      Min [e.g., 5-8] / Max [e.g., 20-30]
                                      photos.
                                    </li>
                                    <li>JPG/PNG, max [e.g., 5MB] per photo.</li>
                                    <li>No watermarks.</li>
                                  </ul>
                                  <p className="font-medium text-gray-900  mt-3">
                                    What to Shoot:
                                  </p>
                                  <ul className="list-disc text-gray-600 ml-5  ">
                                    <li>
                                      Every room (living, kitchen, bedrooms,
                                      bathrooms) from a wide angle.
                                    </li>
                                    <li>
                                      Exterior, compound, balcony (if
                                      applicable).
                                    </li>
                                    <li>
                                      Highlight key features like natural light,
                                      storage, and amenities.
                                    </li>
                                  </ul>
                                  <p className="font-medium text-gray-900  mt-3">
                                    Tips for Best Results:
                                  </p>
                                  <ul className="list-disc text-gray-600 ml-5  ">
                                    <li>
                                      Brighten with natural light and turn on
                                      all lights.
                                    </li>
                                    <li>Clean & declutter everything.</li>
                                    <li>
                                      Use wide shots and keep the camera level.
                                    </li>
                                  </ul>
                                </div>
                              }
                            >
                              <div className={styles.tooltipDiv}>
                                <img
                                  src="/images/info.png"
                                  alt="img"
                                  className="w-4 h-4 "
                                />
                              </div>
                            </Tooltip>{" "}
                          </div>

                          {/* Drop zone */}
                          <div
                            className="border-2 border-dashed border-gray-200 bg-gray-50 rounded-lg flex flex-col items-center justify-center p-6 text-center cursor-pointer"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              e.preventDefault();
                              if (e.dataTransfer.files)
                                addApartmentImages(
                                  property.id,
                                  apt.id,
                                  Array.from(e.dataTransfer.files)
                                );
                            }}
                            onClick={() =>
                              document
                                .getElementById(
                                  `photo-input-${property.id}-${apt.id}`
                                )
                                ?.click()
                            }
                          >
                            <img
                              src="/images/upload.png"
                              alt="upload"
                              className="w-10 h-10 mb-3"
                            />
                            <p className="text-gray-500 text-sm font-normal">
                              Click to add or drag and drop
                            </p>
                            <p className="text-gray-500 font-semibold text-xs mt-1">
                              Max file size: 30MB
                            </p>
                            <input
                              id={`photo-input-${property.id}-${apt.id}`}
                              type="file"
                              multiple
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                addApartmentImages(
                                  property.id,
                                  apt.id,
                                  Array.from(e.target.files || [])
                                )
                              }
                            />
                          </div>

                          {/* Thumbnails */}
                          {apt.images.length > 0 && (
                            <div className="mt-4 flex md:flex-row items-center gap-3">
                              {apt.images.map((img, index) => {
                                const preview = URL.createObjectURL(img);
                                return (
                                  <div
                                    key={index}
                                    className="relative w-28 h-28 rounded-2xl overflow-hidden border"
                                  >
                                    <img
                                      src={preview}
                                      alt={img.name}
                                      className="object-cover w-full h-full"
                                    />
                                    <button
                                      type="button"
                                      onClick={() =>
                                        removeApartmentImage(
                                          property.id,
                                          apt.id,
                                          index
                                        )
                                      }
                                      className="absolute top-1 w-4 h-4 flex items-center justify-center right-1 bg-[#D9D9D9] rounded-full p-1"
                                    >
                                      <img
                                        src="/images/bin.png"
                                        alt="delete"
                                        className="w-4 h-4 invert"
                                      />
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {/* Delete Apartment button */}
                          <div className="mt-4">
                            <button
                              className={styles.btn2}
                              onClick={() =>
                                deleteApartment(property.id, apt.id)
                              }
                            >
                              <img
                                src="/images/bin.png"
                                alt="delete"
                                className="w-5 h-5"
                              />
                              Delete Apartment
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end md:py-6 ">
        <Button variant="primary" disabled={!isValid} onClick={onProceed}>
          Proceed
        </Button>
      </div>
    </div>
  );
}

export default Step1Property;
