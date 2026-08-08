"use client";

import {
  FileText,
  FileUp,
  Loader2,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { useRef, useState } from "react";

interface NoticePdfUploadProps {
  pdf: string;
  onChange: (url: string) => void;
}

export default function NoticePdfUpload({
  pdf,
  onChange,
}: NoticePdfUploadProps) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = e.target.files?.[0];

      if (!file) return;

      if (file.type !== "application/pdf") {
        toast.error(
          "Only PDF files are allowed."
        );

        e.target.value = "";

        return;
      }

      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);
      formData.append("type", "pdf");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(
          result.message ||
            "PDF upload failed."
        );

        return;
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
        "Something went wrong while uploading PDF."
      );
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <div>
      {/* =========================
          LABEL
      ========================= */}

      <label className="mb-2 block text-sm font-semibold text-slate-700">
        Notice PDF
      </label>

      {/* =========================
          HIDDEN INPUT
      ========================= */}

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        hidden
        onChange={handleUpload}
      />

      {/* =========================
          NO PDF
      ========================= */}

      {!pdf ? (
        <button
          type="button"
          onClick={() =>
            inputRef.current?.click()
          }
          disabled={uploading}
          className="
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
            py-8
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
                className="
                  animate-spin
                  text-teal-600
                "
              />

              <span className="mt-4 text-sm font-medium text-slate-600">
                Uploading PDF...
              </span>
            </>
          ) : (
            <>
              <FileUp
                size={46}
                className="text-slate-400"
              />

              <span className="mt-4 text-base font-semibold text-slate-700">
                Click to Upload PDF
              </span>

              <p className="mt-1 text-sm text-slate-500">
                PDF files only
              </p>
            </>
          )}
        </button>
      ) : (
        /* =========================
           PDF EXISTS
        ========================= */

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <FileText size={24} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-semibold text-slate-800">
                Notice PDF
              </p>

              <p className="mt-1 truncate text-xs text-slate-500">
                PDF uploaded successfully
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="
                rounded-xl
                bg-slate-100
                px-4
                py-2
                text-center
                text-sm
                font-semibold
                text-slate-700
                transition
                hover:bg-slate-200
              "
            >
              View PDF
            </a>

            <button
              type="button"
              onClick={() => onChange("")}
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-red-50
                px-4
                py-2
                text-sm
                font-medium
                text-red-600
                transition
                hover:bg-red-100
              "
            >
              <Trash2 size={16} />

              Remove PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}