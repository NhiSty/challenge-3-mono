import { Button, Dialog, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import useTokens from "@/hooks/useTokens";
import { useTranslation } from "@/translation/useTranslation";
import PropTypes from "prop-types";

export default function CreateReviewForm({ booking, setBooking, refresh }) {
  const tokens = useTokens();
  const { t } = useTranslation();
  const { handleSubmit, register } = useForm({
    mode: "all",
    defaultValues: {
      reviewContent: "",
    },
  });

  const onSubmit = async (data) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/reviews`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.token}`,
      },
      method: "POST",
      body: JSON.stringify({
        ...data,
        bookingId: booking.id,
      }),
    }).then(() => {
      refresh();
      setBooking(null);
    });
  };

  return (
    <Dialog
      open={booking !== null}
      onClose={() => {
        setBooking(null);
      }}
    >
      <form
        className="p-3 flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          label={t("review")}
          variant="outlined"
          {...register("reviewContent")}
        />

        <Button variant="contained" color="primary" type="submit">
          {t("writeReview")}
        </Button>
      </form>
    </Dialog>
  );
}

CreateReviewForm.propTypes = {
  booking: PropTypes.object,
  setBooking: PropTypes.func,
  refresh: PropTypes.func,
};
