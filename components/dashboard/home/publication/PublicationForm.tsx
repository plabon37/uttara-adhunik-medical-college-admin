"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import PublicationPreview from "./PublicationPreview";
import PublicationPDFUpload from "./PublicationPDFUpload";

interface PublicationFormData {
  _id?: string;
  title: string;
  slug: string;
  category: "Journal" | "Tenders";
  description: string;
  pdf: string;
  date: string;
  time: string;
  order: number;
  isPublished: boolean;
}

interface PublicationFormProps {
  initialData?: PublicationFormData;
}

const defaultFormData: PublicationFormData = {
  title: "",
  slug: "",
  category: "Journal",
  description: "",
  pdf: "",
  date: "",
  time: "",
  order: 0,
  isPublished: true,
};

export default function PublicationForm({
  initialData,
}: PublicationFormProps) {
  const router = useRouter();

  const [formData, setFormData] =
    useState<PublicationFormData>(
      initialData || defaultFormData
    );

  const [submitting, setSubmitting] =
    useState(false);

  const isEditMode = Boolean(
    initialData?._id
  );

  // ==========================
  // GENERATE SLUG
  // ==========================

  const generateSlug = (
    value: string
  ) => {
    return value
      .toLowerCase()
      .trim()
      .replace(
        /[^\p{L}\p{N}\s-]/gu,
        ""
      )
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  // ==========================
  // UPDATE FIELD
  // ==========================

  const updateField = <
    K extends keyof PublicationFormData
  >(
    field: K,
    value: PublicationFormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ==========================
  // TITLE CHANGE
  // ==========================

  const handleTitleChange = (
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      title: value,
      ...(isEditMode
        ? {}
        : {
            slug: generateSlug(value),
          }),
    }));
  };

  // ==========================
  // SUBMIT
  // ==========================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error(
        "Publication title is required."
      );
      return;
    }

    if (!formData.slug.trim()) {
      toast.error(
        "Publication slug is required."
      );
      return;
    }

    if (!formData.description.trim()) {
      toast.error(
        "Publication description is required."
      );
      return;
    }

    if (!formData.pdf.trim()) {
      toast.error(
        "Please upload the publication PDF."
      );
      return;
    }

    if (!formData.date) {
      toast.error(
        "Publication date is required."
      );
      return;
    }

    if (!formData.time.trim()) {
      toast.error(
        "Publication time is required."
      );
      return;
    }

    try {
      setSubmitting(true);

      const url = isEditMode
        ? `/api/publications/${initialData?._id}`
        : "/api/publications";

      const method = isEditMode
        ? "PATCH"
        : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          ...formData,
          order: Number(
            formData.order
          ),
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.message ||
            "Failed to save publication."
        );
      }

      toast.success(
        result.message ||
          "Publication saved successfully."
      );

      router.push(
        "/dashboard/home/publications"
      );

      router.refresh();
    } catch (error) {
      console.error(
        "SAVE PUBLICATION ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save publication."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]"
    >
      {/* ==========================
          LEFT SIDE
      ========================== */}

      <div className="space-y-6">
        {/* Basic Information */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold text-slate-800">
            Publication Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter the basic publication
            information.
          </p>

          <div className="mt-6 space-y-5">
            {/* Title */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Publication Title
              </label>

              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  handleTitleChange(
                    e.target.value
                  )
                }
                placeholder="Enter Publication Title"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  px-4
                  py-3
                  outline-none
                  transition
                  focus:border-teal-500
                  focus:ring-2
                  focus:ring-teal-500/10
                "
              />
            </div>

            {/* Slug */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Slug
              </label>

              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  updateField(
                    "slug",
                    e.target.value
                  )
                }
                placeholder="publication-slug"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  px-4
                  py-3
                  outline-none
                  transition
                  focus:border-teal-500
                  focus:ring-2
                  focus:ring-teal-500/10
                "
              />

              <p className="mt-1 text-xs text-slate-500">
                Example:
                bcps-e-logbook-publication
              </p>
            </div>

            {/* Category */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Category
              </label>

              <select
                value={formData.category}
                onChange={(e) =>
                  updateField(
                    "category",
                    e.target.value as
                      | "Journal"
                      | "Tenders"
                  )
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
                  focus:border-teal-500
                  focus:ring-2
                  focus:ring-teal-500/10
                "
              >
                <option value="Journal">
                  Journal
                </option>

                <option value="Tenders">
                  Tenders
                </option>
              </select>
            </div>

            {/* Date */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Publication Date
              </label>

              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  updateField(
                    "date",
                    e.target.value
                  )
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
                  focus:border-teal-500
                  focus:ring-2
                  focus:ring-teal-500/10
                "
              />
            </div>

            {/* Time */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Publication Time
              </label>

              <input
                type="text"
                value={formData.time}
                onChange={(e) =>
                  updateField(
                    "time",
                    e.target.value
                  )
                }
                placeholder="3.40 PM"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  px-4
                  py-3
                  outline-none
                  transition
                  focus:border-teal-500
                  focus:ring-2
                  focus:ring-teal-500/10
                "
              />
            </div>

            {/* Description */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Publication Details
              </label>

              <textarea
                value={
                  formData.description
                }
                onChange={(e) =>
                  updateField(
                    "description",
                    e.target.value
                  )
                }
                rows={6}
                placeholder="Write full publication details..."
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-slate-300
                  px-4
                  py-3
                  outline-none
                  transition
                  focus:border-teal-500
                  focus:ring-2
                  focus:ring-teal-500/10
                "
              />
            </div>
          </div>
        </div>

        {/* PDF */}

        <PublicationPDFUpload
          pdf={formData.pdf}
          onChange={(url: string) =>
            updateField(
              "pdf",
              url
            )
          }
        />

        {/* Display Settings */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold text-slate-800">
            Display Settings
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {/* Order */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Display Order
              </label>

              <input
                type="number"
                min="0"
                value={formData.order}
                onChange={(e) =>
                  updateField(
                    "order",
                    Number(
                      e.target.value
                    )
                  )
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
                  focus:border-teal-500
                "
              />
            </div>

            {/* Status */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Status
              </label>

              <select
                value={
                  formData.isPublished
                    ? "published"
                    : "unpublished"
                }
                onChange={(e) =>
                  updateField(
                    "isPublished",
                    e.target.value ===
                      "published"
                  )
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
                  focus:border-teal-500
                "
              >
                <option value="published">
                  Published
                </option>

                <option value="unpublished">
                  Unpublished
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit */}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="
              inline-flex
              items-center
              justify-center
              rounded-xl
              bg-teal-600
              px-7
              py-3
              font-semibold
              text-white
              transition
              hover:bg-teal-700
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {submitting
              ? "Saving..."
              : isEditMode
              ? "Update Publication"
              : "Create Publication"}
          </button>
        </div>
      </div>

      {/* ==========================
          RIGHT SIDE
      ========================== */}

<div className="min-w-0 xl:sticky xl:top-6 xl:self-start">
  <PublicationPreview
    title={formData.title}
    category={formData.category}
    description={formData.description}
    date={formData.date}
    time={formData.time}
    pdf={formData.pdf}
    isPublished={formData.isPublished}
    order={formData.order}
  />
</div>
    </form>
  );
}