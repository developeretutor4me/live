"use client";
import { Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import FileItemTemp from "./FIleItemTemp";
import DropDown from "./DropDown";
import { useQualificationTutorDoc } from "@/app/admin/hooks/useQualificationTutorDoc";
import { TutorDocument, TutorFile } from "./Data";
import notavailable from "../../../../../public/tutordocsnotavailable.svg";
import Image from "next/image";
interface SortOption {
  value: string;
  label: string;
}
const SortOptions: SortOption[] = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "size-largest", label: "Size (Largest)" },
  { value: "size-smallest", label: "Size (Smallest)" },
];

function MyFiles() {
  const { isLoading, docs, error, mutate } = useQualificationTutorDoc();
  const [selectedOption, setSelectedOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSortOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filtered and sorted data using useMemo for performance
  const filteredAndSortedFiles = useMemo(() => {
    if (!docs || docs.length === 0) return [];

    const allFiles = docs.flatMap((doc: TutorDocument) =>
      doc.files.map((file: TutorFile) => ({ file, doc }))
    );

    let filtered = allFiles;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = allFiles.filter(
        ({ file }: { file: TutorFile }) =>
          typeof file?.fileName === "string" &&
          file.fileName.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    if (selectedOption) {
      filtered.sort(
        (
          { file: a }: { file: TutorFile },
          { file: b }: { file: TutorFile }
        ) => {
          switch (selectedOption) {
            case "name-asc":
              return a.fileName.localeCompare(b.fileName);
            case "name-desc":
              return b.fileName.localeCompare(a.fileName);
            case "size-largest":
              return (Number(b.fileSize) || 0) - (Number(a.fileSize) || 0);
            case "size-smallest":
              return (Number(a.fileSize) || 0) - (Number(b.fileSize) || 0);
            default:
              return 0;
          }
        }
      );
    }

    return filtered;
  }, [docs, searchQuery, selectedOption]);

  return (
    <div className="mt-10 px-1 h-full ">
      <div className="bg-[#EDE8FA] rounded-3xl  py-7 custom-xl:py-7 px-3 sm:px-6 custom-xl:px-[27px] h-fit ">
        {/* top header  */}
        <div className="flex justify-between custom-xl:items-center flex-wrap gap-2 ">
          <h1 className="text-xl sm:text-2xl custom-xl:text-[39.46px] custom-xl:leading-[2.25rem] text-[#685AAD] font-bold pl-2 sm:pl-9 ">
            My Files
          </h1>

          <div className="flex w-fit gap-2 sm:gap-4 flex-col custom-xl:flex-row custom-xl:gap-10 pt-0.5 sm:pr-6 custom-xl:items-center ">
            <DropDown
              options={SortOptions}
              selected={selectedOption}
              onSelect={handleSortOptionSelect}
              placeholder="Sort by"
            />

            <div className="2xl:min-w-[23.7rem] relative">
              <input
                type="text"
                className="px-4 py-[7px] custom-xl:py-3.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-sm custom-lg:text-xl placeholder:text-white"
                placeholder="Search by name"
                onChange={handleSearchChange}
              />
              <Search className="text-white absolute top-1/2 right-6 transform -translate-y-1/2 w-4 custom-lg:w-6 " />
            </div>
          </div>
        </div>

        <div className="bg-[#B4A5D7] mt-7 rounded-xl sm:rounded-3xl custom-xl:rounded-[30.92px] h-[495px] px-3 sm:px-7 custom-xl:pl-[38px] custom-xl:pr-[34px] py-5 sm:py-7 ">
          <div className=" w-full custom-xl:space-y-6 h-full">
            {/* Header Row */}
            <div className="hidden custom-xl:grid custom-xl:grid-cols-5  mb-2 text-sm custom-lg  sm:text-[19.16px] sm:leading-[1.75rem] font-medium custom-xl:pl-[130px]  w-[78%] gap-9   text-white">
              <div className="pl-4 ">File Name</div>
              <div className=" text-end  ">Size</div>
              <div className="text-end pr-6   ">Type</div>
              <div className="text-end ">Date Added</div>
              <div className="text-end  ">Status</div>
            </div>
            <div
              id="style-2"
              className="h-[100%] custom-xl:h-[85%] overflow-y-auto first:space-y-0  space-y-2 sm:space-y-4 pr-3 sm:pr-7 custom-xl:pr-[34px]"
            >
              {isLoading || error || docs.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center">
                  <Image src={notavailable} alt="" />
                </div>
              ) : filteredAndSortedFiles.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <p>No files found matching your search criteria</p>
                  </div>
                </div>
              ) : (
                filteredAndSortedFiles.map(
                  ({ file, doc }: { file: TutorFile; doc: TutorDocument }) => (
                    <div key={file._id}>
                      <FileItemTemp file={file} doc={doc} />
                    </div>
                  )
                )
              )}
            </div>
          </div>
        </div>

        <h1 className="text-xl py-6 custom-xl:py-[52px] sm:text-2xl custom-xl:text-[39.46px] custom-xl:leading-[1rem] text-[#685AAD] font-bold pl-2 sm:pl-9 ">
          Quick Access
        </h1>
        <div className="bg-[#B4A5D7]  rounded-xl sm:rounded-3xl custom-xl:rounded-[30.92px] h-[495px] px-3 sm:px-7 custom-xl:pl-[38px] custom-xl:pr-[34px] py-5 sm:py-7 ">
          <div className=" w-full custom-xl:space-y-6 h-full">
            <div
              id="style-2"
              className="h-[100%]  overflow-y-auto first:space-y-0 flex flex-col gap-4  space-y-2 sm:space-y-4 pr-3 sm:pr-7 custom-xl:pr-[34px]"
            >
              {isLoading
                ? "Loading"
                : docs?.flatMap((doc: TutorDocument) =>
                    doc.files.map((file: TutorFile) => (
                      <div key={file._id}>
                        <FileItemTemp file={file} doc={doc} />
                      </div>
                    ))
                  )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        #style-2::-webkit-scrollbar-track {
          border-radius: 10px;
          background-color: #d0c7e8;
        }

        #style-2::-webkit-scrollbar {
          width: 8px;
          background-color: transparent;
        }

        #style-2::-webkit-scrollbar-thumb {
          border-radius: 10px;

          background-color: #ede8fa;
        }
      `}</style>
    </div>
  );
}

export default MyFiles;
