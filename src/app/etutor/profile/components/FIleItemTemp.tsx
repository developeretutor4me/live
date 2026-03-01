import Image from "next/image";
import React, { useState } from "react";
import Foldericon from "../../../../../public/folder icon with profile badge.svg";
import downloadicon from "../../../../../public/Download_icon_file.svg";
import { TutorDocument, TutorFile } from "./Data";

interface IFileItemTemp {
  file: TutorFile;
  doc: TutorDocument;
}
function FileItemTemp({ file, doc }: IFileItemTemp) {
  const [isExpanded, setisExpanded] = useState(false);

  const downloadFromS3 = async (
    s3Url: string,
    customFileName?: string
  ): Promise<void> => {
    try {
      const response = await fetch(s3Url, {
        method: "GET",
        headers: { "Cache-Control": "no-cache" },
      });

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);

      const fileName =
        customFileName ||
        decodeURIComponent(s3Url.split("/").pop() || "download");

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("S3 download failed:", error);

      // Fallback: Force download using window.open with blob
      try {
        const response = await fetch(s3Url);
        const blob = await response.blob();
        const fileName =
          customFileName ||
          decodeURIComponent(s3Url.split("/").pop() || "download");

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = fileName;

        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 100);
      } catch (fallbackError) {
        throw new Error("Download failed: CORS policy or network issue");
      }
    }
  };
  const getReadableFileType = (mimeType: string): string => {
    const mimeMap: Record<string, string> = {
      "application/pdf": "PDF",
      "application/msword": "DOC",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        "DOCX",
      "text/plain": "TXT",
      "image/jpeg": "JPEG",
      "image/png": "PNG",
      "image/gif": "GIF",
    };

    return mimeMap[mimeType] || "UNKNOWN";
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    } else if (bytes >= 1024) {
      return `${(bytes / 1024).toFixed()} KB`;
    } else {
      return `${bytes} B`;
    }
  };

  return (
    <div
      className={`w-full max-w-[1284px] bg-[#EDE8FA] rounded-lg custom-2xl:rounded-[15px] custom-2xl:pl-6 h-full ${
        isExpanded
          ? "h-auto custom-2xl:h-[100px] transition-all duration-300 ease-out"
          : "h-auto custom-2xl:h-20 transition-all duration-300 ease-out"
      } overflow-hidden cursor-pointer`}
      onMouseEnter={() => setisExpanded(true)}
      onMouseLeave={() => setisExpanded(false)}
    >
      <div className="flex flex-col custom-2xl:flex-row custom-2xl:items-start h-full">
        <div className="flex-1 px-3 py-2 flex flex-row custom-2xl:flex-row items-start custom-2xl:items-center gap-4 sm:gap-6 md:gap-8 custom-xl:gap-[52px] my-auto">
          <div className=" hidden sm:block custom-2xl:hidden">
            <Image src={Foldericon} alt="" className="w-12 h-12 " />
          </div>
          <div className="hidden custom-2xl:block">
            <Image src={Foldericon} alt="" />
          </div>

          {/* Mobile/Tablet Collapsed View - Shows only essential info */}
          <div className="block custom-2xl:hidden w-full  ">
            <div className="flex items-center justify-between w-full">
              <div className="flex-1 min-w-0">
                <div className="text-[#685aad] text-base sm:text-lg font-medium truncate max-w-[10rem]">
                  {file?.fileName}
                </div>
                <div className="flex items-center gap-2 text-[#685aad] text-sm opacity-75">
                  <span>{getReadableFileType(file?.fileType || "")}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <div
                      className={`min-h-3 min-w-3 ${
                        doc?.status === "Approved"
                          ? "bg-[#00DAE5]"
                          : "bg-[#FC7777]"
                      }  rounded-sm`}
                    ></div>
                    <span>
                      {doc?.status === "Approved" ? "Completed" : "Pending"}
                    </span>
                  </div>
                </div>
              </div>

              <button
                className="ml-4 p-2 text-[#685aad] hover:bg-white/20 rounded-lg transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setisExpanded(!isExpanded);
                }}
              >
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {/* Expanded Details for Mobile/Tablet */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-300 ease-in-out ${
                isExpanded
                  ? "mt-4  opacity-100 max-h-96 overflow-visible"
                  : "opacity-0 max-h-0 overflow-hidden"
              }`}
            >
              <div className="flex flex-col">
                <span className="text-[#685aad] text-sm mb-1 opacity-75">
                  Subject and level
                </span>
                <span className="text-[#685aad] text-base font-medium">
                  {file?.fileName}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[#685aad] text-sm mb-1 opacity-75">
                  Size
                </span>
                <span className="text-[#685aad] text-base font-medium">
                  {formatFileSize(Number(file?.fileSize))}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[#685aad] text-sm mb-1 opacity-75">
                  Type
                </span>
                <span className="text-[#685aad] text-base font-medium">
                  {getReadableFileType(file?.fileType || "")}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[#685aad] text-sm mb-1 opacity-75">
                  Date and Time
                </span>
                <span className="text-[#685aad] text-base font-medium">
                  {new Date(doc?.updatedAt).toLocaleDateString("en-GB")}
                </span>
              </div>

              <div className="flex flex-col sm:col-span-2">
                <span className="text-[#685aad] text-sm mb-1 opacity-75">
                  Status
                </span>
                <div className="flex gap-3 items-center">
                  <div
                    className={`min-h-5 min-w-5 ${
                      doc?.status === "Approved"
                        ? "bg-[#00DAE5]"
                        : "bg-[#FC7777]"
                    }  rounded-md`}
                  ></div>
                  <span className={`text-[#685aad] text-base font-medium`}>
                    {doc?.status}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:col-span-2">
                <span className="text-[#685aad] text-sm mb-1 opacity-75">
                  Download
                </span>
                <button className="flex items-start">
                  <Image
                    src={downloadicon}
                    alt="Download"
                    className="w-6 h-6"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop View - Original Design (custom-2xl and above) */}
          <div className="hidden custom-2xl:grid grid-cols-5 gap-2 w-[87%]">
            <div className="flex flex-col custom-2xl:block transition-all duration-300 ease-in-out custom-2xl:pt-2 custom-2xl:w-[11.5rem] overflow-hidden truncate text-white">
              <span className="text-white/60 text-sm custom-2xl:hidden mb-1 text-white">
                Subject and level
              </span>
              <span className="text-[#685aad] text-base sm:text-[21.77px] sm:leading-[1.75rem] font-medium custom-2xl:w-[12px] truncate">
                {file?.fileName}
              </span>
              {/* <div
                className={`text-[#685aad] ${
                  isExpanded
                    ? "opacity-100 block transition-all duration-300 ease-in-out"
                    : "opacity-0 hidden transition-all duration-300 ease-in-out"
                }`}
              >
                PAYg session
              </div> */}
            </div>

            <div className="flex flex-col custom-2xl:block custom-2xl:pt-2 custom-2xl:pl-14">
              <span className="text-[#685aad] text-sm custom-2xl:hidden mb-1">
                Size
              </span>
              <span className="text-[#685aad] text-base sm:text-[21.77px] font-medium custom-2xl:pl-[30px]">
                {formatFileSize(Number(file?.fileSize))}
              </span>
            </div>

            <div className="flex flex-col custom-2xl:block custom-2xl:pt-2 custom-2xl:pl-12">
              <span className="text-[#685aad] text-sm custom-2xl:hidden mb-1">
                Type
              </span>
              <span className="text-[#685aad] text-base sm:text-[21.77px] font-medium">
                {getReadableFileType(file?.fileType || "")}
              </span>
            </div>

            <div className="flex flex-col custom-2xl:block custom-2xl:pt-2 custom-2xl:pl-5">
              <span className="text-[#685aad] text-sm custom-2xl:hidden mb-1">
                Date and Time
              </span>
              <span className="text-[#685aad] text-base sm:text-[21.77px] font-medium">
                {new Date(doc?.updatedAt).toLocaleDateString("en-GB")}
              </span>
              <div
                className={`text-base sm:text-[21.77px] font-medium text-[#685aad] ${
                  isExpanded
                    ? "opacity-100 block transition-all duration-300 ease-in-out"
                    : "opacity-0 hidden transition-all duration-300 ease-in-out"
                }`}
              >
                {new Date(doc?.updatedAt).toLocaleString("en-GB", {
                  weekday: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </div>
            </div>

            <div className="flex flex-col custom-2xl:block custom-2xl:pt-2 custom-2xl:pl-12">
              <span className="text-[#685aad] text-sm custom-2xl:hidden mb-1">
                status
              </span>
              <div className="flex gap-5 items-center custom-2xl:justify-center">
                <div
                  className={`h-5 min-w-5 transition-all duration-300 ease-in-out ${
                    doc?.status === "Approved" ? "bg-[#00DAE5]" : "bg-[#FC7777]"
                  }  rounded-md`}
                >
                  &nbsp;
                </div>
                <span className="text-[#685aad] text-base sm:text-[21.77px] font-medium transition-all duration-300 ease-in-out">
                  {doc?.status}
                  <div
                    className={`text-base sm:text-[21.77px] font-medium text-[#685aad] ${
                      isExpanded
                        ? "opacity-100 block transition-all duration-300 ease-in-out"
                        : "opacity-0 hidden transition-all duration-300 ease-in-out"
                    }`}
                  >
                    {new Date(doc?.updatedAt).toLocaleDateString("en-GB")}
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden custom-2xl:flex flex-col custom-2xl:flex-row gap-2 custom-2xl:gap-4 h-full max-w-full custom-2xl:max-w-[9.3rem] w-full items-center justify-end p-4 custom-2xl:pr-10">
          <button
            onClick={() => {
              downloadFromS3(file.fileUrl, file.fileName);
            }}
            className=""
          >
            <Image src={downloadicon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileItemTemp;
