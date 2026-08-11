"use client";

import Image from "next/image";

import {
  ArrowUpRight,
} from "lucide-react";

import type {
  CampusLifeFormData,
} from "./CampusLifeForm";

// =========================================================
// PROPS
// =========================================================

interface CampusLifePreviewProps {
  data: CampusLifeFormData;
}

// =========================================================
// COMPONENT
// =========================================================

export default function CampusLifePreview({
  data,
}: CampusLifePreviewProps) {
  const visibleItems =
    [...data.items]
      .filter(
        (item) =>
          item.isActive
      )
      .sort(
        (a, b) =>
          a.order -
          b.order
      );

  return (
    <div
      className="
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

          <h3
            className="
              mt-1
              text-base
              font-bold
              text-slate-900
            "
          >
            Campus Life
          </h3>
        </div>

        <span
          className={`
            rounded-full
            px-3
            py-1
            text-[10px]
            font-bold
            ${
              data.isActive
                ? "bg-emerald-50 text-emerald-700"
                : "bg-slate-100 text-slate-500"
            }
          `}
        >
          {data.isActive
            ? "Published"
            : "Hidden"}
        </span>
      </div>

      {/* =================================================
          WEBSITE PREVIEW
      ================================================= */}

      <div
        className="
          overflow-hidden
          bg-[#008B45]
        "
      >
        {/* =================================================
            HERO CONTENT
        ================================================= */}

        <div
          className="
            px-6
            pb-12
            pt-12
            text-white
            sm:px-8
          "
        >
          {/* TAGLINE */}

          {data.tagline && (
            <p
              className="
                mx-auto
                max-w-xl
                text-center
                text-xs
                font-medium
                leading-5
                text-white/80
                sm:text-sm
              "
            >
              {data.tagline}
            </p>
          )}

          {/* TITLE */}

          <h2
            className="
              mt-5
              text-center
              font-serif
              text-5xl
              font-medium
              leading-[0.95]
              sm:text-6xl
            "
          >
            {data.title ||
              "Campus Life"}
          </h2>

          {/* DESCRIPTION */}

          {data.description && (
            <p
              className="
                mx-auto
                mt-7
                max-w-lg
                text-center
                text-sm
                leading-6
                text-white/90
              "
            >
              {data.description}
            </p>
          )}
        </div>

        {/* =================================================
            CARDS
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-8
            px-6
            pb-10
            sm:px-8
          "
        >
          {visibleItems.length >
          0 ? (
            visibleItems.map(
              (
                item,

                index
              ) => (
                <div
                  key={
                    item._id ||
                    `${item.title}-${index}`
                  }
                  className="
                    group
                  "
                >
                  {/* IMAGE */}

                  <div
                    className="
                      relative
                      aspect-[1.45/1]
                      w-full
                      overflow-hidden
                      bg-white/10
                    "
                  >
                    {item.image ? (
                      <Image
                        src={
                          item.image
                        }
                        alt={
                          item.title ||
                          "Campus Life"
                        }
                        fill
                        sizes="600px"
                        className="
                          object-cover
                          transition
                          duration-500
                          group-hover:scale-105
                        "
                      />
                    ) : (
                      <div
                        className="
                          flex
                          h-full
                          items-center
                          justify-center
                          text-sm
                          text-white/60
                        "
                      >
                        Image Preview
                      </div>
                    )}
                  </div>

                  {/* TITLE */}

                  <div
                    className="
                      mt-4
                      flex
                      items-center
                      justify-between
                      gap-4
                    "
                  >
                    <p
                      className="
                        font-serif
                        text-xl
                        leading-tight
                        text-white
                      "
                    >
                      {item.title ||
                        "Card Title"}
                    </p>

                    <ArrowUpRight
                      className="
                        h-6
                        w-6
                        shrink-0
                        text-white
                      "
                    />
                  </div>
                </div>
              )
            )
          ) : (
            <div
              className="
                flex
                min-h-[220px]
                items-center
                justify-center
                text-center
                text-sm
                text-white/70
              "
            >
              Add active Campus
              Life cards to preview
              them here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}