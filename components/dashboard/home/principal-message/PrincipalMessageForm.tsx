"use client";

import {
  ArrowLeft,
  Loader2,
  Save,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

import {
  useState,
} from "react";

import PrincipalMessageImageUpload from "./PrincipalMessageImageUpload";

// =========================================================
// DATA TYPE
// =========================================================

export interface PrincipalMessageFormData {
  tagline: string;

  titlePrefix: string;

  titleHighlight: string;

  signatureImage: string;

  principalName: string;

  designation: string;

  heading: string;

  description: string;

  principalImage: string;

  buttonText: string;

  buttonLink: string;

  isActive: boolean;
}

// =========================================================
// PROPS
// =========================================================

interface PrincipalMessageFormProps {
  initialData?: PrincipalMessageFormData;

  onSubmit: (
    data: PrincipalMessageFormData
  ) => Promise<void>;

  onChange?: (
    data: PrincipalMessageFormData
  ) => void;

  submitLabel?: string;

  loading?: boolean;

  title?: string;

  description?: string;
}

// =========================================================
// DEFAULT DATA
// =========================================================

const defaultFormData: PrincipalMessageFormData = {
  tagline:
    "knowledge meets innovation",

  titlePrefix:
    "Message from the",

  titleHighlight:
    "Principal",

  signatureImage:
    "",

  principalName:
    "",

  designation:
    "Principal (In Charge)",

  heading:
    "",

  description:
    "",

  principalImage:
    "",

  buttonText:
    "Read More",

  buttonLink:
    "#",

  isActive:
    true,
};

// =========================================================
// COMPONENT
// =========================================================

export default function PrincipalMessageForm({
  initialData,
  onSubmit,
  onChange,
  submitLabel = "Create Principal Message",
  loading = false,
  title = "Principal Message",
  description = "Manage the Principal Message section displayed on the website.",
}: PrincipalMessageFormProps) {
  const router =
    useRouter();

  // =======================================================
  // FORM STATE
  // =======================================================

  const [
    formData,
    setFormData,
  ] =
    useState<PrincipalMessageFormData>(
      () => ({
        ...defaultFormData,
        ...(initialData || {}),
      })
    );

  // =======================================================
  // UPLOAD STATES
  // =======================================================

  const [
    uploadingSignature,
    setUploadingSignature,
  ] =
    useState(false);

  const [
    uploadingPrincipal,
    setUploadingPrincipal,
  ] =
    useState(false);

  // =======================================================
  // UPDATE FORM + PREVIEW
  // =======================================================

  const updateFormData = (
    updatedData: PrincipalMessageFormData
  ) => {
    setFormData(
      updatedData
    );

    onChange?.(
      updatedData
    );
  };

  // =======================================================
  // INPUT CHANGE
  // =======================================================

  const handleInputChange = (
    event:
      React.ChangeEvent<
        HTMLInputElement
        | HTMLTextAreaElement
      >
  ) => {
    const {
      name,
      value,
    } = event.target;

    const updatedData = {
      ...formData,

      [name]: value,
    } as PrincipalMessageFormData;

    updateFormData(
      updatedData
    );
  };

  // =======================================================
  // IMAGE UPLOAD
  // =======================================================

  const handleImageUpload = async (
    file: File,
    type:
      | "signature"
      | "principal"
  ) => {
    try {
      // ---------------------------------------------------
      // LOADING
      // ---------------------------------------------------

      if (
        type ===
        "signature"
      ) {
        setUploadingSignature(
          true
        );
      } else {
        setUploadingPrincipal(
          true
        );
      }

      // ---------------------------------------------------
      // FILE TYPE
      // ---------------------------------------------------

      if (
        !file.type.startsWith(
          "image/"
        )
      ) {
        throw new Error(
          "Please select a valid image file."
        );
      }

      // ---------------------------------------------------
      // FILE SIZE
      // ---------------------------------------------------

      const maxSize =
        5 * 1024 * 1024;

      if (
        file.size >
        maxSize
      ) {
        throw new Error(
          "Image size must be less than 5MB."
        );
      }

      // ---------------------------------------------------
      // FORM DATA
      // ---------------------------------------------------

      const uploadData =
        new FormData();

      uploadData.append(
        "file",
        file
      );

      // ---------------------------------------------------
      // CLOUDINARY UPLOAD
      // ---------------------------------------------------

      const response =
        await fetch(
          "/api/upload",
          {
            method: "POST",
            body: uploadData,
          }
        );

      // ---------------------------------------------------
      // RESPONSE
      // ---------------------------------------------------

      const responseText =
        await response.text();

      let result:
        | {
            success?: boolean;

            message?: string;

            url?: string;

            secure_url?: string;

            data?: {
              url?: string;

              secure_url?: string;
            };
          }
        | null = null;

      try {
        result =
          JSON.parse(
            responseText
          );
      } catch {
        throw new Error(
          "Upload API returned an invalid response."
        );
      }

      // ---------------------------------------------------
      // API ERROR
      // ---------------------------------------------------

      if (
        !response.ok ||
        !result?.success
      ) {
        throw new Error(
          result?.message ||
            "Image upload failed."
        );
      }

      // ---------------------------------------------------
      // CLOUDINARY URL
      // ---------------------------------------------------

      const imageUrl =
        result.url ||
        result.secure_url ||
        result.data?.url ||
        result.data?.secure_url;

      if (!imageUrl) {
        throw new Error(
          "Cloudinary image URL was not returned."
        );
      }

      // ---------------------------------------------------
      // UPDATE IMAGE + LIVE PREVIEW
      // ---------------------------------------------------

      const updatedData = {
        ...formData,

        ...(type ===
        "signature"
          ? {
              signatureImage:
                imageUrl,
            }
          : {
              principalImage:
                imageUrl,
            }),
      };

      updateFormData(
        updatedData
      );
    } catch (error) {
      console.error(
        "PRINCIPAL MESSAGE IMAGE UPLOAD ERROR:",
        error
      );

      window.alert(
        error instanceof Error
          ? error.message
          : "Image upload failed."
      );
    } finally {
      if (
        type ===
        "signature"
      ) {
        setUploadingSignature(
          false
        );
      } else {
        setUploadingPrincipal(
          false
        );
      }
    }
  };

  // =======================================================
  // SUBMIT
  // =======================================================

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // -----------------------------------------------------
    // VALIDATION
    // -----------------------------------------------------

    if (
      !formData.tagline.trim()
    ) {
      window.alert(
        "Please enter the tagline."
      );

      return;
    }

    if (
      !formData.titlePrefix.trim()
    ) {
      window.alert(
        "Please enter the title prefix."
      );

      return;
    }

    if (
      !formData.titleHighlight.trim()
    ) {
      window.alert(
        "Please enter the highlighted title."
      );

      return;
    }

    if (
      !formData.signatureImage
    ) {
      window.alert(
        "Please upload the signature image."
      );

      return;
    }

    if (
      !formData.principalName.trim()
    ) {
      window.alert(
        "Please enter the principal name."
      );

      return;
    }

    if (
      !formData.designation.trim()
    ) {
      window.alert(
        "Please enter the designation."
      );

      return;
    }

    if (
      !formData.heading.trim()
    ) {
      window.alert(
        "Please enter the heading."
      );

      return;
    }

    if (
      !formData.description.trim()
    ) {
      window.alert(
        "Please enter the description."
      );

      return;
    }

    if (
      !formData.principalImage
    ) {
      window.alert(
        "Please upload the principal image."
      );

      return;
    }

    // -----------------------------------------------------
    // FINAL DATA
    // -----------------------------------------------------

    const finalData: PrincipalMessageFormData = {
      ...formData,

      tagline:
        formData.tagline.trim(),

      titlePrefix:
        formData.titlePrefix.trim(),

      titleHighlight:
        formData.titleHighlight.trim(),

      principalName:
        formData.principalName.trim(),

      designation:
        formData.designation.trim(),

      heading:
        formData.heading.trim(),

      description:
        formData.description.trim(),

      buttonText:
        formData.buttonText.trim() ||
        "Read More",

      buttonLink:
        formData.buttonLink.trim() ||
        "#",
    };

    // -----------------------------------------------------
    // SUBMIT
    // -----------------------------------------------------

    try {
      await onSubmit(
        finalData
      );
    } catch (error) {
      console.error(
        "PRINCIPAL MESSAGE FORM SUBMIT ERROR:",
        error
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
      "
    >
      {/* ===================================================
          HEADER
      =================================================== */}

      <div
        className="
          mb-6
          flex
          items-start
          gap-4
        "
      >
        <button
          type="button"
          onClick={() =>
            router.back()
          }
          className="
            mt-1
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-600
            transition
            hover:bg-slate-50
          "
        >
          <ArrowLeft
            size={18}
          />
        </button>

        <div>
          <h1
            className="
              text-2xl
              font-bold
              text-slate-900
              sm:text-3xl
            "
          >
            {title}
          </h1>

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
      </div>

      {/* ===================================================
          SECTION CONTENT
      =================================================== */}

      <div
        className="
          mb-6
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
          sm:p-6
        "
      >
        <div
          className="
            border-b
            border-slate-100
            pb-4
          "
        >
          <h2
            className="
              text-lg
              font-semibold
              text-slate-900
            "
          >
            Section Content
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Add the text content for the
            Principal Message section.
          </p>
        </div>

        <div
          className="
            mt-6
            grid
            gap-5
            md:grid-cols-2
          "
        >
          {/* TAGLINE */}

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
              "
            >
              Tagline
            </label>

            <input
              type="text"
              name="tagline"
              value={
                formData.tagline
              }
              onChange={
                handleInputChange
              }
              placeholder="knowledge meets innovation"
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-sm
                text-slate-800
                outline-none
                transition
                focus:border-[#008B45]
                focus:ring-2
                focus:ring-[#008B45]/10
              "
            />
          </div>

          {/* TITLE PREFIX */}

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
              "
            >
              Title Prefix
            </label>

            <input
              type="text"
              name="titlePrefix"
              value={
                formData.titlePrefix
              }
              onChange={
                handleInputChange
              }
              placeholder="Message from the"
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-sm
                text-slate-800
                outline-none
                transition
                focus:border-[#008B45]
                focus:ring-2
                focus:ring-[#008B45]/10
              "
            />
          </div>

          {/* TITLE HIGHLIGHT */}

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
              "
            >
              Highlight Title
            </label>

            <input
              type="text"
              name="titleHighlight"
              value={
                formData.titleHighlight
              }
              onChange={
                handleInputChange
              }
              placeholder="Principal"
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-sm
                text-slate-800
                outline-none
                transition
                focus:border-[#008B45]
                focus:ring-2
                focus:ring-[#008B45]/10
              "
            />
          </div>

          {/* PRINCIPAL NAME */}

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
              "
            >
              Principal Name
            </label>

            <input
              type="text"
              name="principalName"
              value={
                formData.principalName
              }
              onChange={
                handleInputChange
              }
              placeholder="Principal Name"
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-sm
                text-slate-800
                outline-none
                transition
                focus:border-[#008B45]
                focus:ring-2
                focus:ring-[#008B45]/10
              "
            />
          </div>

          {/* DESIGNATION */}

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
              "
            >
              Designation
            </label>

            <input
              type="text"
              name="designation"
              value={
                formData.designation
              }
              onChange={
                handleInputChange
              }
              placeholder="Principal (In Charge)"
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-sm
                text-slate-800
                outline-none
                transition
                focus:border-[#008B45]
                focus:ring-2
                focus:ring-[#008B45]/10
              "
            />
          </div>

          {/* HEADING */}

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
              "
            >
              Heading
            </label>

            <input
              type="text"
              name="heading"
              value={
                formData.heading
              }
              onChange={
                handleInputChange
              }
              placeholder="Ensuring Quality Healthcare & Medical Education"
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-sm
                text-slate-800
                outline-none
                transition
                focus:border-[#008B45]
                focus:ring-2
                focus:ring-[#008B45]/10
              "
            />
          </div>
        </div>

        {/* DESCRIPTION */}

        <div className="mt-5">
          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-slate-700
            "
          >
            Description
          </label>

          <textarea
            name="description"
            value={
              formData.description
            }
            onChange={
              handleInputChange
            }
            rows={7}
            placeholder="Enter the Principal's message..."
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
              text-slate-800
              outline-none
              transition
              focus:border-[#008B45]
              focus:ring-2
              focus:ring-[#008B45]/10
            "
          />
        </div>
      </div>

      {/* ===================================================
          IMAGES
      =================================================== */}

      <div
        className="
          mb-6
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
          sm:p-6
        "
      >
        <div
          className="
            border-b
            border-slate-100
            pb-4
          "
        >
          <h2
            className="
              text-lg
              font-semibold
              text-slate-900
            "
          >
            Images
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Upload the signature and
            principal image through
            Cloudinary.
          </p>
        </div>

        <div
          className="
            mt-6
            grid
            gap-6
            lg:grid-cols-2
          "
        >
          {/* SIGNATURE */}

          <PrincipalMessageImageUpload
            label="Signature Image"
            value={
              formData.signatureImage
            }
            onChange={(
              url
            ) => {
              const updatedData = {
                ...formData,

                signatureImage:
                  url,
              };

              updateFormData(
                updatedData
              );
            }}
            onUpload={(
              file
            ) =>
              handleImageUpload(
                file,
                "signature"
              )
            }
            uploading={
              uploadingSignature
            }
            required
          />

          {/* PRINCIPAL */}

          <PrincipalMessageImageUpload
            label="Principal Image"
            value={
              formData.principalImage
            }
            onChange={(
              url
            ) => {
              const updatedData = {
                ...formData,

                principalImage:
                  url,
              };

              updateFormData(
                updatedData
              );
            }}
            onUpload={(
              file
            ) =>
              handleImageUpload(
                file,
                "principal"
              )
            }
            uploading={
              uploadingPrincipal
            }
            required
          />
        </div>
      </div>

      {/* ===================================================
          BUTTON SETTINGS
      =================================================== */}

      <div
        className="
          mb-6
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
          sm:p-6
        "
      >
        <div
          className="
            border-b
            border-slate-100
            pb-4
          "
        >
          <h2
            className="
              text-lg
              font-semibold
              text-slate-900
            "
          >
            Button Settings
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Configure the button shown
            below the Principal&apos;s message.
          </p>
        </div>

        <div
          className="
            mt-6
            grid
            gap-5
            md:grid-cols-2
          "
        >
          {/* BUTTON TEXT */}

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
              "
            >
              Button Text
            </label>

            <input
              type="text"
              name="buttonText"
              value={
                formData.buttonText
              }
              onChange={
                handleInputChange
              }
              placeholder="Read More"
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-sm
                text-slate-800
                outline-none
                transition
                focus:border-[#008B45]
                focus:ring-2
                focus:ring-[#008B45]/10
              "
            />
          </div>

          {/* BUTTON LINK */}

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
              "
            >
              Button Link
            </label>

            <input
              type="text"
              name="buttonLink"
              value={
                formData.buttonLink
              }
              onChange={
                handleInputChange
              }
              placeholder="#"
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-sm
                text-slate-800
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

      {/* ===================================================
          PUBLISH
      =================================================== */}

      <div
        className="
          mb-6
          flex
          items-center
          justify-between
          gap-5
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
          sm:p-6
        "
      >
        <div>
          <h2
            className="
              text-base
              font-semibold
              text-slate-900
            "
          >
            Publish Principal Message
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Show this section on the
            website.
          </p>
        </div>

        <button
          type="button"
          aria-label="Toggle publish status"
          onClick={() => {
            const updatedData = {
              ...formData,

              isActive:
                !formData.isActive,
            };

            updateFormData(
              updatedData
            );
          }}
          className={`
            relative
            h-7
            w-12
            shrink-0
            rounded-full
            transition-colors
            duration-200
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
              h-5
              w-5
              rounded-full
              bg-white
              shadow-sm
              transition-transform
              duration-200
              ${
                formData.isActive
                  ? "translate-x-6"
                  : "translate-x-1"
              }
            `}
          />
        </button>
      </div>

      {/* ===================================================
          SUBMIT
      =================================================== */}

      <div
        className="
          flex
          flex-col-reverse
          gap-3
          sm:flex-row
          sm:items-center
          sm:justify-end
        "
      >
        <button
          type="button"
          onClick={() =>
            router.back()
          }
          disabled={loading}
          className="
            inline-flex
            min-h-11
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            px-6
            py-3
            text-sm
            font-medium
            text-slate-700
            transition
            hover:bg-slate-50
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={
            loading ||
            uploadingSignature ||
            uploadingPrincipal
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
          {loading ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />

              Saving...
            </>
          ) : (
            <>
              <Save
                size={18}
              />

              {submitLabel}
            </>
          )}
        </button>
      </div>
    </form>
  );
}