"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import StudentFeedbackForm, {
  StudentFeedbackFormData,
} from "@/components/dashboard/home/student-feedback/StudentFeedbackForm";

import StudentFeedbackPreview from "@/components/dashboard/home/student-feedback/StudentFeedbackPreview";

// =========================================================
// DEFAULT DATA
// =========================================================

const defaultFormData: StudentFeedbackFormData = {
  name: "",
  designation: "",
  feedback: "",
  image: "",
  rating: 5,
  isPublished: true,
  order: 0,
};

// =========================================================
// API RESPONSE
// =========================================================

interface StudentFeedbackCreateResponse {
  success?: boolean;
  message?: string;
  data?: unknown;
}

// =========================================================
// PAGE
// =========================================================

export default function CreateStudentFeedbackPage() {
  const router = useRouter();

  // =======================================================
  // FORM DATA
  // =======================================================

  const [formData, setFormData] =
    useState<StudentFeedbackFormData>(
      defaultFormData
    );

  // =======================================================
  // PREVIEW DATA
  // =======================================================

  const [previewData, setPreviewData] =
    useState<StudentFeedbackFormData>(
      defaultFormData
    );

  // =======================================================
  // CREATE
  // =======================================================

  const handleCreate = async (
    data: StudentFeedbackFormData
  ) => {
    try {
      // ===================================================
      // UPDATE PREVIEW
      // ===================================================

      setFormData(data);
      setPreviewData(data);

      // ===================================================
      // POST ADMIN API
      // ===================================================

      const response =
        await fetch(
          "/api/student-feedback",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              data
            ),
          }
        );

      // ===================================================
      // READ RESPONSE
      // ===================================================

      const responseText =
        await response.text();

      let result:
        | StudentFeedbackCreateResponse
        | null = null;

      try {
        result =
          responseText
            ? JSON.parse(
                responseText
              )
            : null;
      } catch {
        console.error(
          "CREATE STUDENT FEEDBACK NON-JSON RESPONSE:",
          responseText
        );

        throw new Error(
          "Student Feedback API returned an invalid response."
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
            "Failed to create student feedback."
        );
      }

      // ===================================================
      // SUCCESS
      // ===================================================

      toast.success(
        "Student feedback created successfully."
      );

      // ===================================================
      // REDIRECT
      // ===================================================

      router.push(
        "/dashboard/home/student-feedback"
      );

      router.refresh();
    } catch (error) {
      console.error(
        "CREATE STUDENT FEEDBACK ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create student feedback."
      );
    }
  };

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1600px]">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-6 flex flex-col gap-4">

          {/* BACK BUTTON */}

          <Link
            href="/dashboard/home/student-feedback"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-[#008B45]"
          >
            <ArrowLeft size={17} />

            Back to Student Feedback
          </Link>

          {/* HEADER TEXT */}

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#008B45]">
              Homepage
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Create Student Feedback
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Add a student testimonial that
              will appear on the homepage.
            </p>
          </div>
        </div>

        {/* =================================================
            FORM + LIVE PREVIEW
        ================================================= */}

        <div className="grid w-full grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">

          {/* =================================================
              LEFT — FORM
          ================================================= */}

          <div className="min-w-0">
            <StudentFeedbackForm
              initialData={
                defaultFormData
              }

              onChange={
                setPreviewData
              }

              onSubmit={
                handleCreate
              }

              submitLabel="Create Feedback"

              title="Student Feedback"

              description="Manage the student name, designation, feedback, rating and profile image."
            />
          </div>

          {/* =================================================
              RIGHT — LIVE PREVIEW
          ================================================= */}

          <div className="min-w-0 xl:sticky xl:top-6">
            <StudentFeedbackPreview
              data={previewData}
            />
          </div>
        </div>
      </div>
    </main>
  );
}