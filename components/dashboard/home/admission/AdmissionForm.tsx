"use client";

import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";

import {
  Image as ImageIcon,
  Loader2,
  Save,
  Upload,
  X,
} from "lucide-react";

import { toast } from "sonner";

// =========================================================
// FORM DATA TYPE
// =========================================================

export interface AdmissionFormData {
  backgroundImage: string;

  titlePrefix: string;

  title: string;

  description: string;

  buttonText: string;

  buttonLink: string;

  isActive: boolean;
}

// =========================================================
// DEFAULT DATA
// =========================================================

const defaultFormData: AdmissionFormData = {
  backgroundImage: "",

  titlePrefix: "UAMC",

  title: "Admission",

  description: "",

  buttonText: "Learn More",

  buttonLink: "/admission",

  isActive: true,
};

// =========================================================
// PROPS
// =========================================================

interface AdmissionFormProps {
  initialData?: AdmissionFormData | null;

  admissionId?: string;

  onDataChange?: (
    data: AdmissionFormData
  ) => void;

  onSuccess?: (
    data: unknown
  ) => void;
}

// =========================================================
// COMPONENT
// =========================================================

export default function AdmissionForm({
  initialData = null,
  admissionId,
  onDataChange,
  onSuccess,
}: AdmissionFormProps) {
  // =======================================================
  // INITIAL FORM DATA
  // =======================================================

  const initialFormData: AdmissionFormData =
    initialData
      ? {
          backgroundImage:
            initialData.backgroundImage ||
            "",

          titlePrefix:
            initialData.titlePrefix ||
            "UAMC",

          title:
            initialData.title ||
            "Admission",

          description:
            initialData.description ||
            "",

          buttonText:
            initialData.buttonText ||
            "Learn More",

          buttonLink:
            initialData.buttonLink ||
            "/admission",

          isActive:
            initialData.isActive ??
            true,
        }
      : defaultFormData;

  // =======================================================
  // FORM STATE
  // =======================================================

  const [
    formData,
    setFormData,
  ] = useState<AdmissionFormData>(
    initialFormData
  );

  // =======================================================
  // SAVING STATE
  // =======================================================

  const [
    saving,
    setSaving,
  ] = useState(false);

  // =======================================================
  // IMAGE UPLOADING STATE
  // =======================================================

  const [
    uploadingImage,
    setUploadingImage,
  ] = useState(false);

  // =======================================================
  // UPDATE FORM DATA
  // =======================================================

  const updateFormData = (
    nextData: AdmissionFormData
  ) => {
    setFormData(
      nextData
    );

    onDataChange?.(
      nextData
    );
  };

  // =======================================================
  // TEXT CHANGE
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

    const nextData: AdmissionFormData =
      {
        ...formData,

        [name]: value,
      };

    updateFormData(
      nextData
    );
  };

  // =======================================================
  // ACTIVE TOGGLE
  // =======================================================

  const handleActiveToggle =
    () => {
      const nextData: AdmissionFormData =
        {
          ...formData,

          isActive:
            !formData.isActive,
        };

      updateFormData(
        nextData
      );
    };

  // =======================================================
  // IMAGE UPLOAD
  // =======================================================

  const uploadImage = async (
    file: File
  ) => {
    // =====================================================
    // FILE TYPE CHECK
    // =====================================================

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      toast.error(
        "Please select a valid image file."
      );

      return;
    }

    // =====================================================
    // FILE SIZE CHECK
    // =====================================================

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      toast.error(
        "Image size must be less than 5MB."
      );

      return;
    }

    try {
      setUploadingImage(
        true
      );

      // ===================================================
      // FORM DATA
      // ===================================================

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
      // UPLOAD
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
      // RESPONSE
      // ===================================================

      const responseText =
        await response.text();

      let data:
        | {
            success?: boolean;

            message?: string;

            url?: string;

            data?: {
              url?: string;
            };
          }
        | null = null;

      try {
        data =
          JSON.parse(
            responseText
          );
      } catch {
        throw new Error(
          "Upload API returned an invalid response."
        );
      }

      // ===================================================
      // API ERROR
      // ===================================================

      if (
        !response.ok ||
        !data?.success
      ) {
        throw new Error(
          data?.message ||
            "Image upload failed."
        );
      }

      // ===================================================
      // IMAGE URL
      // ===================================================

      const imageUrl =
        data.url ||
        data.data?.url ||
        "";

      if (!imageUrl) {
        throw new Error(
          "Image URL was not returned by the upload API."
        );
      }

      // ===================================================
      // UPDATE FORM
      // ===================================================

      const nextData: AdmissionFormData =
        {
          ...formData,

          backgroundImage:
            imageUrl,
        };

      updateFormData(
        nextData
      );

      toast.success(
        "Background image uploaded successfully."
      );
    } catch (error) {
      console.error(
        "ADMISSION IMAGE UPLOAD ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Image upload failed."
      );
    } finally {
      setUploadingImage(
        false
      );
    }
  };

  // =======================================================
  // IMAGE CHANGE
  // =======================================================

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    await uploadImage(
      file
    );

    event.target.value =
      "";
  };

  // =======================================================
  // REMOVE IMAGE
  // =======================================================

  const removeImage = () => {
    const nextData: AdmissionFormData =
      {
        ...formData,

        backgroundImage: "",
      };

    updateFormData(
      nextData
    );
  };

  // =======================================================
  // VALIDATION
  // =======================================================

  const validateForm =
    () => {
      if (
        !formData.backgroundImage
      ) {
        toast.error(
          "Please upload a background image."
        );

        return false;
      }

      if (
        !formData.titlePrefix.trim()
      ) {
        toast.error(
          "Please enter the title prefix."
        );

        return false;
      }

      if (
        !formData.title.trim()
      ) {
        toast.error(
          "Please enter the title."
        );

        return false;
      }

      if (
        !formData.description.trim()
      ) {
        toast.error(
          "Please enter the description."
        );

        return false;
      }

      if (
        !formData.buttonText.trim()
      ) {
        toast.error(
          "Please enter the button text."
        );

        return false;
      }

      if (
        !formData.buttonLink.trim()
      ) {
        toast.error(
          "Please enter the button link."
        );

        return false;
      }

      return true;
    };

  // =======================================================
  // SUBMIT
  // =======================================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (saving) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    // =====================================================
    // CREATE / UPDATE
    // =====================================================

    const isEdit =
      Boolean(admissionId);

    // =====================================================
    // CLEAN PAYLOAD
    // =====================================================

    const payload:
      AdmissionFormData = {
      backgroundImage:
        formData.backgroundImage.trim(),

      titlePrefix:
        formData.titlePrefix.trim(),

      title:
        formData.title.trim(),

      description:
        formData.description.trim(),

      buttonText:
        formData.buttonText.trim(),

      buttonLink:
        formData.buttonLink.trim(),

      isActive:
        Boolean(
          formData.isActive
        ),
    };

    try {
      setSaving(
        true
      );

      // ===================================================
      // API
      // ===================================================

      const response =
        await fetch(
          "/api/admission",
          {
            method: isEdit
              ? "PUT"
              : "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              payload
            ),
          }
        );

      // ===================================================
      // RESPONSE TEXT
      // ===================================================

      const responseText =
        await response.text();

      let data:
        | {
            success?: boolean;

            message?: string;

            data?: unknown;
          }
        | null = null;

      try {
        data =
          JSON.parse(
            responseText
          );
      } catch {
        throw new Error(
          `Admission API returned an invalid response. HTTP ${response.status}`
        );
      }

      // ===================================================
      // API ERROR
      // ===================================================

      if (
        !response.ok
      ) {
        throw new Error(
          data?.message ||
            `Request failed with status ${response.status}.`
        );
      }

      // ===================================================
      // SUCCESS CHECK
      // ===================================================

      if (
        !data?.success
      ) {
        throw new Error(
          data?.message ||
            "Admission section could not be saved."
        );
      }

      // ===================================================
      // SUCCESS
      // ===================================================

      toast.success(
        isEdit
          ? "Admission section updated successfully."
          : "Admission section created successfully."
      );

      onSuccess?.(
        data.data
      );
    } catch (error) {
      console.error(
        "SAVE ADMISSION ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save Admission section."
      );
    } finally {
      setSaving(
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
        space-y-6
      "
    >
      {/* =================================================
          CONTENT
      ================================================= */}

      <div
        className="
          rounded-2xl
          border
          border-gray-200
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
              font-semibold
              text-gray-900
            "
          >
            Admission Content
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-gray-500
            "
          >
            Configure the content
            displayed in the Admission
            section.
          </p>
        </div>

        <div className="space-y-5">
          {/* TITLE PREFIX */}

          <div>
            <label
              htmlFor="admission-title-prefix"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-gray-700
              "
            >
              Title Prefix
            </label>

            <input
              id="admission-title-prefix"
              name="titlePrefix"
              type="text"
              value={
                formData.titlePrefix
              }
              onChange={
                handleChange
              }
              placeholder="UAMC"
              className="
                h-12
                w-full
                rounded-xl
                border
                border-gray-200
                bg-white
                px-4
                text-sm
                text-gray-800
                outline-none
                placeholder:text-gray-400
                focus:border-[#008B45]
                focus:ring-2
                focus:ring-[#008B45]/10
              "
            />
          </div>

          {/* TITLE */}

          <div>
            <label
              htmlFor="admission-title"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-gray-700
              "
            >
              Title
            </label>

            <input
              id="admission-title"
              name="title"
              type="text"
              value={
                formData.title
              }
              onChange={
                handleChange
              }
              placeholder="Admission"
              className="
                h-12
                w-full
                rounded-xl
                border
                border-gray-200
                bg-white
                px-4
                text-sm
                text-gray-800
                outline-none
                placeholder:text-gray-400
                focus:border-[#008B45]
                focus:ring-2
                focus:ring-[#008B45]/10
              "
            />
          </div>

          {/* DESCRIPTION */}

          <div>
            <label
              htmlFor="admission-description"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-gray-700
              "
            >
              Description
            </label>

            <textarea
              id="admission-description"
              name="description"
              value={
                formData.description
              }
              onChange={
                handleChange
              }
              rows={6}
              placeholder="Write the Admission section description..."
              className="
                w-full
                resize-none
                rounded-xl
                border
                border-gray-200
                bg-white
                px-4
                py-3
                text-sm
                leading-6
                text-gray-800
                outline-none
                placeholder:text-gray-400
                focus:border-[#008B45]
                focus:ring-2
                focus:ring-[#008B45]/10
              "
            />
          </div>
        </div>
      </div>

      {/* =================================================
          BACKGROUND IMAGE
      ================================================= */}

      <div
        className="
          rounded-2xl
          border
          border-gray-200
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
              font-semibold
              text-gray-900
            "
          >
            Background Image
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-gray-500
            "
          >
            Upload the background image
            used in the Admission section.
          </p>
        </div>

        {formData.backgroundImage ? (
          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-gray-200
              bg-gray-50
            "
          >
            <img
              src={
                formData.backgroundImage
              }
              alt="Admission background"
              className="
                h-[280px]
                w-full
                object-cover
                sm:h-[340px]
              "
            />

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
          <label
            className="
              flex
              min-h-[280px]
              cursor-pointer
              flex-col
              items-center
              justify-center
              rounded-2xl
              border-2
              border-dashed
              border-gray-300
              bg-gray-50
              px-6
              text-center
              transition
              hover:border-[#008B45]
              hover:bg-[#E8F7F0]/30
            "
          >
            {uploadingImage ? (
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
                    text-gray-700
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
                    rounded-xl
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
                    text-gray-700
                  "
                >
                  Upload Background Image
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-gray-400
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
                    text-xs
                    font-semibold
                    text-white
                  "
                >
                  <Upload
                    size={15}
                  />

                  Choose Image
                </span>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              disabled={
                uploadingImage
              }
              onChange={
                handleImageChange
              }
              className="hidden"
            />
          </label>
        )}

        <p
          className="
            mt-3
            text-xs
            text-gray-400
          "
        >
          Maximum image size: 5MB.
        </p>
      </div>

      {/* =================================================
          BUTTON SETTINGS
      ================================================= */}

      <div
        className="
          rounded-2xl
          border
          border-gray-200
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
              font-semibold
              text-gray-900
            "
          >
            Button Settings
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-gray-500
            "
          >
            Configure the Learn More
            button.
          </p>
        </div>

        <div
          className="
            grid
            gap-5
            md:grid-cols-2
          "
        >
          {/* BUTTON TEXT */}

          <div>
            <label
              htmlFor="admission-button-text"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-gray-700
              "
            >
              Button Text
            </label>

            <input
              id="admission-button-text"
              name="buttonText"
              type="text"
              value={
                formData.buttonText
              }
              onChange={
                handleChange
              }
              placeholder="Learn More"
              className="
                h-12
                w-full
                rounded-xl
                border
                border-gray-200
                px-4
                text-sm
                outline-none
                placeholder:text-gray-400
                focus:border-[#008B45]
                focus:ring-2
                focus:ring-[#008B45]/10
              "
            />
          </div>

          {/* BUTTON LINK */}

          <div>
            <label
              htmlFor="admission-button-link"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-gray-700
              "
            >
              Button Link
            </label>

            <input
              id="admission-button-link"
              name="buttonLink"
              type="text"
              value={
                formData.buttonLink
              }
              onChange={
                handleChange
              }
              placeholder="/admission"
              className="
                h-12
                w-full
                rounded-xl
                border
                border-gray-200
                px-4
                text-sm
                outline-none
                placeholder:text-gray-400
                focus:border-[#008B45]
                focus:ring-2
                focus:ring-[#008B45]/10
              "
            />
          </div>
        </div>
      </div>

      {/* =================================================
          ACTIVE STATUS
      ================================================= */}

      <div
        className="
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-5
          shadow-sm
          sm:p-6
        "
      >
        <button
          type="button"
          onClick={
            handleActiveToggle
          }
          className="
            flex
            w-full
            items-center
            justify-between
            gap-5
            text-left
          "
        >
          <div>
            <p
              className="
                text-sm
                font-semibold
                text-gray-700
              "
            >
              Publish Admission Section
            </p>

            <p
              className="
                mt-1
                text-xs
                text-gray-400
              "
            >
              Make this section visible
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
                formData.isActive
                  ? "bg-[#008B45]"
                  : "bg-gray-300"
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
          SAVE BUTTON
      ================================================= */}

      <div
        className="
          flex
          justify-end
          rounded-2xl
          border
          border-gray-200
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
            uploadingImage
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

              {admissionId
                ? "Update Admission"
                : "Create Admission"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}