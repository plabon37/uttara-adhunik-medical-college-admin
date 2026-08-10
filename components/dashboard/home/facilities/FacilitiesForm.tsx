"use client";

import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";

import {
  ArrowDown,
  ArrowUp,
  Loader2,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import { toast } from "sonner";

import FacilitiesPreview from "./FacilitiesPreview";

/* =========================================================
   TYPES
========================================================= */

export interface FacilityItem {
  _id?: string;

  name: string;
  title: string;
  description: string;

  detailsText: string;
  detailsLink: string;

  order: number;

  isActive?: boolean;
}

export interface FacilitiesPreviewData {
  _id?: string;

  tagline: string;
  title: string;

  image: string;

  facilities: FacilityItem[];

  programButtonText: string;
  programButtonLink: string;

  isActive: boolean;
}

interface FacilitiesFormProps {
  initialData: FacilitiesPreviewData;

  onSubmit: (
    data: FacilitiesPreviewData
  ) => Promise<void> | void;

  submitLabel?: string;

  loading?: boolean;
}

/* =========================================================
   DEFAULT FACILITY
========================================================= */

const createDefaultFacility = (
  order: number
): FacilityItem => ({
  name: "",
  title: "",
  description: "",
  detailsText: "View Details",
  detailsLink: "#",
  order,
  isActive: true,
});

/* =========================================================
   DEFAULT FORM DATA
========================================================= */

const createDefaultFormData = (
  initialData: FacilitiesPreviewData
): FacilitiesPreviewData => ({
  _id: initialData?._id,

  tagline:
    initialData?.tagline || "",

  title:
    initialData?.title || "",

  image:
    initialData?.image || "",

  facilities:
    initialData?.facilities?.length > 0
      ? initialData.facilities.map(
          (
            facility,
            index
          ) => ({
            _id: facility._id,

            name:
              facility.name || "",

            title:
              facility.title || "",

            description:
              facility.description ||
              "",

            detailsText:
              facility.detailsText ||
              "View Details",

            detailsLink:
              facility.detailsLink ||
              "#",

            order:
              typeof facility.order ===
              "number"
                ? facility.order
                : index,

            isActive:
              facility.isActive ??
              true,
          })
        )
      : [
          createDefaultFacility(
            0
          ),
        ],

  programButtonText:
    initialData?.programButtonText ||
    "View Our Program",

  programButtonLink:
    initialData?.programButtonLink ||
    "/programs",

  isActive:
    initialData?.isActive ??
    true,
});

/* =========================================================
   COMPONENT
========================================================= */

export default function FacilitiesForm({
  initialData,
  onSubmit,
  submitLabel = "Save Facilities",
  loading = false,
}: FacilitiesFormProps) {
  /* =======================================================
     FORM STATE
  ======================================================= */

  const [formData, setFormData] =
    useState<FacilitiesPreviewData>(
      () =>
        createDefaultFormData(
          initialData
        )
    );

  /* =======================================================
     IMAGE UPLOAD STATE
  ======================================================= */

  const [uploading, setUploading] =
    useState(false);

  /* =======================================================
     BASIC INPUT
  ======================================================= */

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );
  };

  /* =======================================================
     FACILITY INPUT
  ======================================================= */

  const handleFacilityChange = (
    index: number,
    field: keyof FacilityItem,
    value:
      | string
      | boolean
  ) => {
    setFormData(
      (previous) => ({
        ...previous,

        facilities:
          previous.facilities.map(
            (
              facility,
              facilityIndex
            ) =>
              facilityIndex ===
              index
                ? {
                    ...facility,
                    [field]:
                      value,
                  }
                : facility
          ),
      })
    );
  };

  /* =======================================================
     ADD FACILITY
  ======================================================= */

  const addFacility = () => {
    setFormData(
      (previous) => ({
        ...previous,

        facilities: [
          ...previous.facilities,
          createDefaultFacility(
            previous
              .facilities
              .length
          ),
        ],
      })
    );
  };

  /* =======================================================
     DELETE FACILITY
  ======================================================= */

  const deleteFacility = (
    index: number
  ) => {
    if (
      formData.facilities
        .length <= 1
    ) {
      toast.error(
        "At least one facility is required."
      );

      return;
    }

    setFormData(
      (previous) => ({
        ...previous,

        facilities:
          previous.facilities
            .filter(
              (
                _,
                facilityIndex
              ) =>
                facilityIndex !==
                index
            )
            .map(
              (
                facility,
                facilityIndex
              ) => ({
                ...facility,
                order:
                  facilityIndex,
              })
            ),
      })
    );
  };

  /* =======================================================
     MOVE UP
  ======================================================= */

  const moveFacilityUp = (
    index: number
  ) => {
    if (index <= 0) {
      return;
    }

    setFormData(
      (previous) => {
        const updated =
          [
            ...previous.facilities,
          ];

        const current =
          updated[index];

        updated[index] =
          updated[index - 1];

        updated[index - 1] =
          current;

        return {
          ...previous,

          facilities:
            updated.map(
              (
                facility,
                facilityIndex
              ) => ({
                ...facility,
                order:
                  facilityIndex,
              })
            ),
        };
      }
    );
  };

  /* =======================================================
     MOVE DOWN
  ======================================================= */

  const moveFacilityDown = (
    index: number
  ) => {
    if (
      index >=
      formData.facilities
        .length -
        1
    ) {
      return;
    }

    setFormData(
      (previous) => {
        const updated =
          [
            ...previous.facilities,
          ];

        const current =
          updated[index];

        updated[index] =
          updated[index + 1];

        updated[index + 1] =
          current;

        return {
          ...previous,

          facilities:
            updated.map(
              (
                facility,
                facilityIndex
              ) => ({
                ...facility,
                order:
                  facilityIndex,
              })
            ),
        };
      }
    );
  };

  /* =======================================================
     CLOUDINARY IMAGE UPLOAD
  ======================================================= */

  const handleImageUpload =
    async (
      event: ChangeEvent<HTMLInputElement>
    ) => {
      const file =
        event.target.files?.[0];

      if (!file) {
        return;
      }

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

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
              "Image upload failed."
          );
        }

        const imageUrl =
          data.url ||
          data.data?.url ||
          "";

        if (!imageUrl) {
          throw new Error(
            "Cloudinary image URL was not returned."
          );
        }

        setFormData(
          (previous) => ({
            ...previous,
            image:
              imageUrl,
          })
        );

        toast.success(
          "Facilities image uploaded successfully."
        );
      } catch (error) {
        console.error(
          "FACILITIES IMAGE UPLOAD ERROR:",
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

  /* =======================================================
     REMOVE IMAGE
  ======================================================= */

  const removeImage = () => {
    setFormData(
      (previous) => ({
        ...previous,
        image: "",
      })
    );
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !formData.tagline.trim()
    ) {
      toast.error(
        "Please enter the Facilities tagline."
      );

      return;
    }

    if (
      !formData.title.trim()
    ) {
      toast.error(
        "Please enter the Facilities title."
      );

      return;
    }

    if (!formData.image) {
      toast.error(
        "Please upload the Facilities image."
      );

      return;
    }

    if (
      formData.facilities
        .length === 0
    ) {
      toast.error(
        "Please add at least one facility."
      );

      return;
    }

    for (
      let index = 0;
      index <
      formData.facilities
        .length;
      index++
    ) {
      const facility =
        formData.facilities[
          index
        ];

      if (
        !facility.name.trim()
      ) {
        toast.error(
          `Please enter Facility ${
            index + 1
          } name.`
        );

        return;
      }

      if (
        !facility.title.trim()
      ) {
        toast.error(
          `Please enter Facility ${
            index + 1
          } title.`
        );

        return;
      }

      if (
        !facility.description.trim()
      ) {
        toast.error(
          `Please enter Facility ${
            index + 1
          } description.`
        );

        return;
      }

      if (
        !facility.detailsText.trim()
      ) {
        toast.error(
          `Please enter Facility ${
            index + 1
          } details button text.`
        );

        return;
      }

      if (
        !facility.detailsLink.trim()
      ) {
        toast.error(
          `Please enter Facility ${
            index + 1
          } details link.`
        );

        return;
      }
    }

    if (
      !formData.programButtonText.trim()
    ) {
      toast.error(
        "Please enter the Program button text."
      );

      return;
    }

    if (
      !formData.programButtonLink.trim()
    ) {
      toast.error(
        "Please enter the Program button link."
      );

      return;
    }

    try {
      await onSubmit({
        ...formData,

        facilities:
          formData.facilities.map(
            (
              facility,
              index
            ) => ({
              ...facility,
              order:
                index,
            })
          ),
      });
    } catch (error) {
      console.error(
        "SAVE FACILITIES ERROR:",
        error
      );
    }
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div
      className="
        grid
        w-full
        items-start
        gap-6
        xl:grid-cols-2
      "
    >
      {/* ===================================================
          LEFT 50% — FORM
      =================================================== */}

      <div
        className="
          min-w-0
          w-full
        "
      >
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
              w-full
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
                  font-semibold
                  text-slate-800
                "
              >
                Facilities Information
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                Manage the main Facilities
                section.
              </p>
            </div>

            <div className="space-y-5">
              {/* TAGLINE */}

              <div>
                <label
                  htmlFor="tagline"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  Small Tagline
                </label>

                <input
                  id="tagline"
                  name="tagline"
                  type="text"
                  value={
                    formData.tagline
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="knowledge meets innovation"
                  disabled={loading}
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

              {/* TITLE */}

              <div>
                <label
                  htmlFor="title"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  Section Title
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  value={
                    formData.title
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Our Facilities"
                  disabled={loading}
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

              {/* IMAGE */}

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
                  Facilities Image
                </label>

                {formData.image ? (
                  <div
                    className="
                      relative
                      w-full
                      overflow-hidden
                      rounded-2xl
                      border
                      border-slate-200
                      bg-slate-50
                    "
                  >
                    <img
                      src={
                        formData.image
                      }
                      alt="Facilities"
                      className="
                        h-[280px]
                        w-full
                        object-cover
                      "
                    />

                    <button
                      type="button"
                      onClick={
                        removeImage
                      }
                      disabled={
                        uploading ||
                        loading
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
                        disabled:opacity-50
                      "
                    >
                      <X
                        size={18}
                      />
                    </button>
                  </div>
                ) : (
                  <label
                    className="
                      flex
                      min-h-[260px]
                      w-full
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
                    {uploading ? (
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
                            mt-3
                            text-sm
                            font-medium
                            text-slate-600
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
                            bg-emerald-50
                          "
                        >
                          <Upload
                            size={24}
                            className="text-[#008B45]"
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
                            text-slate-500
                          "
                        >
                          PNG, JPG, JPEG or
                          WEBP • Max 5MB
                        </p>
                      </>
                    )}

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      disabled={
                        uploading ||
                        loading
                      }
                      onChange={
                        handleImageUpload
                      }
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          </section>

          {/* =================================================
              FACILITIES LIST
          ================================================= */}

          <section
            className="
              w-full
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
                mb-6
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div>
                <h2
                  className="
                    text-lg
                    font-semibold
                    text-slate-800
                  "
                >
                  Facilities List
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  Add facilities and arrange
                  their display order.
                </p>
              </div>

              <button
                type="button"
                onClick={
                  addFacility
                }
                disabled={loading}
                className="
                  inline-flex
                  min-h-10
                  w-fit
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#008B45]
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#00763B]
                  disabled:opacity-60
                "
              >
                <Plus
                  size={17}
                />

                Add Facility
              </button>
            </div>

            <div className="space-y-5">
              {formData.facilities.map(
                (
                  facility,
                  index
                ) => (
                  <div
                    key={
                      facility._id ||
                      `facility-${index}`
                    }
                    className="
                      rounded-2xl
                      border
                      border-slate-200
                      bg-slate-50/50
                      p-4
                      sm:p-5
                    "
                  >
                    <div
                      className="
                        mb-5
                        flex
                        flex-col
                        gap-4
                        border-b
                        border-slate-200
                        pb-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                      "
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            bg-emerald-50
                            text-sm
                            font-bold
                            text-[#008B45]
                          "
                        >
                          {index +
                            1}
                        </span>

                        <div>
                          <p
                            className="
                              text-sm
                              font-semibold
                              text-slate-800
                            "
                          >
                            Facility #
                            {index +
                              1}
                          </p>

                          <p
                            className="
                              mt-0.5
                              text-xs
                              text-slate-500
                            "
                          >
                            {facility.name ||
                              "New Facility"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            moveFacilityUp(
                              index
                            )
                          }
                          disabled={
                            index ===
                              0 ||
                            loading
                          }
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-slate-200
                            bg-white
                            text-slate-500
                            transition
                            hover:border-[#008B45]
                            hover:text-[#008B45]
                            disabled:opacity-40
                          "
                        >
                          <ArrowUp
                            size={16}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            moveFacilityDown(
                              index
                            )
                          }
                          disabled={
                            index ===
                              formData
                                .facilities
                                .length -
                                1 ||
                            loading
                          }
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-slate-200
                            bg-white
                            text-slate-500
                            transition
                            hover:border-[#008B45]
                            hover:text-[#008B45]
                            disabled:opacity-40
                          "
                        >
                          <ArrowDown
                            size={16}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteFacility(
                              index
                            )
                          }
                          disabled={
                            loading
                          }
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-red-100
                            bg-red-50
                            text-red-500
                            transition
                            hover:bg-red-100
                            disabled:opacity-50
                          "
                        >
                          <Trash2
                            size={16}
                          />
                        </button>
                      </div>
                    </div>

                    {/* NAME + TITLE */}

                    <div
                      className="
                        grid
                        gap-5
                        md:grid-cols-2
                      "
                    >
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
                          Facility Name
                        </label>

                        <input
                          type="text"
                          value={
                            facility.name
                          }
                          onChange={(
                            event
                          ) =>
                            handleFacilityChange(
                              index,
                              "name",
                              event
                                .target
                                .value
                            )
                          }
                          placeholder="Hostel"
                          disabled={
                            loading
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
                          className="
                            mb-2
                            block
                            text-sm
                            font-semibold
                            text-slate-700
                          "
                        >
                          Facility Title
                        </label>

                        <input
                          type="text"
                          value={
                            facility.title
                          }
                          onChange={(
                            event
                          ) =>
                            handleFacilityChange(
                              index,
                              "title",
                              event
                                .target
                                .value
                            )
                          }
                          placeholder="Hostel Facilities"
                          disabled={
                            loading
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

                    {/* DESCRIPTION */}

                    <div className="mt-5">
                      <label
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
                        value={
                          facility.description
                        }
                        onChange={(
                          event
                        ) =>
                          handleFacilityChange(
                            index,
                            "description",
                            event
                              .target
                              .value
                          )
                        }
                        placeholder="Describe this facility..."
                        rows={4}
                        disabled={
                          loading
                        }
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

                    {/* DETAILS */}

                    <div
                      className="
                        mt-5
                        grid
                        gap-5
                        md:grid-cols-2
                      "
                    >
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
                          Details Button Text
                        </label>

                        <input
                          type="text"
                          value={
                            facility.detailsText
                          }
                          onChange={(
                            event
                          ) =>
                            handleFacilityChange(
                              index,
                              "detailsText",
                              event
                                .target
                                .value
                            )
                          }
                          placeholder="View Details"
                          disabled={
                            loading
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
                          className="
                            mb-2
                            block
                            text-sm
                            font-semibold
                            text-slate-700
                          "
                        >
                          Details Button Link
                        </label>

                        <input
                          type="text"
                          value={
                            facility.detailsLink
                          }
                          onChange={(
                            event
                          ) =>
                            handleFacilityChange(
                              index,
                              "detailsLink",
                              event
                                .target
                                .value
                            )
                          }
                          placeholder="/facilities/hostel"
                          disabled={
                            loading
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

                    {/* ACTIVE */}

                    <div
                      className="
                        mt-5
                        flex
                        items-center
                        justify-between
                        gap-4
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-4
                        py-3
                      "
                    >
                      <div>
                        <p
                          className="
                            text-sm
                            font-medium
                            text-slate-700
                          "
                        >
                          Show Facility
                        </p>

                        <p
                          className="
                            mt-1
                            text-xs
                            text-slate-500
                          "
                        >
                          Display this facility
                          on the website.
                        </p>
                      </div>

                      <button
                        type="button"
                        role="switch"
                        aria-checked={
                          facility.isActive ??
                          true
                        }
                        onClick={() =>
                          handleFacilityChange(
                            index,
                            "isActive",
                            !(
                              facility.isActive ??
                              true
                            )
                          )
                        }
                        disabled={
                          loading
                        }
                        className={`
                          relative
                          h-7
                          w-12
                          shrink-0
                          rounded-full
                          transition
                          ${
                            (
                              facility.isActive ??
                              true
                            )
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
                            transition
                            ${
                              (
                                facility.isActive ??
                                true
                              )
                                ? "left-6"
                                : "left-1"
                            }
                          `}
                        />
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </section>

          {/* =================================================
              PROGRAM BUTTON
          ================================================= */}

          <section
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-sm
              sm:p-6
            "
          >
            <div className="mb-5">
              <h2
                className="
                  text-lg
                  font-semibold
                  text-slate-800
                "
              >
                Program Button
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                Configure the button shown
                below the Facilities section.
              </p>
            </div>

            <div
              className="
                grid
                gap-5
                md:grid-cols-2
              "
            >
              <div>
                <label
                  htmlFor="programButtonText"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  Button Text
                </label>

                <input
                  id="programButtonText"
                  name="programButtonText"
                  type="text"
                  value={
                    formData.programButtonText
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="View Our Program"
                  disabled={loading}
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

              <div>
                <label
                  htmlFor="programButtonLink"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  Button Link
                </label>

                <input
                  id="programButtonLink"
                  name="programButtonLink"
                  type="text"
                  value={
                    formData.programButtonLink
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="/programs"
                  disabled={loading}
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
          </section>

          {/* =================================================
              PUBLISH
          ================================================= */}

          <section
            className="
              w-full
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
                flex
                items-center
                justify-between
                gap-5
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
                  Publish Facilities
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-500
                  "
                >
                  Show this section on the
                  website.
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={
                  formData.isActive
                }
                onClick={() =>
                  setFormData(
                    (previous) => ({
                      ...previous,
                      isActive:
                        !previous.isActive,
                    })
                  )
                }
                disabled={loading}
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
                    transition
                    ${
                      formData.isActive
                        ? "left-6"
                        : "left-1"
                    }
                  `}
                />
              </button>
            </div>
          </section>

          {/* =================================================
              SAVE
          ================================================= */}

          <div
            className="
              flex
              justify-end
              border-t
              border-slate-200
              pt-5
            "
          >
            <button
              type="submit"
              disabled={
                loading ||
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
      </div>

      {/* ===================================================
          RIGHT 50% — LIVE PREVIEW
      =================================================== */}

      <aside
        className="
          min-w-0
          w-full
          xl:sticky
          xl:top-6
          xl:self-start
        "
      >
        <div
          className="
            w-full
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-4
            shadow-sm
            sm:p-5
          "
        >
          {/* PREVIEW HEADER */}

          <div className="mb-5">
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-[#008B45]
                "
              />

              <h2
                className="
                  text-lg
                  font-semibold
                  text-slate-800
                "
              >
                Live Preview
              </h2>
            </div>

            <p
              className="
                mt-1
                text-sm
                leading-5
                text-slate-500
              "
            >
              Changes appear here instantly
              while you edit the Facilities
              section.
            </p>
          </div>

          {/* PREVIEW CONTENT */}

          <div className="w-full min-w-0">
            <FacilitiesPreview
              data={formData}
            />
          </div>
        </div>
      </aside>
    </div>
  );
}