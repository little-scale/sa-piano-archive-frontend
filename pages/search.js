import { useState } from 'react';

export default function SearchPage() {
  const [query, setQuery] = useState({ performer: '', composer: '', year: '' });
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const params = new URLSearchParams(
      Object.fromEntries(Object.entries(query).filter(([_, v]) => v))
    );

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '')}/search?${params}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Search the Archive</h1>

      <form onSubmit={handleSearch} className="space-y-4 mb-6">
        <input
          className="border p-2 w-full"
          placeholder="Performer name"
          value={query.performer}
          onChange={(e) => setQuery({ ...query, performer: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="Composer name"
          value={query.composer}
          onChange={(e) => setQuery({ ...query, composer: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="Year"
          value={query.year}
          onChange={(e) => setQuery({ ...query, year: e.target.value })}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Search</button>
      </form>

      <ul className="space-y-4">
        {results.map((item, idx) => (
          <li key={idx} className="border p-4 rounded shadow">
            <div className="font-semibold">{item.concerts?.title}</div>
            <div className="text-sm text-gray-600">{new Date(item.concerts?.datetime).toDateString()}</div>
            <div className="text-sm">{item.performers?.name} — {item.works?.title} ({item.works?.composers?.name})</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
