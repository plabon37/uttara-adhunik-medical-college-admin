"use client";

import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";

import {
  Loader2,
  Save,
  Upload,
  X,
} from "lucide-react";

import { toast } from "sonner";

import type { StatisticsData } from "./StatisticsTableRow";

// =========================================================
// PROPS
// =========================================================

interface StatisticsFormProps {
  initialData?: StatisticsData | null;

  onSuccess?: (
    data: StatisticsData
  ) => void;

  onDataChange?: (
    data: StatisticsFormData
  ) => void;
}

// =========================================================
// FORM DATA
// =========================================================

export interface StatisticsFormData {
  backgroundImage: string;

  statisticOneValue: string;
  statisticOneTitle: string;

  statisticTwoValue: string;
  statisticTwoTitle: string;

  statisticThreeValue: string;
  statisticThreeTitle: string;

  isActive: boolean;
}

// =========================================================
// DEFAULT DATA
// =========================================================

const defaultFormData: StatisticsFormData = {
  backgroundImage: "",

  statisticOneValue: "",
  statisticOneTitle: "",

  statisticTwoValue: "",
  statisticTwoTitle: "",

  statisticThreeValue: "",
  statisticThreeTitle: "",

  isActive: true,
};

// =========================================================
// COMPONENT
// =========================================================

