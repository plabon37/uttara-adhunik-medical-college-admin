"use client";

import { useRef, useState } from "react";
import {
  FileText,
  Loader2,
  Trash2,
  Upload,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

interface NoticePdfUploadProps {
  pdf: string;
  onChange: (url: string) => void;
}

export default function NoticePdfUpload({
  pdf,
  onChange,
}: NoticePdfUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

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
        return;
      }

      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);

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
      console.error(error);

      toast.error(
        "Something went wrong."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-slate-700">
        Notice PDF
      </label>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        hidden
        onChange={handleUpload}
      />

      {!pdf ? (
        <button
          type="button"
          onClick={() =>
            inputRef.current?.click()
          }
          disabled={uploading}
          className="
            flex
            h-72
            w-full
            flex-col
            items-center
            justify-center
            rounded-2xl
            border-2
            border-dashed
            border-slate-300
            bg-slate-50
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

              <span className="mt-4 text-sm font-medium text-slate-600">
                Uploading PDF...
              </span>
            </>
          ) : (
            <>
              <Upload
                size={48}
                className="text-slate-400"
              />

              <span className="mt-4 text-base font-semibold text-slate-700">
                Click to Upload PDF
              </span>

              <p className="mt-1 text-sm text-slate-500">
                PDF only
              </p>
            </>
          )}
        </button>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex h-72 flex-col items-center justify-center bg-slate-50">
            <FileText
              size={70}
              className="text-red-500"
            />

            <h3 className="mt-5 text-lg font-semibold text-slate-700">
              PDF Uploaded Successfully
            </h3>

            <a
              href={pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              <ExternalLink size={18} />
              View PDF
            </a>
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 p-4">
            <p className="truncate text-sm text-slate-600">
              Notice PDF
            </p>

            <button
              type="button"
              onClick={() => onChange("")}
              className="
                flex
                items-center
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
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}