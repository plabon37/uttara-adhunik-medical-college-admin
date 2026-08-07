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
    category: string;
    pdf: string;
    order: number;
    isPublished: boolean;
  };
}

export default function NoticeForm({
  initialData,
}: NoticeFormProps) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title:
        initialData?.title ?? "",

      category:
        initialData?.category ??
        "General Notice",

      pdf:
        initialData?.pdf ?? "",

      order:
        initialData?.order ?? 1,

      isPublished:
        initialData?.isPublished ??
        true,
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
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

  const handlePdfChange = (
    url: string
  ) => {
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

      const endpoint =
        initialData?._id
          ? `/api/notices/${initialData._id}`
          : "/api/notices";

      const method =
        initialData?._id
          ? "PATCH"
          : "POST";

      const res = await fetch(
        endpoint,
        {
          method,

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            formData
          ),
        }
      );

      const result =
        await res.json();

      if (!res.ok) {
        throw new Error(
          result.message ||
            "Operation failed"
        );
      }

      toast.success(
        result.message
      );

      router.push(
        "/dashboard/notices"
      );

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong."
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

        {/* Left Side */}

        <div className="space-y-6">

          {/* PDF Upload */}

          <NoticePdfUpload
            pdf={formData.pdf}
            onChange={
              handlePdfChange
            }
          />
                    {/* Notice Title */}

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

          {/* Category */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
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

              <option value="Academic Notice">
                Academic Notice
              </option>
            </select>
          </div>

          {/* Display Order */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Display Order
            </label>

            <input
              type="number"
              min={1}
              name="order"
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
              value={String(formData.isPublished)}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isPublished:
                    e.target.value === "true",
                }))
              }
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
            >
              <option value="true">
                Published
              </option>

              <option value="false">
                Draft
              </option>
            </select>
          </div>

        </div>

        {/* Right Side */}

        <div className="space-y-6 xl:sticky xl:top-6 self-start">

          <NoticePreview
            title={formData.title}
            category={formData.category}
            pdf={formData.pdf}
            isPublished={formData.isPublished}
          />

        </div>
              </div>

      {/* Action Buttons */}

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">

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