export default function StatisticsForm({
  initialData = null,
  onSuccess,
  onDataChange,
}: StatisticsFormProps) {
  const [formData, setFormData] =
    useState<StatisticsFormData>(
      initialData
        ? {
            backgroundImage:
              initialData.backgroundImage || "",

            statisticOneValue:
              initialData.statisticOneValue || "",

            statisticOneTitle:
              initialData.statisticOneTitle || "",

            statisticTwoValue:
              initialData.statisticTwoValue || "",

            statisticTwoTitle:
              initialData.statisticTwoTitle || "",

            statisticThreeValue:
              initialData.statisticThreeValue || "",

            statisticThreeTitle:
              initialData.statisticThreeTitle || "",

            isActive:
              initialData.isActive ?? true,
          }
        : defaultFormData
    );

  const [saving, setSaving] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const {
      name,
      value,
    } = event.target;

    const field =
      name as keyof StatisticsFormData;

    const updatedData = {
      ...formData,
      [field]: value,
    } as StatisticsFormData;

    setFormData(updatedData);

    onDataChange?.(updatedData);
  };

  // =========================================================
  // IMAGE UPLOAD
  // =========================================================

  const handleImageUpload = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    // =======================================================
    // IMAGE TYPE
    // =======================================================

    if (!file.type.startsWith("image/")) {
      toast.error(
        "Please select a valid image file."
      );

      event.target.value = "";

      return;
    }

    // =======================================================
    // IMAGE SIZE
    // =======================================================

    if (file.size > 5 * 1024 * 1024) {
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

      // =====================================================
      // UPLOAD
      // =====================================================

      const response = await fetch(
        "/api/upload",
        {
          method: "POST",
          body: uploadData,
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Image upload failed."
        );
      }

      // =====================================================
      // UPDATE IMAGE
      // =====================================================

      const updatedData = {
        ...formData,
        backgroundImage:
          data.url,
      } as StatisticsFormData;

      setFormData(updatedData);

      onDataChange?.(updatedData);

      toast.success(
        "Background image uploaded successfully."
      );
    } catch (error) {
      console.error(
        "STATISTICS IMAGE UPLOAD ERROR:",
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

  // =========================================================
  // REMOVE IMAGE
  // =========================================================

  const removeImage = () => {
    const updatedData = {
      ...formData,
      backgroundImage: "",
    };

    setFormData(updatedData);

    onDataChange?.(updatedData);
  };

  // =========================================================
  // SAVE STATISTICS
  // =========================================================

  const saveStatistics = async () => {
    console.log(
      "STATISTICS SAVE CLICKED"
    );

    console.log(
      "STATISTICS FORM DATA:",
      formData
    );

    // =======================================================
    // VALIDATION
    // =======================================================

    if (!formData.backgroundImage) {
      toast.error(
        "Please upload the background image."
      );

      return;
    }

    if (
      !formData.statisticOneValue.trim()
    ) {
      toast.error(
        "Please enter Statistic 01 value."
      );

      return;
    }

    if (
      !formData.statisticOneTitle.trim()
    ) {
      toast.error(
        "Please enter Statistic 01 title."
      );

      return;
    }

    if (
      !formData.statisticTwoValue.trim()
    ) {
      toast.error(
        "Please enter Statistic 02 value."
      );

      return;
    }

    if (
      !formData.statisticTwoTitle.trim()
    ) {
      toast.error(
        "Please enter Statistic 02 title."
      );

      return;
    }

    if (
      !formData.statisticThreeValue.trim()
    ) {
      toast.error(
        "Please enter Statistic 03 value."
      );

      return;
    }

    if (
      !formData.statisticThreeTitle.trim()
    ) {
      toast.error(
        "Please enter Statistic 03 title."
      );

      return;
    }

    // =======================================================
    // START SAVING
    // =======================================================

    try {
      setSaving(true);

      const isEdit =
        Boolean(initialData?._id);

      console.log(
        "STATISTICS REQUEST:",
        isEdit ? "PUT" : "POST"
      );

      // =====================================================
      // API REQUEST
      // =====================================================

      const response = await fetch(
        "/api/statistics",
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

      console.log(
        "STATISTICS RESPONSE STATUS:",
        response.status
      );

      // =====================================================
      // RESPONSE
      // =====================================================

      const data =
        await response.json();

      console.log(
        "STATISTICS RESPONSE DATA:",
        data
      );

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Failed to save Statistics section."
        );
      }

      // =====================================================
      // SUCCESS
      // =====================================================

      toast.success(
        isEdit
          ? "Statistics section updated successfully."
          : "Statistics section created successfully."
      );

      if (onSuccess) {
        onSuccess(data.data);
      }
    } catch (error) {
      console.error(
        "SAVE STATISTICS ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save Statistics section."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // FORM SUBMIT
  // =========================================================

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    saveStatistics();
  };

  // =========================================================
  // IMAGE UPLOAD UI
  // =========================================================

  const renderImageUpload = () => {
    const imageUrl =
      formData.backgroundImage;

    return (
      <div className="space-y-3">
        {/* LABEL */}

        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Background Image
          </label>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Upload the background image
            used behind the statistics.
          </p>
        </div>

        {/* IMAGE PREVIEW */}

        {imageUrl ? (
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <img
              src={imageUrl}
              alt="Statistics background"
              className="
                h-[260px]
                w-full
                object-cover
                sm:h-[320px]
              "
            />

            <button
              type="button"
              onClick={removeImage}
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
              min-h-[230px]
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
              sm:min-h-[280px]
            "
          >
            {uploading ? (
              <>
                <Loader2
                  size={30}
                  className="
                    animate-spin
                    text-[#008B45]
                  "
                />

                <p className="mt-3 text-sm font-medium text-slate-600">
                  Uploading...
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
                    bg-emerald-50
                  "
                >
                  <Upload
                    size={24}
                    className="text-[#008B45]"
                  />
                </div>

                <p className="mt-4 text-sm font-semibold text-slate-700">
                  Click to upload background
                  image
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
              disabled={uploading}
              onChange={
                handleImageUpload
              }
            />
          </label>
        )}
      </div>
    );
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-6"
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-800">
            Background
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage the background image
            for the Statistics section.
          </p>
        </div>

        {renderImageUpload()}
      </div>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-800">
            Statistics
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Add the three statistics shown
            on the website.
          </p>
        </div>

        <div className="space-y-6">
          {/* =================================================
              STATISTIC 01
          ================================================= */}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="mb-5">
              <span className="inline-flex rounded-full bg-[#E8F7F0] px-3 py-1 text-xs font-bold text-[#008B45]">
                STATISTIC 01
              </span>
            </div>

            <div className="grid gap-5 sm:grid-cols-[180px_minmax(0,1fr)]">
              <div>
                <label
                  htmlFor="statisticOneValue"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Value
                </label>

                <input
                  id="statisticOneValue"
                  name="statisticOneValue"
                  type="text"
                  value={
                    formData.statisticOneValue
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="90%"
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    text-base
                    font-semibold
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

              <div>
                <label
                  htmlFor="statisticOneTitle"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Title
                </label>

                <input
                  id="statisticOneTitle"
                  name="statisticOneTitle"
                  type="text"
                  value={
                    formData.statisticOneTitle
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Post-Graduation Success Rate"
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
            </div>
          </div>

          {/* =================================================
              STATISTIC 02
          ================================================= */}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="mb-5">
              <span className="inline-flex rounded-full bg-[#E8F7F0] px-3 py-1 text-xs font-bold text-[#008B45]">
                STATISTIC 02
              </span>
            </div>

            <div className="grid gap-5 sm:grid-cols-[180px_minmax(0,1fr)]">
              <div>
                <label
                  htmlFor="statisticTwoValue"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Value
                </label>

                <input
                  id="statisticTwoValue"
                  name="statisticTwoValue"
                  type="text"
                  value={
                    formData.statisticTwoValue
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Top 10"
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    text-base
                    font-semibold
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

              <div>
                <label
                  htmlFor="statisticTwoTitle"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Title
                </label>

                <input
                  id="statisticTwoTitle"
                  name="statisticTwoTitle"
                  type="text"
                  value={
                    formData.statisticTwoTitle
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Colleges That Create Futures"
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
            </div>
          </div>

          {/* =================================================
              STATISTIC 03
          ================================================= */}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="mb-5">
              <span className="inline-flex rounded-full bg-[#E8F7F0] px-3 py-1 text-xs font-bold text-[#008B45]">
                STATISTIC 03
              </span>
            </div>

            <div className="grid gap-5 sm:grid-cols-[180px_minmax(0,1fr)]">
              <div>
                <label
                  htmlFor="statisticThreeValue"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Value
                </label>

                <input
                  id="statisticThreeValue"
                  name="statisticThreeValue"
                  type="text"
                  value={
                    formData.statisticThreeValue
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="No. 1"
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    text-base
                    font-semibold
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

              <div>
                <label
                  htmlFor="statisticThreeTitle"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Title
                </label>

                <input
                  id="statisticThreeTitle"
                  name="statisticThreeTitle"
                  type="text"
                  value={
                    formData.statisticThreeTitle
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="In The Nation For Materials R&D"
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
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          PUBLISH
      ===================================================== */}

      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h2 className="text-base font-semibold text-slate-800">
            Publish Statistics Section
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Make this Statistics section
            visible on the client website.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            const updatedData = {
              ...formData,
              isActive:
                !formData.isActive,
            };

            setFormData(updatedData);

            onDataChange?.(
              updatedData
            );
          }}
          className={`
            relative
            h-7
            w-12
            shrink-0
            rounded-full
            transition
            ${
              formData.isActive
                ? "bg-[#008B45]"
                : "bg-slate-300"
            }
          `}
          aria-label="Toggle publish status"
        >
          <span
            className={`
              absolute
              top-1
              h-5
              w-5
              rounded-full
              bg-white
              shadow-sm
              transition-all
              ${
                formData.isActive
                  ? "left-6"
                  : "left-1"
              }
            `}
          />
        </button>
      </div>

      {/* =====================================================
          SAVE BUTTON
      ===================================================== */}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={saveStatistics}
          disabled={
            saving || uploading
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
                ? "Update Statistics"
                : "Create Statistics"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}