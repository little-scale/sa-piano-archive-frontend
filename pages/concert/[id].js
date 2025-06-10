import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  const id = context.params.id;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '')}/concerts/${id}`);
  const concert = await res.json();
  return { props: { concert } };
}

export default function ConcertDetail({ concert }) {
  const router = useRouter();

  if (!concert) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button className="text-blue-600 underline mb-4" onClick={() => router.back()}>← Back</button>

      <h1 className="text-3xl font-bold mb-2">{concert.title}</h1>
      <p className="text-gray-700">{new Date(concert.datetime).toDateString()}</p>
      <p className="text-sm mt-1">{concert.venues?.name}</p>
      <p className="text-sm italic mb-6">{concert.organisers?.name}</p>

      <h2 className="text-xl font-semibold mb-2">Program</h2>
      <ul className="space-y-2">
        {concert.program_items?.map((item, idx) => (
          <li key={idx} className="border rounded p-3">
            <div className="font-medium">{item.works?.title}</div>
            <div className="text-sm text-gray-600">
              {item.works?.composers?.name} &mdash; {item.performers?.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
