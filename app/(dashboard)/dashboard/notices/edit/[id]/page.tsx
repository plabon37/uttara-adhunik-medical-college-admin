import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import NoticeForm from "@/components/dashboard/home/notices/NoticeForm";
import {connectToDB} from "@/lib/connectToDB";
import Notice from "@/lib/models/Notice";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata = {
  title: "Edit Notice",
};

export default async function EditNoticePage({
  params,
}: PageProps) {
  const { id } = await params;

  await connectToDB();

  const notice = await Notice.findById(id).lean();

  if (!notice) {
    notFound();
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Edit Notice
          </h1>

          <p className="mt-2 text-slate-500">
            Update the selected notice.
          </p>

        </div>

        <Link
          href="/dashboard/notices"
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-300
            px-5
            py-3
            font-semibold
            transition
            hover:bg-slate-100
          "
        >
          <ArrowLeft size={18} />

          Back
        </Link>

      </div>

      <NoticeForm
        initialData={{
          _id: notice._id.toString(),
          title: notice.title,
          category: notice.category,
          pdf: notice.pdf,
          order: notice.order,
          isPublished: notice.isPublished,
        }}
      />

    </div>
  );
}