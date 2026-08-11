"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ImagePlus,
} from "lucide-react";
import { toast } from "sonner";

// =========================================================
// TYPES
// =========================================================

export interface AlumniEventFormData {
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  isPublished: boolean;
  order: number;
}

interface AlumniEventFormProps {
  initialData: AlumniEventFormData;

  onSubmit: (
    data: AlumniEventFormData
  ) => Promise<void>;

  onChange?: (
    data: AlumniEventFormData
  ) => void;

  submitLabel: string;

  title?: string;

  description?: string;
}

// =========================================================
// CLOUDINARY RESPONSE
// =========================================================

interface CloudinaryUploadResponse {
  secure_url?: string;
  url?: string;

  success?: boolean;

  message?: string;

  error?: {
    message?: string;
  };
}

// =========================================================
// COMPONENT
// =========================================================

export default function AlumniEventForm({
  initialData,
  onSubmit,
  onChange,
  submitLabel,
  title = "Alumni Event",
  description = "Manage the Alumni Event information for the homepage.",
}: AlumniEventFormProps) {
  // =======================================================
  // FORM STATE
  // =======================================================

  const [formData, setFormData] =
    useState<AlumniEventFormData>(
      initialData
    );

  // =======================================================
  // SUBMIT STATE
  // =======================================================

  const [submitting, setSubmitting] =
    useState(false);

  // =======================================================
  // IMAGE UPLOAD STATE
  // =======================================================

  const [uploadingImage, setUploadingImage] =
    useState(false);

  // =======================================================
  // UPDATE FORM DATA
  // =======================================================

  const updateFormData = (
    updatedData: AlumniEventFormData
  ) => {
    setFormData(updatedData);

    // -----------------------------------------------------
    // LIVE PREVIEW UPDATE
    // -----------------------------------------------------

    onChange?.(updatedData);
  };

  // =======================================================
  // FIELD CHANGE
  // =======================================================

  const handleChange = (
    field: keyof AlumniEventFormData,
    value: string | boolean | number
  ) => {
    const updatedData: AlumniEventFormData = {
      ...formData,
      [field]: value,
    };

    updateFormData(updatedData);
  };

  // =======================================================
  // CLOUDINARY IMAGE UPLOAD
  // =======================================================

  const handleImageUpload = async (
    file: File
  ) => {
    if (!file) {
      return;
    }

    // =====================================================
    // FILE TYPE VALIDATION
    // =====================================================

    if (
      !file.type.startsWith("image/")
    ) {
      toast.error(
        "Please select a valid image file."
      );

      return;
    }

    // =====================================================
    // FILE SIZE VALIDATION
    // =====================================================

    const maximumFileSize =
      5 * 1024 * 1024;

    if (
      file.size > maximumFileSize
    ) {
      toast.error(
        "Image size must be less than 5MB."
      );

      return;
    }

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
      // UPLOAD API
      // ===================================================

      const response =
        await fetch(
          "/api/upload",
          {
            method: "POST",
            body: uploadData,
          }
        );

      // ===================================================
      // READ RESPONSE
      // ===================================================

      const responseText =
        await response.text();

      let result:
        | CloudinaryUploadResponse
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
          "Image upload API returned an invalid response."
        );
      }

      // ===================================================
      // API ERROR
      // ===================================================

      if (!response.ok) {
        throw new Error(
          result?.message ||
            result?.error?.message ||
            "Failed to upload image."
        );
      }

      // ===================================================
      // CLOUDINARY URL
      // ===================================================

      const imageUrl =
        result?.secure_url ||
        result?.url;

      if (!imageUrl) {
        throw new Error(
          "Cloudinary did not return an image URL."
        );
      }

      // ===================================================
      // UPDATE FORM + PREVIEW
      // ===================================================

      const updatedData: AlumniEventFormData = {
        ...formData,
        image: imageUrl,
      };

      updateFormData(updatedData);

      toast.success(
        "Image uploaded successfully."
      );
    } catch (error) {
      console.error(
        "ALUMNI EVENT IMAGE UPLOAD ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to upload image."
      );
    } finally {
      setUploadingImage(false);
    }
  };

  // =======================================================
  // SUBMIT
  // =======================================================

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // =====================================================
    // VALIDATION
    // =====================================================

    if (!formData.title.trim()) {
      toast.error(
        "Event title is required."
      );

      return;
    }

    if (!formData.date.trim()) {
      toast.error(
        "Event date is required."
      );

      return;
    }

    if (!formData.time.trim()) {
      toast.error(
        "Event time is required."
      );

      return;
    }

    if (
      !formData.location.trim()
    ) {
      toast.error(
        "Event location is required."
      );

      return;
    }

    if (!formData.image.trim()) {
      toast.error(
        "Event image is required."
      );

      return;
    }

    // =====================================================
    // SUBMIT
    // =====================================================

    try {
      setSubmitting(true);

      await onSubmit({
        ...formData,

        title:
          formData.title.trim(),

        date:
          formData.date.trim(),

        time:
          formData.time.trim(),

        location:
          formData.location.trim(),

        image:
          formData.image.trim(),

        order:
          Number(formData.order),
      });
    } catch (error) {
      console.error(
        "ALUMNI EVENT FORM SUBMIT ERROR:",
        error
      );

      throw error;
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
      className="
        w-full
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          border-b
          border-slate-200
          px-5
          py-5
          sm:px-6
        "
      >
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

        <h2
          className="
            mt-1
            text-xl
            font-bold
            text-slate-900
          "
        >
          {title}
        </h2>

        <p
          className="
            mt-2
            text-sm
            leading-6
            text-slate-500
          "
        >
          {description}
        </p>
      </div>

      {/* =================================================
          BODY
      ================================================= */}

      <div
        className="
          space-y-6
          p-5
          sm:p-6
        "
      >
        {/* =================================================
            TITLE
        ================================================= */}

        <div>
          <label
            htmlFor="alumni-event-title"
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-700
            "
          >
            Event Title
          </label>

          <input
            id="alumni-event-title"
            type="text"
            value={formData.title}
            onChange={(event) =>
              handleChange(
                "title",
                event.target.value
              )
            }
            placeholder="Bridging Cultures: Global Perspectives in..."
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-sm
              text-slate-900
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-[#008B45]
              focus:ring-2
              focus:ring-[#008B45]/10
            "
          />
        </div>

        {/* =================================================
            DATE + TIME
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
          "
        >
          {/* DATE */}

          <div>
            <label
              htmlFor="alumni-event-date"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-700
              "
            >
              Date
            </label>

            <input
              id="alumni-event-date"
              type="text"
              value={formData.date}
              onChange={(event) =>
                handleChange(
                  "date",
                  event.target.value
                )
              }
              placeholder="August 20, 2024"
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-sm
                text-slate-900
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-[#008B45]
                focus:ring-2
                focus:ring-[#008B45]/10
              "
            />
          </div>

          {/* TIME */}

          <div>
            <label
              htmlFor="alumni-event-time"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-700
              "
            >
              Time
            </label>

            <input
              id="alumni-event-time"
              type="text"
              value={formData.time}
              onChange={(event) =>
                handleChange(
                  "time",
                  event.target.value
                )
              }
              placeholder="4:27 am"
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-sm
                text-slate-900
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-[#008B45]
                focus:ring-2
                focus:ring-[#008B45]/10
              "
            />
          </div>
        </div>

        {/* =================================================
            LOCATION
        ================================================= */}

        <div>
          <label
            htmlFor="alumni-event-location"
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-700
            "
          >
            Location
          </label>

          <input
            id="alumni-event-location"
            type="text"
            value={formData.location}
            onChange={(event) =>
              handleChange(
                "location",
                event.target.value
              )
            }
            placeholder="Yarra Park, UK"
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-sm
              text-slate-900
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-[#008B45]
              focus:ring-2
              focus:ring-[#008B45]/10
            "
          />
        </div>

        {/* =================================================
            IMAGE UPLOAD
        ================================================= */}

        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-700
            "
          >
            Event Image
          </label>

          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-dashed
              border-slate-300
              bg-slate-50
            "
          >
            {/* CURRENT IMAGE */}

            {formData.image && (
              <div
                className="
                  relative
                  aspect-[16/8]
                  w-full
                  overflow-hidden
                  bg-slate-100
                "
              >
                <Image
                  src={formData.image}
                  alt={
                    formData.title ||
                    "Alumni Event"
                  }
                  fill
                  sizes="
                    (max-width: 768px)
                    100vw,
                    800px
                  "
                  className="
                    object-cover
                  "
                />
              </div>
            )}

            {/* UPLOAD */}

            <label
              htmlFor="alumni-event-image"
              className="
                flex
                cursor-pointer
                flex-col
                items-center
                justify-center
                gap-3
                px-5
                py-8
                text-center
                transition
                hover:bg-slate-100
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-emerald-50
                  text-[#008B45]
                "
              >
                {uploadingImage ? (
                  <span
                    className="
                      h-5
                      w-5
                      animate-spin
                      rounded-full
                      border-2
                      border-[#008B45]/30
                      border-t-[#008B45]
                    "
                  />
                ) : (
                  <ImagePlus
                    size={22}
                  />
                )}
              </div>

              <div>
                <p
                  className="
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  {uploadingImage
                    ? "Uploading image..."
                    : "Upload Event Image"}
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-400
                  "
                >
                  PNG, JPG, JPEG or
                  WEBP · Maximum 5MB
                </p>
              </div>

              <input
                id="alumni-event-image"
                type="file"
                accept="
                  image/png,
                  image/jpeg,
                  image/jpg,
                  image/webp
                "
                className="hidden"
                disabled={
                  uploadingImage ||
                  submitting
                }
                onChange={(event) => {
                  const file =
                    event.target
                      .files?.[0];

                  if (file) {
                    void handleImageUpload(
                      file
                    );
                  }

                  event.target.value =
                    "";
                }}
              />
            </label>
          </div>
        </div>

        {/* =================================================
            PUBLISH + ORDER
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
          "
        >
          {/* PUBLISH */}

          <div
            className="
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-slate-200
              px-4
              py-3
            "
          >
            <div>
              <p
                className="
                  text-sm
                  font-semibold
                  text-slate-700
                "
              >
                Publish Event
              </p>

              <p
                className="
                  mt-0.5
                  text-xs
                  text-slate-400
                "
              >
                Show event on website
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={
                formData.isPublished
              }
              onClick={() =>
                handleChange(
                  "isPublished",
                  !formData.isPublished
                )
              }
              className={`
                relative
                h-6
                w-11
                rounded-full
                transition
                ${
                  formData.isPublished
                    ? "bg-[#008B45]"
                    : "bg-slate-300"
                }
              `}
            >
              <span
                className={`
                  absolute
                  top-1
                  h-4
                  w-4
                  rounded-full
                  bg-white
                  shadow
                  transition
                  ${
                    formData.isPublished
                      ? "left-6"
                      : "left-1"
                  }
                `}
              />
            </button>
          </div>

          {/* ORDER */}

          <div>
            <label
              htmlFor="alumni-event-order"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-700
              "
            >
              Display Order
            </label>

            <input
              id="alumni-event-order"
              type="number"
              min={0}
              value={formData.order}
              onChange={(event) =>
                handleChange(
                  "order",
                  Number(
                    event.target.value
                  )
                )
              }
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-sm
                text-slate-900
                outline-none
                transition
                focus:border-[#008B45]
                focus:ring-2
                focus:ring-[#008B45]/10
              "
            />
          </div>
        </div>

        {/* =================================================
            SUBMIT
        ================================================= */}

        <button
          type="submit"
          disabled={
            submitting ||
            uploadingImage
          }
          className="
            inline-flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#008B45]
            px-5
            py-3.5
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition
            hover:bg-[#00763B]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {submitting ? (
            <>
              <span
                className="
                  h-4
                  w-4
                  animate-spin
                  rounded-full
                  border-2
                  border-white/30
                  border-t-white
                "
              />

              Saving...
            </>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
}