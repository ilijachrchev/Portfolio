import { getSupabaseClient } from "../../../lib/supabaseClient";


export default async function EndorsementsTestPage() {
  const supabase = getSupabaseClient();

  // 1) Ask the "endorsements" table for a few approved rows
  // 2) Only select the columns we want to display
  // 3) Newest first (created_at desc)
  const { data, error } = await supabase
    .from("endorsements")
    .select("id, name, country, message, created_at")
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    // If query fails, show the error so we know what's wrong
    return (
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-xl font-semibold mb-2">Endorsements: Test</h1>
        <p className="text-red-600">Query error: {error.message}</p>
      </main>
    );
  }

  const items = data ?? [];

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-semibold">Endorsements: Test</h1>

      {items.length === 0 ? (
        <p className="text-sm text-neutral-500">
          No approved endorsements yet. Add one later and refresh this page.
        </p>
      ) : (
        <ul className="space-y-3">
          {items.map((row) => (
            <li key={row.id} className="rounded border p-3">
              <div className="text-sm">
                <span className="font-medium">{row.name}</span>
                {row.country ? <span className="text-neutral-500"> — {row.country}</span> : null}
              </div>
              <p className="text-sm mt-1 whitespace-pre-wrap">{row.message}</p>
              <p className="text-xs text-neutral-500 mt-2">
                {new Date(row.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
