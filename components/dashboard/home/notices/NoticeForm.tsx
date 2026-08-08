"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import NoticePdfUpload from "./NoticePdfUpload";
import NoticePreview from "./NoticePreview";

interface NoticeFormProps {
  initialData?: {
    _id?: string;
    title: string;
    slug: string;
    category:
      | "General Notice"
      | "Admission Notice"
      | "Reports"
      | "Job Circular";
    description: string;
    pdf: string;
    date: string;
    time: string;
    isPublished: boolean;
    order: number;
  };
}

export default function NoticeForm({
  initialData,
}: NoticeFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    category:
      initialData?.category ?? "General Notice",
    description: initialData?.description ?? "",
    pdf: initialData?.pdf ?? "",
    date: initialData?.date
      ? new Date(initialData.date)
          .toISOString()
          .split("T")[0]
      : "",
    time: initialData?.time ?? "",
    isPublished:
      initialData?.isPublished ?? true,
    order: initialData?.order ?? 0,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "order"
          ? Number(value)
          : value,
    }));
  };

  const handlePdfChange = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      pdf: url,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const endpoint = initialData?._id
        ? `/api/notices/${initialData._id}`
        : "/api/notices";

      const method = initialData?._id
        ? "PATCH"
        : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.message ||
            "Operation failed."
        );
      }

      toast.success(result.message);

      router.push("/dashboard/home/notices");

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <div className="grid gap-8 xl:grid-cols-2">
        {/* =========================
            LEFT SIDE - FORM
        ========================= */}

        <div className="space-y-6">
          {/* Title */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Notice Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Notice Title"
              required
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                px-4
                py-3
                outline-none
                transition
                focus:border-teal-600
              "
            />
          </div>

          {/* Slug */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Slug
            </label>

            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="notice-slug"
              required
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                px-4
                py-3
                outline-none
                transition
                focus:border-teal-600
              "
            />

            <p className="mt-2 text-xs text-slate-500">
              Example:
              bcps-e-logbook-notice
            </p>
          </div>

          {/* Category */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                px-4
                py-3
                outline-none
                transition
                focus:border-teal-600
              "
            >
              <option value="General Notice">
                General Notice
              </option>

              <option value="Admission Notice">
                Admission Notice
              </option>

              <option value="Reports">
                Reports
              </option>

              <option value="Job Circular">
                Job Circular
              </option>
            </select>
          </div>

          {/* Date */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Notice Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                px-4
                py-3
                outline-none
                transition
                focus:border-teal-600
              "
            />
          </div>

          {/* Time */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Notice Time
            </label>

            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="3.40 PM"
              required
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                px-4
                py-3
                outline-none
                transition
                focus:border-teal-600
              "
            />
          </div>

          {/* Description */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Notice Details
            </label>

            <textarea
              rows={8}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write full notice details..."
              required
              className="
                w-full
                resize-y
                rounded-xl
                border
                border-slate-300
                px-4
                py-3
                outline-none
                transition
                focus:border-teal-600
              "
            />
          </div>

          {/* PDF Upload */}

          <NoticePdfUpload
            pdf={formData.pdf}
            onChange={handlePdfChange}
          />
        </div>

        {/* =========================
            RIGHT SIDE
            LIVE PREVIEW
        ========================= */}

        <div className="space-y-6 xl:sticky xl:top-6 self-start">
          <NoticePreview
            title={formData.title}
            category={formData.category}
            description={formData.description}
            pdf={formData.pdf}
            date={formData.date}
            time={formData.time}
            isPublished={formData.isPublished}
            order={formData.order}
          />

          {/* Order */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Display Order
            </label>

            <input
              type="number"
              name="order"
              min={0}
              value={formData.order}
              onChange={handleChange}
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                px-4
                py-3
                outline-none
                transition
                focus:border-teal-600
              "
            />
          </div>

          {/* Status */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Status
            </label>

            <select
              name="isPublished"
              value={String(
                formData.isPublished
              )}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isPublished:
                    e.target.value ===
                    "true",
                }))
              }
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                px-4
                py-3
                outline-none
                transition
                focus:border-teal-600
              "
            >
              <option value="true">
                Published
              </option>

              <option value="false">
                Unpublished
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* =========================
          ACTION BUTTONS
      ========================= */}

      <div
        className="
          flex
          flex-col-reverse
          gap-3
          border-t
          border-slate-200
          pt-6
          sm:flex-row
          sm:justify-end
        "
      >
        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading}
          className="
            rounded-xl
            border
            border-slate-300
            px-6
            py-3
            font-semibold
            text-slate-700
            transition
            hover:bg-slate-100
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="
            rounded-xl
            bg-teal-600
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-teal-700
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading
            ? "Saving..."
            : initialData?._id
            ? "Update Notice"
            : "Create Notice"}
        </button>
      </div>
    </form>
  );
}