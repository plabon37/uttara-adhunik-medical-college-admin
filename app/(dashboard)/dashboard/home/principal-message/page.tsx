"use client";

import {
  Plus,
  RefreshCw,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  toast,
} from "sonner";

import PrincipalMessageEmpty from "@/components/dashboard/home/principal-message/PrincipalMessageEmpty";

import PrincipalMessageLoading from "@/components/dashboard/home/principal-message/PrincipalMessageLoading";

import PrincipalMessageTable from "@/components/dashboard/home/principal-message/PrincipalMessageTable";

import type {
  PrincipalMessageTableData,
} from "@/components/dashboard/home/principal-message/PrincipalMessageTable";

// =========================================================
// API RESPONSE TYPE
// =========================================================

interface PrincipalMessageApiResponse {
  success?: boolean;

  message?: string;

  data?:
    | PrincipalMessageTableData
    | PrincipalMessageTableData[]
    | null;
}

// =========================================================
// PAGE
// =========================================================

export default function PrincipalMessagePage() {
  const router =
    useRouter();

  // =======================================================
  // STATE
  // =======================================================

  const [
    principalMessage,
    setPrincipalMessage,
  ] =
    useState<PrincipalMessageTableData | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    deleting,
    setDeleting,
  ] =
    useState(false);

  const [
    updatingStatus,
    setUpdatingStatus,
  ] =
    useState(false);

  const [
    refreshing,
    setRefreshing,
  ] =
    useState(false);

  // =======================================================
  // FETCH PRINCIPAL MESSAGE
  // =======================================================

  const fetchPrincipalMessage =
    async (
      showRefreshLoader = false
    ) => {
      try {
        // ---------------------------------------------------
        // ONLY SHOW REFRESH LOADER WHEN REFRESH BUTTON
        // IS CLICKED.
        //
        // Initial page loading is already true from
        // useState(true), so we do NOT call setLoading(true)
        // from useEffect.
        // ---------------------------------------------------

        if (
          showRefreshLoader
        ) {
          setRefreshing(
            true
          );
        }

        // ---------------------------------------------------
        // API REQUEST
        // ---------------------------------------------------

        const response =
          await fetch(
            "/api/principal-message",
            {
              method: "GET",
              cache: "no-store",
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
            "PRINCIPAL MESSAGE API INVALID RESPONSE:",
            responseText
          );

          throw new Error(
            "Principal Message API returned an invalid response."
          );
        }

        // ---------------------------------------------------
        // CHECK API STATUS
        // ---------------------------------------------------

        if (
          !response.ok ||
          !result?.success
        ) {
          throw new Error(
            result?.message ||
              "Failed to fetch Principal Message."
          );
        }

        // ---------------------------------------------------
        // RAW DATA
        // ---------------------------------------------------

        const rawData =
          result.data;

        // ---------------------------------------------------
        // NORMALIZED DATA
        // ---------------------------------------------------

        let normalizedData:
          | PrincipalMessageTableData
          | null = null;

        // ---------------------------------------------------
        // IF API RETURNS ARRAY
        // ---------------------------------------------------

        if (
          Array.isArray(
            rawData
          )
        ) {
          normalizedData =
            rawData.length > 0
              ? rawData[0]
              : null;
        }

        // ---------------------------------------------------
        // IF API RETURNS OBJECT
        // ---------------------------------------------------

        else if (
          rawData &&
          typeof rawData ===
            "object"
        ) {
          normalizedData =
            rawData as PrincipalMessageTableData;
        }

        // ---------------------------------------------------
        // SAVE DATA
        // ---------------------------------------------------

        setPrincipalMessage(
          normalizedData
        );
      } catch (error) {
        // ---------------------------------------------------
        // ERROR
        // ---------------------------------------------------

        console.error(
          "FETCH PRINCIPAL MESSAGE ERROR:",
          error
        );

        // ---------------------------------------------------
        // ONLY CLEAR DATA WHEN FETCH ACTUALLY FAILS
        // ---------------------------------------------------

        setPrincipalMessage(
          null
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to load Principal Message."
        );
      } finally {
        // ---------------------------------------------------
        // REFRESH LOADER
        // ---------------------------------------------------

        if (
          showRefreshLoader
        ) {
          setRefreshing(
            false
          );
        }
      }
    };

  // =======================================================
  // INITIAL LOAD
  // =======================================================

  useEffect(() => {
    let cancelled =
      false;

    // -----------------------------------------------------
    // FETCH
    //
    // IMPORTANT:
    // NO setLoading(true) HERE.
    //
    // loading is already true from:
    //
    // useState(true)
    //
    // This prevents React cascading-render warning.
    // -----------------------------------------------------

    fetch(
      "/api/principal-message",
      {
        method: "GET",
        cache: "no-store",
      }
    )
      .then(
        async (
          response
        ) => {
          // -----------------------------------------------
          // READ RESPONSE
          // -----------------------------------------------

          const responseText =
            await response.text();

          let result:
            | PrincipalMessageApiResponse
            | null = null;

          // -----------------------------------------------
          // PARSE JSON
          // -----------------------------------------------

          try {
            result =
              JSON.parse(
                responseText
              );
          } catch {
            throw new Error(
              "Principal Message API returned an invalid response."
            );
          }

          // -----------------------------------------------
          // CHECK RESPONSE
          // -----------------------------------------------

          if (
            !response.ok ||
            !result?.success
          ) {
            throw new Error(
              result?.message ||
                "Failed to fetch Principal Message."
            );
          }

          return result;
        }
      )
      .then(
        (
          result
        ) => {
          // -----------------------------------------------
          // COMPONENT UNMOUNTED
          // -----------------------------------------------

          if (
            cancelled
          ) {
            return;
          }

          // -----------------------------------------------
          // GET DATA
          // -----------------------------------------------

          const rawData =
            result.data;

          // -----------------------------------------------
          // NORMALIZE DATA
          // -----------------------------------------------

          let normalizedData:
            | PrincipalMessageTableData
            | null = null;

          // -----------------------------------------------
          // ARRAY RESPONSE
          // -----------------------------------------------

          if (
            Array.isArray(
              rawData
            )
          ) {
            normalizedData =
              rawData.length > 0
                ? rawData[0]
                : null;
          }

          // -----------------------------------------------
          // OBJECT RESPONSE
          // -----------------------------------------------

          else if (
            rawData &&
            typeof rawData ===
              "object"
          ) {
            normalizedData =
              rawData as PrincipalMessageTableData;
          }

          // -----------------------------------------------
          // UPDATE DATA
          // -----------------------------------------------

          setPrincipalMessage(
            normalizedData
          );

          // -----------------------------------------------
          // FINISH INITIAL LOADING
          // -----------------------------------------------

          setLoading(
            false
          );
        }
      )
      .catch(
        (
          error
        ) => {
          // -----------------------------------------------
          // COMPONENT UNMOUNTED
          // -----------------------------------------------

          if (
            cancelled
          ) {
            return;
          }

          // -----------------------------------------------
          // LOG ERROR
          // -----------------------------------------------

          console.error(
            "INITIAL FETCH PRINCIPAL MESSAGE ERROR:",
            error
          );

          // -----------------------------------------------
          // CLEAR DATA
          // -----------------------------------------------

          setPrincipalMessage(
            null
          );

          // -----------------------------------------------
          // FINISH LOADING
          // -----------------------------------------------

          setLoading(
            false
          );

          // -----------------------------------------------
          // SHOW ERROR
          // -----------------------------------------------

          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to load Principal Message."
          );
        }
      );

    // -----------------------------------------------------
    // CLEANUP
    // -----------------------------------------------------

    return () => {
      cancelled =
        true;
    };
  }, []);

  // =======================================================
  // CREATE
  // =======================================================

  const handleCreate =
    () => {
      router.push(
        "/dashboard/home/principal-message/new"
      );
    };

  // =======================================================
  // EDIT
  // =======================================================

  const handleEdit = (
    id: string
  ) => {
    router.push(
      `/dashboard/home/principal-message/edit/${id}`
    );
  };

  // =======================================================
  // DELETE
  // =======================================================

  const handleDelete =
    async (
      id: string
    ) => {
      // ---------------------------------------------------
      // CONFIRM
      // ---------------------------------------------------

      const confirmed =
        window.confirm(
          "Are you sure you want to delete the Principal Message?"
        );

      if (
        !confirmed
      ) {
        return;
      }

      try {
        // -------------------------------------------------
        // LOADING
        // -------------------------------------------------

        setDeleting(
          true
        );

        // -------------------------------------------------
        // DELETE REQUEST
        // -------------------------------------------------

        const response =
          await fetch(
            `/api/principal-message?id=${encodeURIComponent(
              id
            )}`,
            {
              method: "DELETE",
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
        // PARSE
        // -------------------------------------------------

        try {
          result =
            JSON.parse(
              responseText
            );
        } catch {
          throw new Error(
            "Delete API returned an invalid response."
          );
        }

        // -------------------------------------------------
        // CHECK
        // -------------------------------------------------

        if (
          !response.ok ||
          !result?.success
        ) {
          throw new Error(
            result?.message ||
              "Failed to delete Principal Message."
          );
        }

        // -------------------------------------------------
        // CLEAR LOCAL DATA
        // -------------------------------------------------

        setPrincipalMessage(
          null
        );

        // -------------------------------------------------
        // SUCCESS
        // -------------------------------------------------

        toast.success(
          "Principal Message deleted successfully."
        );
      } catch (error) {
        // -------------------------------------------------
        // ERROR
        // -------------------------------------------------

        console.error(
          "DELETE PRINCIPAL MESSAGE ERROR:",
          error
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to delete Principal Message."
        );
      } finally {
        // -------------------------------------------------
        // STOP LOADING
        // -------------------------------------------------

        setDeleting(
          false
        );
      }
    };

  // =======================================================
  // TOGGLE STATUS
  // =======================================================

  const handleToggleStatus =
    async (
      id: string,
      currentStatus: boolean
    ) => {
      try {
        // -------------------------------------------------
        // LOADING
        // -------------------------------------------------

        setUpdatingStatus(
          true
        );

        // -------------------------------------------------
        // PATCH REQUEST
        // -------------------------------------------------

        const response =
          await fetch(
            `/api/principal-message?id=${encodeURIComponent(
              id
            )}`,
            {
              method: "PATCH",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                isActive:
                  !currentStatus,
              }),
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
        // PARSE
        // -------------------------------------------------

        try {
          result =
            JSON.parse(
              responseText
            );
        } catch {
          throw new Error(
            "Status API returned an invalid response."
          );
        }

        // -------------------------------------------------
        // CHECK
        // -------------------------------------------------

        if (
          !response.ok ||
          !result?.success
        ) {
          throw new Error(
            result?.message ||
              "Failed to update Principal Message status."
          );
        }

        // -------------------------------------------------
        // UPDATE LOCAL STATE
        // -------------------------------------------------

        setPrincipalMessage(
          (
            previous
          ) => {
            if (
              !previous
            ) {
              return null;
            }

            return {
              ...previous,

              isActive:
                !currentStatus,
            };
          }
        );

        // -------------------------------------------------
        // SUCCESS
        // -------------------------------------------------

        toast.success(
          currentStatus
            ? "Principal Message hidden."
            : "Principal Message published."
        );
      } catch (error) {
        // -------------------------------------------------
        // ERROR
        // -------------------------------------------------

        console.error(
          "TOGGLE PRINCIPAL MESSAGE ERROR:",
          error
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to update status."
        );
      } finally {
        // -------------------------------------------------
        // STOP LOADING
        // -------------------------------------------------

        setUpdatingStatus(
          false
        );
      }
    };

  // =======================================================
  // REFRESH
  // =======================================================

  const handleRefresh =
    () => {
      fetchPrincipalMessage(
        true
      );
    };

  // =======================================================
  // INITIAL LOADING UI
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
          {/* =================================================
              PAGE HEADER
          ================================================= */}

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
            {/* TITLE */}

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
                Principal Message
              </h1>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                Manage the Principal Message
                section of the website.
              </p>
            </div>

            {/* CREATE */}

            <button
              type="button"
              onClick={
                handleCreate
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
                py-3
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-[#00763B]
              "
            >
              <Plus
                size={18}
              />

              Create Principal Message
            </button>
          </div>

          {/* LOADING COMPONENT */}

          <PrincipalMessageLoading />
        </div>
      </main>
    );
  }

  // =======================================================
  // MAIN UI
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
            PAGE HEADER
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
          {/* TITLE */}

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
              Principal Message
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
              Manage the Principal Message
              section of the website.
            </p>
          </div>

          {/* =================================================
              ACTION BUTTONS
          ================================================= */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-3
            "
          >
            {/* REFRESH */}

            <button
              type="button"
              onClick={
                handleRefresh
              }
              disabled={
                refreshing
              }
              className="
                inline-flex
                min-h-11
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-sm
                font-medium
                text-slate-700
                shadow-sm
                transition
                hover:bg-slate-50
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <RefreshCw
                size={17}
                className={
                  refreshing
                    ? "animate-spin"
                    : ""
                }
              />

              Refresh
            </button>

            {/* CREATE */}

            <button
              type="button"
              onClick={
                handleCreate
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
                py-3
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-[#00763B]
              "
            >
              <Plus
                size={18}
              />

              Create Principal Message
            </button>
          </div>
        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        {!principalMessage ? (
          <PrincipalMessageEmpty />
        ) : (
          <PrincipalMessageTable
            data={
              principalMessage
            }
            onEdit={
              handleEdit
            }
            onDelete={
              handleDelete
            }
            onToggleStatus={
              handleToggleStatus
            }
            deleting={
              deleting
            }
            updatingStatus={
              updatingStatus
            }
          />
        )}
      </div>
    </main>
  );
}