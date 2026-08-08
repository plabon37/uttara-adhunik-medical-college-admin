export default function PublicationLoading() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600" />

        <p className="mt-4 text-sm font-medium text-slate-500">
          Loading publications...
        </p>
      </div>
    </div>
  );
}