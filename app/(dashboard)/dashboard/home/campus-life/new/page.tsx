"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import CampusLifeForm from "@/components/dashboard/home/campus-life/CampusLifeForm";

// =========================================================
// TYPES
// =========================================================

interface CampusLifeItemData {
  _id?: string;

  title: string;

  image: string;

  link: string;

  isActive: boolean;

  order: number;
}

interface CampusLifeFormData {
  tagline: string;

  title: string;

  description: string;

  items: CampusLifeItemData[];

  isActive: boolean;
}

// =========================================================
// DEFAULT DATA
// =========================================================

const defaultFormData: CampusLifeFormData = {
  tagline:
    "Building a vibrant community of creative and accomplished people from around the world",

  title: "Campus Life",

  description:
    "Building a vibrant community of creative and accomplished people from around the world",

  items: [
    {
      title: "Student Life",

      image: "",

      link: "#",

      isActive: true,

      order: 0,
    },

    {
      title: "Arts & Culture",

      image: "",

      link: "#",

      isActive: true,

      order: 1,
    },

    {
      title: "Recreation & Wellness",

      image: "",

      link: "#",

      isActive: true,

      order: 2,
    },
  ],

  isActive: true,
};

// =========================================================
// API RESPONSE
// =========================================================

interface CampusLifeCreateResponse {
  success?: boolean;

  message?: string;

  data?: unknown;
}

// =========================================================
// PAGE
// =========================================================

export default function CampusLifeNewPage() {
  const router = useRouter();

  // =======================================================
  // CREATE
  // =======================================================

  const handleCreate = async (
    data: CampusLifeFormData
  ) => {
    try {
      // ===================================================
      // POST API
      // ===================================================

      const response = await fetch(
        "/api/campus-life",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(data),
        }
      );

      // ===================================================
      // READ RESPONSE
      // ===================================================

      const responseText =
        await response.text();

      let result:
        | CampusLifeCreateResponse
        | null = null;

      // ===================================================
      // PARSE JSON
      // ===================================================

      try {
        result = responseText
          ? JSON.parse(
              responseText
            )
          : null;
      } catch {
        console.error(
          "CREATE CAMPUS LIFE NON-JSON RESPONSE:",
          responseText
        );

        throw new Error(
          "Campus Life API returned an invalid response."
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
            "Failed to create Campus Life."
        );
      }

      // ===================================================
      // SUCCESS
      // ===================================================

      toast.success(
        "Campus Life created successfully."
      );

      // ===================================================
      // REDIRECT
      // ===================================================

      router.push(
        "/dashboard/home/campus-life"
      );

      router.refresh();
    } catch (error) {
      console.error(
        "CREATE CAMPUS LIFE ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create Campus Life."
      );
    }
  };

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <main
      className="
        w-full
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
          gap-4
        "
      >
        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <Link
          href="/dashboard/home/campus-life"
          className="
            inline-flex
            w-fit
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-2.5
            text-sm
            font-semibold
            text-slate-700
            transition
            hover:bg-slate-50
            hover:text-[#008B45]
          "
        >
          <ArrowLeft
            size={17}
          />

          Back to Campus Life
        </Link>

        {/* =================================================
            HEADER TEXT
        ================================================= */}

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
            Create Campus Life
          </h1>

          <p
            className="
              mt-2
              max-w-2xl
              text-sm
              leading-6
              text-slate-500
            "
          >
            Add and manage the Campus
            Life content that will
            appear on the client
            website.
          </p>
        </div>
      </div>

      {/* =================================================
          FORM
          
          CampusLifeForm now contains:
          50% FORM
          50% STICKY LIVE PREVIEW
      ================================================= */}

      <div className="w-full">
        <CampusLifeForm
          initialData={
            defaultFormData
          }
          onSubmit={
            handleCreate
          }
          submitLabel="Create Campus Life"
          title="Campus Life"
          description="Manage the Campus Life heading, description, images and cards for the homepage."
        />
      </div>
    </main>
  );
}