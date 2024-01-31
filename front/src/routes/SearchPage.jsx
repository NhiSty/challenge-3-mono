import { useState } from "react";
import useTokens from "@/hooks/useTokens";
import { useForm } from "react-hook-form";
import { Input } from "@components/form/Input";

export default function SearchPage() {
  const [results, setResults] = useState([]);
  const tokens = useTokens();

  const { handleSubmit, register } = useForm({
    mode: "all",
    defaultValues: {
      username: "",
      minimumAge: 18,
      maximumAge: 99,
      firstName: "",
    },
  });

  const onSubmit = async (data) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/users?age[between]=${data.minimumAge}..${data.maximumAge}&username[]=${data.username}&firstName[]=${data.firstName}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.token}`,
        },
      },
    );
    const result = await response.json();

    setResults(result["hydra:member"]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-1 items-center">
          <label>
            Nom d&apos;utilisateur
            <Input
              placeholder="Nom d'utilisateur"
              className="text-white"
              type="text"
              {...register("username")}
            />
          </label>
          <label>
            Prénom
            <Input
              placeholder="Prénom"
              className="text-white"
              type="text"
              {...register("firstName")}
            />
          </label>
          <label>
            Age minimum
            <Input
              placeholder="Age minimum"
              className="text-white"
              type="number"
              {...register("minimumAge")}
            />
          </label>
          <label>
            Age maximum
            <Input
              placeholder="Age maximum"
              className="text-white"
              type="number"
              {...register("maximumAge")}
            />
          </label>
          <button className="btn btn-primary" type="submit">
            Rechercher
          </button>
        </div>
      </form>

      <h2 className="text-xl font-bold">Résultats</h2>
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
