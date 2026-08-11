import Link from "next/link";
import { Plus } from "lucide-react";

import StudentFeedbackTable, {
  StudentFeedbackItem,
} from "@/components/dashboard/home/student-feedback/StudentFeedbackTable";

// =========================================================
// API URL
// =========================================================

const ADMIN_URL =
  process.env.NEXT_PUBLIC_ADMIN_URL ||
  "http://localhost:3000";

// =========================================================
// FETCH STUDENT FEEDBACK
// =========================================================

async function getStudentFeedback(): Promise<
  StudentFeedbackItem[]
> {
  try {
    const response = await fetch(
      `${ADMIN_URL}/api/student-feedback`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(
        "FAILED TO FETCH STUDENT FEEDBACK:",
        response.status
      );

      return [];
    }

    const result =
      await response.json();

    return result?.data || [];
  } catch (error) {
    console.error(
      "STUDENT FEEDBACK FETCH ERROR:",
      error
    );

    return [];
  }
}

// =========================================================
// PAGE
// =========================================================

export default async function StudentFeedbackPage() {
  const feedbackList =
    await getStudentFeedback();

  // =======================================================
  // SORT BY ORDER
  // =======================================================

  const sortedFeedback =
    [...feedbackList].sort(
      (a, b) =>
        Number(a.order) -
        Number(b.order)
    );

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1600px]">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#008B45]">
              Homepage
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Student Feedback
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Manage the student testimonials
              displayed on the homepage.
            </p>
          </div>

          {/* =============================================
              ADD BUTTON
          ============================================= */}

          <Link
            href="/dashboard/home/student-feedback/new"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#008B45] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#00763b]"
          >
            <Plus size={18} />

            Add Feedback
          </Link>
        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <StudentFeedbackTable
          initialData={sortedFeedback}
        />
      </div>
    </main>
  );
}