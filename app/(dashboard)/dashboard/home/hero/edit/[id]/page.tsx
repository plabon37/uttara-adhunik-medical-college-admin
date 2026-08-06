import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { connectToDB } from "@/lib/connectToDB";
import { HeroModel } from "@/lib/models/HeroModel";

import HeroForm from "@/components/dashboard/home/hero/HeroForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditHeroPage({
  params,
}: Props) {
  const { id } = await params;

  await connectToDB();

  const hero = await HeroModel.findById(id).lean();

  if (!hero) {
    notFound();
  }

  const heroData = {
    _id: hero._id.toString(),
    tagline: hero.tagline,
    title: hero.title,
    highlightText: hero.highlightText,
    lastTitle: hero.lastTitle,
    buttonText: hero.buttonText,
    buttonLink: hero.buttonLink,
    backgroundImage: hero.backgroundImage,
    rightTitle: hero.rightTitle,
    courseOneTitle: hero.courseOneTitle,
    courseOneDescription: hero.courseOneDescription,
    courseTwoTitle: hero.courseTwoTitle,
    courseTwoDescription: hero.courseTwoDescription,
    slideNumber: hero.slideNumber,
    isActive: hero.isActive,
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Edit Hero
          </h1>

          <p className="mt-2 text-slate-500">
            Update homepage hero section.
          </p>
        </div>

        <Link
          href="/dashboard/home/hero"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>

      {/* Form */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <HeroForm initialData={heroData} />
      </div>
    </div>
  );
}