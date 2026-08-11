"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import StudentFeedbackForm, {
  StudentFeedbackFormData,
} from "@/components/dashboard/home/student-feedback/StudentFeedbackForm";

import StudentFeedbackPreview from "@/components/dashboard/home/student-feedback/StudentFeedbackPreview";

// =========================================================
// API RESPONSE
// =========================================================

interface StudentFeedbackResponse {
  success?: boolean;
  message?: string;
  data?: StudentFeedbackFormData & {
    _id: string;
  };
}

// =========================================================
// PAGE
// =========================================================

export default function EditStudentFeedbackPage() {
  const params =
    useParams<{
      id: string;
    }>();

  const router = useRouter();

  const id = params?.id;

  // =======================================================
  // STATE
  // =======================================================

  const [formData, setFormData] =
    useState<StudentFeedbackFormData | null>(
      null
    );

  const [previewData, setPreviewData] =
    useState<StudentFeedbackFormData | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  // =======================================================
  // LOAD EXISTING FEEDBACK
  // =======================================================

  useEffect(() => {
    if (!id) {
      return;
    }

    let cancelled = false;

    async function loadFeedback() {
      try {
        setLoading(true);

        const response =
          await fetch(
            `/api/student-feedback/${id}`,
            {
              method: "GET",
              cache: "no-store",
            }
          );

        const result:
          StudentFeedbackResponse =
          await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message ||
              "Failed to fetch student feedback."
          );
        }

        if (
          !result.data ||
          cancelled
        ) {
          return;
        }

        const data: StudentFeedbackFormData =
          {
            name:
              result.data.name || "",

            designation:
              result.data.designation ||
              "",

            feedback:
              result.data.feedback ||
              "",

            image:
              result.data.image || "",

            rating:
              Number(
                result.data.rating
              ) || 5,

            isPublished:
              Boolean(
                result.data
                  .isPublished
              ),

            order:
              Number(
                result.data.order
              ) || 0,
          };

        setFormData(data);

        setPreviewData(data);
      } catch (error) {
        console.error(
          "EDIT STUDENT FEEDBACK LOAD ERROR:",
          error
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to load student feedback."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadFeedback();

    return () => {
      cancelled = true;
    };
  }, [id]);

  // =======================================================
  // UPDATE
  // =======================================================

  const handleUpdate = async (
    data: StudentFeedbackFormData
  ) => {
    if (!id) {
      throw new Error(
        "Student feedback ID is missing."
      );
    }

    try {
      // ===================================================
      // UPDATE LOCAL DATA
      // ===================================================

      setFormData(data);

      setPreviewData(data);

      // ===================================================
      // PUT API
      // ===================================================

      const response =
        await fetch(
          `/api/student-feedback/${id}`,
          {
            method: "PUT",

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
        | StudentFeedbackResponse
        | null = null;

      try {
        result =
          responseText
            ? JSON.parse(
                responseText
              )
            : null;
      } catch {
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
            "Failed to update student feedback."
        );
      }

      // ===================================================
      // SUCCESS
      // ===================================================

      toast.success(
        "Student feedback updated successfully."
      );

      // ===================================================
      // BACK TO TABLE
      // ===================================================

      router.push(
        "/dashboard/home/student-feedback"
      );

      router.refresh();
    } catch (error) {
      console.error(
        "UPDATE STUDENT FEEDBACK ERROR:",
        error
      );

      throw error;
    }
  };

  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
          <Loader2
            size={22}
            className="animate-spin text-[#008B45]"
          />

          Loading Student Feedback...
        </div>
      </main>
    );
  }

  // =======================================================
  // NOT FOUND
  // =======================================================

  if (!formData || !previewData) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">
            Student Feedback Not Found
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            The feedback you are trying to edit
            could not be found.
          </p>

          <Link
            href="/dashboard/home/student-feedback"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#008B45] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00763b]"
          >
            <ArrowLeft size={17} />

            Back to Student Feedback
          </Link>
        </div>
      </main>
    );
  }

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

          {/* BACK */}

          <Link
            href="/dashboard/home/student-feedback"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-[#008B45]"
          >
            <ArrowLeft size={17} />

            Back to Student Feedback
          </Link>

          {/* TITLE */}

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#008B45]">
              Homepage
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Edit Student Feedback
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Update the student testimonial,
              image, rating and homepage visibility.
            </p>
          </div>
        </div>

        {/* =================================================
            FORM + PREVIEW
        ================================================= */}

        <div className="grid w-full grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">

          {/* =================================================
              FORM
          ================================================= */}

          <div className="min-w-0">
            <StudentFeedbackForm
              initialData={formData}

              onChange={
                setPreviewData
              }

              onSubmit={
                handleUpdate
              }

              submitLabel="Update Feedback"

              title="Student Feedback"

              description="Update the student name, designation, feedback, rating and profile image."
            />
          </div>

          {/* =================================================
              LIVE PREVIEW
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