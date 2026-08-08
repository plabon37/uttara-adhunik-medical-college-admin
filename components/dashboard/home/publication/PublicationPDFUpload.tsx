"use client";

import {
  FileText,
  Loader2,
  Upload,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { useRef, useState } from "react";

interface PublicationPDFUploadProps {
  pdf: string;
  onChange: (url: string) => void;
}

export default function PublicationPDFUpload({
  pdf,
  onChange,
}: PublicationPDFUploadProps) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  // ==========================
  // UPLOAD PDF
  // ==========================

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file =
        e.target.files?.[0];

      if (!file) {
        return;
      }

      // Check PDF

      if (file.type !== "application/pdf") {
        toast.error(
          "Only PDF files are allowed."
        );

        e.target.value = "";

        return;
      }

      // Check size
      // Maximum 10MB

      const maxSize =
        10 * 1024 * 1024;

      if (file.size > maxSize) {
        toast.error(
          "PDF size must be less than 10MB."
        );

        e.target.value = "";

        return;
      }

      setUploading(true);

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      const res = await fetch(
        "/api/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const result =
        await res.json();

      if (!res.ok) {
        throw new Error(
          result.message ||
            "PDF upload failed."
        );
      }

      if (!result.url) {
        throw new Error(
          "Upload URL was not returned."
        );
      }

      onChange(result.url);

      toast.success(
        "PDF uploaded successfully."
      );
    } catch (error) {
      console.error(
        "PDF UPLOAD ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "PDF upload failed."
      );
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  // ==========================
  // REMOVE PDF
  // ==========================

  const handleRemove = () => {
    onChange("");

    toast.success(
      "PDF removed."
    );
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      {/* ==========================
          HEADER
      ========================== */}

      <div>
        <h2 className="text-xl font-bold text-slate-800">
          Publication PDF
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Upload the PDF document for
          this publication.
        </p>
      </div>

      {/* ==========================
          HIDDEN INPUT
      ========================== */}

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        hidden
        onChange={handleUpload}
      />

      {/* ==========================
          EMPTY STATE
      ========================== */}

      {!pdf ? (
        <button
          type="button"
          onClick={() =>
            inputRef.current?.click()
          }
          disabled={uploading}
          className="
            mt-6
            flex
            min-h-48
            w-full
            flex-col
            items-center
            justify-center
            rounded-2xl
            border-2
            border-dashed
            border-slate-300
            bg-slate-50
            px-6
            transition
            hover:border-teal-500
            hover:bg-slate-100
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {uploading ? (
            <>
              <Loader2
                size={42}
                className="animate-spin text-teal-600"
              />

              <span className="mt-4 text-sm font-semibold text-slate-700">
                Uploading PDF...
              </span>

              <span className="mt-1 text-xs text-slate-500">
                Please wait
              </span>
            </>
          ) : (
            <>
              <Upload
                size={42}
                className="text-slate-400"
              />

              <span className="mt-4 text-base font-semibold text-slate-700">
                Click to Upload PDF
              </span>

              <span className="mt-1 text-sm text-slate-500">
                PDF only • Maximum 10MB
              </span>
            </>
          )}
        </button>
      ) : (
        /* ==========================
           PDF EXISTS
        ========================== */

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <div className="flex items-center gap-4 p-5">
            {/* PDF Icon */}

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-red-50">
              <FileText
                size={28}
                className="text-red-600"
              />
            </div>

            {/* File Information */}

            <div className="min-w-0 flex-1">
              <p className="font-semibold text-slate-800">
                Publication PDF
              </p>

              <p className="mt-1 truncate text-xs text-slate-500">
                PDF uploaded successfully
              </p>
            </div>

            {/* Remove */}

            <button
              type="button"
              onClick={handleRemove}
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-red-50
                text-red-600
                transition
                hover:bg-red-100
              "
              title="Remove PDF"
            >
              <Trash2 size={18} />
            </button>
          </div>

          {/* URL */}

          <div className="border-t border-slate-200 bg-white px-5 py-3">
            <p className="truncate text-xs text-slate-500">
              {pdf}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}