import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { connectToDB } from "@/lib/connectToDB";
import { NoticeModel } from "@/lib/models/Notice";

import NoticeForm from "@/components/dashboard/home/notices/NoticeForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditNoticePage({
  params,
}: Props) {
  const { id } = await params;

  await connectToDB();

  const notice = await NoticeModel.findById(id).lean();

  if (!notice) {
    notFound();
  }

  const noticeData = {
    _id: notice._id.toString(),
    title: notice.title,
    slug: notice.slug,
    category: notice.category,
    description: notice.description,
    pdf: notice.pdf,
    date: notice.date,
    time: notice.time,
    isPublished: notice.isPublished,
    order: notice.order,
  };

  return (
    <div className="space-y-8">
      {/* =========================
          HEADER
      ========================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Edit Notice
          </h1>

          <p className="mt-2 text-slate-500">
            Update homepage notice.
          </p>
        </div>

        <Link
          href="/dashboard/home/notices"
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

      {/* =========================
          FORM
      ========================= */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <NoticeForm initialData={noticeData} />
      </div>
    </div>
  );
}