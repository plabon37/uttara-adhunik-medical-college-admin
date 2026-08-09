"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Image as ImageIcon,
  Link as LinkIcon,
  Loader2,
  Save,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";

import type { AboutData } from "./AboutTableRow";

interface AboutFormProps {
  initialData?: AboutData | null;
  onSuccess?: (data: AboutData) => void;
  onDataChange?: (data: AboutFormData) => void;
}

export interface AboutFormData {
  tagline: string;
  title: string;
  highlightText: string;

  descriptionOne: string;
  descriptionTwo: string;

  imageOne: string;
  imageTwo: string;
  logo: string;

  missionTitle: string;
  missionLink: string;

  visionTitle: string;
  visionLink: string;

  buttonText: string;
  buttonLink: string;

  isActive: boolean;
}

const defaultFormData: AboutFormData = {
  tagline: "",
  title: "",
  highlightText: "",

  descriptionOne: "",
  descriptionTwo: "",

  imageOne: "",
  imageTwo: "",
  logo: "",

  missionTitle: "",
  missionLink: "",

  visionTitle: "",
  visionLink: "",

  buttonText: "View Our Program",
  buttonLink: "",

  isActive: true,
};

export default function AboutForm({
  initialData = null,
  onSuccess,
  onDataChange,
}: AboutFormProps) {
  const [formData, setFormData] =
    useState<AboutFormData>(
      initialData
        ? {
            tagline: initialData.tagline || "",
            title: initialData.title || "",
            highlightText:
              initialData.highlightText || "",

            descriptionOne:
              initialData.descriptionOne || "",
            descriptionTwo:
              initialData.descriptionTwo || "",

            imageOne: initialData.imageOne || "",
            imageTwo: initialData.imageTwo || "",
            logo: initialData.logo || "",

            missionTitle:
              initialData.missionTitle || "",
            missionLink:
              initialData.missionLink || "",

            visionTitle:
              initialData.visionTitle || "",
            visionLink:
              initialData.visionLink || "",

            buttonText:
              initialData.buttonText ||
              "View Our Program",
            buttonLink:
              initialData.buttonLink || "",

            isActive:
              initialData.isActive ?? true,
          }
        : defaultFormData
    );

  const [saving, setSaving] =
    useState(false);

  const [uploading, setUploading] =
    useState<
      "imageOne" |
      "imageTwo" |
      "logo" |
      null
    >(null);

  // =========================================
  // SEND FORM DATA TO LIVE PREVIEW
  // =========================================

  useEffect(() => {
    onDataChange?.(formData);
  }, [formData, onDataChange]);

  // =========================================
  // HANDLE INPUT
  // =========================================

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } =
      event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================================
  // UPLOAD IMAGE
  // =========================================

  const handleImageUpload = async (
    event: ChangeEvent<HTMLInputElement>,
    field:
      | "imageOne"
      | "imageTwo"
      | "logo"
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error(
        "Please select a valid image file."
      );

      event.target.value = "";

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error(
        "Image size must be less than 5MB."
      );

      event.target.value = "";

      return;
    }

    try {
      setUploading(field);

      const uploadData = new FormData();

      uploadData.append("file", file);
      uploadData.append("type", "image");

      const response = await fetch(
        "/api/upload",
        {
          method: "POST",
          body: uploadData,
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Image upload failed."
        );
      }

      setFormData((previous) => ({
        ...previous,
        [field]: data.url,
      }));

      toast.success(
        "Image uploaded successfully."
      );
    } catch (error) {
      console.error(
        "ABOUT IMAGE UPLOAD ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Image upload failed."
      );
    } finally {
      setUploading(null);

      event.target.value = "";
    }
  };

  // =========================================
  // REMOVE IMAGE
  // =========================================

  const removeImage = (
    field:
      | "imageOne"
      | "imageTwo"
      | "logo"
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: "",
    }));
  };

  // =========================================
  // SUBMIT
  // =========================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      toast.error(
        "Please enter the About title."
      );

      return;
    }

    if (!formData.highlightText.trim()) {
      toast.error(
        "Please enter the highlight text."
      );

      return;
    }

    if (!formData.descriptionOne.trim()) {
      toast.error(
        "Please enter Description 1."
      );

      return;
    }

    if (!formData.descriptionTwo.trim()) {
      toast.error(
        "Please enter Description 2."
      );

      return;
    }

    if (!formData.imageOne) {
      toast.error(
        "Please upload Left Image 1."
      );

      return;
    }

    if (!formData.imageTwo) {
      toast.error(
        "Please upload Left Image 2."
      );

      return;
    }

    if (!formData.logo) {
      toast.error(
        "Please upload the UAMC logo."
      );

      return;
    }

    try {
      setSaving(true);

      const isEdit =
        Boolean(initialData?._id);

      const response = await fetch(
        "/api/about",
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

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to save About section."
        );
      }

      toast.success(
        isEdit
          ? "About section updated successfully."
          : "About section created successfully."
      );

      if (onSuccess) {
        onSuccess(data.data);
      }
    } catch (error) {
      console.error(
        "SAVE ABOUT ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save About section."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================
  // IMAGE UPLOAD FIELD
  // =========================================

  const renderImageUpload = (
    field:
      | "imageOne"
      | "imageTwo"
      | "logo",
    label: string,
    description: string
  ) => {
    const imageUrl =
      formData[field];

    const isUploading =
      uploading === field;

    return (
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-semibold text-slate-700">
            {label}
          </label>

          <p className="mt-1 text-xs text-slate-500">
            {description}
          </p>
        </div>

        {imageUrl ? (
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <img
              src={imageUrl}
              alt={label}
              className={`w-full object-cover ${
                field === "logo"
                  ? "h-40 object-contain p-5"
                  : "h-52"
              }`}
            />

            <button
              type="button"
              onClick={() =>
                removeImage(field)
              }
              className="
                absolute
                right-3
                top-3
                inline-flex
                h-9
                w-9
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
              <X size={17} />
            </button>
          </div>
        ) : (
          <label
            className="
              flex
              min-h-[180px]
              cursor-pointer
              flex-col
              items-center
              justify-center
              rounded-2xl
              border-2
              border-dashed
              border-slate-300
              bg-slate-50
              px-5
              text-center
              transition
              hover:border-[#008B45]
              hover:bg-emerald-50/40
            "
          >
            {isUploading ? (
              <>
                <Loader2
                  size={28}
                  className="animate-spin text-[#008B45]"
                />

                <p className="mt-3 text-sm font-medium text-slate-600">
                  Uploading...
                </p>
              </>
            ) : (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
                  <Upload
                    size={22}
                    className="text-[#008B45]"
                  />
                </div>

                <p className="mt-3 text-sm font-semibold text-slate-700">
                  Click to upload
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  PNG, JPG or WEBP up to 5MB
                </p>
              </>
            )}

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              disabled={isUploading}
              onChange={(event) =>
                handleImageUpload(
                  event,
                  field
                )
              }
            />
          </label>
        )}
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-6"
    >
      {/* =========================================
          BASIC INFORMATION
      ========================================= */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-800">
            About Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage the main About UAMC content.
          </p>
        </div>

        <div className="grid gap-5">
          {/* TAGLINE */}

          <div>
            <label
              htmlFor="tagline"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Small Tagline
            </label>

            <input
              id="tagline"
              name="tagline"
              type="text"
              value={formData.tagline}
              onChange={handleChange}
              placeholder="knowledge meets innovation"
              className="
                h-12
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                text-sm
                text-slate-700
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-[#008B45]
                focus:ring-2
                focus:ring-[#008B45]/10
              "
            />
          </div>

          {/* TITLE + HIGHLIGHT */}

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Main Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="About"
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  text-sm
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-[#008B45]
                  focus:ring-2
                  focus:ring-[#008B45]/10
                "
              />
            </div>

            <div>
              <label
                htmlFor="highlightText"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Highlight Text
              </label>

              <input
                id="highlightText"
                name="highlightText"
                type="text"
                value={
                  formData.highlightText
                }
                onChange={handleChange}
                placeholder="UAMC"
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  text-sm
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

          {/* DESCRIPTION 1 */}

          <div>
            <label
              htmlFor="descriptionOne"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Description 1
            </label>

            <textarea
              id="descriptionOne"
              name="descriptionOne"
              value={
                formData.descriptionOne
              }
              onChange={handleChange}
              rows={5}
              placeholder="Enter the first About UAMC description..."
              className="
                w-full
                resize-y
                rounded-xl
                border
                border-slate-200
                px-4
                py-3
                text-sm
                leading-6
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-[#008B45]
                focus:ring-2
                focus:ring-[#008B45]/10
              "
            />
          </div>

          {/* DESCRIPTION 2 */}

          <div>
            <label
              htmlFor="descriptionTwo"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Description 2
            </label>

            <textarea
              id="descriptionTwo"
              name="descriptionTwo"
              value={
                formData.descriptionTwo
              }
              onChange={handleChange}
              rows={5}
              placeholder="Enter the second About UAMC description..."
              className="
                w-full
                resize-y
                rounded-xl
                border
                border-slate-200
                px-4
                py-3
                text-sm
                leading-6
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
      </div>

      {/* =========================================
          IMAGES
      ========================================= */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-800">
            Images & Logo
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Upload the two About images and UAMC logo.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {renderImageUpload(
            "imageOne",
            "Left Image 1",
            "Main image displayed on the left side."
          )}

          {renderImageUpload(
            "imageTwo",
            "Left Image 2",
            "Second image displayed beside the first image."
          )}
        </div>

        <div className="mt-6 max-w-xl">
          {renderImageUpload(
            "logo",
            "UAMC Logo",
            "Logo displayed over the About images."
          )}
        </div>
      </div>

      {/* =========================================
          MISSION & VISION
      ========================================= */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-800">
            Mission & Vision
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Configure the Mission and Vision cards.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* MISSION */}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="mb-4 text-base font-semibold text-slate-800">
              College Mission Statement
            </h3>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="missionTitle"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Mission Title
                </label>

                <input
                  id="missionTitle"
                  name="missionTitle"
                  type="text"
                  value={
                    formData.missionTitle
                  }
                  onChange={handleChange}
                  placeholder="College Mission Statement"
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    text-sm
                    outline-none
                    transition
                    focus:border-[#008B45]
                    focus:ring-2
                    focus:ring-[#008B45]/10
                  "
                />
              </div>

              <div>
                <label
                  htmlFor="missionLink"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
                >
                  <LinkIcon size={15} />
                  Mission Link
                </label>

                <input
                  id="missionLink"
                  name="missionLink"
                  type="text"
                  value={
                    formData.missionLink
                  }
                  onChange={handleChange}
                  placeholder="/about/mission"
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    text-sm
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

          {/* VISION */}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="mb-4 text-base font-semibold text-slate-800">
              College Vision Achievement
            </h3>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="visionTitle"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Vision Title
                </label>

                <input
                  id="visionTitle"
                  name="visionTitle"
                  type="text"
                  value={
                    formData.visionTitle
                  }
                  onChange={handleChange}
                  placeholder="College Vision Achievement"
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    text-sm
                    outline-none
                    transition
                    focus:border-[#008B45]
                    focus:ring-2
                    focus:ring-[#008B45]/10
                  "
                />
              </div>

              <div>
                <label
                  htmlFor="visionLink"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
                >
                  <LinkIcon size={15} />
                  Vision Link
                </label>

                <input
                  id="visionLink"
                  name="visionLink"
                  type="text"
                  value={
                    formData.visionLink
                  }
                  onChange={handleChange}
                  placeholder="/about/vision"
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    text-sm
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
        </div>
      </div>

      {/* =========================================
          BUTTON
      ========================================= */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-800">
            Program Button
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Configure the View Our Program button.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="buttonText"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Button Text
            </label>

            <input
              id="buttonText"
              name="buttonText"
              type="text"
              value={
                formData.buttonText
              }
              onChange={handleChange}
              placeholder="View Our Program"
              className="
                h-12
                w-full
                rounded-xl
                border
                border-slate-200
                px-4
                text-sm
                outline-none
                transition
                focus:border-[#008B45]
                focus:ring-2
                focus:ring-[#008B45]/10
              "
            />
          </div>

          <div>
            <label
              htmlFor="buttonLink"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
            >
              <LinkIcon size={15} />
              Button Link
            </label>

            <input
              id="buttonLink"
              name="buttonLink"
              type="text"
              value={
                formData.buttonLink
              }
              onChange={handleChange}
              placeholder="/admission"
              className="
                h-12
                w-full
                rounded-xl
                border
                border-slate-200
                px-4
                text-sm
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

      {/* =========================================
          PUBLISH STATUS
      ========================================= */}

      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h2 className="text-base font-semibold text-slate-800">
            Publish About Section
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Make this About section visible on
            the client website.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setFormData((previous) => ({
              ...previous,
              isActive:
                !previous.isActive,
            }))
          }
          className={`relative h-7 w-12 shrink-0 rounded-full transition ${
            formData.isActive
              ? "bg-[#008B45]"
              : "bg-slate-300"
          }`}
          aria-label="Toggle publish status"
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${
              formData.isActive
                ? "left-6"
                : "left-1"
            }`}
          />
        </button>
      </div>

      {/* =========================================
          SAVE BUTTON
      ========================================= */}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="submit"
          disabled={
            saving ||
            uploading !== null
          }
          className="
            inline-flex
            min-h-12
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#008B45]
            px-7
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition
            hover:bg-[#00763B]
            hover:shadow-md
            disabled:cursor-not-allowed
            disabled:opacity-60
            sm:text-base
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
                ? "Update About"
                : "Create About"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}