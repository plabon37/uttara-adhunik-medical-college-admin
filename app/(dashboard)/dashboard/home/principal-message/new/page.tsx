"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import PrincipalMessageForm, {
  type PrincipalMessageFormData,
} from "@/components/dashboard/home/principal-message/PrincipalMessageForm";

import PrincipalMessagePreview from "@/components/dashboard/home/principal-message/PrincipalMessagePreview";

// =========================================================
// DEFAULT FORM DATA
// =========================================================

const defaultFormData: PrincipalMessageFormData = {
  tagline: "knowledge meets innovation",

  titlePrefix: "Message from the",

  titleHighlight: "Principal",

  signatureImage: "",

  principalName: "",

  designation: "Principal (In Charge)",

  heading: "",

  description: "",

  principalImage: "",

  buttonText: "Read More",

  buttonLink: "#",

  isActive: true,
};

// =========================================================
// PAGE
// =========================================================

export default function PrincipalMessageNewPage() {
  const router = useRouter();

  // =======================================================
  // PREVIEW DATA
  // =======================================================

  const [previewData, setPreviewData] =
    useState<PrincipalMessageFormData>(
      defaultFormData
    );

  // =======================================================
  // FORM CHANGE
  // =======================================================

  const handleFormChange = (
    data: PrincipalMessageFormData
  ) => {
    setPreviewData(data);
  };

  // =======================================================
  // SUBMIT
  // =======================================================

  const handleSubmit = async (
    data: PrincipalMessageFormData
  ) => {
    try {
      // ===================================================
      // CREATE API
      // ===================================================

      const response = await fetch(
        "/api/principal-message",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        }
      );

      // ===================================================
      // READ RESPONSE SAFELY
      // ===================================================

      const responseText =
        await response.text();

      let result:
        | {
            success?: boolean;
            message?: string;
            data?: unknown;
          }
        | null = null;

      try {
        result = JSON.parse(
          responseText
        );
      } catch {
        console.error(
          "CREATE PRINCIPAL MESSAGE NON-JSON RESPONSE:",
          responseText
        );

        throw new Error(
          "Principal Message API returned an invalid response."
        );
      }

      // ===================================================
      // API ERROR
      // ===================================================

      if (
        !response.ok ||
        !result?.success
      ) {
        throw new Error(
          result?.message ||
            "Failed to create Principal Message."
        );
      }

      // ===================================================
      // SUCCESS
      // ===================================================

      toast.success(
        "Principal Message created successfully."
      );

      router.push(
        "/dashboard/home/principal-message"
      );

      router.refresh();
    } catch (error) {
      console.error(
        "CREATE PRINCIPAL MESSAGE ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create Principal Message."
      );

      throw error;
    }
  };

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <main
      className="
        min-h-screen
        bg-slate-50
        px-4
        py-6
        sm:px-6
        sm:py-8
        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]
        "
      >
        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div
          className="
            mb-6
            flex
            flex-col
            gap-3
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          <div>
            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[#008B45]
              "
            >
              Homepage
            </p>

            <h1
              className="
                mt-1
                text-2xl
                font-bold
                tracking-tight
                text-slate-900
                sm:text-3xl
              "
            >
              Create Principal Message
            </h1>

            <p
              className="
                mt-1
                max-w-2xl
                text-sm
                leading-6
                text-slate-500
              "
            >
              Add the Principal Message
              content that will appear on
              the client website.
            </p>
          </div>
        </div>

        {/* =================================================
            FORM + LIVE PREVIEW
        ================================================= */}

        <div
          className="
            grid
            w-full
            grid-cols-1
            items-start
            gap-6
            xl:grid-cols-2
          "
        >
          {/* =================================================
              LEFT — FORM
          ================================================= */}

          <div
            className="
              min-w-0
              w-full
            "
          >
            <PrincipalMessageForm
              initialData={
                defaultFormData
              }
              onChange={
                handleFormChange
              }
              onSubmit={
                handleSubmit
              }
              submitLabel="Create Principal Message"
              title="Principal Message"
              description="
                Manage the content, images and
                button settings for this homepage
                section.
              "
            />
          </div>

          {/* =================================================
              RIGHT — LIVE PREVIEW
          ================================================= */}

          <div
            className="
              min-w-0
              w-full
              xl:sticky
              xl:top-6
              xl:self-start
            "
          >
            <div
              className="
                w-full
                max-h-[calc(100vh-48px)]
                overflow-y-auto
                rounded-2xl
                scrollbar-thin
              "
            >
              <PrincipalMessagePreview
                data={
                  previewData
                }
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}