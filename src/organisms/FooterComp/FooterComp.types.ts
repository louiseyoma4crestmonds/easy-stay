export type Item = {
  id: number;
  name: string;
  cover_text: string;
};

export interface Props {
  data: Item[];
}
