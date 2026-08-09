"use client";

import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";

import {
  Building2,
  Image as ImageIcon,
  Loader2,
  Save,
  Upload,
  X,
} from "lucide-react";

import { toast } from "sonner";

import type {
  DepartmentData,
} from "./DepartmentTableRow";

// =========================================================
// PROPS
// =========================================================

interface DepartmentFormProps {
  initialData?: DepartmentData | null;

  onSuccess?: (
    data: DepartmentData
  ) => void;

  onDataChange?: (
    data: DepartmentFormData
  ) => void;
}

// =========================================================
// FORM DATA
// =========================================================

export interface DepartmentFormData {
  name: string;

  slug: string;

  image: string;

  description: string;

  isPopular: boolean;

  isActive: boolean;

  order: number;
}

// =========================================================
// DEFAULT DATA
// =========================================================

const defaultFormData: DepartmentFormData = {
  name: "",

  slug: "",

  image: "",

  description: "",

  isPopular: false,

  isActive: true,

  order: 0,
};

// =========================================================
// SLUG GENERATOR
// =========================================================

const createSlug = (
  value: string
) => {
  return value
    .toLowerCase()
    .trim()
    .replace(
      /[^a-z0-9\s-]/g,
      ""
    )
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

// =========================================================
// COMPONENT
// =========================================================

export default function DepartmentForm({
  initialData = null,
  onSuccess,
  onDataChange,
}: DepartmentFormProps) {
  // =======================================================
  // FORM STATE
  // =======================================================

  const [formData, setFormData] =
    useState<DepartmentFormData>(
      initialData
        ? {
            name:
              initialData.name ||
              "",

            slug:
              initialData.slug ||
              "",

            image:
              initialData.image ||
              "",

            description:
              initialData.description ||
              "",

            isPopular:
              initialData.isPopular ??
              false,

            isActive:
              initialData.isActive ??
              true,

            order:
              initialData.order ??
              0,
          }
        : defaultFormData
    );

  // =======================================================
  // SAVING
  // =======================================================

  const [saving, setSaving] =
    useState(false);

  // =======================================================
  // UPLOADING
  // =======================================================

  const [uploading, setUploading] =
    useState(false);

  // =======================================================
  // HANDLE TEXT INPUT
  // =======================================================

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const {
      name,
      value,
    } = event.target;

    const field =
      name as keyof DepartmentFormData;

    const updatedData = {
      ...formData,
      [field]: value,
    } as DepartmentFormData;

    setFormData(updatedData);

    onDataChange?.(
      updatedData
    );
  };

  // =======================================================
  // HANDLE DEPARTMENT NAME
  // =======================================================

  const handleNameChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value =
      event.target.value;

    const updatedData = {
      ...formData,
      name: value,

      // Only auto-generate slug when creating
      ...(initialData
        ? {}
        : {
            slug: createSlug(
              value
            ),
          }),
    };

    setFormData(updatedData);

    onDataChange?.(
      updatedData
    );
  };

  // =======================================================
  // HANDLE SLUG
  // =======================================================

  const handleSlugChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value =
      event.target.value;

    const updatedData = {
      ...formData,
      slug: createSlug(
        value
      ),
    };

    setFormData(updatedData);

    onDataChange?.(
      updatedData
    );
  };

  // =======================================================
  // HANDLE BOOLEAN
  // =======================================================

  const handleToggle = (
    field:
      | "isPopular"
      | "isActive"
  ) => {
    const updatedData = {
      ...formData,
      [field]: !formData[field],
    };

    setFormData(updatedData);

    onDataChange?.(
      updatedData
    );
  };

  // =======================================================
  // HANDLE ORDER
  // =======================================================

  const handleOrderChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value =
      Number(event.target.value);

    const updatedData = {
      ...formData,
      order:
        Number.isNaN(value)
          ? 0
          : value,
    };

    setFormData(updatedData);

    onDataChange?.(
      updatedData
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

    if (!file) {
      return;
    }

    // =====================================================
    // IMAGE TYPE CHECK
    // =====================================================

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      toast.error(
        "Please select a valid image file."
      );

      event.target.value = "";

      return;
    }

    // =====================================================
    // IMAGE SIZE CHECK
    // =====================================================

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      toast.error(
        "Image size must be less than 5MB."
      );

      event.target.value = "";

      return;
    }

    try {
      setUploading(true);

      const uploadData =
        new FormData();

      uploadData.append(
        "file",
        file
      );

      uploadData.append(
        "type",
        "image"
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

      const data =
        await response.json();

      // ===================================================
      // UPLOAD ERROR
      // ===================================================

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Image upload failed."
        );
      }

      // ===================================================
      // UPDATE FORM
      // ===================================================

      const updatedData = {
        ...formData,
        image:
          data.url || "",
      };

      setFormData(updatedData);

      onDataChange?.(
        updatedData
      );

      toast.success(
        "Department image uploaded successfully."
      );
    } catch (error) {
      console.error(
        "DEPARTMENT IMAGE UPLOAD ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Image upload failed."
      );
    } finally {
      setUploading(false);

      event.target.value = "";
    }
  };

  // =======================================================
  // REMOVE IMAGE
  // =======================================================

  const removeImage = () => {
    const updatedData = {
      ...formData,
      image: "",
    };

    setFormData(updatedData);

    onDataChange?.(
      updatedData
    );
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

    if (
      !formData.name.trim()
    ) {
      toast.error(
        "Please enter the Department name."
      );

      return;
    }

    if (
      !formData.slug.trim()
    ) {
      toast.error(
        "Please enter the Department slug."
      );

      return;
    }

    if (!formData.image) {
      toast.error(
        "Please upload the Department image."
      );

      return;
    }

    if (
      !formData.description.trim()
    ) {
      toast.error(
        "Please enter the Department description."
      );

      return;
    }

    // =====================================================
    // SAVE
    // =====================================================

    try {
      setSaving(true);

      const isEdit =
        Boolean(
          initialData?._id
        );

      // ===================================================
      // API REQUEST
      // ===================================================

      const response =
        await fetch(
          isEdit
            ? `/api/departments/${initialData?._id}`
            : "/api/departments",
          {
            method: isEdit
              ? "PUT"
              : "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              formData
            ),
          }
        );

      const data =
        await response.json();

      // ===================================================
      // API ERROR
      // ===================================================

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Failed to save Department."
        );
      }

      // ===================================================
      // SUCCESS
      // ===================================================

      toast.success(
        isEdit
          ? "Department updated successfully."
          : "Department created successfully."
      );

      if (onSuccess) {
        onSuccess(
          data.data
        );
      }
    } catch (error) {
      console.error(
        "SAVE DEPARTMENT ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save Department."
      );
    } finally {
      setSaving(false);
    }
  };

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* ===================================================
          BASIC INFORMATION
      =================================================== */}

      <div
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
          sm:p-6
        "
      >
        {/* HEADER */}

        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-[#E8F7F0]
                text-[#008B45]
              "
            >
              <Building2 size={20} />
            </div>

            <div>
              <h2
                className="
                  text-lg
                  font-bold
                  text-slate-800
                "
              >
                Department Information
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                Add the basic information
                about this department.
              </p>
            </div>
          </div>
        </div>

        {/* INPUT GRID */}

        <div className="grid gap-5 md:grid-cols-2">
          {/* =================================================
              NAME
          ================================================= */}

          <div>
            <label
              htmlFor="name"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-700
              "
            >
              Department Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={
                handleNameChange
              }
              placeholder="Department of Microbiology"
              className="
                h-12
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                text-sm
                text-slate-800
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
              SLUG
          ================================================= */}

          <div>
            <label
              htmlFor="slug"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-700
              "
            >
              Slug
            </label>

            <input
              id="slug"
              name="slug"
              type="text"
              value={formData.slug}
              onChange={
                handleSlugChange
              }
              placeholder="department-of-microbiology"
              className="
                h-12
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                text-sm
                text-slate-800
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-[#008B45]
                focus:ring-2
                focus:ring-[#008B45]/10
              "
            />

            <p
              className="
                mt-2
                text-xs
                text-slate-400
              "
            >
              Used for the Department URL.
            </p>
          </div>
        </div>

        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <div className="mt-5">
          <label
            htmlFor="description"
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
            id="description"
            name="description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
            rows={5}
            placeholder="Write a short description about this department..."
            className="
              w-full
              resize-none
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-sm
              leading-6
              text-slate-800
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

      {/* ===================================================
          IMAGE
      =================================================== */}

      <div
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
          sm:p-6
        "
      >
        <div className="mb-6">
          <h2
            className="
              text-lg
              font-bold
              text-slate-800
            "
          >
            Department Image
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Upload an image for this
            department.
          </p>
        </div>

        {formData.image ? (
          /* =================================================
             IMAGE PREVIEW
          ================================================= */

          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
            "
          >
            <img
              src={formData.image}
              alt={
                formData.name ||
                "Department preview"
              }
              className="
                h-[260px]
                w-full
                object-cover
                sm:h-[320px]
              "
            />

            {/* REMOVE */}

            <button
              type="button"
              onClick={
                removeImage
              }
              className="
                absolute
                right-4
                top-4
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-white
                text-red-500
                shadow-md
                transition
                hover:bg-red-50
              "
              title="Remove image"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          /* =================================================
             UPLOAD AREA
          ================================================= */

          <label
            htmlFor="department-image"
            className="
              flex
              min-h-[260px]
              cursor-pointer
              flex-col
              items-center
              justify-center
              rounded-2xl
              border-2
              border-dashed
              border-slate-300
              bg-slate-50
              px-6
              text-center
              transition
              hover:border-[#008B45]
              hover:bg-[#E8F7F0]/40
            "
          >
            {uploading ? (
              <>
                <Loader2
                  size={32}
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
                    rounded-2xl
                    bg-[#E8F7F0]
                    text-[#008B45]
                  "
                >
                  <ImageIcon
                    size={28}
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
                  Upload Department Image
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-400
                  "
                >
                  PNG, JPG, JPEG or WEBP
                </p>

                <span
                  className="
                    mt-4
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-[#008B45]
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  <Upload size={16} />

                  Choose Image
                </span>
              </>
            )}

            <input
              id="department-image"
              type="file"
              accept="image/*"
              onChange={
                handleImageUpload
              }
              disabled={uploading}
              className="hidden"
            />
          </label>
        )}

        <p
          className="
            mt-3
            text-xs
            text-slate-400
          "
        >
          Maximum image size: 5MB
        </p>
      </div>

      {/* ===================================================
          SETTINGS
      =================================================== */}

      <div
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
          sm:p-6
        "
      >
        <div className="mb-6">
          <h2
            className="
              text-lg
              font-bold
              text-slate-800
            "
          >
            Department Settings
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Configure how this department
            appears on the website.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* =================================================
              POPULAR
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              handleToggle(
                "isPopular"
              )
            }
            className="
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              px-4
              py-4
              text-left
              transition
              hover:border-[#008B45]/40
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
                Popular Department
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-400
                "
              >
                Show this department as
                a popular program.
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
                  formData.isPopular
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
                    formData.isPopular
                      ? "left-6"
                      : "left-1"
                  }
                `}
              />
            </span>
          </button>

          {/* =================================================
              ACTIVE
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              handleToggle(
                "isActive"
              )
            }
            className="
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              px-4
              py-4
              text-left
              transition
              hover:border-[#008B45]/40
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
                Publish Department
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-400
                "
              >
                Make this department visible
                on the website.
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
                  formData.isActive
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
                    formData.isActive
                      ? "left-6"
                      : "left-1"
                  }
                `}
              />
            </span>
          </button>
        </div>

        {/* =================================================
            ORDER
        ================================================= */}

        <div className="mt-5 max-w-xs">
          <label
            htmlFor="order"
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
            id="order"
            name="order"
            type="number"
            min="0"
            value={formData.order}
            onChange={
              handleOrderChange
            }
            className="
              h-12
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              text-sm
              text-slate-800
              outline-none
              transition
              focus:border-[#008B45]
              focus:ring-2
              focus:ring-[#008B45]/10
            "
          />

          <p
            className="
              mt-2
              text-xs
              text-slate-400
            "
          >
            Smaller numbers appear first.
          </p>
        </div>
      </div>

      {/* ===================================================
          SUBMIT
      =================================================== */}

      <div
        className="
          flex
          justify-end
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
          sm:p-6
        "
      >
        <button
          type="submit"
          disabled={
            saving ||
            uploading
          }
          className="
            inline-flex
            min-h-11
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#008B45]
            px-6
            py-3
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition
            hover:bg-[#00763B]
            hover:shadow-md
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {saving ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />

              Saving...
            </>
          ) : (
            <>
              <Save size={18} />

              {initialData
                ? "Update Department"
                : "Create Department"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}