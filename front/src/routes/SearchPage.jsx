import { useState } from "react";
import useTokens from "@/hooks/useTokens";

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const tokens = useTokens();

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.token}`,
      },
    });
    const data = await response.json();

    setResults(data["hydra:member"]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={search} onChange={handleChange} />
        <button type="submit">Rechercher</button>
      </form>

      <ul>
        {results.map((result) => (
          <li key={result.id}>
            <a href={`/user/${result.id}`}>{result.username}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
