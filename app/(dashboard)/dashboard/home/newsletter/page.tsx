import NewsletterSubscriberList from "@/components/dashboard/home/newsletter/NewsletterSubscriberList";

export default function NewsletterPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1400px]">
        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#008B45]">
            Website
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Newsletter Subscribers
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            View and manage the email addresses submitted by visitors through
            the website newsletter subscription form.
          </p>
        </div>

        {/* =================================================
            SUBSCRIBER LIST
        ================================================= */}

        <NewsletterSubscriberList />
      </div>
    </main>
  );
}