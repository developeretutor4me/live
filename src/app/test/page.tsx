"use client";
import { useState } from "react";
import styles from "./session.module.css";
export default function MySessionComp() {
  const [activetab, setactivetab] = useState("individual");

  const getTabColors = (tabName: string) => {
    if (activetab === "individual") {
      if (tabName === "group") return "#9B85C8";
      if (tabName === "trial") return "#6B5692";
    } else if (activetab === "group") {
      if (tabName === "individual") return "#6B5692";
      if (tabName === "trial") return "#9B85C8";
    } else if (activetab === "trial") {
      if (tabName === "group") return "#9B85C8";
      if (tabName === "individual") return "#6B5692";
    }
    return "#EDE8FA"; // Active tab color
  };

  return (
    <div className={`${styles.maindiv} `}>
      {/* Individual Tab */}
      <div
        onClick={() => setactivetab("individual")}
        className={`${styles.individualtab} individualtab `}
        style={{ backgroundColor: getTabColors("individual") }}
      >
        {/* Top arc (was before) */}
        <button
          className={`
            ${activetab === "individual" ? "text-[#685AAD]" : "text-white"}`}
          style={{ backgroundColor: getTabColors("individual") }}
        >
          <span className="">INDIVIDUAL SESSION</span>
        </button>
        {/* Bubble bump (was after) */}
        <div
          className={`${styles.bubble} bubble ${getTabColors("individual")}`}
        />
      </div>

      {/* Group Tab */}
      <div className={`${styles.grouptab} grouptab`}>
        <div
          onClick={() => setactivetab("group")}
          className={`${styles.subgrouptab}`}
          style={{ backgroundColor: getTabColors("group") }}
        >
          <button
            className={`
            ${activetab === "group" ? "text-[#685AAD]" : "text-white"}`}
            style={{ backgroundColor: getTabColors("group") }}
          >
            <span className="">GROUP SESSION</span>
          </button>
          <div className="bubble" />
        </div>
      </div>

      {/* Trial Tab */}
      <div className={`${styles.trialtab} trialtab`}>
        <div
          onClick={() => setactivetab("trial")}
          className={`${styles.subtrialtab}`}
          style={{ backgroundColor: getTabColors("trial") }}
        >
          <button
            className={` 
            ${activetab === "trial" ? "text-[#685AAD]" : "text-white"} `}
            style={{ backgroundColor: getTabColors("trial") }}
          >
            <span className="">TRIAL SESSION</span>
          </button>
          <div className={`bubble`} />
        </div>
      </div>

      {/* Active content display */}
      <div className={`${styles.contentdiv} border border-red-950`}>

      </div>

      <style jsx>{`
        .individualtab .bubble {
          position: absolute;
          top: -3.8%;
          left: 289.04px;
          width: 88px;
          height: 88px;
          background-image: radial-gradient(
            circle at 100% 0%,
            rgba(207, 27, 27, 0) 33px,
            ${getTabColors("individual")} 33px
          );
        }

        .grouptab .bubble {
          position: absolute;
          top: -3.8%;
          left: 340px;
          width: 88px;
          height: 88px;
          background-image: radial-gradient(
            circle at 100% 0%,
            rgba(207, 27, 27, 0) 33px,
            ${getTabColors("group")} 33px
          );
        }

        .trialtab .bubble {
          position: absolute;
          top: -3.8%;
          left: 345px;
          width: 88px;
          height: 88px;
          background-image: radial-gradient(
            circle at 100% 0%,
            rgba(207, 27, 27, 0) 33px,
            ${getTabColors("trial")} 33px
          );
        }

        @media (max-width: 1100px) {
          .trialtab .bubble {
            top: -3.8%;
            left: 244.71px; /* 345 * 0.7093 */
            width: 62.42px;
            height: 62.42px;
            background-image: radial-gradient(
              circle at 100% 0%,
              rgba(207, 27, 27, 0) 23.41px,
              ${getTabColors("trial")} 23.41px
            );
          }
          .grouptab .bubble {
            top: -3.8%;
            left: 241.16px; /* 340 * 0.7093 */
            width: 62.42px;
            height: 62.42px;
            background-image: radial-gradient(
              circle at 100% 0%,
              rgba(207, 27, 27, 0) 23.41px,
              ${getTabColors("group")} 23.41px
            );
          }
          .individualtab .bubble {
            top: -2.69%; /* -3.8 * 0.7093 */
            left: 205.01px; /* 289.04 * 0.7093 */
            width: 62.42px; /* 88 * 0.7093 */
            height: 62.42px;
            background-image: radial-gradient(
              circle at 100% 0%,
              rgba(207, 27, 27, 0) 23.41px,
              /* 33 * 0.7093 */ ${getTabColors("individual")} 23.41px
            );
          }
        }

        @media (max-width: 781px) {
          .individualtab .bubble {
            top: -1.65%; /* -2.69 * 0.61475 */
            left: 126px; /* 205.01 * 0.61475 */
            width: 38.35px; /* 62.42 * 0.61475 */
            height: 38.35px;
            background-image: radial-gradient(
              circle at 100% 0%,
              rgba(207, 27, 27, 0) 14.39px,
              /* 23.41 * scale */ ${getTabColors("individual")} 14.39px
            );
          }
          .grouptab .bubble {
            top: -3.7%;
            left: 148.27px; /* 241.16 * scale */
            width: 38.35px;
            height: 38.35px;
            background-image: radial-gradient(
              circle at 100% 0%,
              rgba(207, 27, 27, 0) 14.39px,
              ${getTabColors("group")} 14.39px
            );
          }

          .trialtab .bubble {
            top: -3.7%;
            left: 150.49px; /* 244.71 * scale */
            width: 38.35px;
            height: 38.35px;
            background-image: radial-gradient(
              circle at 100% 0%,
              rgba(207, 27, 27, 0) 14.39px,
              ${getTabColors("trial")} 14.39px
            );
          }
        }

        @media (max-width: 460px) {
          .individualtab .bubble {
            top: -1.32%; /* -1.65 * 0.8 */
            left: 100.8px; /* 126 * 0.8 */
            width: 30.68px; /* 38.35 * 0.8 */
            height: 30.68px;
            background-image: radial-gradient(
              circle at 100% 0%,
              rgba(207, 27, 27, 0) 11.51px,
              /* 14.39 * 0.8 */ ${getTabColors("individual")} 11.51px
            );
          }

          .grouptab .bubble {
            top: -3.8%; /* -3.7 * 0.8 */
            left: 118.61px; /* 148.27 * 0.8 */
            width: 30.68px;
            height: 30.68px;
            background-image: radial-gradient(
              circle at 100% 0%,
              rgba(207, 27, 27, 0) 11.51px,
              ${getTabColors("group")} 11.51px
            );
          }

          .trialtab .bubble {
            top: -3.8%%;
            left: 120.39px; /* 150.49 * 0.8 */
            width: 30.68px;
            height: 30.68px;
            background-image: radial-gradient(
              circle at 100% 0%,
              rgba(207, 27, 27, 0) 11.51px,
              ${getTabColors("trial")} 11.51px
            );
          }
        }
      `}</style>
    </div>
  );
}
