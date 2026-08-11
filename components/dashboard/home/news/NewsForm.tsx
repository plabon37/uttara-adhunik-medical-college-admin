"use client";

import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";

import Image from "next/image";

import {
  CalendarDays,
  ImagePlus,
  Loader2,
  Save,
  Upload,
} from "lucide-react";

import { toast } from "sonner";

// =========================================================
// TYPES
// =========================================================

export interface NewsFormData {
  title: string;

  category: string;

  description: string;

  image: string;

  author: string;

  date: string;

  isPublished: boolean;

  order: number;
}

interface NewsFormProps {
  initialData: NewsFormData;

  onChange?: (
    data: NewsFormData
  ) => void;

  onSubmit: (
    data: NewsFormData
  ) => Promise<void>;

  submitLabel?: string;

  title?: string;

  description?: string;
}

// =========================================================
// COMPONENT
// =========================================================

export default function NewsForm({
  initialData,

  onChange,

  onSubmit,

  submitLabel = "Save News",

  title = "News Information",

  description = "Manage the news information.",
}: NewsFormProps) {
  // =======================================================
  // STATE
  // =======================================================

  const [formData, setFormData] =
    useState<NewsFormData>(
      initialData
    );

  const [uploadingImage, setUploadingImage] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  // =======================================================
  // UPDATE FORM
  //
  // IMPORTANT:
  // Parent onChange is called ONLY from an event handler.
  // NEVER during component render.
  // =======================================================

  const updateForm = (
    changes:
      | Partial<NewsFormData>
      | ((
          previous: NewsFormData
        ) => NewsFormData)
  ) => {
    setFormData(
      (previous) => {
        const nextData =
          typeof changes ===
          "function"
            ? changes(
                previous
              )
            : {
                ...previous,
                ...changes,
              };

        // ===============================================
        // LIVE PREVIEW UPDATE
        //
        // This runs because updateForm()
        // is called from user events only.
        // ===============================================

        onChange?.(
          nextData
        );

        return nextData;
      }
    );
  };

  // =======================================================
  // TEXT INPUT
  // =======================================================

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement
    >
  ) => {
    const {
      name,
      value,
    } = event.target;

    updateForm({
      [name]: value,
    } as Partial<NewsFormData>);
  };

  // =======================================================
  // DESCRIPTION
  // =======================================================

  const handleDescriptionChange = (
    event: ChangeEvent<
      HTMLTextAreaElement
    >
  ) => {
    updateForm({
      description:
        event.target.value,
    });
  };

  // =======================================================
  // NUMBER
  // =======================================================

  const handleOrderChange = (
    event: ChangeEvent<
      HTMLInputElement
    >
  ) => {
    const value =
      event.target.value;

    updateForm({
      order:
        value === ""
          ? 0
          : Number(value),
    });
  };

  // =======================================================
  // PUBLISHED TOGGLE
  // =======================================================

  const handlePublishedChange =
    () => {
      updateForm(
        (previous) => ({
          ...previous,

          isPublished:
            !previous.isPublished,
        })
      );
    };

  // =======================================================
  // IMAGE UPLOAD
  // =======================================================

  const handleImageUpload = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    // Reset input
    event.target.value = "";

    if (!file) {
      return;
    }

    // =====================================================
    // VALIDATE FILE TYPE
    // =====================================================

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      toast.error(
        "Please select a valid image."
      );

      return;
    }

    // =====================================================
    // VALIDATE SIZE
    // =====================================================

    const maxSize =
      10 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error(
        "Image size must be less than 10MB."
      );

      return;
    }

    setUploadingImage(
      true
    );

    try {
      // ===================================================
      // FORMDATA
      // ===================================================

      const uploadData =
        new FormData();

      uploadData.append(
        "file",
        file
      );

      // ===================================================
      // CLOUDINARY UPLOAD API
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
        | {
            success?: boolean;

            message?: string;

            url?: string;

            data?: {
              url?: string;

              secure_url?: string;
            };

            secure_url?: string;
          }
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
          "NEWS IMAGE UPLOAD NON-JSON RESPONSE:",
          responseText
        );

        throw new Error(
          "Image upload API returned an invalid response."
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
            "Failed to upload image."
        );
      }

      // ===================================================
      // GET CLOUDINARY URL
      // ===================================================

      const imageUrl =
        result.url ||
        result.secure_url ||
        result.data?.secure_url ||
        result.data?.url ||
        "";

      if (!imageUrl) {
        throw new Error(
          "Cloudinary image URL was not returned."
        );
      }

      // ===================================================
      // UPDATE FORM
      // ===================================================

      updateForm({
        image: imageUrl,
      });

      toast.success(
        "Image uploaded successfully."
      );
    } catch (error) {
      console.error(
        "NEWS IMAGE UPLOAD ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to upload image."
      );
    } finally {
      setUploadingImage(
        false
      );
    }
  };

  // =======================================================
  // REMOVE IMAGE
  // =======================================================

  const handleRemoveImage =
    () => {
      updateForm({
        image: "",
      });
    };

  // =======================================================
  // SUBMIT
  // =======================================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // =====================================================
    // VALIDATION
    // =====================================================

    const trimmedTitle =
      formData.title.trim();

    const trimmedCategory =
      formData.category.trim();

    const trimmedDescription =
      formData.description.trim();

    const trimmedAuthor =
      formData.author.trim();

    const trimmedDate =
      formData.date.trim();

    if (!trimmedTitle) {
      toast.error(
        "News title is required."
      );

      return;
    }

    if (!trimmedCategory) {
      toast.error(
        "News category is required."
      );

      return;
    }

    if (!trimmedDescription) {
      toast.error(
        "News description is required."
      );

      return;
    }

    if (!trimmedAuthor) {
      toast.error(
        "Author is required."
      );

      return;
    }

    if (!trimmedDate) {
      toast.error(
        "Date is required."
      );

      return;
    }

    if (!formData.image) {
      toast.error(
        "Please upload a news image."
      );

      return;
    }

    if (
      !Number.isFinite(
        formData.order
      ) ||
      formData.order < 0
    ) {
      toast.error(
        "Order must be 0 or greater."
      );

      return;
    }

    // =====================================================
    // FINAL DATA
    // =====================================================

    const finalData:
      NewsFormData = {
      title:
        trimmedTitle,

      category:
        trimmedCategory,

      description:
        trimmedDescription,

      image:
        formData.image,

      author:
        trimmedAuthor,

      date:
        trimmedDate,

      isPublished:
        formData.isPublished,

      order:
        formData.order,
    };

    setSubmitting(
      true
    );

    try {
      await onSubmit(
        finalData
      );
    } catch (error) {
      // Parent handles API error.
      console.error(
        "NEWS FORM SUBMIT ERROR:",
        error
      );
    } finally {
      setSubmitting(
        false
      );
    }
  };

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="
        w-full
        space-y-6
      "
    >
      {/* =================================================
          BASIC INFORMATION
      ================================================= */}

      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >
        {/* HEADER */}

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
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-[#008B45]
            "
          >
            Homepage
          </p>

          <h2
            className="
              mt-1
              text-lg
              font-bold
              text-slate-900
            "
          >
            {title}
          </h2>

          <p
            className="
              mt-1
              text-sm
              leading-6
              text-slate-500
            "
          >
            {description}
          </p>
        </div>

        {/* BODY */}

        <div
          className="
            space-y-5
            p-5
            sm:p-6
          "
        >
          {/* =================================================
              TITLE
          ================================================= */}

          <div>
            <label
              htmlFor="news-title"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-700
              "
            >
              News Title
            </label>

            <input
              id="news-title"
              name="title"
              type="text"
              value={
                formData.title
              }
              onChange={
                handleInputChange
              }
              placeholder="Enter news title"
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
              CATEGORY
          ================================================= */}

          <div>
            <label
              htmlFor="news-category"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-700
              "
            >
              Category
            </label>

            <input
              id="news-category"
              name="category"
              type="text"
              value={
                formData.category
              }
              onChange={
                handleInputChange
              }
              placeholder="Education"
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
              DESCRIPTION
          ================================================= */}

          <div>
            <label
              htmlFor="news-description"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-700
              "
            >
              Description
            </label>

            <textarea
              id="news-description"
              value={
                formData.description
              }
              onChange={
                handleDescriptionChange
              }
              rows={5}
              placeholder="Write a short description about this news..."
              className="
                w-full
                resize-y
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-sm
                leading-6
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
      </section>

      {/* =================================================
          IMAGE
      ================================================= */}

      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >
        <div
          className="
            border-b
            border-slate-200
            px-5
            py-5
            sm:px-6
          "
        >
          <h2
            className="
              text-lg
              font-bold
              text-slate-900
            "
          >
            News Image
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Upload one image from your
            device. It will be stored
            through Cloudinary.
          </p>
        </div>

        <div
          className="
            p-5
            sm:p-6
          "
        >
          {formData.image ? (
            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
              "
            >
              <div
                className="
                  relative
                  aspect-[16/9]
                  w-full
                  bg-slate-100
                "
              >
                <Image
                  src={
                    formData.image
                  }
                  alt="News preview"
                  fill
                  sizes="
                    (max-width: 1280px) 100vw,
                    50vw
                  "
                  className="
                    object-cover
                  "
                />
              </div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                  border-t
                  border-slate-200
                  bg-white
                  p-4
                "
              >
                <p
                  className="
                    min-w-0
                    truncate
                    text-xs
                    text-slate-500
                  "
                >
                  Image uploaded
                  successfully
                </p>

                <button
                  type="button"
                  onClick={
                    handleRemoveImage
                  }
                  className="
                    shrink-0
                    rounded-lg
                    border
                    border-red-100
                    px-3
                    py-2
                    text-xs
                    font-semibold
                    text-red-500
                    transition
                    hover:bg-red-50
                  "
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <label
              className="
                flex
                cursor-pointer
                flex-col
                items-center
                justify-center
                rounded-2xl
                border-2
                border-dashed
                border-slate-200
                bg-slate-50
                px-6
                py-12
                text-center
                transition
                hover:border-[#008B45]
                hover:bg-[#EAF5EE]/40
              "
            >
              {uploadingImage ? (
                <>
                  <Loader2
                    size={30}
                    className="
                      animate-spin
                      text-[#008B45]
                    "
                  />

                  <p
                    className="
                      mt-4
                      text-sm
                      font-semibold
                      text-slate-700
                    "
                  >
                    Uploading image...
                  </p>
                </>
              ) : (
                <>
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-full
                      bg-[#EAF5EE]
                      text-[#008B45]
                    "
                  >
                    <ImagePlus
                      size={25}
                    />
                  </div>

                  <p
                    className="
                      mt-4
                      text-sm
                      font-semibold
                      text-slate-700
                    "
                  >
                    Click to upload
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-slate-400
                    "
                  >
                    PNG, JPG, WEBP up to
                    10MB
                  </p>
                </>
              )}

              <input
                type="file"
                accept="image/*"
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
      </section>

      {/* =================================================
          PUBLISHING
      ================================================= */}

      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >
        <div
          className="
            border-b
            border-slate-200
            px-5
            py-5
            sm:px-6
          "
        >
          <h2
            className="
              text-lg
              font-bold
              text-slate-900
            "
          >
            Publishing Settings
          </h2>
        </div>

        <div
          className="
            space-y-5
            p-5
            sm:p-6
          "
        >
          {/* =================================================
              AUTHOR + DATE
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
            "
          >
            {/* AUTHOR */}

            <div>
              <label
                htmlFor="news-author"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-slate-700
                "
              >
                Author
              </label>

              <input
                id="news-author"
                name="author"
                type="text"
                value={
                  formData.author
                }
                onChange={
                  handleInputChange
                }
                placeholder="UAMC"
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

            {/* DATE */}

            <div>
              <label
                htmlFor="news-date"
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

              <div
                className="
                  relative
                "
              >
                <CalendarDays
                  size={17}
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  id="news-date"
                  name="date"
                  type="date"
                  value={
                    formData.date
                  }
                  onChange={
                    handleInputChange
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    py-3
                    pl-11
                    pr-4
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
          </div>

          {/* =================================================
              ORDER
          ================================================= */}

          <div>
            <label
              htmlFor="news-order"
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
              id="news-order"
              type="number"
              min="0"
              step="1"
              value={
                formData.order
              }
              onChange={
                handleOrderChange
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

            <p
              className="
                mt-1.5
                text-xs
                text-slate-400
              "
            >
              Smaller numbers appear
              first.
            </p>
          </div>

          {/* =================================================
              PUBLISHED
          ================================================= */}

          <button
            type="button"
            onClick={
              handlePublishedChange
            }
            className="
              flex
              w-full
              items-center
              justify-between
              gap-4
              rounded-xl
              border
              border-slate-200
              bg-white
              p-4
              text-left
              transition
              hover:border-[#008B45]
            "
          >
            <div>
              <p
                className="
                  text-sm
                  font-semibold
                  text-slate-800
                "
              >
                Publish News
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-500
                "
              >
                Show this news article
                on the client website.
              </p>
            </div>

            <span
              className={`
                relative
                h-6
                w-11
                shrink-0
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
                  shadow-sm
                  transition
                  ${
                    formData.isPublished
                      ? "left-6"
                      : "left-1"
                  }
                `}
              />
            </span>
          </button>
        </div>
      </section>

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
          <Loader2
            size={18}
            className="animate-spin"
          />
        ) : (
          <Save
            size={18}
          />
        )}

        {submitting
          ? "Saving..."
          : submitLabel}
      </button>
    </form>
  );
}