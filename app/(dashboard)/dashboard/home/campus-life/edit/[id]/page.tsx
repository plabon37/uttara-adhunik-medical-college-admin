"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import CampusLifeForm from "@/components/dashboard/home/campus-life/CampusLifeForm";

// =========================================================
// TYPES
// =========================================================

interface CampusLifeItem {
  _id?: string;
  title: string;
  image: string;
  link: string;
  isActive: boolean;
  order: number;
}

interface CampusLifeFormData {
  tagline: string;
  title: string;
  description: string;
  items: CampusLifeItem[];
  isActive: boolean;
}

interface CampusLifeApiResponse {
  success?: boolean;
  message?: string;
  error?: string;
  data?: CampusLifeFormData & {
    _id?: string;
  };
}

// =========================================================
// DEFAULT DATA
// =========================================================

const emptyData: CampusLifeFormData = {
  tagline: "",
  title: "",
  description: "",
  items: [],
  isActive: true,
};

// =========================================================
// PAGE
// =========================================================

export default function CampusLifeEditPage() {
  const router = useRouter();
  const params = useParams();

  // =======================================================
  // ID
  // =======================================================

  const id =
    typeof params?.id === "string"
      ? params.id
      : "";

  // =======================================================
  // FORM DATA
  // =======================================================

  const [formData, setFormData] =
    useState<CampusLifeFormData>(emptyData);

  // =======================================================
  // LOADING
  // =======================================================

  const [loading, setLoading] =
    useState(true);

  // =======================================================
  // SUBMITTING
  // =======================================================

  const [submitting, setSubmitting] =
    useState(false);

  // =========================================================
  // LOAD CAMPUS LIFE
  // =========================================================

  useEffect(() => {
    let cancelled = false;

    const loadCampusLife = async () => {
      // =====================================================
      // INVALID ID
      // =====================================================

      if (!id) {
        toast.error(
          "Campus Life ID is missing."
        );

        setLoading(false);

        return;
      }

      try {
        // ===================================================
        // FETCH
        // ===================================================

        const response = await fetch(
          `/api/campus-life/${encodeURIComponent(id)}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        // ===================================================
        // READ RESPONSE
        // ===================================================

        const text =
          await response.text();

        let result:
          | CampusLifeApiResponse
          | null = null;

        // ===================================================
        // PARSE JSON
        // ===================================================

        try {
          result = text
            ? JSON.parse(text)
            : null;
        } catch {
          throw new Error(
            "Campus Life API returned an invalid response."
          );
        }

        // ===================================================
        // CANCELLED
        // ===================================================

        if (cancelled) {
          return;
        }

        // ===================================================
        // API ERROR
        // ===================================================

        if (
          !response.ok ||
          !result?.success ||
          !result.data
        ) {
          throw new Error(
            result?.message ||
              result?.error ||
              "Failed to load Campus Life."
          );
        }

        // ===================================================
        // SERVER DATA
        // ===================================================

        const data =
          result.data;

        // ===================================================
        // PREPARE DATA
        // ===================================================

        const preparedData:
          CampusLifeFormData = {
          tagline:
            data.tagline || "",

          title:
            data.title || "",

          description:
            data.description || "",

          items:
            Array.isArray(data.items)
              ? data.items.map(
                  (
                    item,
                    index
                  ) => ({
                    _id:
                      item._id,

                    title:
                      item.title || "",

                    image:
                      item.image || "",

                    link:
                      item.link || "#",

                    isActive:
                      typeof item.isActive ===
                      "boolean"
                        ? item.isActive
                        : true,

                    order:
                      typeof item.order ===
                      "number"
                        ? item.order
                        : index,
                  })
                )
              : [],

          isActive:
            typeof data.isActive ===
            "boolean"
              ? data.isActive
              : true,
        };

        // ===================================================
        // SET FORM DATA
        // ===================================================

        setFormData(
          preparedData
        );
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error(
          "FETCH CAMPUS LIFE EDIT ERROR:",
          error
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to load Campus Life."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadCampusLife();

    // =====================================================
    // CLEANUP
    // =====================================================

    return () => {
      cancelled = true;
    };
  }, [id]);

  // =========================================================
  // UPDATE CAMPUS LIFE
  // =========================================================

  const handleUpdate = async (
    data: CampusLifeFormData
  ) => {
    // =======================================================
    // CHECK ID
    // =======================================================

    if (!id) {
      throw new Error(
        "Campus Life ID is missing."
      );
    }

    try {
      setSubmitting(true);

      // =====================================================
      // PREPARE PAYLOAD
      // =====================================================

      const payload = {
        tagline:
          data.tagline.trim(),

        title:
          data.title.trim(),

        description:
          data.description.trim(),

        items:
          data.items.map(
            (item, index) => ({
              title:
                item.title.trim(),

              image:
                item.image.trim(),

              link:
                item.link.trim() || "#",

              isActive:
                Boolean(
                  item.isActive
                ),

              order: index,
            })
          ),

        isActive:
          Boolean(
            data.isActive
          ),
      };

      console.log(
        "UPDATING CAMPUS LIFE:",
        payload
      );

      // =====================================================
      // PUT REQUEST
      // =====================================================

      const response =
        await fetch(
          `/api/campus-life/${encodeURIComponent(
            id
          )}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                payload
              ),
          }
        );

      // =====================================================
      // READ RESPONSE
      // =====================================================

      const text =
        await response.text();

      let result:
        | CampusLifeApiResponse
        | null = null;

      // =====================================================
      // PARSE RESPONSE
      // =====================================================

      try {
        result = text
          ? JSON.parse(text)
          : null;
      } catch {
        console.error(
          "UPDATE CAMPUS LIFE NON-JSON RESPONSE:",
          text
        );

        throw new Error(
          "Campus Life update API returned an invalid response."
        );
      }

      // =====================================================
      // API ERROR
      // =====================================================

      if (
        !response.ok ||
        !result?.success
      ) {
        console.error(
          "UPDATE CAMPUS LIFE API RESPONSE:",
          {
            status:
              response.status,

            result,
          }
        );

        throw new Error(
          result?.message ||
            result?.error ||
            "Failed to update Campus Life."
        );
      }

      // =====================================================
      // SUCCESS
      // =====================================================

      const updatedData =
        result.data ||
        data;

      setFormData(
        updatedData
      );

      toast.success(
        "Campus Life updated successfully."
      );

      // =====================================================
      // REDIRECT
      // =====================================================

      router.push(
        "/dashboard/home/campus-life"
      );

      router.refresh();
    } catch (error) {
      console.error(
        "UPDATE CAMPUS LIFE ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update Campus Life."
      );

      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  // =========================================================
  // LOADING UI
  // =========================================================

  if (loading) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-slate-50
          px-5
        "
      >
        <div
          className="
            text-sm
            font-medium
            text-slate-500
          "
        >
          Loading Campus Life...
        </div>
      </main>
    );
  }

  // =========================================================
  // PAGE UI
  // =========================================================

  return (
    <main
      className="
        min-h-screen
        bg-slate-50
        px-4
        py-6
        sm:px-6
        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1200px]
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            mb-6
            flex
            flex-col
            gap-3
          "
        >
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[#008B45]
            "
          >
            Homepage
          </p>

          <h1
            className="
              text-2xl
              font-bold
              tracking-tight
              text-slate-900
              sm:text-3xl
            "
          >
            Edit Campus Life
          </h1>

          <p
            className="
              max-w-2xl
              text-sm
              leading-6
              text-slate-500
            "
          >
            Update the Campus Life
            content, images and
            homepage cards.
          </p>
        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <div className="w-full">
          <CampusLifeForm
            initialData={
              formData
            }
            onSubmit={async (
              data
            ) => {
              setFormData(data);

              await handleUpdate(
                data
              );
            }}
            submitLabel={
              submitting
                ? "Updating Campus Life..."
                : "Update Campus Life"
            }
            title="Campus Life"
            description="
              Update the Campus Life heading,
              description, images and cards.
            "
          />
        </div>
      </div>
    </main>
  );
}