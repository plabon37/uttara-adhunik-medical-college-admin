import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { connectToDB } from "@/lib/connectToDB";
import { PublicationModel } from "@/lib/models/Publication";

import PublicationForm from "@/components/dashboard/home/publication/PublicationForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPublicationPage({
  params,
}: Props) {
  const { id } = await params;

  await connectToDB();

  const publication =
    await PublicationModel.findById(id).lean();

  if (!publication) {
    notFound();
  }

  const publicationData = {
    _id: publication._id.toString(),

    title: publication.title,

    slug: publication.slug,

    category: publication.category as
      | "Journal"
      | "Tenders",

    description: publication.description,

    pdf: publication.pdf,

    date: new Date(publication.date)
      .toISOString()
      .split("T")[0],

    time: publication.time,

    order: publication.order,

    isPublished:
      publication.isPublished,
  };

  return (
    <div className="space-y-8">
      {/* ==========================
          HEADER
      ========================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Edit Publication
          </h1>

          <p className="mt-2 text-slate-500">
            Update homepage publication.
          </p>
        </div>

        <Link
          href="/dashboard/home/publications"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-slate-300
            px-5
            py-3
            font-medium
            text-slate-700
            transition
            hover:bg-slate-100
          "
        >
          <ArrowLeft size={18} />

          Back
        </Link>
      </div>

      {/* ==========================
          FORM
      ========================== */}

      <PublicationForm
        initialData={publicationData}
      />
    </div>
  );
}