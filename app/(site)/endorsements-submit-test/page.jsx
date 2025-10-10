import EndorsementForm from "../../components/EndorsementForm";
import EndorsementsFeed from "../../components/EndorsementsFeed";

export default function SubmitTestPage() {
  return (

    <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            What people say</h1>
        <p className="text-center mt-2 text-sm sm:text-sm md:text-base text-neutral-500 max-w-[36ch] mx-auto">
            Share your experience and join our community of supporters</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">

        <div className="rounded-lg border border-neutral-200/70 dark:border-neutral-700/70 bg-white/50
         dark:bg-neutral-900/60 p-4 sm:p-6">
          <h2 className="text-xl font-semibold mb-4">Leave an Endorsement</h2>
          <EndorsementForm />
        </div>
        <div className="rounded-lg border border-neutral-200/70 dark:border-neutral-700/70 bg-white/50
         dark:bg-neutral-900/60 p-4 sm:p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Endorsements</h2>
          <EndorsementsFeed />
        </div>

      </div>
    </main>
  );
}
