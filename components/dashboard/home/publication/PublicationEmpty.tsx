import { FileText } from "lucide-react";

interface PublicationEmptyProps {
  title?: string;
  description?: string;
}

export default function PublicationEmpty({
  title = "No Publication Found",
  description = "There are no publications available. Click the 'Add Publication' button to create your first publication.",
}: PublicationEmptyProps) {
  return (
    <div className="flex min-h-[400px] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100">
          <FileText
            size={40}
            className="text-slate-400"
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