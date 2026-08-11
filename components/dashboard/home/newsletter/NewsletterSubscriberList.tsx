"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Mail,
  RefreshCw,
  Users,
} from "lucide-react";
import { toast } from "sonner";

// =========================================================
// TYPES
// =========================================================

interface NewsletterSubscriber {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt?: string;
}

interface NewsletterResponse {
  success?: boolean;
  message?: string;
  data?: NewsletterSubscriber[];
}

// =========================================================
// COMPONENT
// =========================================================

export default function NewsletterSubscriberList() {
  const [subscribers, setSubscribers] =
    useState<NewsletterSubscriber[]>([]);

  // IMPORTANT:
  // Initial loading starts as true.
  // We DO NOT call setLoading(true) inside useEffect.
  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  // =======================================================
  // INITIAL LOAD
  // =======================================================

  useEffect(() => {
    let cancelled = false;

    const loadSubscribers =
      async () => {
        try {
          const response =
            await fetch(
              "/api/newsletter",
              {
                method: "GET",
                cache: "no-store",
                headers: {
                  Accept:
                    "application/json",
                },
              }
            );

          const result: NewsletterResponse =
            await response.json();

          if (
            !response.ok ||
            !result.success
          ) {
            throw new Error(
              result.message ||
                "Failed to load newsletter subscribers."
            );
          }

          if (cancelled) {
            return;
          }

          setSubscribers(
            Array.isArray(
              result.data
            )
              ? result.data
              : []
          );
        } catch (error) {
          if (cancelled) {
            return;
          }

          console.error(
            "NEWSLETTER SUBSCRIBER LOAD ERROR:",
            error
          );

          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to load subscribers."
          );
        } finally {
          if (!cancelled) {
            setLoading(false);
          }
        }
      };

    void loadSubscribers();

    return () => {
      cancelled = true;
    };
  }, []);

  // =======================================================
  // MANUAL REFRESH
  // =======================================================

  const handleRefresh =
    async () => {
      try {
        setRefreshing(true);

        const response =
          await fetch(
            "/api/newsletter",
            {
              method: "GET",
              cache: "no-store",
              headers: {
                Accept:
                  "application/json",
              },
            }
          );

        const result: NewsletterResponse =
          await response.json();

        if (
          !response.ok ||
          !result.success
        ) {
          throw new Error(
            result.message ||
              "Failed to refresh subscribers."
          );
        }

        setSubscribers(
          Array.isArray(
            result.data
          )
            ? result.data
            : []
        );

        toast.success(
          "Subscriber list refreshed."
        );
      } catch (error) {
        console.error(
          "NEWSLETTER REFRESH ERROR:",
          error
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to refresh subscribers."
        );
      } finally {
        setRefreshing(false);
      }
    };

  // =======================================================
  // DATE FORMAT
  // =======================================================

  const formatDate = (
    date: string
  ) => {
    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "Unknown date";
    }

    return new Intl.DateTimeFormat(
      "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }
    ).format(parsedDate);
  };

  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex min-h-[220px] items-center justify-center">
          <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
            <RefreshCw
              size={20}
              className="animate-spin text-[#008B45]"
            />

            Loading subscribers...
          </div>
        </div>
      </div>
    );
  }

  // =======================================================
  // MAIN UI
  // =======================================================

  return (
    <div className="space-y-5">

      {/* =================================================
          SUMMARY
      ================================================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        {/* TOTAL SUBSCRIBERS */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Subscribers
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {subscribers.length}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF5EE] text-[#008B45]">
              <Users size={21} />
            </div>
          </div>
        </div>

        {/* REFRESH */}

        <div className="flex items-center justify-start rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:justify-end">
          <button
            type="button"
            onClick={
              handleRefresh
            }
            disabled={refreshing}
            className="inline-flex items-center gap-2 rounded-xl bg-[#008B45] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00763B] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={17}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            {refreshing
              ? "Refreshing..."
              : "Refresh"}
          </button>
        </div>
      </div>

      {/* =================================================
          SUBSCRIBER LIST
      ================================================= */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* HEADER */}

        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF5EE] text-[#008B45]">
              <Mail size={19} />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                Newsletter Subscribers
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                People who subscribed from
                the website newsletter.
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            EMPTY
        ================================================= */}

        {subscribers.length === 0 ? (
          <div className="flex min-h-[240px] flex-col items-center justify-center px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Mail size={24} />
            </div>

            <h3 className="mt-4 text-base font-semibold text-slate-800">
              No subscribers yet
            </h3>

            <p className="mt-1 max-w-sm text-sm text-slate-500">
              Newsletter subscribers will
              appear here when users submit
              their email addresses.
            </p>
          </div>
        ) : (
          <>
            {/* =================================================
                DESKTOP TABLE
            ================================================= */}

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[650px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      #
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Email
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Subscribed At
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {subscribers.map(
                    (
                      subscriber,
                      index
                    ) => (
                      <tr
                        key={
                          subscriber._id
                        }
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                      >
                        <td className="px-6 py-5 text-sm font-medium text-slate-500">
                          {index + 1}
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF5EE] text-[#008B45]">
                              <Mail
                                size={16}
                              />
                            </div>

                            <span className="break-all text-sm font-medium text-slate-800">
                              {
                                subscriber.email
                              }
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <CalendarDays
                              size={16}
                            />

                            {formatDate(
                              subscriber.createdAt
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* =================================================
                MOBILE LIST
            ================================================= */}

            <div className="divide-y divide-slate-100 md:hidden">
              {subscribers.map(
                (
                  subscriber,
                  index
                ) => (
                  <div
                    key={
                      subscriber._id
                    }
                    className="p-5"
                  >
                    <div className="flex items-start gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF5EE] text-[#008B45]">
                        <Mail size={17} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="break-all text-sm font-semibold text-slate-800">
                          {
                            subscriber.email
                          }
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span>
                            #{index + 1}
                          </span>

                          <span>
                            •
                          </span>

                          <CalendarDays
                            size={14}
                          />

                          <span>
                            {formatDate(
                              subscriber.createdAt
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}