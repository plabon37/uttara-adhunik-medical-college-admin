import { FileText } from "lucide-react";

interface NoticeEmptyProps {
  title?: string;
  description?: string;
}

export default function NoticeEmpty({
  title = "No Notices Available",
  description = "There are no notices available. Click the 'Add Notice' button to create your first notice.",
}: NoticeEmptyProps) {
  return (
    <div className="flex min-h-[420px] items-center justify-center p-6">
      <div className="flex max-w-md flex-col items-center text-center">
        {/* Icon */}

        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100">
          <FileText
            size={38}
            className="text-slate-400"
          />
        </div>

        {/* Title */}

        <h2 className="mt-6 text-2xl font-bold text-slate-800">
          {title}
        </h2>

        {/* Description */}

        <p className="mt-3 text-sm leading-7 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}