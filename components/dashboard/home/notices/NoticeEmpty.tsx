import { FileText } from "lucide-react";

interface NoticeEmptyProps {
  title?: string;
  description?: string;
}

export default function NoticeEmpty({
  title = "No Notice Found",
  description = "There are no notices available. Click the 'Add Notice' button to create your first notice.",
}: NoticeEmptyProps) {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-8">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
          <FileText
            size={40}
            className="text-slate-500"
          />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-slate-800">
          {title}
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}