"use client";

import {
  ArrowLeft,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  toast,
} from "sonner";

import PrincipalMessageForm, {
  type PrincipalMessageFormData,
} from "@/components/dashboard/home/principal-message/PrincipalMessageForm";

import PrincipalMessagePreview from "@/components/dashboard/home/principal-message/PrincipalMessagePreview";

// =========================================================
// API RESPONSE TYPE
// =========================================================

interface PrincipalMessageApiResponse {
  success?: boolean;

  message?: string;

  data?:
    | PrincipalMessageFormData
    | PrincipalMessageFormData[]
    | null;
}

// =========================================================
// PAGE
// =========================================================

export default function PrincipalMessageEditPage() {
  const router = useRouter();

  const params = useParams();

  // =======================================================
  // GET ID
  // =======================================================

  const idParam = params?.id;

  const id =
    Array.isArray(idParam)
      ? idParam[0]
      : idParam;

  // =======================================================
  // STATE
  // =======================================================

  const [
    formData,
    setFormData,
  ] =
    useState<PrincipalMessageFormData | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    saving,
    setSaving,
  ] =
    useState(false);

  // =======================================================
  // FETCH PRINCIPAL MESSAGE
  // =======================================================

  useEffect(() => {
    let cancelled = false;

    const loadPrincipalMessage =
      async () => {
        // ---------------------------------------------------
        // INVALID ID
        // ---------------------------------------------------

        if (
          !id ||
          typeof id !== "string"
        ) {
          if (!cancelled) {
            setLoading(false);

            toast.error(
              "Invalid Principal Message ID."
            );
          }

          return;
        }

        try {
          // -------------------------------------------------
          // FETCH
          // -------------------------------------------------

          const response =
            await fetch(
              `/api/principal-message?id=${encodeURIComponent(
                id
              )}`,
              {
                method: "GET",
                cache: "no-store",
              }
            );

          // -------------------------------------------------
          // READ RESPONSE
          // -------------------------------------------------

          const responseText =
            await response.text();

          let result:
            | PrincipalMessageApiResponse
            | null = null;

          // -------------------------------------------------
          // PARSE JSON
          // -------------------------------------------------

          try {
            result =
              JSON.parse(
                responseText
              );
          } catch {
            console.error(
              "EDIT PRINCIPAL MESSAGE NON-JSON RESPONSE:",
              responseText
            );

            throw new Error(
              "Principal Message API returned an invalid response."
            );
          }

          // -------------------------------------------------
          // CHECK RESPONSE
          // -------------------------------------------------

          if (
            !response.ok ||
            !result?.success
          ) {
            throw new Error(
              result?.message ||
                "Failed to load Principal Message."
            );
          }

          // -------------------------------------------------
          // GET RAW DATA
          // -------------------------------------------------

          const rawData =
            result.data;

          // -------------------------------------------------
          // NORMALIZE
          // -------------------------------------------------

          let data:
            | PrincipalMessageFormData
            | null = null;

          if (
            Array.isArray(
              rawData
            )
          ) {
            data =
              rawData.length > 0
                ? rawData[0]
                : null;
          } else if (
            rawData &&
            typeof rawData ===
              "object"
          ) {
            data =
              rawData as PrincipalMessageFormData;
          }

          // -------------------------------------------------
          // DATA NOT FOUND
          // -------------------------------------------------

          if (!data) {
            throw new Error(
              "Principal Message not found."
            );
          }

          // -------------------------------------------------
          // COMPONENT STILL EXISTS
          // -------------------------------------------------

          if (
            cancelled
          ) {
            return;
          }

          // -------------------------------------------------
          // SET FORM DATA
          // -------------------------------------------------

          setFormData({
            tagline:
              data.tagline || "",

            titlePrefix:
              data.titlePrefix || "",

            titleHighlight:
              data.titleHighlight || "",

            signatureImage:
              data.signatureImage || "",

            principalName:
              data.principalName || "",

            designation:
              data.designation ||
              "Principal (In Charge)",

            heading:
              data.heading || "",

            description:
              data.description || "",

            principalImage:
              data.principalImage || "",

            buttonText:
              data.buttonText ||
              "Read More",

            buttonLink:
              data.buttonLink ||
              "#",

            isActive:
              typeof data.isActive ===
              "boolean"
                ? data.isActive
                : true,
          });

          // -------------------------------------------------
          // STOP LOADING
          // -------------------------------------------------

          setLoading(false);
        } catch (error) {
          // -------------------------------------------------
          // COMPONENT UNMOUNTED
          // -------------------------------------------------

          if (
            cancelled
          ) {
            return;
          }

          console.error(
            "FETCH PRINCIPAL MESSAGE EDIT ERROR:",
            error
          );

          // -------------------------------------------------
          // CLEAR DATA
          // -------------------------------------------------

          setFormData(null);

          // -------------------------------------------------
          // STOP LOADING
          // -------------------------------------------------

          setLoading(false);

          // -------------------------------------------------
          // ERROR
          // -------------------------------------------------

          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to load Principal Message."
          );
        }
      };

    loadPrincipalMessage();

    // =====================================================
    // CLEANUP
    // =====================================================

    return () => {
      cancelled = true;
    };
  }, [id]);

  // =======================================================
  // FORM CHANGE
  // =======================================================

  const handleFormChange = (
    data: PrincipalMessageFormData
  ) => {
    setFormData(data);
  };

  // =======================================================
  // SUBMIT UPDATE
  // =======================================================

  const handleSubmit = async (
    data: PrincipalMessageFormData
  ) => {
    // -----------------------------------------------------
    // CHECK ID
    // -----------------------------------------------------

    if (
      !id ||
      typeof id !== "string"
    ) {
      toast.error(
        "Invalid Principal Message ID."
      );

      return;
    }

    try {
      // ---------------------------------------------------
      // START SAVING
      // ---------------------------------------------------

      setSaving(true);

      // ---------------------------------------------------
      // UPDATE API
      // ---------------------------------------------------

      const response =
        await fetch(
          `/api/principal-message?id=${encodeURIComponent(
            id
          )}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              data
            ),
          }
        );

      // ---------------------------------------------------
      // READ RESPONSE
      // ---------------------------------------------------

      const responseText =
        await response.text();

      let result:
        | PrincipalMessageApiResponse
        | null = null;

      // ---------------------------------------------------
      // PARSE JSON
      // ---------------------------------------------------

      try {
        result =
          JSON.parse(
            responseText
          );
      } catch {
        console.error(
          "UPDATE PRINCIPAL MESSAGE NON-JSON RESPONSE:",
          responseText
        );

        throw new Error(
          "Update API returned an invalid response."
        );
      }

      // ---------------------------------------------------
      // CHECK RESPONSE
      // ---------------------------------------------------

      if (
        !response.ok ||
        !result?.success
      ) {
        throw new Error(
          result?.message ||
            "Failed to update Principal Message."
        );
      }

      // ---------------------------------------------------
      // SUCCESS
      // ---------------------------------------------------

      toast.success(
        "Principal Message updated successfully."
      );

      // ---------------------------------------------------
      // BACK TO LIST
      // ---------------------------------------------------

      router.push(
        "/dashboard/home/principal-message"
      );

      router.refresh();
    } catch (error) {
      console.error(
        "UPDATE PRINCIPAL MESSAGE ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update Principal Message."
      );

      throw error;
    } finally {
      // ---------------------------------------------------
      // STOP SAVING
      // ---------------------------------------------------

      setSaving(false);
    }
  };

  // =======================================================
  // BACK
  // =======================================================

  const handleBack = () => {
    router.push(
      "/dashboard/home/principal-message"
    );
  };

  // =======================================================
  // LOADING
  // =======================================================

  if (
    loading
  ) {
    return (
      <main
        className="
          min-h-screen
          bg-slate-50
          px-4
          py-6
          sm:px-6
          sm:py-8
          lg:px-8
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1600px]
          "
        >
          <div
            className="
              mb-6
              flex
              items-center
              gap-4
            "
          >
            <button
              type="button"
              onClick={
                handleBack
              }
              className="
                inline-flex
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
                shadow-sm
                transition
                hover:bg-slate-50
              "
            >
              <ArrowLeft
                size={18}
              />
            </button>

            <div>
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
                  mt-1
                  text-2xl
                  font-bold
                  text-slate-900
                  sm:text-3xl
                "
              >
                Edit Principal Message
              </h1>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                Loading Principal Message...
              </p>
            </div>
          </div>

          <div
            className="
              flex
              min-h-[300px]
              items-center
              justify-center
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-sm
            "
          >
            <div
              className="
                flex
                flex-col
                items-center
                gap-3
              "
            >
              <div
                className="
                  h-10
                  w-10
                  animate-spin
                  rounded-full
                  border-4
                  border-slate-200
                  border-t-[#008B45]
                "
              />

              <p
                className="
                  text-sm
                  font-medium
                  text-slate-500
                "
              >
                Loading Principal Message...
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // =======================================================
  // NOT FOUND
  // =======================================================

  if (
    !formData
  ) {
    return (
      <main
        className="
          min-h-screen
          bg-slate-50
          px-4
          py-6
          sm:px-6
          sm:py-8
          lg:px-8
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1600px]
          "
        >
          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-10
              text-center
              shadow-sm
            "
          >
            <h1
              className="
                text-xl
                font-bold
                text-slate-900
              "
            >
              Principal Message Not Found
            </h1>

            <p
              className="
                mt-2
                text-sm
                text-slate-500
              "
            >
              The Principal Message could
              not be loaded.
            </p>

            <button
              type="button"
              onClick={
                handleBack
              }
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-[#008B45]
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#00763B]
              "
            >
              <ArrowLeft
                size={17}
              />

              Back to Principal Message
            </button>
          </div>
        </div>
      </main>
    );
  }

  // =======================================================
  // MAIN EDIT PAGE
  // =======================================================

  return (
    <main
      className="
        min-h-screen
        bg-slate-50
        px-4
        py-6
        sm:px-6
        sm:py-8
        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]
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
            gap-4
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          <div
            className="
              flex
              items-center
              gap-4
            "
          >
            <button
              type="button"
              onClick={
                handleBack
              }
              className="
                inline-flex
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
                shadow-sm
                transition
                hover:bg-slate-50
              "
            >
              <ArrowLeft
                size={18}
              />
            </button>

            <div>
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
                  mt-1
                  text-2xl
                  font-bold
                  tracking-tight
                  text-slate-900
                  sm:text-3xl
                "
              >
                Edit Principal Message
              </h1>

              <p
                className="
                  mt-1
                  max-w-2xl
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                Update the Principal Message
                content displayed on the
                client website.
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            FORM + LIVE PREVIEW
        ================================================= */}

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

          <div
            className="
              min-w-0
              w-full
            "
          >
            <PrincipalMessageForm
              initialData={
                formData
              }
              onChange={
                handleFormChange
              }
              onSubmit={
                handleSubmit
              }
              submitLabel="Update Principal Message"
              title="Principal Message"
              description="
                Update the content, images and
                button settings for this homepage
                section.
              "
              loading={
                saving
              }
            />
          </div>

          {/* =================================================
              RIGHT — LIVE PREVIEW
          ================================================= */}

          <div
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
                max-h-[calc(100vh-48px)]
                w-full
                overflow-y-auto
                rounded-2xl
              "
            >
              <PrincipalMessagePreview
                data={
                  formData
                }
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}