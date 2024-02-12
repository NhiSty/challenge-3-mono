import { useState } from "react";
import { Button, Dialog, InputLabel } from "@mui/material";
import useTokens from "@/hooks/useTokens";
import { useForm } from "react-hook-form";

export default function CreateAvailabilityForm({ userId }) {
  const [isOpened, setOpened] = useState(false);
  const tokens = useTokens();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "all",
    defaultValues: {
      weekDay: "monday",
      startTime: "09:00:00",
      endTime: "18:00:00",
    },
  });

  const onSubmit = (values) => {
    if (!tokens) return;

    fetch(
      `${import.meta.env.VITE_API_BASE_URL}/users/${userId}/availabilities`,
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokens.token}`,
        },
      },
    ).then((res) => res.json());
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpened(true)}
      >
        Ajouter une disponibilité
      </Button>

      <Dialog
        title="Ajouter une disponibilité"
        open={isOpened}
        onClose={() => {
          setOpened(false);
        }}
      >
        <div className="p-3 flex flex-col gap-3">
          <div>
            <InputLabel id="demo-simple-select-label">
              Jour de la semaine
            </InputLabel>
            <select
              className="bg-white border p-2 w-100 w-full"
              {...register("weekDay")}
            >
              <option value="monday">Lundi</option>
              <option value="tuesday">Mardi</option>
              <option value="wednesday">Mercredi</option>
              <option value="thursday">Jeudi</option>
              <option value="friday">Vendredi</option>
              <option value="saturday">Samedi</option>
              <option value="sunday">Dimanche</option>
            </select>
          </div>

          <div>
            <InputLabel id="demo-simple-select-label">
              Heure de début
            </InputLabel>
            <input
              className="bg-white border p-2 w-100 w-full"
              type="time"
              {...register("startTime")}
            />
          </div>

          <div>
            <InputLabel id="demo-simple-select-label">Heure de fin</InputLabel>
            <input
              className="bg-white border p-2 w-100 w-full"
              type="time"
              {...register("endTime")}
            />
          </div>

          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            color="primary"
          >
            Soumettre
          </Button>
        </div>
      </Dialog>
    </>
  );
}
