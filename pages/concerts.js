import Link from 'next/link';

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/concerts`);
  const concerts = await res.json();
  return { props: { concerts } };
}

export default function ConcertsPage({ concerts }) {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Concert Archive</h1>
      <ul className="space-y-4">
        {concerts.map((concert) => (
          <Link href={`/concert/${concert.id}`}>
  <li key={concert.id} className="border p-4 rounded shadow hover:bg-gray-50 cursor-pointer">
    <div className="text-xl font-semibold">{concert.title}</div>
    <div className="text-sm text-gray-600">{new Date(concert.datetime).toDateString()}</div>
    <div className="text-sm">{concert.venues?.name}</div>
    <div className="text-sm italic">{concert.organisers?.name}</div>
  </li>
</Link>
        ))}
      </ul>
    </div>
  );
}
