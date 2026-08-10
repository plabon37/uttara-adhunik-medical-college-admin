"use client";

import { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
} from "lucide-react";

import type {
  FacilitiesPreviewData,
} from "./FacilitiesForm";

interface FacilitiesPreviewProps {
  data: FacilitiesPreviewData;
}

export default function FacilitiesPreview({
  data,
}: FacilitiesPreviewProps) {
  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const activeFacilities =
    data.facilities.filter((facility) =>
      "isActive" in facility
        ? facility.isActive !== false
        : true
    );

  const safeIndex =
    selectedIndex <
    activeFacilities.length
      ? selectedIndex
      : 0;

  const selectedFacility =
    activeFacilities[safeIndex];

  return (
    <div
      className="
        overflow-hidden
        rounded-[28px]
        bg-[#F7F8F6]
        shadow-sm
      "
    >
      {/* =================================================
          WEBSITE SECTION PREVIEW
      ================================================= */}

      <section
        className="
          relative
          overflow-hidden
          px-5
          py-10
          sm:px-8
          sm:py-14
          lg:px-12
          lg:py-16
        "
      >
        {/* =================================================
            TOP HEADING
        ================================================= */}

        <div
          className="
            mx-auto
            max-w-7xl
          "
        >
          {/* TAGLINE */}

          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <span
              className="
                h-px
                w-8
                bg-[#008B45]
              "
            />

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#008B45]
                sm:text-xs
              "
            >
              {data.tagline ||
                "knowledge meets innovation"}
            </p>
          </div>

          {/* TITLE */}

          <h2
            className="
              mt-3
              max-w-2xl
              text-3xl
              font-bold
              leading-tight
              tracking-tight
              text-slate-900
              sm:text-4xl
              lg:text-5xl
            "
          >
            {data.title ||
              "Our Facilities"}
          </h2>
        </div>

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div
          className="
            mx-auto
            mt-8
            grid
            max-w-7xl
            gap-6
            lg:grid-cols-[260px_1fr]
            xl:grid-cols-[280px_1fr]
          "
        >
          {/* =================================================
              FACILITY LIST
          ================================================= */}

          <div
            className="
              rounded-2xl
              bg-white
              p-3
              shadow-sm
            "
          >
            <div
              className="
                flex
                flex-col
                gap-1
              "
            >
              {activeFacilities.length >
              0 ? (
                activeFacilities.map(
                  (
                    facility,
                    index
                  ) => {
                    const active =
                      index ===
                      safeIndex;

                    return (
                      <button
                        key={
                          facility._id ||
                          `facility-${index}`
                        }
                        type="button"
                        onClick={() =>
                          setSelectedIndex(
                            index
                          )
                        }
                        className={`
                          group
                          flex
                          w-full
                          items-center
                          justify-between
                          rounded-xl
                          px-4
                          py-3.5
                          text-left
                          transition-all
                          duration-200
                          ${
                            active
                              ? "bg-[#008B45] text-white shadow-sm"
                              : "text-slate-600 hover:bg-emerald-50 hover:text-[#008B45]"
                          }
                        `}
                      >
                        <span
                          className="
                            flex
                            min-w-0
                            items-center
                            gap-3
                          "
                        >
                          {/* NUMBER */}

                          <span
                            className={`
                              flex
                              h-7
                              w-7
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              text-[10px]
                              font-bold
                              ${
                                active
                                  ? "bg-white/15 text-white"
                                  : "bg-slate-100 text-slate-400 group-hover:bg-emerald-100 group-hover:text-[#008B45]"
                              }
                            `}
                          >
                            {String(
                              index + 1
                            ).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          {/* NAME */}

                          <span
                            className="
                              truncate
                              text-sm
                              font-semibold
                            "
                          >
                            {facility.name ||
                              `Facility ${
                                index + 1
                              }`}
                          </span>
                        </span>

                        {/* ARROW */}

                        <ArrowRight
                          size={16}
                          className={`
                            shrink-0
                            transition-transform
                            ${
                              active
                                ? "translate-x-0"
                                : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                            }
                          `}
                        />
                      </button>
                    );
                  }
                )
              ) : (
                <div
                  className="
                    px-4
                    py-8
                    text-center
                    text-sm
                    text-slate-400
                  "
                >
                  No facilities added.
                </div>
              )}
            </div>
          </div>

          {/* =================================================
              DETAIL AREA
          ================================================= */}

          <div
            className="
              overflow-hidden
              rounded-2xl
              bg-white
              shadow-sm
            "
          >
            {selectedFacility ? (
              <div
                className="
                  grid
                  min-h-[420px]
                  lg:grid-cols-[42%_58%]
                "
              >
                {/* =================================================
                    IMAGE
                ================================================= */}

                <div
                  className="
                    relative
                    min-h-[280px]
                    overflow-hidden
                    bg-slate-100
                    lg:min-h-full
                  "
                >
                  {data.image ? (
                    <img
                      src={data.image}
                      alt={
                        selectedFacility.title ||
                        selectedFacility.name ||
                        "Facilities"
                      }
                      className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-cover
                      "
                    />
                  ) : (
                    <div
                      className="
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                        bg-emerald-50
                      "
                    >
                      <span
                        className="
                          text-sm
                          font-medium
                          text-[#008B45]
                        "
                      >
                        Facilities Image
                      </span>
                    </div>
                  )}

                  {/* IMAGE OVERLAY */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/30
                      via-transparent
                      to-transparent
                    "
                  />
                </div>

                {/* =================================================
                    CONTENT
                ================================================= */}

                <div
                  className="
                    flex
                    flex-col
                    justify-between
                    p-6
                    sm:p-8
                    lg:p-10
                  "
                >
                  <div>
                    {/* SMALL LABEL */}

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >
                      <span
                        className="
                          h-px
                          w-7
                          bg-[#008B45]
                        "
                      />

                      <span
                        className="
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.18em]
                          text-[#008B45]
                        "
                      >
                        {selectedFacility.name ||
                          "Facility"}
                      </span>
                    </div>

                    {/* TITLE */}

                    <h3
                      className="
                        mt-4
                        text-2xl
                        font-bold
                        leading-tight
                        text-slate-900
                        sm:text-3xl
                      "
                    >
                      {selectedFacility.title ||
                        selectedFacility.name ||
                        "Facility Details"}
                    </h3>

                    {/* DESCRIPTION */}

                    <p
                      className="
                        mt-5
                        text-sm
                        leading-7
                        text-slate-500
                        sm:text-base
                      "
                    >
                      {selectedFacility.description ||
                        "Facility description will appear here."}
                    </p>
                  </div>

                  {/* =================================================
                      BUTTON
                  ================================================= */}

                  <div
                    className="
                      mt-8
                      flex
                      flex-wrap
                      items-center
                      gap-4
                    "
                  >
                    <a
                      href={
                        selectedFacility.detailsLink ||
                        "#"
                      }
                      onClick={(event) => {
                        if (
                          !selectedFacility.detailsLink ||
                          selectedFacility.detailsLink ===
                            "#"
                        ) {
                          event.preventDefault();
                        }
                      }}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-[#008B45]
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-[#00763B]
                      "
                    >
                      {selectedFacility.detailsText ||
                        "View Details"}

                      <ArrowRight
                        size={16}
                      />
                    </a>

                    {/* INDEX */}

                    <span
                      className="
                        text-xs
                        font-medium
                        text-slate-400
                      "
                    >
                      {String(
                        safeIndex + 1
                      ).padStart(
                        2,
                        "0"
                      )}{" "}
                      /{" "}
                      {String(
                        activeFacilities.length
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="
                  flex
                  min-h-[420px]
                  items-center
                  justify-center
                  px-6
                  text-center
                "
              >
                <div>
                  <div
                    className="
                      mx-auto
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-emerald-50
                    "
                  >
                    <ChevronDown
                      size={24}
                      className="text-[#008B45]"
                    />
                  </div>

                  <p
                    className="
                      mt-4
                      text-sm
                      font-medium
                      text-slate-500
                    "
                  >
                    Add a facility to see
                    the live preview.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =================================================
            PROGRAM BUTTON
        ================================================= */}

        <div
          className="
            mx-auto
            mt-8
            max-w-7xl
          "
        >
          <a
            href={
              data.programButtonLink ||
              "#"
            }
            onClick={(event) => {
              if (
                !data.programButtonLink ||
                data.programButtonLink ===
                  "#"
              ) {
                event.preventDefault();
              }
            }}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-[#008B45]
              bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-[#008B45]
              transition
              hover:bg-[#008B45]
              hover:text-white
            "
          >
            {data.programButtonText ||
              "View Our Program"}

            <ArrowRight
              size={16}
            />
          </a>
        </div>
      </section>
    </div>
  );
}