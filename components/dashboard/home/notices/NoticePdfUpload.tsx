"use client";

import { ChangeEvent, useRef, useState } from "react";
import { FileText, Upload, X, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface NoticePdfUploadProps {
  pdf: string;
  onChange: (url: string) => void;
}

export default function NoticePdfUpload({
  pdf,
  onChange,
}: NoticePdfUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    /* =========================================
       PDF VALIDATION
    ========================================= */

    if (file.type !== "application/pdf") {
      toast.error("Please select a PDF file.");
      e.target.value = "";
      return;
    }

    /* =========================================
       FILE SIZE
       Maximum: 10MB
    ========================================= */

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error("PDF file must be smaller than 10MB.");
      e.target.value = "";
      return;
    }

    try {
      setUploading(true);

      /* =========================================
         FORM DATA
      ========================================= */

      const formData = new FormData();

      formData.append("file", file);
      formData.append("type", "pdf");

      /* =========================================
         UPLOAD
      ========================================= */

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "PDF upload failed."
        );
      }

      /* =========================================
         SAVE CLOUDINARY URL TO PARENT
      ========================================= */

      onChange(result.url);

      toast.success("PDF uploaded successfully.");
    } catch (error) {
      console.error("PDF UPLOAD ERROR:", error);

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

  /* =========================================
     REMOVE PDF
  ========================================= */

  const handleRemove = () => {
    onChange("");
    toast.success("PDF removed.");
  };

  return (
    <div className="space-y-3">
      {/* =======================================
          LABEL
      ======================================= */}

      <label className="block text-sm font-semibold text-slate-700">
        Notice PDF
      </label>

      {/* =======================================
          UPLOAD AREA
      ======================================= */}

      {!pdf ? (
        <div
          className="
            rounded-xl
            border
            border-dashed
            border-slate-300
            bg-slate-50
            p-6
            transition
            hover:border-teal-500
            hover:bg-teal-50/30
          "
        >
          <div className="flex flex-col items-center justify-center text-center">
            {/* ICON */}

            <div
              className="
                mb-4
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-red-50
                text-red-500
              "
            >
              <FileText size={28} />
            </div>

            {/* TEXT */}

            <h3 className="text-sm font-semibold text-slate-800">
              Upload Notice PDF
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              PDF only • Maximum 10MB
            </p>

            {/* BUTTON */}

            <button
              type="button"
              disabled={uploading}
              onClick={() =>
                inputRef.current?.click()
              }
              className="
                mt-4
                inline-flex
                items-center
                gap-2
                rounded-lg
                bg-teal-600
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-teal-700
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <Upload size={17} />

              {uploading
                ? "Uploading..."
                : "Choose PDF"}
            </button>

            {/* HIDDEN INPUT */}

            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      ) : (
        /* =======================================
           PDF PREVIEW
        ======================================= */

        <div
          className="
            flex
            flex-col
            gap-4
            rounded-xl
            border
            border-slate-200
            bg-white
            p-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* LEFT */}

          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-red-50
                text-red-500
              "
            >
              <FileText size={24} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-800">
                Notice PDF
              </p>

              <p className="text-xs text-green-600">
                PDF uploaded successfully
              </p>
            </div>
          </div>

          {/* ACTIONS */}

          <div className="flex shrink-0 items-center gap-2">
            {/* VIEW */}

            <a
              href={pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-slate-300
                px-3
                py-2
                text-sm
                font-medium
                text-slate-700
                transition
                hover:bg-slate-100
              "
            >
              <ExternalLink size={16} />
              View
            </a>

            {/* REMOVE */}

            <button
              type="button"
              onClick={handleRemove}
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                bg-red-50
                px-3
                py-2
                text-sm
                font-medium
                text-red-600
                transition
                hover:bg-red-100
              "
            >
              <X size={16} />
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}