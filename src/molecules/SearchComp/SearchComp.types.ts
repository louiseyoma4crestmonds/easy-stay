import { property } from "src/helpers/dataTypes";

export type SearchCompProps = {
  properties: property[];
  onRemove: (id: string | number) => void;
  selectedLocation: string | undefined;
  headingText?: string;
  popularProperties: property[];
  propertiesNearby: property[];
};
