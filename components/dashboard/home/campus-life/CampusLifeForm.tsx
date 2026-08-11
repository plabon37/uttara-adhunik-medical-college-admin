"use client";

import {
  ChangeEvent,
  FormEvent,
  useMemo,
  useState,
} from "react";

import Image from "next/image";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Image as ImageIcon,
  Link as LinkIcon,
  Loader2,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import { toast } from "sonner";

// =========================================================
// TYPES
// =========================================================

export interface CampusLifeItemData {
  _id?: string;

  title: string;

  image: string;

  link: string;

  isActive: boolean;

  order: number;
}

export interface CampusLifeFormData {
  tagline: string;

  title: string;

  description: string;

  items: CampusLifeItemData[];

  isActive: boolean;
}

interface CampusLifeFormProps {
  initialData?: CampusLifeFormData | null;

  onSubmit: (
    data: CampusLifeFormData
  ) => Promise<void>;

  submitLabel?: string;

  title?: string;

  description?: string;
}

// =========================================================
// DEFAULT DATA
// =========================================================

const defaultFormData: CampusLifeFormData = {
  tagline:
    "Building a vibrant community of creative and accomplished people from around the world",

  title: "Campus Life",

  description:
    "Building a vibrant community of creative and accomplished people from around the world",

  items: [
    {
      title: "Student Life",
      image: "",
      link: "#",
      isActive: true,
      order: 0,
    },
    {
      title: "Arts & Culture",
      image: "",
      link: "#",
      isActive: true,
      order: 1,
    },
    {
      title: "Recreation & Wellness",
      image: "",
      link: "#",
      isActive: true,
      order: 2,
    },
  ],

  isActive: true,
};

// =========================================================
// COMPONENT
// =========================================================

