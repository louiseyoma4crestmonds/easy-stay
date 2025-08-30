export type PaginationProps = {
  listOfItems: any;
  itemsPerPage: any;
  currentPage: number;
  setCurrentPage: (arg: any) => void;
  setItemsPerPage: (arg: any) => void;
  prevButton?: React.ReactNode;
  nextButton?: React.ReactNode;
};
