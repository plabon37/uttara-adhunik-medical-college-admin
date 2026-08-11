"use client";

import {
  CalendarDays,
  Clock3,
  MapPin,
} from "lucide-react";

import Image from "next/image";

// =========================================================
// TYPES
// =========================================================

export interface AlumniEventPreviewData {
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  isPublished: boolean;
  order: number;
}

interface AlumniEventPreviewProps {
  data: AlumniEventPreviewData;
}

// =========================================================
// COMPONENT
// =========================================================

export default function AlumniEventPreview({
  data,
}: AlumniEventPreviewProps) {
  // =======================================================
  // SAFE DATA
  // =======================================================

  const title =
    data.title?.trim() ||
    "Bridging Cultures: Global Perspectives in";

  const date =
    data.date?.trim() ||
    "August 20, 2024";

  const time =
    data.time?.trim() ||
    "4:27 am";

  const location =
    data.location?.trim() ||
    "Yarra Park, UK";

  const image =
    data.image?.trim() || "";

  const order =
    Number.isFinite(
      Number(data.order)
    )
      ? Number(data.order)
      : 0;

  const eventNumber =
    String(order + 1).padStart(
      2,
      "0"
    );

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <section
      className="
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* =================================================
          PREVIEW HEADER
      ================================================= */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-slate-200
          px-5
          py-4
          sm:px-6
        "
      >
        <div>
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-[#008B45]
            "
          >
            Live Preview
          </p>

          <h2
            className="
              mt-1
              text-base
              font-bold
              text-slate-900
            "
          >
            Alumni Event
          </h2>
        </div>

        <span
          className={`
            rounded-full
            px-3
            py-1.5
            text-[10px]
            font-bold
            ${
              data.isPublished
                ? "bg-emerald-50 text-[#008B45]"
                : "bg-slate-100 text-slate-500"
            }
          `}
        >
          {data.isPublished
            ? "Published"
            : "Draft"}
        </span>
      </div>

      {/* =================================================
          FIGMA PREVIEW
      ================================================= */}

      <div
        className="
          bg-[#EAF5EE]
          p-5
          sm:p-7
          lg:p-8
        "
      >
        {/* =================================================
            SECTION TITLE
        ================================================= */}

        <div
          className="
            mb-7
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <h3
            className="
              font-serif
              text-3xl
              font-bold
              leading-none
              text-[#008B45]
              sm:text-4xl
              lg:text-[42px]
            "
          >
            Alumni Event
          </h3>

          <span
            className="
              hidden
              cursor-pointer
              border-b-2
              border-[#008B45]
              pb-1
              text-sm
              font-semibold
              text-[#008B45]
              sm:inline-block
            "
          >
            View All ↗
          </span>
        </div>

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.9fr)]
            lg:gap-7
          "
        >
          {/* =================================================
              LEFT — EVENT LIST
          ================================================= */}

          <div
            className="
              min-w-0
              space-y-4
            "
          >
            {/* =================================================
                EVENT ITEM
            ================================================= */}

            <article
              className="
                flex
                min-h-[150px]
                items-center
                gap-5
                bg-white
                px-5
                py-6
                sm:px-7
                lg:min-h-[170px]
                lg:gap-7
                lg:px-8
              "
            >
              {/* NUMBER */}

              <div
                className="
                  shrink-0
                  font-sans
                  text-[54px]
                  font-light
                  leading-none
                  tracking-tight
                  text-transparent
                  [-webkit-text-stroke:1px_#008B45]
                  sm:text-[68px]
                  lg:text-[76px]
                "
              >
                {eventNumber}
              </div>

              {/* EVENT INFORMATION */}

              <div
                className="
                  min-w-0
                  flex-1
                "
              >
                {/* TITLE */}

                <h4
                  className="
                    max-w-[520px]
                    text-lg
                    font-medium
                    leading-7
                    text-[#008B45]
                    sm:text-xl
                    lg:text-[22px]
                    lg:leading-8
                  "
                >
                  {title}
                </h4>

                {/* META */}

                <div
                  className="
                    mt-4
                    flex
                    flex-wrap
                    items-center
                    gap-x-4
                    gap-y-2
                    text-xs
                    text-slate-600
                    sm:text-sm
                  "
                >
                  {/* DATE */}

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                    "
                  >
                    <CalendarDays
                      size={16}
                      strokeWidth={1.7}
                    />

                    {date}
                  </span>

                  {/* TIME */}

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                    "
                  >
                    <Clock3
                      size={16}
                      strokeWidth={1.7}
                    />

                    {time}
                  </span>

                  {/* LOCATION */}

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      border-b
                      border-dotted
                      border-slate-500
                      pb-0.5
                    "
                  >
                    <MapPin
                      size={16}
                      strokeWidth={1.7}
                    />

                    {location}
                  </span>
                </div>
              </div>
            </article>

            {/* =================================================
                PREVIEW PLACEHOLDERS
                These represent other events in the Figma layout.
            ================================================= */}

            <article
              className="
                flex
                min-h-[150px]
                items-center
                gap-5
                bg-white
                px-5
                py-6
                opacity-50
                sm:px-7
                lg:min-h-[170px]
                lg:gap-7
                lg:px-8
              "
            >
              <div
                className="
                  shrink-0
                  font-sans
                  text-[54px]
                  font-light
                  leading-none
                  text-transparent
                  [-webkit-text-stroke:1px_#008B45]
                  sm:text-[68px]
                  lg:text-[76px]
                "
              >
                02
              </div>

              <div
                className="
                  h-7
                  w-3/4
                  rounded
                  bg-slate-100
                "
              />
            </article>

            <article
              className="
                hidden
                min-h-[150px]
                items-center
                gap-5
                bg-white
                px-5
                py-6
                opacity-30
                sm:flex
                sm:px-7
                lg:min-h-[170px]
                lg:gap-7
                lg:px-8
              "
            >
              <div
                className="
                  shrink-0
                  font-sans
                  text-[54px]
                  font-light
                  leading-none
                  text-transparent
                  [-webkit-text-stroke:1px_#008B45]
                  sm:text-[68px]
                  lg:text-[76px]
                "
              >
                03
              </div>

              <div
                className="
                  h-7
                  w-3/4
                  rounded
                  bg-slate-100
                "
              />
            </article>
          </div>

          {/* =================================================
              RIGHT — SINGLE LARGE IMAGE
          ================================================= */}

          <div
            className="
              relative
              min-h-[300px]
              overflow-hidden
              bg-slate-100
              sm:min-h-[380px]
              lg:min-h-full
            "
          >
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                sizes="
                  (max-width: 1024px) 100vw,
                  45vw
                "
                className="
                  object-cover
                "
              />
            ) : (
              <div
                className="
                  absolute
                  inset-0
                  flex
                  flex-col
                  items-center
                  justify-center
                  bg-slate-100
                  text-slate-400
                "
              >
                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    shadow-sm
                  "
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                    />

                    <circle
                      cx="8.5"
                      cy="8.5"
                      r="1.5"
                    />

                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>

                <p
                  className="
                    mt-3
                    text-xs
                    font-medium
                  "
                >
                  Upload an event image
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}