export default function CampusLifeForm({
  initialData = null,

  onSubmit,

  submitLabel = "Save Campus Life",

  title = "Campus Life",

  description = "Manage the Campus Life section.",
}: CampusLifeFormProps) {
  // =======================================================
  // FORM STATE
  // =======================================================

  const [
    formData,
    setFormData,
  ] = useState<CampusLifeFormData>(() => {
    if (!initialData) {
      return defaultFormData;
    }

    return {
      tagline:
        initialData.tagline || "",

      title:
        initialData.title || "",

      description:
        initialData.description || "",

      items: (
        initialData.items || []
      ).map(
        (
          item,
          index
        ) => ({
          _id: item._id,

          title:
            item.title || "",

          image:
            item.image || "",

          link:
            item.link || "#",

          isActive:
            item.isActive ?? true,

          order:
            item.order ?? index,
        })
      ),

      isActive:
        initialData.isActive ?? true,
    };
  });

  // =======================================================
  // SAVING
  // =======================================================

  const [
    saving,
    setSaving,
  ] = useState(false);

  // =======================================================
  // UPLOAD STATE
  // =======================================================

  const [
    uploadingIndex,
    setUploadingIndex,
  ] = useState<number | null>(
    null
  );

  // =======================================================
  // LIVE PREVIEW DATA
  // =======================================================

  // Derived directly from formData.
  // This avoids setState inside useEffect and prevents
  // React cascading-render warnings.
  const previewItems =
    useMemo(
      () =>
        [...formData.items]
          .filter(
            (item) =>
              item.isActive
          )
          .sort(
            (a, b) =>
              a.order - b.order
          ),
      [formData.items]
    );

  // =======================================================
  // BASIC INPUT
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

    setFormData(
      (previous) => ({
        ...previous,

        [name]: value,
      })
    );
  };

  // =======================================================
  // ITEM INPUT
  // =======================================================

  const handleItemChange = (
    index: number,

    field:
      | "title"
      | "link",

    value: string
  ) => {
    setFormData(
      (previous) => ({
        ...previous,

        items:
          previous.items.map(
            (
              item,
              itemIndex
            ) =>
              itemIndex === index
                ? {
                    ...item,

                    [field]:
                      value,
                  }
                : item
          ),
      })
    );
  };

  // =======================================================
  // CLOUDINARY IMAGE UPLOAD
  // =======================================================

  const handleImageUpload = async (
    event: ChangeEvent<HTMLInputElement>,

    index: number
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    // =====================================================
    // TYPE VALIDATION
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
    // SIZE VALIDATION
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
      setUploadingIndex(
        index
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

      const responseText =
        await response.text();

      let result:
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
        result =
          responseText
            ? JSON.parse(
                responseText
              )
            : null;
      } catch {
        console.error(
          "CAMPUS LIFE IMAGE UPLOAD NON-JSON RESPONSE:",
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
            "Image upload failed."
        );
      }

      // ===================================================
      // CLOUDINARY URL
      // ===================================================

      const cloudinaryUrl =
        result.url ||
        result.data?.url;

      if (!cloudinaryUrl) {
        throw new Error(
          "Cloudinary image URL was not returned."
        );
      }

      // ===================================================
      // SAVE IMAGE URL
      // ===================================================

      setFormData(
        (previous) => ({
          ...previous,

          items:
            previous.items.map(
              (
                item,
                itemIndex
              ) =>
                itemIndex === index
                  ? {
                      ...item,

                      image:
                        cloudinaryUrl,
                    }
                  : item
            ),
        })
      );

      toast.success(
        "Image uploaded successfully."
      );
    } catch (error) {
      console.error(
        "CAMPUS LIFE IMAGE UPLOAD ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Image upload failed."
      );
    } finally {
      setUploadingIndex(
        null
      );

      event.target.value = "";
    }
  };

  // =======================================================
  // REMOVE IMAGE
  // =======================================================

  const removeImage = (
    index: number
  ) => {
    setFormData(
      (previous) => ({
        ...previous,

        items:
          previous.items.map(
            (
              item,
              itemIndex
            ) =>
              itemIndex === index
                ? {
                    ...item,

                    image: "",
                  }
                : item
          ),
      })
    );
  };

  // =======================================================
  // ADD CARD
  // =======================================================

  const addCard = () => {
    setFormData(
      (previous) => ({
        ...previous,

        items: [
          ...previous.items,

          {
            title: "",

            image: "",

            link: "#",

            isActive: true,

            order:
              previous.items.length,
          },
        ],
      })
    );
  };

  // =======================================================
  // DELETE CARD
  // =======================================================

  const removeCard = (
    index: number
  ) => {
    if (
      formData.items.length <=
      1
    ) {
      toast.error(
        "At least one Campus Life card is required."
      );

      return;
    }

    setFormData(
      (previous) => ({
        ...previous,

        items:
          previous.items
            .filter(
              (
                _,
                itemIndex
              ) =>
                itemIndex !==
                index
            )
            .map(
              (
                item,
                itemIndex
              ) => ({
                ...item,

                order:
                  itemIndex,
              })
            ),
      })
    );
  };

  // =======================================================
  // MOVE UP
  // =======================================================

  const moveCardUp = (
    index: number
  ) => {
    if (index === 0) {
      return;
    }

    setFormData(
      (previous) => {
        const items = [
          ...previous.items,
        ];

        [
          items[index - 1],
          items[index],
        ] = [
          items[index],
          items[index - 1],
        ];

        return {
          ...previous,

          items:
            items.map(
              (
                item,
                itemIndex
              ) => ({
                ...item,

                order:
                  itemIndex,
              })
            ),
        };
      }
    );
  };

  // =======================================================
  // MOVE DOWN
  // =======================================================

  const moveCardDown = (
    index: number
  ) => {
    if (
      index >=
      formData.items.length -
        1
    ) {
      return;
    }

    setFormData(
      (previous) => {
        const items = [
          ...previous.items,
        ];

        [
          items[index],
          items[index + 1],
        ] = [
          items[index + 1],
          items[index],
        ];

        return {
          ...previous,

          items:
            items.map(
              (
                item,
                itemIndex
              ) => ({
                ...item,

                order:
                  itemIndex,
              })
            ),
        };
      }
    );
  };

  // =======================================================
  // TOGGLE CARD
  // =======================================================

  const toggleItemActive = (
    index: number
  ) => {
    setFormData(
      (previous) => ({
        ...previous,

        items:
          previous.items.map(
            (
              item,
              itemIndex
            ) =>
              itemIndex === index
                ? {
                    ...item,

                    isActive:
                      !item.isActive,
                  }
                : item
          ),
      })
    );
  };

  // =======================================================
  // TOGGLE SECTION
  // =======================================================

  const toggleSectionActive =
    () => {
      setFormData(
        (previous) => ({
          ...previous,

          isActive:
            !previous.isActive,
        })
      );
    };

  // =======================================================
  // SUBMIT
  // =======================================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !formData.title.trim()
    ) {
      toast.error(
        "Please enter the Campus Life title."
      );

      return;
    }

    if (
      !formData.description.trim()
    ) {
      toast.error(
        "Please enter the Campus Life description."
      );

      return;
    }

    if (
      formData.items.length ===
      0
    ) {
      toast.error(
        "Please add at least one Campus Life card."
      );

      return;
    }

    for (
      let index = 0;
      index <
      formData.items.length;
      index++
    ) {
      const item =
        formData.items[index];

      if (!item.title.trim()) {
        toast.error(
          `Please enter a title for Card ${
            index + 1
          }.`
        );

        return;
      }

      if (!item.image) {
        toast.error(
          `Please upload an image for Card ${
            index + 1
          }.`
        );

        return;
      }

      if (!item.link.trim()) {
        toast.error(
          `Please enter a link for Card ${
            index + 1
          }.`
        );

        return;
      }
    }

    try {
      setSaving(true);

      await onSubmit(
        formData
      );
    } catch (error) {
      console.error(
        "CAMPUS LIFE FORM SUBMIT ERROR:",
        error
      );
    } finally {
      setSaving(false);
    }
  };

  // =======================================================
  // PREVIEW IMAGE
  // =======================================================

  const PreviewImage = ({
    item,
  }: {
    item: CampusLifeItemData;
  }) => {
    if (!item.image) {
      return (
        <div
          className="
            flex
            h-full
            w-full
            items-center
            justify-center
            bg-white/10
          "
        >
          <div className="text-center">
            <ImageIcon
              size={30}
              className="
                mx-auto
                text-white/50
              "
            />

            <p
              className="
                mt-2
                text-xs
                text-white/60
              "
            >
              Image Preview
            </p>
          </div>
        </div>
      );
    }

    return (
      <Image
        src={item.image}
        alt={
          item.title ||
          "Campus Life"
        }
        fill
        sizes="500px"
        className="
          object-cover
        "
      />
    );
  };

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div
      className="
        grid
        w-full
        grid-cols-1
        items-start
        gap-6
        xl:grid-cols-2
      "
    >
      {/* =================================================
          LEFT — FORM
      ================================================= */}

      <form
        onSubmit={
          handleSubmit
        }
        className="
          min-w-0
          space-y-6
        "
      >
        {/* =================================================
            BASIC INFORMATION
        ================================================= */}

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
                font-semibold
                text-slate-800
              "
            >
              {title}
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              {description}
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
                placeholder="Building a vibrant community..."
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
                Main Title
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
                placeholder="Campus Life"
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

            {/* DESCRIPTION */}

            <div>
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
                placeholder="Enter Campus Life description..."
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

        {/* =================================================
            CARDS
        ================================================= */}

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
                Campus Life Cards
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                Upload images directly
                from your device.
              </p>
            </div>

            <button
              type="button"
              onClick={
                addCard
              }
              disabled={
                saving ||
                uploadingIndex !==
                  null
              }
              className="
                inline-flex
                min-h-11
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#008B45]
                px-5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#00763B]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <Plus
                size={18}
              />

              Add Card
            </button>
          </div>

          <div className="space-y-5">
            {formData.items.map(
              (
                item,
                index
              ) => {
                const uploading =
                  uploadingIndex ===
                  index;

                return (
                  <div
                    key={
                      item._id ||
                      `campus-${index}`
                    }
                    className="
                      rounded-2xl
                      border
                      border-slate-200
                      bg-slate-50/60
                      p-4
                      sm:p-5
                    "
                  >
                    {/* CARD HEADER */}

                    <div
                      className="
                        mb-5
                        flex
                        items-center
                        justify-between
                        gap-3
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >
                        <div
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            bg-emerald-50
                            text-sm
                            font-bold
                            text-[#008B45]
                          "
                        >
                          {index +
                            1}
                        </div>

                        <div>
                          <p
                            className="
                              text-sm
                              font-semibold
                              text-slate-800
                            "
                          >
                            Campus Life Card{" "}
                            {index +
                              1}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeCard(
                            index
                          )
                        }
                        disabled={
                          saving ||
                          uploading
                        }
                        className="
                          inline-flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-xl
                          text-red-500
                          transition
                          hover:bg-red-50
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                        "
                      >
                        <Trash2
                          size={17}
                        />
                      </button>
                    </div>

                    <div className="space-y-5">
                      {/* TITLE */}

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
                          Card Title
                        </label>

                        <input
                          type="text"
                          value={
                            item.title
                          }
                          onChange={(
                            event
                          ) =>
                            handleItemChange(
                              index,
                              "title",
                              event
                                .target
                                .value
                            )
                          }
                          placeholder="Student Life"
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
                          Card Image
                        </label>

                        {item.image ? (
                          <div
                            className="
                              relative
                              overflow-hidden
                              rounded-2xl
                              border
                              border-slate-200
                              bg-white
                            "
                          >
                            <img
                              src={
                                item.image
                              }
                              alt={
                                item.title ||
                                "Campus Life"
                              }
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
                                  index
                                )
                              }
                              disabled={
                                uploading ||
                                saving
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
                              <X
                                size={
                                  17
                                }
                              />
                            </button>
                          </div>
                        ) : (
                          <label
                            className="
                              flex
                              min-h-[190px]
                              cursor-pointer
                              flex-col
                              items-center
                              justify-center
                              rounded-2xl
                              border-2
                              border-dashed
                              border-slate-300
                              bg-slate-50
                              text-center
                              transition
                              hover:border-[#008B45]
                              hover:bg-emerald-50/40
                            "
                          >
                            {uploading ? (
                              <>
                                <Loader2
                                  size={
                                    30
                                  }
                                  className="
                                    animate-spin
                                    text-[#008B45]
                                  "
                                />

                                <p
                                  className="
                                    mt-3
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                  "
                                >
                                  Uploading...
                                </p>

                                <p
                                  className="
                                    mt-1
                                    text-xs
                                    text-slate-400
                                  "
                                >
                                  Uploading
                                  to
                                  Cloudinary
                                </p>
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
                                    rounded-full
                                    bg-emerald-50
                                  "
                                >
                                  <Upload
                                    size={
                                      22
                                    }
                                    className="text-[#008B45]"
                                  />
                                </div>

                                <p
                                  className="
                                    mt-3
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                  "
                                >
                                  Click to
                                  upload
                                </p>

                                <p
                                  className="
                                    mt-1
                                    text-xs
                                    text-slate-400
                                  "
                                >
                                  PNG,
                                  JPG or
                                  WEBP
                                  • Max
                                  5MB
                                </p>
                              </>
                            )}

                            <input
                              type="file"
                              accept="
                                image/png,
                                image/jpeg,
                                image/webp
                              "
                              className="hidden"
                              disabled={
                                uploading ||
                                saving
                              }
                              onChange={(
                                event
                              ) =>
                                handleImageUpload(
                                  event,
                                  index
                                )
                              }
                            />
                          </label>
                        )}
                      </div>

                      {/* LINK */}

                      <div>
                        <label
                          className="
                            mb-2
                            flex
                            items-center
                            gap-2
                            text-sm
                            font-semibold
                            text-slate-700
                          "
                        >
                          <LinkIcon
                            size={
                              15
                            }
                          />

                          Card Link
                        </label>

                        <input
                          type="text"
                          value={
                            item.link
                          }
                          onChange={(
                            event
                          ) =>
                            handleItemChange(
                              index,
                              "link",
                              event
                                .target
                                .value
                            )
                          }
                          placeholder="#"
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

                      {/* CONTROLS */}

                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          justify-between
                          gap-3
                          border-t
                          border-slate-200
                          pt-4
                        "
                      >
                        <button
                          type="button"
                          onClick={() =>
                            toggleItemActive(
                              index
                            )
                          }
                          className="
                            flex
                            items-center
                            gap-3
                          "
                        >
                          <span
                            className={`
                              relative
                              h-7
                              w-12
                              rounded-full
                              transition
                              ${
                                item.isActive
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
                                transition-all
                                ${
                                  item.isActive
                                    ? "left-6"
                                    : "left-1"
                                }
                              `}
                            />
                          </span>

                          <span className="text-sm font-medium text-slate-700">
                            {item.isActive
                              ? "Visible"
                              : "Hidden"}
                          </span>
                        </button>

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >
                          <button
                            type="button"
                            onClick={() =>
                              moveCardUp(
                                index
                              )
                            }
                            disabled={
                              index ===
                                0 ||
                              saving
                            }
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-xl
                              border
                              border-slate-200
                              bg-white
                              text-slate-600
                              hover:text-[#008B45]
                              disabled:opacity-40
                            "
                          >
                            <ArrowUp
                              size={
                                17
                              }
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              moveCardDown(
                                index
                              )
                            }
                            disabled={
                              index >=
                                formData
                                  .items
                                  .length -
                                  1 ||
                              saving
                            }
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-xl
                              border
                              border-slate-200
                              bg-white
                              text-slate-600
                              hover:text-[#008B45]
                              disabled:opacity-40
                            "
                          >
                            <ArrowDown
                              size={
                                17
                              }
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* =================================================
            PUBLISH
        ================================================= */}

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
          <div
            className="
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <div>
              <h2
                className="
                  text-base
                  font-semibold
                  text-slate-800
                "
              >
                Publish Campus Life
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                Make this section visible
                on the client website.
              </p>
            </div>

            <button
              type="button"
              onClick={
                toggleSectionActive
              }
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
        </div>

        {/* =================================================
            SAVE
        ================================================= */}

        <button
          type="submit"
          disabled={
            saving ||
            uploadingIndex !==
              null
          }
          className="
            flex
            min-h-12
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#008B45]
            px-6
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
              <Save
                size={18}
              />

              {submitLabel}
            </>
          )}
        </button>
      </form>

      {/* =================================================
          RIGHT — LIVE PREVIEW
      ================================================= */}

      <div
        className="
          min-w-0
          xl:sticky
          xl:top-6
          xl:self-start
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
              border-slate-200
              px-5
              py-4
            "
          >
            <div>
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-[#008B45]
                "
              >
                Live Preview
              </p>

              <h3
                className="
                  mt-1
                  text-base
                  font-bold
                  text-slate-900
                "
              >
                Campus Life
              </h3>
            </div>

            <span
              className={`
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                ${
                  formData.isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-500"
                }
              `}
            >
              {formData.isActive
                ? "Published"
                : "Hidden"}
            </span>
          </div>

          {/* WEBSITE PREVIEW */}

          <div
            className="
              overflow-hidden
              bg-[#008B45]
            "
          >
            {/* HEADER */}

            <div
              className="
                px-6
                pb-8
                pt-10
                text-white
              "
            >
              {formData.tagline && (
                <p
                  className="
                    text-center
                    text-xs
                    font-medium
                    tracking-wide
                    text-white/80
                  "
                >
                  {
                    formData.tagline
                  }
                </p>
              )}

              <h2
                className="
                  mt-3
                  text-center
                  font-serif
                  text-[42px]
                  font-medium
                  leading-[0.95]
                "
              >
                {formData.title ||
                  "Campus Life"}
              </h2>

              {formData.description && (
                <p
                  className="
                    mx-auto
                    mt-7
                    max-w-[380px]
                    text-center
                    text-sm
                    leading-6
                    text-white/90
                  "
                >
                  {
                    formData.description
                  }
                </p>
              )}
            </div>

            {/* CARDS */}

            <div
              className="
                grid
                grid-cols-1
                gap-7
                px-6
                pb-8
              "
            >
              {previewItems.length >
              0 ? (
                previewItems.map(
                  (
                    item,
                    index
                  ) => (
                    <div
                      key={
                        item._id ||
                        `${item.title}-${index}`
                      }
                    >
                      <div
                        className="
                          relative
                          aspect-[1.45/1]
                          w-full
                          overflow-hidden
                          bg-white/10
                        "
                      >
                        <PreviewImage
                          item={item}
                        />
                      </div>

                      <div
                        className="
                          mt-4
                          flex
                          items-center
                          justify-between
                          gap-4
                        "
                      >
                        <p
                          className="
                            font-serif
                            text-[20px]
                            leading-tight
                            text-white
                          "
                        >
                          {item.title ||
                            "Card Title"}
                        </p>

                        <ArrowUpRight
                          className="
                            h-6
                            w-6
                            shrink-0
                            text-white
                          "
                        />
                      </div>
                    </div>
                  )
                )
              ) : (
                <div
                  className="
                    flex
                    min-h-[180px]
                    items-center
                    justify-center
                    text-center
                    text-sm
                    text-white/70
                  "
                >
                  No active Campus
                  Life cards.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}