import { useState } from "react";
import useTokens from "@/hooks/useTokens";
import { useForm } from "react-hook-form";
import {Card, CardContent, Grid, TextField, Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";

export default function SearchPage() {
  const [results, setResults] = useState([]);
  const tokens = useTokens();

  const { handleSubmit, register, reset } = useForm({
    mode: "all",
    defaultValues: {
      username: "",
      minimumAge: 18,
      maximumAge: 99,
      firstName: "",
    },
  });

  const resetForm = () => {
    reset({
      username: "",
      minimumAge: 18,
      maximumAge: 99,
      firstName: "",
    });
  }

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
      <div className="m-4">
        <h1 className="text-2xl font-bold mb-4">Rechercher un utilisateur</h1>

        <Card>
          <CardContent className="bg-gray-100 shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container direction="row" spacing={2} alignItems="center">
                <Grid item xs={2}>
                  <TextField
                      label="Nom d'utilisateur"
                      variant="outlined"
                      {...register("username")}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                      label="Prénom"
                      variant="outlined"
                      {...register("firstName")}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                      label="Age minimum"
                      variant="outlined"
                      type="number"
                      {...register("minimumAge")}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                      label="Age maximum"
                      variant="outlined"
                      type="number"
                      {...register("maximumAge")}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Button variant="contained" color="primary" type="submit">
                    Rechercher
                  </Button>
                </Grid>
                <Grid item xs={1}>
                  <Button variant="contained" color="secondary" onClick={resetForm}>
                    Réinitialiser
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>

        <Grid container spacing={2} sx={{justifyContent: 'center', marginTop:"10px"}}>
          {results.length > 0 ? (
              results.map((result) => (
                  <Grid item xs={2} key={result.id}>
                    <Card sx={{padding: '10px'}}>
                      <Link to={`/user/${result.id}`}>
                        <Typography variant="h6" component="div">
                          {result.username}
                        </Typography>
                        <Typography variant="body2">
                          Age: {result.age}
                        </Typography>
                      </Link>
                    </Card>
                  </Grid>
              ))
          ) : (
              <Typography variant="h6" color="textSecondary">
                aucun résultat.
              </Typography>
          )}
        </Grid>
      </div>
  );
}
