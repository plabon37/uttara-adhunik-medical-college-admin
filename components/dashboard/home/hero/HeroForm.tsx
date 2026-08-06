"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import HeroImageUpload from "./HeroImageUpload";
import HeroPreview from "./HeroPreview";

interface HeroFormProps {
  initialData?: {
    _id?: string;
    tagline: string;
    title: string;
    highlightText: string;
    lastTitle: string;
    buttonText: string;
    buttonLink: string;
    backgroundImage: string;
    rightTitle: string;
    courseOneTitle: string;
    courseOneDescription: string;
    courseTwoTitle: string;
    courseTwoDescription: string;
    slideNumber: number;
    isActive: boolean;
  };
}

export default function HeroForm({
  initialData,
}: HeroFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    tagline: initialData?.tagline ?? "",
    title: initialData?.title ?? "",
    highlightText:
      initialData?.highlightText ?? "",
    lastTitle:
      initialData?.lastTitle ?? "",
    buttonText:
      initialData?.buttonText ?? "",
    buttonLink:
      initialData?.buttonLink ?? "",
    backgroundImage:
      initialData?.backgroundImage ?? "",
    rightTitle:
      initialData?.rightTitle ?? "",
    courseOneTitle:
      initialData?.courseOneTitle ?? "",
    courseOneDescription:
      initialData?.courseOneDescription ?? "",
    courseTwoTitle:
      initialData?.courseTwoTitle ?? "",
    courseTwoDescription:
      initialData?.courseTwoDescription ?? "",
    slideNumber:
      initialData?.slideNumber ?? 1,
    isActive:
      initialData?.isActive ?? true,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "slideNumber"
          ? Number(value)
          : value,
    }));
  };

  const handleImageChange = (
    url: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      backgroundImage: url,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const endpoint = initialData?._id
        ? `/api/hero/${initialData._id}`
        : "/api/hero";

      const method = initialData?._id
        ? "PATCH"
        : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.message ||
            "Operation failed"
        );
      }

      toast.success(result.message);

      router.push("/dashboard/home/hero");

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <div className="grid gap-8 xl:grid-cols-2">
        {/* Left Side */}

        <div className="space-y-6">
                   {/* Background Image */}

          <HeroImageUpload
            image={formData.backgroundImage}
            onChange={handleImageChange}
          />

          {/* Tagline */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Tagline
            </label>

            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              placeholder="Enter Hero Tagline"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-600"
            />
          </div>

          {/* Title */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Hero Title"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-600"
            />
          </div>

          {/* Highlight Text */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Highlight Text
            </label>

            <input
              type="text"
              name="highlightText"
              value={formData.highlightText}
              onChange={handleChange}
              placeholder="Enter Highlight Text"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-600"
            />
          </div>

          {/* Last Title */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Last Title
            </label>

            <input
              type="text"
              name="lastTitle"
              value={formData.lastTitle}
              onChange={handleChange}
              placeholder="Enter Last Title"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-600"
            />
          </div>

          {/* Button Text */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Button Text
            </label>

            <input
              type="text"
              name="buttonText"
              value={formData.buttonText}
              onChange={handleChange}
              placeholder="Button Text"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-600"
            />
          </div>

          {/* Button Link */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Button Link
            </label>

            <input
              type="text"
              name="buttonLink"
              value={formData.buttonLink}
              onChange={handleChange}
              placeholder="/admission"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-600"
            />
          </div>

        </div>

        {/* Right Side */}

        <div className="space-y-6">
                    {/* Right Card Title */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Right Card Title
            </label>

            <input
              type="text"
              name="rightTitle"
              value={formData.rightTitle}
              onChange={handleChange}
              placeholder="Enter Right Card Title"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-600"
            />
          </div>

          {/* Course One Title */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Course One Title
            </label>

            <input
              type="text"
              name="courseOneTitle"
              value={formData.courseOneTitle}
              onChange={handleChange}
              placeholder="Enter Course One Title"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-600"
            />
          </div>

          {/* Course One Description */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Course One Description
            </label>

            <textarea
              rows={4}
              name="courseOneDescription"
              value={formData.courseOneDescription}
              onChange={handleChange}
              placeholder="Course One Description"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-600"
            />
          </div>

          {/* Course Two Title */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Course Two Title
            </label>

            <input
              type="text"
              name="courseTwoTitle"
              value={formData.courseTwoTitle}
              onChange={handleChange}
              placeholder="Enter Course Two Title"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-600"
            />
          </div>

          {/* Course Two Description */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Course Two Description
            </label>

            <textarea
              rows={4}
              name="courseTwoDescription"
              value={formData.courseTwoDescription}
              onChange={handleChange}
              placeholder="Course Two Description"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-600"
            />
          </div>

          {/* Slide Number */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Slide Number
            </label>

            <input
              type="number"
              min={1}
              name="slideNumber"
              value={formData.slideNumber}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-600"
            />
          </div>

          {/* Status */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Status
            </label>

            <select
              name="isActive"
              value={String(formData.isActive)}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isActive: e.target.value === "true",
                }))
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-600"
            >
              <option value="true">
                Active
              </option>

              <option value="false">
                Inactive
              </option>
            </select>
          </div>

        </div>
                {/* Live Preview */}

        <HeroPreview
          tagline={formData.tagline}
          title={formData.title}
          highlightText={formData.highlightText}
          lastTitle={formData.lastTitle}
          buttonText={formData.buttonText}
          buttonLink={formData.buttonLink}
          backgroundImage={formData.backgroundImage}
          rightTitle={formData.rightTitle}
          courseOneTitle={formData.courseOneTitle}
          courseOneDescription={formData.courseOneDescription}
          courseTwoTitle={formData.courseTwoTitle}
          courseTwoDescription={formData.courseTwoDescription}
        />

      </div>

      {/* Action Buttons */}

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">

        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading}
          className="
            rounded-xl
            border
            border-slate-300
            px-6
            py-3
            font-semibold
            text-slate-700
            transition
            hover:bg-slate-100
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="
            rounded-xl
            bg-teal-600
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-teal-700
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading
            ? "Saving..."
            : initialData?._id
            ? "Update Hero"
            : "Create Hero"}
        </button>

      </div>

    </form>
  );
}