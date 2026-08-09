"use client";

import {
  ArrowLeft,
  Building2,
  Loader2,
} from "lucide-react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import DepartmentSectionForm, {
  DepartmentSectionFormData,
} from "@/components/dashboard/home/departments/DepartmentSectionForm";

import DepartmentSectionPreview from "@/components/dashboard/home/departments/DepartmentSectionPreview";

// =========================================================
// API DATA TYPE
// =========================================================

interface DepartmentSectionData {
  _id: string;

  title: string;

  description: string;

  searchPlaceholder: string;

  popularSearches: string[];

  imageOne: string;

  imageTwo: string;

  studentCount: string;

  studentCountText: string;

  isActive: boolean;

  createdAt?: string;

  updatedAt?: string;
}

// =========================================================
// DEFAULT DATA
// =========================================================

const emptyFormData: DepartmentSectionFormData = {
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
// PAGE
// =========================================================

export default function EditDepartmentSectionPage() {
  const router = useRouter();

  const params = useParams();

  const id = params.id as string;

  // =======================================================
  // SECTION
  // =======================================================

  const [
    section,
    setSection,
  ] = useState<DepartmentSectionData | null>(
    null
  );

  // =======================================================
  // FORM DATA
  // =======================================================

  const [
    formData,
    setFormData,
  ] = useState<DepartmentSectionFormData>(
    emptyFormData
  );

  // =======================================================
  // LOADING
  // =======================================================

  const [
    loading,
    setLoading,
  ] = useState(true);

  // =======================================================
  // FETCH EXISTING SECTION
  // =======================================================

  useEffect(() => {
    let cancelled = false;

    const loadSection =
      async () => {
        try {
          setLoading(true);

          // =================================================
          // IMPORTANT
          // =================================================
          // Your API is:
          //
          // GET /api/department-section
          //
          // NOT:
          //
          // GET /api/department-section/[id]
          // =================================================

          const response =
            await fetch(
              "/api/department-section",
              {
                method: "GET",
                cache: "no-store",
              }
            );

          // =================================================
          // READ RESPONSE AS TEXT FIRST
          // =================================================

          const responseText =
            await response.text();

          console.log(
            "DEPARTMENT SECTION GET STATUS:",
            response.status
          );

          console.log(
            "DEPARTMENT SECTION GET RESPONSE:",
            responseText
          );

          // =================================================
          // PARSE JSON
          // =================================================

          let data:
            | {
                success?: boolean;
                message?: string;
                data?: DepartmentSectionData;
              }
            | null = null;

          try {
            data =
              JSON.parse(
                responseText
              );
          } catch {
            throw new Error(
              `Department Section API returned invalid response. HTTP ${response.status}`
            );
          }

          // =================================================
          // CANCELLED
          // =================================================

          if (cancelled) {
            return;
          }

          // =================================================
          // NOT FOUND
          // =================================================

          if (
            response.status ===
            404
          ) {
            setSection(null);

            toast.error(
              "Department section not found."
            );

            return;
          }

          // =================================================
          // API ERROR
          // =================================================

          if (
            !response.ok ||
            !data?.success ||
            !data.data
          ) {
            throw new Error(
              data?.message ||
                "Failed to fetch Department section."
            );
          }

          // =================================================
          // CHECK ID
          // =================================================

          const fetchedSection =
            data.data;

          if (
            id &&
            fetchedSection._id !==
              id
          ) {
            console.warn(
              "URL ID and Department Section ID are different.",
              {
                urlId: id,
                databaseId:
                  fetchedSection._id,
              }
            );
          }

          // =================================================
          // SET SECTION
          // =================================================

          setSection(
            fetchedSection
          );

          // =================================================
          // SET FORM
          // =================================================

          setFormData({
            title:
              fetchedSection.title ||
              "",

            description:
              fetchedSection.description ||
              "",

            searchPlaceholder:
              fetchedSection.searchPlaceholder ||
              "",

            popularSearches:
              Array.isArray(
                fetchedSection.popularSearches
              )
                ? fetchedSection.popularSearches
                : [],

            imageOne:
              fetchedSection.imageOne ||
              "",

            imageTwo:
              fetchedSection.imageTwo ||
              "",

            studentCount:
              fetchedSection.studentCount ||
              "",

            studentCountText:
              fetchedSection.studentCountText ||
              "",

            isActive:
              fetchedSection.isActive ??
              true,
          });
        } catch (error) {
          if (cancelled) {
            return;
          }

          console.error(
            "FETCH DEPARTMENT SECTION ERROR:",
            error
          );

          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to fetch Department section."
          );

          setSection(null);
        } finally {
          if (!cancelled) {
            setLoading(false);
          }
        }
      };

    loadSection();

    return () => {
      cancelled = true;
    };
  }, [id]);

  // =======================================================
  // LIVE PREVIEW
  // =======================================================

  const handleDataChange = (
    data: DepartmentSectionFormData
  ) => {
    setFormData(
      data
    );
  };

  // =======================================================
  // SUCCESS
  // =======================================================

  const handleSuccess = (
    updatedData: unknown
  ) => {
    if (
      updatedData &&
      typeof updatedData ===
        "object"
    ) {
      const updatedSection =
        updatedData as DepartmentSectionData;

      setSection(
        updatedSection
      );

      setFormData({
        title:
          updatedSection.title ||
          "",

        description:
          updatedSection.description ||
          "",

        searchPlaceholder:
          updatedSection.searchPlaceholder ||
          "",

        popularSearches:
          Array.isArray(
            updatedSection.popularSearches
          )
            ? updatedSection.popularSearches
            : [],

        imageOne:
          updatedSection.imageOne ||
          "",

        imageTwo:
          updatedSection.imageTwo ||
          "",

        studentCount:
          updatedSection.studentCount ||
          "",

        studentCountText:
          updatedSection.studentCountText ||
          "",

        isActive:
          updatedSection.isActive ??
          true,
      });
    }

    toast.success(
      "Department section updated successfully."
    );

    router.push(
      "/dashboard/home/departments/section"
    );

    router.refresh();
  };

  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-[500px]
          w-full
          items-center
          justify-center
          p-6
        "
      >
        <div className="text-center">
          <div
            className="
              mx-auto
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
            <Loader2
              size={28}
              className="animate-spin"
            />
          </div>

          <p
            className="
              mt-4
              text-sm
              font-semibold
              text-slate-600
            "
          >
            Loading Department Section...
          </p>

          <p
            className="
              mt-1
              text-xs
              text-slate-400
            "
          >
            Please wait.
          </p>
        </div>
      </div>
    );
  }

  // =======================================================
  // NOT FOUND
  // =======================================================

  if (!section) {
    return (
      <div
        className="
          flex
          min-h-[500px]
          w-full
          flex-col
          items-center
          justify-center
          px-6
          text-center
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
            bg-red-50
            text-red-500
          "
        >
          <Building2 size={30} />
        </div>

        <h2
          className="
            mt-5
            text-xl
            font-bold
            text-slate-800
            sm:text-2xl
          "
        >
          Department Section Not Found
        </h2>

        <p
          className="
            mt-2
            max-w-md
            text-sm
            leading-6
            text-slate-500
          "
        >
          The Department section could
          not be found.
        </p>

        <button
          type="button"
          onClick={() =>
            router.push(
              "/dashboard/home/departments/section"
            )
          }
          className="
            mt-6
            inline-flex
            min-h-11
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
            hover:bg-[#00763B]
          "
        >
          <ArrowLeft size={17} />

          Back to Department Section
        </button>
      </div>
    );
  }

  // =======================================================
  // EDIT PAGE
  // =======================================================

  return (
    <div
      className="
        w-full
        space-y-6
        p-4
        sm:p-6
        lg:p-8
      "
    >
      {/* ===================================================
          HEADER
      =================================================== */}

      <div>
        <button
          type="button"
          onClick={() =>
            router.push(
              "/dashboard/home/departments/section"
            )
          }
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-slate-600
            transition
            hover:text-[#008B45]
          "
        >
          <ArrowLeft size={17} />

          Back to Department Section
        </button>

        <div
          className="
            mt-5
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-[#E8F7F0]
              text-[#008B45]
            "
          >
            <Building2 size={22} />
          </div>

          <div>
            <h1
              className="
                text-2xl
                font-bold
                text-slate-800
                sm:text-3xl
              "
            >
              Edit Department Section
            </h1>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Update the Find Your
              Department section.
            </p>
          </div>
        </div>
      </div>

      {/* ===================================================
          FORM + PREVIEW
      =================================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-6
          xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)]
          xl:items-start
        "
      >
        {/* FORM */}

        <div className="min-w-0">
          <DepartmentSectionForm
            initialData={
              formData
            }
            sectionId={
              section._id
            }
            onDataChange={
              handleDataChange
            }
            onSuccess={
              handleSuccess
            }
          />
        </div>

        {/* PREVIEW */}

        <div
          className="
            min-w-0
            xl:sticky
            xl:top-6
          "
        >
          <DepartmentSectionPreview
            data={formData}
          />
        </div>
      </div>
    </div>
  );
}