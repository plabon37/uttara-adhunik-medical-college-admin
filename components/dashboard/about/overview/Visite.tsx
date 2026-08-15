"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Edit3,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Loader2,
  Phone,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";

type VisiteData = {
  _id?: string;
  title: string;
  description: string;
  secondaryDescription: string;
  phoneNumber: string;
  phoneText: string;
  buttonText: string;
  buttonLink: string;
  imageOne: string;
  imageTwo: string;
  badgeNumber: string;
  badgeText: string;
  isPublished: boolean;
};

type ImageField = "imageOne" | "imageTwo";

const initialForm: VisiteData = {
  title: "Visiting At UAMC",

  description:
    "Here you’ll find all the information about the reasons why UAMC is a unique institution. Get to know why thousands of people visit us.",

  secondaryDescription:
    "Welcome to UAMC, where knowledge meets innovation and where every student's journey to success begins.",

  phoneNumber: "+880 1700-220000",

  phoneText:
    "For any kind of admission enquiry",

  buttonText:
    "View Our Program",

  buttonLink:
    "/admission",

  imageOne: "",

  imageTwo: "",

  badgeNumber: "28+",

  badgeText:
    "Department Available For Student",

  isPublished: true,
};

export default function Visite() {
  const router = useRouter();

  // ==========================================================
  // STATE
  // ==========================================================

  const [visite, setVisite] =
    useState<VisiteData | null>(null);

  const [formData, setFormData] =
    useState<VisiteData>(initialForm);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const [uploadingImage, setUploadingImage] =
    useState<ImageField | null>(null);

  const [showForm, setShowForm] =
    useState(false);

  const [isEditing, setIsEditing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // ==========================================================
  // FETCH VISITE
  // ==========================================================

  const fetchVisite = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/visite",
        {
          method: "GET",
          cache: "no-store",
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to fetch Visite.",
        );
      }

      if (result.data) {
        setVisite(result.data);
      } else {
        setVisite(null);
      }
    } catch (error) {
      console.error(
        "VISITE FETCH ERROR:",
        error,
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load Visite.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================================
  // INITIAL FETCH
  // ==========================================================

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchVisite();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [fetchVisite]);

  // ==========================================================
  // HANDLE FIELD CHANGE
  // ==========================================================

  const handleChange = (
    field: keyof VisiteData,
    value: string | boolean,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // ==========================================================
  // CREATE
  // ==========================================================

  const handleCreate = () => {
    setFormData({
      ...initialForm,
    });

    setIsEditing(false);
    setShowForm(true);

    setError("");
    setSuccess("");
  };

  // ==========================================================
  // EDIT
  // ==========================================================

  const handleEdit = () => {
    if (!visite) {
      return;
    }

    setFormData({
      ...visite,
    });

    setIsEditing(true);
    setShowForm(true);

    setError("");
    setSuccess("");
  };

  // ==========================================================
  // CLOSE FORM
  // ==========================================================

  const handleClose = () => {
    if (saving || uploadingImage) {
      return;
    }

    setShowForm(false);
    setError("");
  };

  // ==========================================================
  // CLOUDINARY IMAGE UPLOAD
  // ==========================================================

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    field: ImageField,
  ) => {
    const file = event.target.files?.[0];

    // Reset file input so the same image can be selected again
    event.target.value = "";

    if (!file) {
      return;
    }

    // ========================================================
    // VALIDATE FILE TYPE
    // ========================================================

    if (!file.type.startsWith("image/")) {
      setError(
        "Please select a valid image file.",
      );

      return;
    }

    // ========================================================
    // VALIDATE FILE SIZE
    // ========================================================

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "Image size must be less than 5MB.",
      );

      return;
    }

    try {
      setUploadingImage(field);

      setError("");
      setSuccess("");

      // ======================================================
      // FORM DATA
      // ======================================================

      const uploadFormData = new FormData();

      uploadFormData.append(
        "file",
        file,
      );

      // Your existing /api/upload supports this field.
      uploadFormData.append(
        "type",
        "visite",
      );

      // ======================================================
      // UPLOAD TO CLOUDINARY
      // ======================================================

      const response = await fetch(
        "/api/upload",
        {
          method: "POST",
          body: uploadFormData,
        },
      );

      const result =
        await response.json();

      // ======================================================
      // CHECK RESPONSE
      // ======================================================

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Image upload failed.",
        );
      }

      // ======================================================
      // IMPORTANT:
      // YOUR EXISTING API RETURNS:
      //
      // {
      //   success: true,
      //   url: "https://res.cloudinary.com/..."
      // }
      //
      // So we use result.url directly.
      // ======================================================

      if (
        !result.url ||
        typeof result.url !== "string"
      ) {
        console.error(
          "UPLOAD RESPONSE:",
          result,
        );

        throw new Error(
          "Cloudinary did not return an image URL.",
        );
      }

      // ======================================================
      // UPDATE FORM
      // ======================================================

      handleChange(
        field,
        result.url,
      );

      // ======================================================
      // SUCCESS
      // ======================================================

      setSuccess(
        field === "imageOne"
          ? "Image one uploaded successfully."
          : "Image two uploaded successfully.",
      );
    } catch (error) {
      console.error(
        "IMAGE UPLOAD ERROR:",
        error,
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to upload image.",
      );
    } finally {
      setUploadingImage(null);
    }
  };

  // ==========================================================
  // REMOVE IMAGE
  // ==========================================================

  const removeImage = (
    field: ImageField,
  ) => {
    handleChange(
      field,
      "",
    );

    setSuccess("");
  };

  // ==========================================================
  // SAVE / UPDATE
  // ==========================================================

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    try {
      setSaving(true);

      setError("");
      setSuccess("");

      const method =
        isEditing && formData._id
          ? "PATCH"
          : "POST";

      const url =
        isEditing && formData._id
          ? `/api/visite?id=${formData._id}`
          : "/api/visite";

      const response = await fetch(
        url,
        {
          method,
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title:
              formData.title,

            description:
              formData.description,

            secondaryDescription:
              formData.secondaryDescription,

            phoneNumber:
              formData.phoneNumber,

            phoneText:
              formData.phoneText,

            buttonText:
              formData.buttonText,

            buttonLink:
              formData.buttonLink,

            imageOne:
              formData.imageOne,

            imageTwo:
              formData.imageTwo,

            badgeNumber:
              formData.badgeNumber,

            badgeText:
              formData.badgeText,

            isPublished:
              formData.isPublished,
          }),
        },
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Failed to save Visite.",
        );
      }

      setVisite(result.data);

      setFormData(result.data);

      setShowForm(false);

      setSuccess(
        isEditing
          ? "Visite updated successfully."
          : "Visite created successfully.",
      );
    } catch (error) {
      console.error(
        "VISITE SAVE ERROR:",
        error,
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to save Visite.",
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================================
  // DELETE
  // ==========================================================

  const handleDelete = async () => {
    if (!visite?._id) {
      return;
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this Visite section?",
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      setError("");
      setSuccess("");

      const response =
        await fetch(
          `/api/visite?id=${visite._id}`,
          {
            method: "DELETE",
          },
        );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Failed to delete Visite.",
        );
      }

      setVisite(null);

      setFormData({
        ...initialForm,
      });

      setShowForm(false);

      setSuccess(
        "Visite deleted successfully.",
      );
    } catch (error) {
      console.error(
        "VISITE DELETE ERROR:",
        error,
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete Visite.",
      );
    } finally {
      setDeleting(false);
    }
  };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <main className="min-h-[500px] w-full">
        <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <Loader2
              size={20}
              className="animate-spin text-[#008B45]"
            />

            Loading Visite...
          </div>
        </div>
      </main>
    );
  }

  // ==========================================================
  // MAIN
  // ==========================================================

  return (
    <main className="w-full pb-10">

      {/* ======================================================
          BACK TO DASHBOARD
      ======================================================= */}

      <button
        type="button"
        onClick={() =>
          router.push(
            "/dashboard",
          )
        }
        className="
          mb-5
          inline-flex
          items-center
          gap-2
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          py-2.5
          text-sm
          font-semibold
          text-slate-600
          shadow-sm
          transition
          hover:border-[#008B45]/30
          hover:bg-[#E8F5EE]
          hover:text-[#008B45]
        "
      >
        <ArrowLeft size={17} />

        Back to Dashboard
      </button>

      {/* ======================================================
          HEADER
      ======================================================= */}

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
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#E8F5EE]
                  text-[#008B45]
                "
              >
                <Eye size={21} />
              </div>

              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  Visiting At UAMC
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  About Overview section
                </p>
              </div>

            </div>
          </div>

          {!showForm &&
            !visite && (
              <button
                type="button"
                onClick={
                  handleCreate
                }
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#008B45]
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-[#00743A]
                "
              >
                <Plus size={18} />

                Create Visite
              </button>
            )}

        </div>
      </div>

      {/* ======================================================
          SUCCESS
      ======================================================= */}

      {success && (
        <div
          className="
            mb-5
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-green-200
            bg-green-50
            px-5
            py-4
            text-sm
            font-medium
            text-green-700
          "
        >
          <Check size={18} />

          {success}
        </div>
      )}

      {/* ======================================================
          ERROR
      ======================================================= */}

      {error && (
        <div
          className="
            mb-5
            rounded-xl
            border
            border-red-200
            bg-red-50
            px-5
            py-4
            text-sm
            font-medium
            text-red-700
          "
        >
          {error}
        </div>
      )}

      {/* ======================================================
          EMPTY STATE
      ======================================================= */}

      {!showForm &&
        !visite && (
          <div
            className="
              flex
              min-h-[430px]
              flex-col
              items-center
              justify-center
              rounded-2xl
              border
              border-dashed
              border-slate-300
              bg-white
              p-8
              text-center
              shadow-sm
            "
          >

            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-[#E8F5EE]
                text-[#008B45]
              "
            >
              <Plus size={28} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              Create Visiting At UAMC
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              Add the content, images,
              phone information and
              other details for the
              About Overview section.
            </p>

            <button
              type="button"
              onClick={
                handleCreate
              }
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-[#008B45]
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#00743A]
              "
            >
              <Plus size={18} />

              Create Visite
            </button>

          </div>
        )}

      {/* ======================================================
          FORM + LIVE PREVIEW
      ======================================================= */}

      {showForm && (
        <div
          className="
            grid
            grid-cols-1
            items-start
            gap-6
            xl:grid-cols-[minmax(0,1fr)_minmax(460px,0.85fr)]
          "
        >

          {/* ==================================================
              FORM
          =================================================== */}

          <form
            onSubmit={
              handleSubmit
            }
            className="
              min-w-0
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-sm
              sm:p-6
              lg:p-8
            "
          >

            {/* FORM HEADER */}

            <div
              className="
                mb-7
                flex
                items-start
                justify-between
                border-b
                border-slate-100
                pb-5
              "
            >
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {isEditing
                    ? "Edit Visite"
                    : "Create Visite"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Changes appear instantly
                  in the live preview.
                </p>
              </div>

              <button
                type="button"
                onClick={
                  handleClose
                }
                disabled={
                  saving ||
                  uploadingImage !==
                    null
                }
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-400
                  transition
                  hover:bg-slate-100
                  hover:text-slate-700
                  disabled:opacity-50
                "
              >
                <X size={19} />
              </button>
            </div>

            {/* TITLE */}

            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Title
              </label>

              <input
                type="text"
                value={
                  formData.title
                }
                onChange={(event) =>
                  handleChange(
                    "title",
                    event.target.value,
                  )
                }
                required
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  text-sm
                  text-slate-800
                  outline-none
                  transition
                  focus:border-[#008B45]
                  focus:bg-white
                "
              />
            </div>

            {/* DESCRIPTION */}

            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Description
              </label>

              <textarea
                value={
                  formData.description
                }
                onChange={(event) =>
                  handleChange(
                    "description",
                    event.target.value,
                  )
                }
                required
                rows={5}
                className="
                  w-full
                  resize-y
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-3
                  text-sm
                  leading-6
                  text-slate-800
                  outline-none
                  transition
                  focus:border-[#008B45]
                  focus:bg-white
                "
              />
            </div>

            {/* SECONDARY DESCRIPTION */}

            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Secondary Description
              </label>

              <textarea
                value={
                  formData.secondaryDescription
                }
                onChange={(event) =>
                  handleChange(
                    "secondaryDescription",
                    event.target.value,
                  )
                }
                required
                rows={5}
                className="
                  w-full
                  resize-y
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-3
                  text-sm
                  leading-6
                  text-slate-800
                  outline-none
                  transition
                  focus:border-[#008B45]
                  focus:bg-white
                "
              />
            </div>

            {/* PHONE */}

            <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Phone Number
                </label>

                <input
                  type="text"
                  value={
                    formData.phoneNumber
                  }
                  onChange={(event) =>
                    handleChange(
                      "phoneNumber",
                      event.target.value,
                    )
                  }
                  required
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    text-sm
                    outline-none
                    transition
                    focus:border-[#008B45]
                    focus:bg-white
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Phone Text
                </label>

                <input
                  type="text"
                  value={
                    formData.phoneText
                  }
                  onChange={(event) =>
                    handleChange(
                      "phoneText",
                      event.target.value,
                    )
                  }
                  required
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    text-sm
                    outline-none
                    transition
                    focus:border-[#008B45]
                    focus:bg-white
                  "
                />
              </div>

            </div>

            {/* BUTTON */}

            <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Button Text
                </label>

                <input
                  type="text"
                  value={
                    formData.buttonText
                  }
                  onChange={(event) =>
                    handleChange(
                      "buttonText",
                      event.target.value,
                    )
                  }
                  required
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    text-sm
                    outline-none
                    transition
                    focus:border-[#008B45]
                    focus:bg-white
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Button Link
                </label>

                <input
                  type="text"
                  value={
                    formData.buttonLink
                  }
                  onChange={(event) =>
                    handleChange(
                      "buttonLink",
                      event.target.value,
                    )
                  }
                  required
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    text-sm
                    outline-none
                    transition
                    focus:border-[#008B45]
                    focus:bg-white
                  "
                />
              </div>

            </div>

            {/* =================================================
                IMAGE ONE
            ================================================== */}

            <div className="mb-5">

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Image One
              </label>

              {formData.imageOne ? (
                <div className="relative overflow-hidden rounded-xl border border-slate-200">

                  <img
                    src={
                      formData.imageOne
                    }
                    alt="Visite image one"
                    className="
                      h-52
                      w-full
                      object-cover
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeImage(
                        "imageOne",
                      )
                    }
                    className="
                      absolute
                      right-3
                      top-3
                      flex
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
                  >
                    <X size={17} />
                  </button>

                  <div
                    className="
                      absolute
                      bottom-3
                      left-3
                      flex
                      items-center
                      gap-2
                      rounded-lg
                      bg-black/60
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-white
                    "
                  >
                    <Check size={13} />

                    Cloudinary Uploaded
                  </div>

                </div>
              ) : (
                <label
                  className="
                    flex
                    min-h-[170px]
                    cursor-pointer
                    flex-col
                    items-center
                    justify-center
                    rounded-xl
                    border-2
                    border-dashed
                    border-slate-300
                    bg-slate-50
                    transition
                    hover:border-[#008B45]
                    hover:bg-[#E8F5EE]
                  "
                >

                  {uploadingImage ===
                  "imageOne" ? (
                    <>
                      <Loader2
                        size={28}
                        className="
                          animate-spin
                          text-[#008B45]
                        "
                      />

                      <span className="mt-3 text-sm font-semibold text-slate-600">
                        Uploading to Cloudinary...
                      </span>
                    </>
                  ) : (
                    <>
                      <div
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-xl
                          bg-white
                          text-[#008B45]
                          shadow-sm
                        "
                      >
                        <Upload size={22} />
                      </div>

                      <span className="mt-3 text-sm font-semibold text-slate-700">
                        Upload Image One
                      </span>

                      <span className="mt-1 text-xs text-slate-400">
                        JPG, PNG, WEBP · Max 5MB
                      </span>
                    </>
                  )}

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    disabled={
                      uploadingImage !==
                      null
                    }
                    onChange={(event) =>
                      handleImageUpload(
                        event,
                        "imageOne",
                      )
                    }
                  />

                </label>
              )}

            </div>

            {/* =================================================
                IMAGE TWO
            ================================================== */}

            <div className="mb-6">

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Image Two
              </label>

              {formData.imageTwo ? (
                <div className="relative overflow-hidden rounded-xl border border-slate-200">

                  <img
                    src={
                      formData.imageTwo
                    }
                    alt="Visite image two"
                    className="
                      h-52
                      w-full
                      object-cover
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeImage(
                        "imageTwo",
                      )
                    }
                    className="
                      absolute
                      right-3
                      top-3
                      flex
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
                  >
                    <X size={17} />
                  </button>

                  <div
                    className="
                      absolute
                      bottom-3
                      left-3
                      flex
                      items-center
                      gap-2
                      rounded-lg
                      bg-black/60
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-white
                    "
                  >
                    <Check size={13} />

                    Cloudinary Uploaded
                  </div>

                </div>
              ) : (
                <label
                  className="
                    flex
                    min-h-[170px]
                    cursor-pointer
                    flex-col
                    items-center
                    justify-center
                    rounded-xl
                    border-2
                    border-dashed
                    border-slate-300
                    bg-slate-50
                    transition
                    hover:border-[#008B45]
                    hover:bg-[#E8F5EE]
                  "
                >

                  {uploadingImage ===
                  "imageTwo" ? (
                    <>
                      <Loader2
                        size={28}
                        className="
                          animate-spin
                          text-[#008B45]
                        "
                      />

                      <span className="mt-3 text-sm font-semibold text-slate-600">
                        Uploading to Cloudinary...
                      </span>
                    </>
                  ) : (
                    <>
                      <div
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-xl
                          bg-white
                          text-[#008B45]
                          shadow-sm
                        "
                      >
                        <Upload size={22} />
                      </div>

                      <span className="mt-3 text-sm font-semibold text-slate-700">
                        Upload Image Two
                      </span>

                      <span className="mt-1 text-xs text-slate-400">
                        JPG, PNG, WEBP · Max 5MB
                      </span>
                    </>
                  )}

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    disabled={
                      uploadingImage !==
                      null
                    }
                    onChange={(event) =>
                      handleImageUpload(
                        event,
                        "imageTwo",
                      )
                    }
                  />

                </label>
              )}

            </div>

            {/* BADGE */}

            <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Badge Number
                </label>

                <input
                  type="text"
                  value={
                    formData.badgeNumber
                  }
                  onChange={(event) =>
                    handleChange(
                      "badgeNumber",
                      event.target.value,
                    )
                  }
                  required
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    text-sm
                    outline-none
                    transition
                    focus:border-[#008B45]
                    focus:bg-white
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Badge Text
                </label>

                <input
                  type="text"
                  value={
                    formData.badgeText
                  }
                  onChange={(event) =>
                    handleChange(
                      "badgeText",
                      event.target.value,
                    )
                  }
                  required
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    text-sm
                    outline-none
                    transition
                    focus:border-[#008B45]
                    focus:bg-white
                  "
                />
              </div>

            </div>

            {/* PUBLISH */}

            <div
              className="
                mb-7
                flex
                items-center
                justify-between
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                p-4
              "
            >

              <div className="flex items-center gap-3">

                {formData.isPublished ? (
                  <Eye
                    size={19}
                    className="text-[#008B45]"
                  />
                ) : (
                  <EyeOff
                    size={19}
                    className="text-slate-400"
                  />
                )}

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Publish on website
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Show this section on
                    the client website.
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  handleChange(
                    "isPublished",
                    !formData.isPublished,
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

            {/* ACTIONS */}

            <div
              className="
                flex
                flex-col-reverse
                gap-3
                border-t
                border-slate-100
                pt-6
                sm:flex-row
                sm:justify-end
              "
            >

              <button
                type="button"
                onClick={
                  handleClose
                }
                disabled={
                  saving ||
                  uploadingImage !==
                    null
                }
                className="
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-slate-600
                  transition
                  hover:bg-slate-50
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={
                  saving ||
                  uploadingImage !==
                    null
                }
                className="
                  inline-flex
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
                  transition
                  hover:bg-[#00743A]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >

                {saving ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />

                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={17} />

                    {isEditing
                      ? "Update Visite"
                      : "Save Visite"}
                  </>
                )}

              </button>

            </div>

          </form>

          {/* ==================================================
              STICKY LIVE PREVIEW
          =================================================== */}

          <aside
            className="
              min-w-0
              xl:sticky
              xl:top-6
            "
          >

            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-sm
              "
            >

              {/* PREVIEW HEADER */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-slate-100
                  px-5
                  py-4
                "
              >

                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Live Preview
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Your changes appear instantly
                  </p>
                </div>

                <span
                  className="
                    flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-green-50
                    px-3
                    py-1
                    text-[11px]
                    font-bold
                    text-green-600
                  "
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                  LIVE
                </span>

              </div>

              {/* PREVIEW CONTENT */}

              <div className="p-4 sm:p-6">

                <div className="overflow-hidden bg-white">

                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-7
                      lg:grid-cols-[1fr_0.9fr]
                    "
                  >

                    {/* LEFT */}

                    <div className="flex flex-col justify-center">

                      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#008B45]">
                        Visite UAMC
                      </p>

                      <h3 className="font-serif text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                        {formData.title ||
                          "Visiting At UAMC"}
                      </h3>

                      <p className="mt-5 text-sm leading-6 text-slate-500">
                        {formData.description ||
                          "Main description will appear here."}
                      </p>

                      <p className="mt-4 text-sm leading-6 text-slate-500">
                        {formData.secondaryDescription ||
                          "Secondary description will appear here."}
                      </p>

                      {/* PHONE */}

                      <div className="mt-6 flex items-center gap-3">

                        <div
                          className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-[#008B45]
                            text-white
                          "
                        >
                          <Phone size={19} />
                        </div>

                        <div>
                          <p className="text-sm font-bold text-[#008B45]">
                            Call{" "}
                            {formData.phoneNumber ||
                              "+880 1700-220000"}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {formData.phoneText ||
                              "For any kind of admission enquiry"}
                          </p>
                        </div>

                      </div>

                      {/* BUTTON */}

                      <div className="mt-6">

                        <div
                          className="
                            inline-flex
                            items-center
                            gap-3
                            bg-[#008B45]
                            px-5
                            py-3
                            text-sm
                            font-semibold
                            text-white
                          "
                        >
                          {formData.buttonText ||
                            "View Our Program"}

                          <ArrowRight
                            size={17}
                          />
                        </div>

                      </div>

                    </div>

                    {/* RIGHT IMAGE AREA */}

                    <div className="relative min-h-[350px]">

                      {/* IMAGE ONE */}

                      <div
                        className="
                          absolute
                          left-0
                          top-0
                          z-10
                          h-[180px]
                          w-[58%]
                          overflow-hidden
                          border-4
                          border-white
                          bg-[#E8F5EE]
                          shadow-sm
                        "
                      >

                        {formData.imageOne ? (
                          <img
                            src={
                              formData.imageOne
                            }
                            alt="Preview image one"
                            className="
                              h-full
                              w-full
                              object-cover
                            "
                          />
                        ) : (
                          <div
                            className="
                              flex
                              h-full
                              flex-col
                              items-center
                              justify-center
                              text-slate-400
                            "
                          >
                            <ImageIcon
                              size={28}
                            />

                            <span className="mt-2 text-xs">
                              Image One
                            </span>
                          </div>
                        )}

                      </div>

                      {/* IMAGE TWO */}

                      <div
                        className="
                          absolute
                          right-0
                          top-14
                          h-[260px]
                          w-[68%]
                          overflow-hidden
                          border-4
                          border-white
                          bg-[#E8F5EE]
                          shadow-md
                        "
                      >

                        {formData.imageTwo ? (
                          <img
                            src={
                              formData.imageTwo
                            }
                            alt="Preview image two"
                            className="
                              h-full
                              w-full
                              object-cover
                            "
                          />
                        ) : (
                          <div
                            className="
                              flex
                              h-full
                              flex-col
                              items-center
                              justify-center
                              text-slate-400
                            "
                          >
                            <ImageIcon
                              size={32}
                            />

                            <span className="mt-2 text-xs">
                              Image Two
                            </span>
                          </div>
                        )}

                      </div>

                      {/* BADGE */}

                      <div
                        className="
                          absolute
                          bottom-0
                          left-0
                          z-20
                          flex
                          min-h-[88px]
                          w-[88%]
                          items-center
                          gap-4
                          bg-[#7DC99F]/95
                          px-5
                          py-4
                          backdrop-blur-sm
                        "
                      >

                        <div
                          className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-white/90
                            text-[#008B45]
                          "
                        >
                          <span className="text-lg font-bold">
                            +
                          </span>
                        </div>

                        <div>
                          <p className="text-3xl font-bold leading-none text-white">
                            {formData.badgeNumber ||
                              "28+"}
                          </p>

                          <p className="mt-1 text-xs leading-4 text-white">
                            {formData.badgeText ||
                              "Department Available For Student"}
                          </p>
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

                {/* PREVIEW STATUS */}

                <div
                  className="
                    mt-5
                    rounded-xl
                    bg-slate-50
                    px-4
                    py-3
                  "
                >

                  <div className="flex items-center gap-2">

                    <span className="h-2 w-2 rounded-full bg-green-500" />

                    <span className="text-xs font-semibold text-slate-600">
                      Preview is synchronized
                    </span>

                  </div>

                  <p className="mt-1 text-[11px] leading-5 text-slate-400">
                    Changes are not published
                    until you click Save.
                  </p>

                </div>

              </div>

            </div>

          </aside>

        </div>
      )}

      {/* ======================================================
          EXISTING SAVED DATA
      ======================================================= */}

      {!showForm &&
        visite && (
          <div
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
                flex
                flex-col
                gap-4
                border-b
                border-slate-100
                p-5
                sm:flex-row
                sm:items-center
                sm:justify-between
                sm:p-6
              "
            >

              <div>

                <div className="flex flex-wrap items-center gap-3">

                  <span
                    className={`
                      h-2.5
                      w-2.5
                      rounded-full
                      ${
                        visite.isPublished
                          ? "bg-green-500"
                          : "bg-slate-300"
                      }
                    `}
                  />

                  <h2 className="text-lg font-bold text-slate-900">
                    {visite.title}
                  </h2>

                  <span
                    className={`
                      rounded-full
                      px-2.5
                      py-1
                      text-xs
                      font-semibold
                      ${
                        visite.isPublished
                          ? "bg-green-50 text-green-600"
                          : "bg-slate-100 text-slate-500"
                      }
                    `}
                  >
                    {visite.isPublished
                      ? "Published"
                      : "Draft"}
                  </span>

                </div>

                <p className="mt-2 text-sm text-slate-500">
                  About Overview content
                </p>

              </div>

              {/* ACTIONS */}

              <div className="flex flex-wrap gap-2">

                <button
                  type="button"
                  onClick={
                    handleEdit
                  }
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-slate-700
                    transition
                    hover:bg-[#E8F5EE]
                    hover:text-[#008B45]
                  "
                >
                  <Edit3 size={16} />

                  Edit
                </button>

                <button
                  type="button"
                  onClick={
                    handleDelete
                  }
                  disabled={
                    deleting
                  }
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-red-100
                    bg-red-50
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-red-600
                    transition
                    hover:bg-red-100
                    disabled:opacity-60
                  "
                >
                  {deleting ? (
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                  ) : (
                    <Trash2
                      size={16}
                    />
                  )}

                  Delete
                </button>

              </div>

            </div>

            {/* DATA */}

            <div
              className="
                grid
                grid-cols-1
                gap-6
                p-5
                sm:p-6
                lg:grid-cols-[1fr_360px]
              "
            >

              <div className="space-y-5">

                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Description
                  </p>

                  <p className="text-sm leading-7 text-slate-600">
                    {
                      visite.description
                    }
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Phone
                  </p>

                  <p className="text-sm font-semibold text-[#008B45]">
                    {
                      visite.phoneNumber
                    }
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Button
                  </p>

                  <p className="text-sm text-slate-600">
                    {
                      visite.buttonText
                    }
                  </p>
                </div>

              </div>

              {/* SAVED IMAGES */}

              <div className="grid grid-cols-2 gap-3">

                {visite.imageOne && (
                  <img
                    src={
                      visite.imageOne
                    }
                    alt="Visite image one"
                    className="
                      h-44
                      w-full
                      rounded-xl
                      object-cover
                    "
                  />
                )}

                {visite.imageTwo && (
                  <img
                    src={
                      visite.imageTwo
                    }
                    alt="Visite image two"
                    className="
                      h-44
                      w-full
                      rounded-xl
                      object-cover
                    "
                  />
                )}

              </div>

            </div>

          </div>
        )}

    </main>
  );
}