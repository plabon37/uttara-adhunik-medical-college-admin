"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import AboutForm, {
  AboutFormData,
} from "@/components/dashboard/home/about/AboutForm";
import AboutPreview from "@/components/dashboard/home/about/AboutPreview";

const defaultPreviewData: AboutFormData = {
  tagline: "knowledge meets innovation",
  title: "About",
  highlightText: "UAMC",

  descriptionOne:
    "Uttara Adhunik Medical College (UAMC) is a prestigious medical institution located in Uttara Model Town, Dhaka, Bangladesh. Established in 2003.",

  descriptionTwo:
    "UAMC offers a Bachelor of Medicine and Bachelor of Surgery (MBBS) program, designed to equip students with the knowledge, skills, and hands-on clinical training needed to excel in the medical profession.",

  imageOne: "",
  imageTwo: "",
  logo: "",

  missionTitle: "College Mission Statement",
  missionLink: "/about/mission",

  visionTitle: "College Vision Achievement",
  visionLink: "/about/vision",

  buttonText: "View Our Program",
  buttonLink: "/admission",

  isActive: true,
};

export default function NewAboutPage() {
  const router = useRouter();

  const [previewData, setPreviewData] =
    useState<AboutFormData>(
      defaultPreviewData
    );

  const handleSuccess = () => {
    toast.success(
      "About section created successfully."
    );

    router.push("/dashboard/home/about");
  };

  return (
    <div className="w-full bg-[#F8FAFC]">
      <div className="mx-auto w-full max-w-[1800px] space-y-6 p-4 sm:p-6 lg:p-8">
        {/* BACK BUTTON */}

        <button
          type="button"
          onClick={() => router.back()}
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-slate-600
            transition
            hover:text-[#008B45]
          "
        >
          <ArrowLeft size={17} />
          Back to About
        </button>

        {/* HEADER */}

        <div>
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Add About UAMC
          </h1>

          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Create the About section for the
            homepage.
          </p>
        </div>

        {/* FORM + LIVE PREVIEW */}

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)]">
          <div className="min-w-0">
            <AboutForm
              onSuccess={handleSuccess}
              onDataChange={setPreviewData}
            />
          </div>

          <div className="min-w-0 xl:sticky xl:top-6">
            <AboutPreview data={previewData} />
          </div>
        </div>
      </div>
    </div>
  );
}