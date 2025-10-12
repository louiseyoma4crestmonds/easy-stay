import Pagination from "@/organisms/Pagination";
import { useState } from "react";
import { HostDocs } from "src/helpers/dataTypes";

type HostDocListProps = {
  docs: HostDocs[];
};

function HostDocList({ docs }: HostDocListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDocs = docs.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="relative flex flex-col h-full">
      {/* Table Section */}
      <div className="flex flex-col w-full flex-1">
        <div className="overflow-y-auto h-[320px]  ">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-20">
              <tr className="border-b h-12 text-left text-gray-500 text-xs font-semibold bg-gray-50">
                <th className="pl-3">DOCUMENT</th>
                <th>PROPERTY ID</th>
                <th>PROPERTY</th>
                <th className="hidden md:table-cell">DATE SUBMITTED</th>
                <th className="hidden md:table-cell px-4 w-[6%]">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentDocs.map((doc, idx) => (
                <tr key={idx} className="border-b font-sm font-normal">
                  <td className="px-2 py-2 underline md:no-underline">
                    <span className="hidden md:block text-gray-800">
                      {doc.doc}
                    </span>
                  </td>
                  <td className="py-2 text-gray-500">{doc.propertyId}</td>
                  <td className="py-2 text-gray-500 block w-[270px] truncate">
                    {doc.propertyAdd}
                  </td>
                  <td className="py-2 text-gray-500">{doc.dateSub}</td>
                  <td className="hidden md:table-cell py-2 relative">
                    <div className="flex items-center justify-center cursor-pointer">
                      <img
                        src="/images/download.png"
                        alt="download"
                        className="w-6 h-6"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Section */}
      <div className="absolute flex justify-between px-2 py-1 bottom-0 w-full  ">
        <div className="text-sm font-semibold">
          {docs.length > 0 && (
            <>
              <span className="text-gray-500">Showing</span>{" "}
              <span className="text-gray-900">{indexOfFirstItem + 1}</span>–
              <span className="text-gray-900">
                {Math.min(indexOfLastItem, docs.length)}
              </span>{" "}
              <span className="text-gray-500">of</span>{" "}
              <span className="text-gray-900">{docs.length}</span>
            </>
          )}
        </div>

        <Pagination
          listOfItems={docs}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setItemsPerPage={setItemsPerPage}
          prevButton={
            <img
              src="/images/chevron-left.png"
              alt="Previous"
              className="w-5 h-5"
            />
          }
          nextButton={
            <img
              src="/images/chevron-right-svg.svg"
              alt="next"
              className="w-5 h-5"
            />
          }
          paginationDivActiveClass="bg-primary-100 text-primary-600"
        />
      </div>
    </div>
  );
}

export default HostDocList;
