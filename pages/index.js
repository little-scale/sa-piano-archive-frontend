import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">SA Piano Archive</h1>
      <p className="mb-8 text-lg">
        Explore concert programs, performers, and composers from South Australia, 1950–2020.
      </p>

      <ul className="space-y-4 text-blue-600 text-lg underline">
        <li>
          <Link href="/concerts">🎹 Browse Concerts</Link>
        </li>
        <li>
          <Link href="/search">🔎 Search by Performer, Composer, Year</Link>
        </li>
      </ul>
    </div>
  );
}
