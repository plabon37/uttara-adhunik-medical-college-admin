"use client";

import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";

import {
  Image as ImageIcon,
  Loader2,
  Plus,
  Save,
  Upload,
  X,
} from "lucide-react";

import { toast } from "sonner";

// =========================================================
// FORM DATA
// =========================================================

export interface DepartmentSectionFormData {
  title: string;

  description: string;

  searchPlaceholder: string;

  popularSearches: string[];

  imageOne: string;

  imageTwo: string;

  studentCount: string;

  studentCountText: string;

  isActive: boolean;
}

// =========================================================
// DEFAULT DATA
// =========================================================

const defaultFormData: DepartmentSectionFormData = {
  title: "",
  description: "",
  searchPlaceholder: "",
  popularSearches: [],
  imageOne: "",
  imageTwo: "",
  studentCount: "",
  studentCountText: "",
  isActive: true,
};

// =========================================================
// PROPS
// =========================================================

interface DepartmentSectionFormProps {
  initialData?: DepartmentSectionFormData | null;

  sectionId?: string;

  onDataChange?: (
    data: DepartmentSectionFormData
  ) => void;

  onSuccess?: (
    data: unknown
  ) => void;
}

// =========================================================
// COMPONENT
// =========================================================

export default function DepartmentSectionForm({
  initialData = null,
  sectionId,
  onDataChange,
  onSuccess,
}: DepartmentSectionFormProps) {
  const [formData, setFormData] =
    useState<DepartmentSectionFormData>(
      initialData
        ? {
            title:
              initialData.title || "",

            description:
              initialData.description || "",

            searchPlaceholder:
              initialData.searchPlaceholder ||
              "",

            popularSearches:
              initialData.popularSearches ||
              [],

            imageOne:
              initialData.imageOne || "",

            imageTwo:
              initialData.imageTwo || "",

            studentCount:
              initialData.studentCount || "",

            studentCountText:
              initialData.studentCountText ||
              "",

            isActive:
              initialData.isActive ??
              true,
          }
        : defaultFormData
    );

  const [saving, setSaving] =
    useState(false);

  const [
    uploadingImageOne,
    setUploadingImageOne,
  ] = useState(false);

  const [
    uploadingImageTwo,
    setUploadingImageTwo,
  ] = useState(false);

  const [
    popularSearchInput,
    setPopularSearchInput,
  ] = useState("");

  // =======================================================
  // UPDATE FORM
  // =======================================================

  const updateFormData = (
    updatedData: DepartmentSectionFormData
  ) => {
    setFormData(
      updatedData
    );

    onDataChange?.(
      updatedData
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

    updateFormData({
      ...formData,

      [name]: value,
    } as DepartmentSectionFormData);
  };

  // =======================================================
  // ACTIVE
  // =======================================================

  const handleActiveToggle = () => {
    updateFormData({
      ...formData,

      isActive:
        !formData.isActive,
    });
  };

  // =======================================================
  // POPULAR SEARCH
  // =======================================================

  const addPopularSearch = () => {
    const value =
      popularSearchInput.trim();

    if (!value) {
      toast.error(
        "Please enter a search term."
      );

      return;
    }

    const exists =
      formData.popularSearches.some(
        (item) =>
          item.toLowerCase() ===
          value.toLowerCase()
      );

    if (exists) {
      toast.error(
        "This search term already exists."
      );

      return;
    }

    updateFormData({
      ...formData,

      popularSearches: [
        ...formData.popularSearches,
        value,
      ],
    });

    setPopularSearchInput("");
  };

  const removePopularSearch = (
    index: number
  ) => {
    updateFormData({
      ...formData,

      popularSearches:
        formData.popularSearches.filter(
          (_, itemIndex) =>
            itemIndex !== index
        ),
    });
  };

  const handlePopularSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      event.key === "Enter"
    ) {
      event.preventDefault();

      addPopularSearch();
    }
  };

  // =======================================================
  // IMAGE UPLOAD
  // =======================================================

  const uploadImage = async (
    file: File,
    imageField:
      | "imageOne"
      | "imageTwo"
  ) => {
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
      if (
        imageField ===
        "imageOne"
      ) {
        setUploadingImageOne(
          true
        );
      } else {
        setUploadingImageTwo(
          true
        );
      }

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
          "Image URL was not returned by the upload API."
        );
      }

      updateFormData({
        ...formData,

        [imageField]:
          imageUrl,
      });

      toast.success(
        imageField ===
          "imageOne"
          ? "First image uploaded successfully."
          : "Second image uploaded successfully."
      );
    } catch (error) {
      console.error(
        "IMAGE UPLOAD ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Image upload failed."
      );
    } finally {
      if (
        imageField ===
        "imageOne"
      ) {
        setUploadingImageOne(
          false
        );
      } else {
        setUploadingImageTwo(
          false
        );
      }
    }
  };

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>,
    imageField:
      | "imageOne"
      | "imageTwo"
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    await uploadImage(
      file,
      imageField
    );

    event.target.value = "";
  };

  const removeImage = (
    imageField:
      | "imageOne"
      | "imageTwo"
  ) => {
    updateFormData({
      ...formData,

      [imageField]: "",
    });
  };

  // =======================================================
  // VALIDATION
  // =======================================================

  const validateForm =
    () => {
      if (
        !formData.title.trim()
      ) {
        toast.error(
          "Please enter the section title."
        );

        return false;
      }

      if (
        !formData.description.trim()
      ) {
        toast.error(
          "Please enter the section description."
        );

        return false;
      }

      if (
        !formData.searchPlaceholder.trim()
      ) {
        toast.error(
          "Please enter the search placeholder."
        );

        return false;
      }

      if (
        !formData.imageOne
      ) {
        toast.error(
          "Please upload the first image."
        );

        return false;
      }

      if (
        !formData.imageTwo
      ) {
        toast.error(
          "Please upload the second image."
        );

        return false;
      }

      if (
        !formData.studentCount.trim()
      ) {
        toast.error(
          "Please enter the student count."
        );

        return false;
      }

      if (
        !formData.studentCountText.trim()
      ) {
        toast.error(
          "Please enter the student count text."
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

    const isEdit =
      Boolean(sectionId);

    const payload: DepartmentSectionFormData = {
      title:
        formData.title.trim(),

      description:
        formData.description.trim(),

      searchPlaceholder:
        formData.searchPlaceholder.trim(),

      popularSearches:
        formData.popularSearches
          .map(
            (item) =>
              item.trim()
          )
          .filter(
            Boolean
          ),

      imageOne:
        formData.imageOne.trim(),

      imageTwo:
        formData.imageTwo.trim(),

      studentCount:
        formData.studentCount.trim(),

      studentCountText:
        formData.studentCountText.trim(),

      isActive:
        Boolean(
          formData.isActive
        ),
    };

    try {
      setSaving(true);

      // ===================================================
      // IMPORTANT:
      // BOTH CREATE AND UPDATE USE SAME API ROUTE
      // ===================================================

      const endpoint =
        "/api/department-section";

      const method =
        isEdit
          ? "PUT"
          : "POST";

      console.log(
        "DEPARTMENT SECTION REQUEST:",
        {
          endpoint,
          method,
          sectionId,
          payload,
        }
      );

      const response =
        await fetch(
          endpoint,
          {
            method,

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              payload
            ),
          }
        );

      const responseText =
        await response.text();

      console.log(
        "DEPARTMENT SECTION STATUS:",
        response.status
      );

      console.log(
        "DEPARTMENT SECTION RESPONSE:",
        responseText
      );

      let data:
        | {
            success?: boolean;
            message?: string;
            data?: unknown;
            missingFields?: string[];
            errors?: Array<{
              field?: string;
              message?: string;
            }>;
          }
        | null = null;

      try {
        data =
          JSON.parse(
            responseText
          );
      } catch {
        throw new Error(
          `API returned an invalid response. HTTP ${response.status}`
        );
      }

      // ===================================================
      // ERROR
      // ===================================================

      if (
        !response.ok
      ) {
        if (
          response.status ===
          409
        ) {
          throw new Error(
            data?.message ||
              "Department section already exists."
          );
        }

        if (
          data?.missingFields &&
          data.missingFields.length
        ) {
          throw new Error(
            `Missing fields: ${data.missingFields.join(
              ", "
            )}`
          );
        }

        if (
          data?.errors &&
          data.errors.length
        ) {
          throw new Error(
            data.errors
              .map(
                (item) =>
                  `${item.field}: ${
                    item.message ||
                    "Invalid value"
                  }`
              )
              .join(
                " | "
              )
          );
        }

        throw new Error(
          data?.message ||
            `Request failed with status ${response.status}.`
        );
      }

      // ===================================================
      // SUCCESS
      // ===================================================

      if (
        !data?.success
      ) {
        throw new Error(
          data?.message ||
            "Department section could not be saved."
        );
      }

      toast.success(
        isEdit
          ? "Department section updated successfully."
          : "Department section created successfully."
      );

      onSuccess?.(
        data.data
      );
    } catch (error) {
      console.error(
        "SAVE DEPARTMENT SECTION ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save Department section."
      );
    } finally {
      setSaving(false);
    }
  };

  // =======================================================
  // IMAGE UPLOAD BOX
  // =======================================================

  const renderImageUpload = (
    imageField:
      | "imageOne"
      | "imageTwo",
    label: string,
    uploading: boolean
  ) => {
    const image =
      formData[imageField];

    return (
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
          {label}
        </label>

        {image ? (
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
              src={image}
              alt={label}
              className="
                h-[240px]
                w-full
                object-cover
              "
            />

            <button
              type="button"
              onClick={() =>
                removeImage(
                  imageField
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
          </div>
        ) : (
          <label
            className="
              flex
              min-h-[240px]
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
              hover:bg-[#E8F7F0]/40
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
                    font-semibold
                    text-slate-700
                  "
                >
                  Uploading...
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
                    rounded-xl
                    bg-[#E8F7F0]
                    text-[#008B45]
                  "
                >
                  <ImageIcon
                    size={24}
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
                  Upload Image
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
                    py-2
                    text-xs
                    font-semibold
                    text-white
                  "
                >
                  <Upload size={15} />

                  Choose Image
                </span>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={(event) =>
                handleImageChange(
                  event,
                  imageField
                )
              }
              className="hidden"
            />
          </label>
        )}

        <p
          className="
            mt-2
            text-xs
            text-slate-400
          "
        >
          Maximum image size: 5MB
        </p>
      </div>
    );
  };

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="space-y-6"
    >
      {/* CONTENT */}

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
          <h2 className="text-lg font-bold text-slate-800">
            Section Content
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Configure the Find Your
            Department section.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label
              htmlFor="section-title"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Section Title
            </label>

            <input
              id="section-title"
              name="title"
              type="text"
              value={
                formData.title
              }
              onChange={
                handleChange
              }
              placeholder="Find Your Department"
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
                placeholder:text-slate-400
                focus:border-[#008B45]
                focus:ring-2
                focus:ring-[#008B45]/10
              "
            />
          </div>

          <div>
            <label
              htmlFor="section-description"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Description
            </label>

            <textarea
              id="section-description"
              name="description"
              value={
                formData.description
              }
              onChange={
                handleChange
              }
              rows={5}
              placeholder="Explore our departments and find the right academic program..."
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
                placeholder:text-slate-400
                focus:border-[#008B45]
                focus:ring-2
                focus:ring-[#008B45]/10
              "
            />
          </div>

          <div>
            <label
              htmlFor="search-placeholder"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Search Placeholder
            </label>

            <input
              id="search-placeholder"
              name="searchPlaceholder"
              type="text"
              value={
                formData.searchPlaceholder
              }
              onChange={
                handleChange
              }
              placeholder="Search for a department..."
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
                placeholder:text-slate-400
                focus:border-[#008B45]
                focus:ring-2
                focus:ring-[#008B45]/10
              "
            />
          </div>
        </div>
      </div>

      {/* IMAGES */}

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
          <h2 className="text-lg font-bold text-slate-800">
            Section Images
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Upload the two images used
            in the Department section.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {renderImageUpload(
            "imageOne",
            "Image One",
            uploadingImageOne
          )}

          {renderImageUpload(
            "imageTwo",
            "Image Two",
            uploadingImageTwo
          )}
        </div>
      </div>

      {/* POPULAR SEARCHES */}

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
          <h2 className="text-lg font-bold text-slate-800">
            Popular Searches
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Add popular department search
            terms to display on the website.
          </p>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={
              popularSearchInput
            }
            onChange={(event) =>
              setPopularSearchInput(
                event.target.value
              )
            }
            onKeyDown={
              handlePopularSearchKeyDown
            }
            placeholder="e.g. Medicine"
            className="
              h-12
              min-w-0
              flex-1
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              text-sm
              text-slate-800
              outline-none
              placeholder:text-slate-400
              focus:border-[#008B45]
              focus:ring-2
              focus:ring-[#008B45]/10
            "
          />

          <button
            type="button"
            onClick={
              addPopularSearch
            }
            className="
              inline-flex
              h-12
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#008B45]
              px-4
              text-sm
              font-semibold
              text-white
              hover:bg-[#00763B]
            "
          >
            <Plus size={17} />

            Add
          </button>
        </div>

        {formData.popularSearches
          .length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {formData.popularSearches.map(
              (
                search,
                index
              ) => (
                <div
                  key={`${search}-${index}`}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-[#E8F7F0]
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-[#008B45]
                  "
                >
                  <span>
                    {search}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      removePopularSearch(
                        index
                      )
                    }
                    className="
                      flex
                      h-5
                      w-5
                      items-center
                      justify-center
                      rounded-full
                      hover:bg-[#008B45]
                      hover:text-white
                    "
                  >
                    <X size={13} />
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* STATISTICS */}

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
          <h2 className="text-lg font-bold text-slate-800">
            Department Statistics
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Configure the statistics shown
            beside the section.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="student-count"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Student Count
            </label>

            <input
              id="student-count"
              name="studentCount"
              type="text"
              value={
                formData.studentCount
              }
              onChange={
                handleChange
              }
              placeholder="28+"
              className="
                h-12
                w-full
                rounded-xl
                border
                border-slate-200
                px-4
                text-sm
                outline-none
                focus:border-[#008B45]
                focus:ring-2
                focus:ring-[#008B45]/10
              "
            />
          </div>

          <div>
            <label
              htmlFor="student-count-text"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Student Count Text
            </label>

            <input
              id="student-count-text"
              name="studentCountText"
              type="text"
              value={
                formData.studentCountText
              }
              onChange={
                handleChange
              }
              placeholder="Departments"
              className="
                h-12
                w-full
                rounded-xl
                border
                border-slate-200
                px-4
                text-sm
                outline-none
                focus:border-[#008B45]
                focus:ring-2
                focus:ring-[#008B45]/10
              "
            />
          </div>
        </div>
      </div>

      {/* STATUS */}

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
            <p className="text-sm font-semibold text-slate-700">
              Publish Department Section
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Make this section visible
              on the client website.
            </p>
          </div>

          <span
            className={`
              relative
              h-6
              w-11
              rounded-full
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

      {/* SUBMIT */}

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
            uploadingImageOne ||
            uploadingImageTwo
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

              {sectionId
                ? "Update Section"
                : "Create Section"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}