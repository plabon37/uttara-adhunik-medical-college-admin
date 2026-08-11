"use client";

import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";

import {
  Image as ImageIcon,
  Loader2,
  Star,
  Trash2,
  Upload,
} from "lucide-react";

// =========================================================
// TYPES
// =========================================================

export interface StudentFeedbackFormData {
  name: string;
  designation: string;
  feedback: string;
  image: string;
  rating: number;
  isPublished: boolean;
  order: number;
}

interface StudentFeedbackFormProps {
  initialData?: Partial<StudentFeedbackFormData>;

  onSubmit: (
    data: StudentFeedbackFormData
  ) => Promise<void> | void;

  onChange?: (
    data: StudentFeedbackFormData
  ) => void;

  submitLabel?: string;

  title?: string;

  description?: string;
}

// =========================================================
// DEFAULT DATA
// =========================================================

const DEFAULT_DATA: StudentFeedbackFormData = {
  name: "",
  designation: "",
  feedback: "",
  image: "",
  rating: 5,
  isPublished: true,
  order: 0,
};

// =========================================================
// COMPONENT
// =========================================================

export default function StudentFeedbackForm({
  initialData,
  onSubmit,
  onChange,
  submitLabel = "Create Feedback",
  title = "Student Feedback",
  description = "Add student feedback for the homepage.",
}: StudentFeedbackFormProps) {
  // =======================================================
  // INITIAL FORM STATE
  // =======================================================

  const [formData, setFormData] =
    useState<StudentFeedbackFormData>(() => ({
      ...DEFAULT_DATA,
      ...initialData,
    }));

  const [imagePreview, setImagePreview] =
    useState<string>(
      initialData?.image || ""
    );

  const [uploadingImage, setUploadingImage] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  // =======================================================
  // UPDATE FIELD
  // =======================================================

  const updateField = <
    K extends keyof StudentFeedbackFormData
  >(
    field: K,
    value: StudentFeedbackFormData[K]
  ) => {
    const nextData: StudentFeedbackFormData = {
      ...formData,
      [field]: value,
    };

    setFormData(nextData);

    // -------------------------------------------------------
    // LIVE PREVIEW
    // -------------------------------------------------------

    if (onChange) {
      onChange(nextData);
    }
  };

  // =======================================================
  // IMAGE UPLOAD
  // =======================================================

  const handleImageUpload = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");

    // =====================================================
    // FILE TYPE VALIDATION
    // =====================================================

    if (!file.type.startsWith("image/")) {
      setError(
        "Please select a valid image file."
      );

      event.target.value = "";

      return;
    }

    // =====================================================
    // FILE SIZE VALIDATION
    // =====================================================

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "Image size must be less than 5MB."
      );

      event.target.value = "";

      return;
    }

    // =====================================================
    // LOCAL PREVIEW
    // =====================================================

    const localPreview =
      URL.createObjectURL(file);

    setImagePreview(localPreview);

    try {
      setUploadingImage(true);

      // ===================================================
      // FORM DATA
      // ===================================================

      const uploadData =
        new FormData();

      uploadData.append(
        "file",
        file
      );

      // ===================================================
      // UPLOAD TO ADMIN UPLOAD API
      // ===================================================

      const response =
        await fetch(
          "/api/upload",
          {
            method: "POST",
            body: uploadData,
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Image upload failed."
        );
      }

      // ===================================================
      // CLOUDINARY URL
      // ===================================================

      const imageUrl =
        result?.url ||
        result?.data?.url ||
        result?.secure_url ||
        result?.data?.secure_url;

      if (!imageUrl) {
        throw new Error(
          "Cloudinary image URL was not returned."
        );
      }

      // ===================================================
      // SET CLOUDINARY PREVIEW
      // ===================================================

      setImagePreview(imageUrl);

      // ===================================================
      // UPDATE FORM + LIVE PREVIEW
      // ===================================================

      updateField(
        "image",
        imageUrl
      );
    } catch (uploadError) {
      console.error(
        "STUDENT FEEDBACK IMAGE UPLOAD ERROR:",
        uploadError
      );

      setImagePreview(
        formData.image || ""
      );

      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Failed to upload image."
      );
    } finally {
      setUploadingImage(false);

      URL.revokeObjectURL(
        localPreview
      );

      event.target.value = "";
    }
  };

  // =======================================================
  // REMOVE IMAGE
  // =======================================================

  const handleRemoveImage = () => {
    setImagePreview("");

    updateField(
      "image",
      ""
    );
  };

  // =======================================================
  // SUBMIT
  // =======================================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    // =====================================================
    // VALIDATE NAME
    // =====================================================

    if (!formData.name.trim()) {
      setError(
        "Student name is required."
      );

      return;
    }

    // =====================================================
    // VALIDATE DESIGNATION
    // =====================================================

    if (
      !formData.designation.trim()
    ) {
      setError(
        "Designation is required."
      );

      return;
    }

    // =====================================================
    // VALIDATE FEEDBACK
    // =====================================================

    if (
      !formData.feedback.trim()
    ) {
      setError(
        "Feedback is required."
      );

      return;
    }

    // =====================================================
    // VALIDATE IMAGE
    // =====================================================

    if (!formData.image.trim()) {
      setError(
        "Please upload a student image."
      );

      return;
    }

    // =====================================================
    // VALIDATE RATING
    // =====================================================

    if (
      formData.rating < 1 ||
      formData.rating > 5
    ) {
      setError(
        "Rating must be between 1 and 5."
      );

      return;
    }

    // =====================================================
    // VALIDATE ORDER
    // =====================================================

    if (formData.order < 0) {
      setError(
        "Order cannot be negative."
      );

      return;
    }

    // =====================================================
    // SUBMIT
    // =====================================================

    try {
      setSubmitting(true);

      const finalData: StudentFeedbackFormData = {
        name:
          formData.name.trim(),

        designation:
          formData.designation.trim(),

        feedback:
          formData.feedback.trim(),

        image:
          formData.image.trim(),

        rating:
          Number(formData.rating),

        isPublished:
          formData.isPublished,

        order:
          Number(formData.order),
      };

      await onSubmit(
        finalData
      );
    } catch (submitError) {
      console.error(
        "STUDENT FEEDBACK FORM SUBMIT ERROR:",
        submitError
      );

      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to save student feedback."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full"
    >
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            {title}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        </div>

        {/* =================================================
            BODY
        ================================================= */}

        <div className="space-y-6 p-6">

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* =================================================
              NAME
          ================================================= */}

          <div>
            <label
              htmlFor="student-feedback-name"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Student Name
            </label>

            <input
              id="student-feedback-name"
              type="text"
              value={formData.name}
              onChange={(event) =>
                updateField(
                  "name",
                  event.target.value
                )
              }
              placeholder="Emma Elizabeth"
              maxLength={100}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#008B45] focus:ring-2 focus:ring-[#008B45]/10"
            />
          </div>

          {/* =================================================
              DESIGNATION
          ================================================= */}

          <div>
            <label
              htmlFor="student-feedback-designation"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Designation
            </label>

            <input
              id="student-feedback-designation"
              type="text"
              value={
                formData.designation
              }
              onChange={(event) =>
                updateField(
                  "designation",
                  event.target.value
                )
              }
              placeholder="Assistant Teacher"
              maxLength={100}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#008B45] focus:ring-2 focus:ring-[#008B45]/10"
            />
          </div>

          {/* =================================================
              FEEDBACK
          ================================================= */}

          <div>
            <label
              htmlFor="student-feedback-text"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Feedback
            </label>

            <textarea
              id="student-feedback-text"
              value={
                formData.feedback
              }
              onChange={(event) =>
                updateField(
                  "feedback",
                  event.target.value
                )
              }
              placeholder="Write the student's feedback..."
              rows={6}
              maxLength={1000}
              className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-[#008B45] focus:ring-2 focus:ring-[#008B45]/10"
            />

            <div className="mt-1 text-right text-xs text-slate-400">
              {
                formData.feedback
                  .length
              }{" "}
              / 1000
            </div>
          </div>

          {/* =================================================
              RATING
          ================================================= */}

          <div>
            <label className="mb-3 block text-sm font-medium text-slate-700">
              Rating
            </label>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map(
                (star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      updateField(
                        "rating",
                        star
                      )
                    }
                    className="transition hover:scale-110"
                    aria-label={`Give ${star} star rating`}
                  >
                    <Star
                      size={28}
                      strokeWidth={1.8}
                      className={
                        star <=
                        formData.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300"
                      }
                    />
                  </button>
                )
              )}

              <span className="ml-2 text-sm text-slate-500">
                {formData.rating}/5
              </span>
            </div>
          </div>

          {/* =================================================
              IMAGE
          ================================================= */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Student Image
            </label>

            {imagePreview ? (
              <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                <img
                  src={imagePreview}
                  alt="Student preview"
                  className="h-56 w-full object-cover"
                />

                <button
                  type="button"
                  onClick={
                    handleRemoveImage
                  }
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-500 shadow-md transition hover:bg-red-50"
                  aria-label="Remove image"
                >
                  <Trash2
                    size={17}
                  />
                </button>
              </div>
            ) : (
              <label
                htmlFor="student-feedback-image"
                className="flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-8 text-center transition hover:border-[#008B45]/40 hover:bg-[#008B45]/5"
              >
                {uploadingImage ? (
                  <>
                    <Loader2
                      size={30}
                      className="animate-spin text-[#008B45]"
                    />

                    <p className="mt-3 text-sm font-medium text-slate-700">
                      Uploading image...
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#008B45]/10">
                      <Upload
                        size={22}
                        className="text-[#008B45]"
                      />
                    </div>

                    <p className="mt-3 text-sm font-medium text-slate-700">
                      Click to upload
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      PNG, JPG or WEBP · Max 5MB
                    </p>
                  </>
                )}

                <input
                  id="student-feedback-image"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={
                    handleImageUpload
                  }
                  disabled={
                    uploadingImage
                  }
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* =================================================
              PUBLISHED + ORDER
          ================================================= */}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            {/* PUBLISHED */}

            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Published
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Show this feedback on the website.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    updateField(
                      "isPublished",
                      !formData.isPublished
                    )
                  }
                  className={`relative h-6 w-11 rounded-full transition ${
                    formData.isPublished
                      ? "bg-[#008B45]"
                      : "bg-slate-300"
                  }`}
                  aria-label="Toggle published"
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                      formData.isPublished
                        ? "left-6"
                        : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* ORDER */}

            <div>
              <label
                htmlFor="student-feedback-order"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Display Order
              </label>

              <input
                id="student-feedback-order"
                type="number"
                min={0}
                value={
                  formData.order
                }
                onChange={(event) =>
                  updateField(
                    "order",
                    Number(
                      event.target.value
                    )
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#008B45] focus:ring-2 focus:ring-[#008B45]/10"
              />
            </div>
          </div>

          {/* =================================================
              SUBMIT
          ================================================= */}

          <div className="flex justify-end border-t border-slate-100 pt-5">
            <button
              type="submit"
              disabled={
                submitting ||
                uploadingImage
              }
              className="inline-flex min-w-44 items-center justify-center gap-2 rounded-xl bg-[#008B45] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#00763b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  Saving...
                </>
              ) : (
                <>
                  <ImageIcon
                    size={18}
                  />

                  {submitLabel}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}