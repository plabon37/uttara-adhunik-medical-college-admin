"use client";

import Image from "next/image";

import {
  CalendarDays,
  UserRound,
} from "lucide-react";

// =========================================================
// TYPES
// =========================================================

export interface NewsPreviewData {
  title: string;

  category: string;

  description: string;

  image: string;

  author: string;

  date: string;

  isPublished: boolean;

  order: number;
}

interface NewsPreviewProps {
  data: NewsPreviewData;
}

// =========================================================
// COMPONENT
// =========================================================

export default function NewsPreview({
  data,
}: NewsPreviewProps) {
  // =======================================================
  // SAFE DATA
  // =======================================================

  const title =
    data.title?.trim() ||
    "After Decades Of Improvement";

  const category =
    data.category?.trim() ||
    "Campus News";

  const description =
    data.description?.trim() ||
    "Discover the latest news, stories and updates from our campus community.";

  const author =
    data.author?.trim() ||
    "UAMC";

  const date =
    data.date?.trim() ||
    "August 20, 2024";

  const image =
    data.image?.trim() ||
    "";

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
          gap-4
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
            Latest News
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
          bg-[#F5F7F3]
          px-5
          py-8
          sm:px-7
          sm:py-10
          lg:px-8
          lg:py-12
        "
      >
        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <div
          className="
            mb-8
            flex
            items-end
            justify-between
            gap-5
            sm:mb-10
          "
        >
          <div>
            <h3
              className="
                font-serif
                text-3xl
                font-bold
                leading-tight
                text-[#008B45]
                sm:text-4xl
                lg:text-[42px]
              "
            >
              Read Our Latest News
            </h3>

            <p
              className="
                mt-3
                max-w-xl
                text-xs
                leading-5
                text-slate-500
                sm:text-sm
                sm:leading-6
              "
            >
              You’ll find something to
              spark your curiosity...
            </p>
          </div>

          <span
            className="
              hidden
              shrink-0
              border-b-2
              border-[#008B45]
              pb-1
              text-xs
              font-semibold
              text-[#008B45]
              sm:inline-block
            "
          >
            View All ↗
          </span>
        </div>

        {/* =================================================
            NEWS CARDS
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            xl:grid-cols-2
            xl:gap-6
          "
        >
          {/* =================================================
              ACTIVE NEWS CARD
          ================================================= */}

          <article
            className="
              overflow-hidden
              bg-white
            "
          >
            {/* IMAGE */}

            <div
              className="
                relative
                aspect-[16/9]
                w-full
                overflow-hidden
                bg-slate-100
              "
            >
              {image ? (
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="
                    (max-width: 1280px) 100vw,
                    50vw
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
                    Upload news image
                  </p>
                </div>
              )}
            </div>

            {/* CONTENT */}

            <div
              className="
                p-5
                sm:p-6
              "
            >
              {/* CATEGORY */}

              <span
                className="
                  inline-flex
                  rounded-full
                  bg-[#EAF5EE]
                  px-3
                  py-1.5
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.08em]
                  text-[#008B45]
                "
              >
                {category}
              </span>

              {/* TITLE */}

              <h4
                className="
                  mt-4
                  line-clamp-2
                  text-lg
                  font-semibold
                  leading-7
                  text-slate-900
                  sm:text-xl
                  sm:leading-8
                "
              >
                {title}
              </h4>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-3
                  line-clamp-3
                  text-xs
                  leading-6
                  text-slate-500
                  sm:text-sm
                "
              >
                {description}
              </p>

              {/* AUTHOR + DATE */}

              <div
                className="
                  mt-5
                  flex
                  flex-wrap
                  items-center
                  gap-x-4
                  gap-y-2
                  border-t
                  border-slate-100
                  pt-4
                  text-[11px]
                  text-slate-500
                  sm:text-xs
                "
              >
                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                  "
                >
                  <UserRound
                    size={14}
                    strokeWidth={1.7}
                  />

                  {author}
                </span>

                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                  "
                >
                  <CalendarDays
                    size={14}
                    strokeWidth={1.7}
                  />

                  {date}
                </span>
              </div>
            </div>
          </article>

          {/* =================================================
              SECOND FIGMA CARD PREVIEW
          ================================================= */}

          <article
            className="
              hidden
              overflow-hidden
              bg-white
              xl:block
            "
          >
            {/* IMAGE PLACEHOLDER */}

            <div
              className="
                relative
                aspect-[16/9]
                w-full
                overflow-hidden
                bg-slate-100
              "
            >
              <div
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                "
              >
                <div
                  className="
                    h-16
                    w-16
                    rounded-full
                    bg-white
                    shadow-sm
                  "
                />
              </div>
            </div>

            {/* CONTENT PLACEHOLDER */}

            <div
              className="
                space-y-4
                p-5
                sm:p-6
              "
            >
              <div
                className="
                  h-6
                  w-24
                  rounded-full
                  bg-slate-100
                "
              />

              <div
                className="
                  h-6
                  w-4/5
                  rounded
                  bg-slate-100
                "
              />

              <div
                className="
                  h-4
                  w-full
                  rounded
                  bg-slate-100
                "
              />

              <div
                className="
                  h-4
                  w-3/4
                  rounded
                  bg-slate-100
                "
              />

              <div
                className="
                  mt-5
                  h-px
                  w-full
                  bg-slate-100
                "
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}