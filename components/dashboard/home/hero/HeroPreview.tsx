"use client";

import Image from "next/image";

interface HeroPreviewProps {
  tagline: string;
  title: string;
  highlightText: string;
  lastTitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  rightTitle: string;
  courseOneTitle: string;
  courseOneDescription: string;
  courseTwoTitle: string;
  courseTwoDescription: string;
}

export default function HeroPreview({
  tagline,
  title,
  highlightText,
  lastTitle,
  buttonText,
  backgroundImage,
  rightTitle,
  courseOneTitle,
  courseOneDescription,
  courseTwoTitle,
  courseTwoDescription,
}: HeroPreviewProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}

      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-xl font-bold text-slate-800">
          Live Preview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Preview before saving
        </p>
      </div>

      {/* Hero */}

      <div className="relative min-h-[650px] overflow-hidden">
        {/* Background */}

        <div className="absolute inset-0">
          <Image
            src={
              backgroundImage ||
              "https://placehold.co/1400x900?text=Hero+Image"
            }
            alt="Hero"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* Content */}

        <div className="relative z-10 flex min-h-[650px] items-center">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 lg:grid-cols-2">
            {/* Left */}

            <div className="text-white">
              <span className="inline-flex rounded-full bg-teal-500/20 px-4 py-2 text-sm font-semibold backdrop-blur-md">
                {tagline || "Hero Tagline"}
              </span>

              <h1 className="mt-6 text-4xl font-extrabold leading-tight lg:text-6xl">
                {title || "Hero Title"}{" "}
                <span className="text-teal-400">
                  {highlightText || "Highlight"}
                </span>{" "}
                {lastTitle || "Text"}
              </h1>

              <button className="mt-10 rounded-xl bg-teal-600 px-7 py-3 font-semibold text-white">
                {buttonText || "Explore"}
              </button>
            </div>

            {/* Right */}

            <div className="rounded-3xl bg-white/95 p-8 shadow-2xl backdrop-blur">
              <h3 className="text-2xl font-bold text-slate-800">
                {rightTitle || "Courses"}
              </h3>

              <div className="mt-8 space-y-5">
                <div className="rounded-2xl border border-slate-200 p-5">
                  <h4 className="font-semibold text-slate-800">
                    {courseOneTitle || "Course One"}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {courseOneDescription ||
                      "Course description goes here."}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <h4 className="font-semibold text-slate-800">
                    {courseTwoTitle || "Course Two"}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {courseTwoDescription ||
                      "Course description goes here."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}